import { useEffect, useRef } from 'react'

/**
 * Starfield — flying through space.
 *
 * Stars live in a z-flight field and stream toward the camera
 * (classic warp projection). The ship cruises at a base speed;
 * scrolling throttles the engines, accelerating the field and
 * stretching stars into light-streaks. Mouse drift nudges the
 * heading. Static render under prefers-reduced-motion.
 */

interface Star {
  x: number // -1.2 .. 1.2 field units
  y: number
  z: number // 1 (far) -> 0 (at the camera)
  size: number
  color: string
  twinkle: number
}

const STAR_COLORS = [
  '255,255,255', '255,255,255', '255,255,255', '255,255,255',
  '198,222,255', '178,198,255', '255,236,210', '216,198,255', '170,235,255',
]

const BASE_SPEED = 0.000028 // z units per ms — slow cruise (~35s per star)
const MAX_BOOST = 30 // scroll throttle multiplier cap
const Z_NEAR = 0.035
const STREAK = 1.6 // streak length in frames of motion

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

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

    // Engine state
    let scrollVel = 0
    let lastScrollY = window.scrollY

    // Heading drift
    let mouseX = 0
    let mouseY = 0
    let mx = 0
    let my = 0

    const spawn = (s: Star, initial: boolean) => {
      s.x = (Math.random() - 0.5) * 2.4
      s.y = (Math.random() - 0.5) * 2.4
      s.z = initial ? Z_NEAR + Math.random() * (1 - Z_NEAR) : 1
      s.size = 0.5 + Math.random() * 0.9
      s.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      s.twinkle = Math.random() * Math.PI * 2
    }

    const buildStars = () => {
      const count = Math.min(650, Math.round((w * h) / 1900))
      stars = Array.from({ length: count }, () => {
        const s = {} as Star
        spawn(s, true)
        return s
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
      if (reduced) drawStatic()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      for (const s of stars) {
        const px = cx + (s.x / s.z) * cx
        const py = cy + (s.y / s.z) * cy
        if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue
        const size = Math.min(s.size * (0.45 / s.z), 2.6)
        const alpha = 0.25 + 0.65 * (1 - s.z)
        ctx.fillStyle = `rgba(${s.color},${alpha})`
        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const frame = (t: number) => {
      const dt = Math.min(t - last || 16.7, 50)
      last = t
      ctx.clearRect(0, 0, w, h)

      // Throttle: scroll velocity decays, boosting flight speed while it lasts
      scrollVel *= Math.pow(0.93, dt / 16.7)
      const boost = Math.min(scrollVel * 0.045, MAX_BOOST)
      const speed = BASE_SPEED * (1 + boost) * dt

      // Heading drift eases toward the cursor
      mx += (mouseX - mx) * 0.03
      my += (mouseY - my) * 0.03
      const cx = w / 2 + mx * 26
      const cy = h / 2 + my * 18

      for (const s of stars) {
        s.z -= speed
        if (s.z <= Z_NEAR) spawn(s, false)

        const px = cx + (s.x / s.z) * (w / 2)
        const py = cy + (s.y / s.z) * (h / 2)
        if (px < -60 || px > w + 60 || py < -60 || py > h + 60) {
          spawn(s, false)
          continue
        }

        const size = Math.min(s.size * (0.45 / s.z), 2.8)
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
        if (dx * dx + dy * dy > 1.2) {
          ctx.strokeStyle = `rgba(${s.color},${alpha})`
          ctx.lineWidth = size
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(qx, qy)
          ctx.lineTo(px, py)
          ctx.stroke()
        } else {
          ctx.fillStyle = `rgba(${s.color},${alpha})`
          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

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
      scrollVel = Math.min(scrollVel + Math.abs(y - lastScrollY), 600)
      lastScrollY = y
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / w - 0.5) * 2
      mouseY = (e.clientY / h - 0.5) * 2
    }

    const onVisibility = () => {
      if (document.hidden) {
        stop()
        scrollVel = 0
      } else {
        start()
      }
    }

    resize()
    if (reduced) drawStatic()
    else start()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
