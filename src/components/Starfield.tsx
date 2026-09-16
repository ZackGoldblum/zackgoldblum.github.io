import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Starfield — flying through space.
 *
 * Stars live in a z-flight field and stream toward the camera
 * (classic warp projection). The ship cruises at a base speed;
 * scrolling throttles the engines, accelerating the field and
 * stretching stars into light-streaks. Static render under
 * prefers-reduced-motion.
 */

interface Star {
  x: number // -1.2 .. 1.2 field units
  y: number
  z: number // 1 (far) -> 0 (at the camera)
  size: number
  color: string
  twinkle: number
}

// Fixed background stars — distant pinpricks that never fly past.
// Stored in normalized [0,1] screen space so resize just re-projects them.
interface BgStar {
  x: number
  y: number
  size: number
  color: string
  base: number // baseline alpha
  twinkle: number
}

const STAR_COLORS = [
  '255,255,255', '255,255,255', '255,255,255', '255,255,255',
  '198,222,255', '178,198,255', '255,236,210', '216,198,255', '170,235,255',
]

const BASE_SPEED = 0.000014 // z units per ms — slow cruise (~70s per star)
const MAX_BOOST = 30 // scroll throttle multiplier cap
const Z_NEAR = 0.035
const STREAK = 1.6 // streak length in frames of motion

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  // Jumps aren't flying. Route changes teleport to the top (ScrollToTop),
  // and a reload restores the saved position — often in several steps as
  // the page lays out — so scroll only throttles the engines once the user
  // has actually driven: the next wheel, touch, key, or click re-arms it.
  const teleported = useRef(true)
  const { pathname } = useLocation()
  useEffect(() => {
    teleported.current = true
  }, [pathname])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let last = 0
    let stars: Star[] = []
    let bgStars: BgStar[] = []

    // Engine state
    let scrollVel = 0
    let lastScrollY = window.scrollY

    const spawn = (s: Star, initial: boolean) => {
      s.x = (Math.random() - 0.5) * 2.4
      s.y = (Math.random() - 0.5) * 2.4
      s.z = initial ? Z_NEAR + Math.random() * (1 - Z_NEAR) : 1
      s.size = 0.35 + Math.random() * 0.65
      s.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      s.twinkle = Math.random() * Math.PI * 2
    }

    const buildStars = () => {
      const count = Math.min(4500, Math.round((w * h) / 300))
      stars = Array.from({ length: count }, () => {
        const s = {} as Star
        spawn(s, true)
        return s
      })

      // A denser field of fixed, faint background stars.
      const bgCount = Math.min(2200, Math.round((w * h) / 850))
      bgStars = Array.from({ length: bgCount }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: 0.3 + Math.random() * 0.5,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        base: 0.12 + Math.random() * 0.33,
        twinkle: Math.random() * Math.PI * 2,
      }))
    }

    // A cold start is a uniform z-distribution, but cruising settles the field
    // into a denser steady state: stars respawn far (z = 1) and off-axis ones
    // are culled off-screen before reaching the camera, so the population piles
    // up at far distances (visible near the centre). Fast-forward enough cruise
    // flight — without drawing — that the field opens at that settled density.
    const prewarm = () => {
      const cx = w / 2
      const cy = h / 2
      const dt = 80
      const speed = BASE_SPEED * dt
      const steps = 1200 // ~96s of cruise — past one full near/far traverse
      for (let i = 0; i < steps; i++) {
        for (const s of stars) {
          s.z -= speed
          if (s.z <= Z_NEAR) {
            spawn(s, false)
            continue
          }
          const px = cx + (s.x / s.z) * (w / 2)
          const py = cy + (s.y / s.z) * (h / 2)
          if (px < -60 || px > w + 60 || py < -60 || py > h + 60) spawn(s, false)
        }
      }
    }

    // Soft star sprites — a radial-gradient glow pre-rendered once per colour,
    // so each star is a cheap drawImage (with depth via globalAlpha) instead of
    // a hard-edged arc fill. Keeps thousands of stars soft and affordable.
    const SPRITE_R = 16
    const spriteFor: Record<string, HTMLCanvasElement> = {}
    const buildSprites = () => {
      for (const c of STAR_COLORS) {
        if (spriteFor[c]) continue
        const spr = document.createElement('canvas')
        spr.width = spr.height = SPRITE_R * 2
        const sx = spr.getContext('2d')
        if (!sx) continue
        const g = sx.createRadialGradient(SPRITE_R, SPRITE_R, 0, SPRITE_R, SPRITE_R, SPRITE_R)
        g.addColorStop(0, `rgba(${c},1)`)
        g.addColorStop(0.32, `rgba(${c},1)`) // solid bright core
        g.addColorStop(0.5, `rgba(${c},0.4)`)
        g.addColorStop(1, `rgba(${c},0)`)
        sx.fillStyle = g
        sx.fillRect(0, 0, SPRITE_R * 2, SPRITE_R * 2)
        spriteFor[c] = spr
      }
    }

    // Blit a soft glow centred at (x, y). `radius` is the glow radius; the
    // bright core is the inner ~quarter of the gradient.
    // Sprites smaller than ~1px alias badly (the rasterised coverage flickers
    // as they drift sub-pixel), so clamp to a floor and instead dim toward
    // zero — distant stars fade out smoothly rather than blinking.
    const MIN_RADIUS = 1
    const drawSoft = (color: string, x: number, y: number, radius: number, alpha: number) => {
      if (radius < MIN_RADIUS) {
        alpha *= radius / MIN_RADIUS
        radius = MIN_RADIUS
      }
      ctx.globalAlpha = alpha
      ctx.drawImage(spriteFor[color], x - radius, y - radius, radius * 2, radius * 2)
    }

    const drawBg = (t: number) => {
      for (const s of bgStars) {
        const tw = 0.8 + 0.2 * Math.sin(s.twinkle + t * 0.0009)
        drawSoft(s.color, s.x * w, s.y * h, s.size * 2.6, s.base * tw)
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Stars live in resolution-independent coordinates and are projected
      // with the current w/h every frame, so a resize only needs the canvas
      // re-sized — rebuilding would randomize (and visibly re-render) the
      // whole field. Build once, then keep it across resizes.
      if (!stars.length) {
        buildStars()
        prewarm()
      }
      if (reduced) drawStatic()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      drawBg(0)
      const cx = w / 2
      const cy = h / 2
      for (const s of stars) {
        const px = cx + (s.x / s.z) * cx
        const py = cy + (s.y / s.z) * cy
        if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue
        const size = Math.min(s.size * (0.42 / s.z), 2.4)
        const alpha = 0.25 + 0.65 * (1 - s.z)
        drawSoft(s.color, px, py, size * 2.2, alpha)
      }
      ctx.globalAlpha = 1
    }

    const frame = (t: number) => {
      const dt = Math.min(t - last || 16.7, 50)
      last = t
      ctx.clearRect(0, 0, w, h)
      drawBg(t)

      // Throttle: scroll velocity decays, boosting flight speed while it lasts
      scrollVel *= Math.pow(0.93, dt / 16.7)
      const boost = Math.min(scrollVel * 0.045, MAX_BOOST)
      const speed = BASE_SPEED * (1 + boost) * dt

      const cx = w / 2
      const cy = h / 2

      for (const s of stars) {
        s.z -= speed
        if (s.z <= Z_NEAR) spawn(s, false)

        const px = cx + (s.x / s.z) * (w / 2)
        const py = cy + (s.y / s.z) * (h / 2)
        if (px < -60 || px > w + 60 || py < -60 || py > h + 60) {
          spawn(s, false)
          continue
        }

        const size = Math.min(s.size * (0.42 / s.z), 2.4)
        const appear = Math.min(1, (1 - s.z) * 7) // fade in after spawn
        const depth = 0.22 + 0.78 * (1 - s.z)
        const tw = 0.86 + 0.14 * Math.sin(s.twinkle + t * 0.0012)
        const alpha = appear * depth * tw

        // Streak: project the star a moment ago and stroke between
        const zPrev = Math.min(s.z + speed * STREAK, 1)
        const qx = cx + (s.x / zPrev) * (w / 2)
        const qy = cy + (s.y / zPrev) * (h / 2)

        const dx = px - qx
        const dy = py - qy
        // Streaks only while the throttle is open — cruising renders soft dots
        if (boost > 1 && dx * dx + dy * dy > 1.2) {
          ctx.globalAlpha = 1
          ctx.strokeStyle = `rgba(${s.color},${alpha})`
          ctx.lineWidth = size * 2 // match the dot's diameter — no size snap at the handoff
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(qx, qy)
          ctx.lineTo(px, py)
          ctx.stroke()
        } else {
          drawSoft(s.color, px, py, size * 2.2, alpha)
        }
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (!running && !reduced) {
        running = true
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onScroll = () => {
      const y = window.scrollY
      if (!teleported.current) {
        scrollVel = Math.min(scrollVel + Math.abs(y - lastScrollY) * 0.5, 600)
      }
      lastScrollY = y
    }

    const onInput = () => {
      teleported.current = false
    }

    const onVisibility = () => {
      if (document.hidden) {
        stop()
        scrollVel = 0
      } else {
        start()
      }
    }

    buildSprites()
    resize()
    if (reduced) drawStatic()
    else start()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onInput, { passive: true })
    window.addEventListener('touchstart', onInput, { passive: true })
    window.addEventListener('keydown', onInput)
    window.addEventListener('mousedown', onInput)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onInput)
      window.removeEventListener('touchstart', onInput)
      window.removeEventListener('keydown', onInput)
      window.removeEventListener('mousedown', onInput)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
