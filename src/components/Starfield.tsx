import { useEffect, useRef } from 'react'

/**
 * Starfield — canvas 2D night sky.
 *
 * Three depth layers of stars with individual twinkle phases.
 * Slow autonomous drift + scroll parallax + lerped mouse parallax,
 * all scaled by depth so the sky feels volumetric. Occasional
 * shooting stars. Static render under prefers-reduced-motion.
 */

interface Star {
  x: number // 0..1 of field width
  y: number // 0..1 of field height
  z: number // depth 0 (far) .. 1 (near)
  r: number // radius px at dpr 1
  a: number // base alpha
  phase: number
  speed: number // twinkle speed
  color: string // "r,g,b"
  halo: boolean
}

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  born: number
  life: number
}

const STAR_COLORS = [
  '255,255,255', '255,255,255', '255,255,255', '255,255,255',
  '198,222,255', '178,198,255', '255,236,210', '216,198,255', '170,235,255',
]

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
    let dpr = 1
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let nextMeteor = performance.now() + 4000 + Math.random() * 5000
    let raf = 0
    let running = false

    // Parallax state
    let mouseX = 0
    let mouseY = 0
    let px = 0
    let py = 0

    const buildStars = () => {
      const count = Math.min(520, Math.round((w * h) / 2600))
      stars = Array.from({ length: count }, () => {
        const z = 0.15 + Math.pow(Math.random(), 1.7) * 0.85
        const r = 0.35 + z * (0.5 + Math.random() * 0.9)
        return {
          x: Math.random(),
          y: Math.random(),
          z,
          r,
          a: 0.35 + z * 0.45 + Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0004 + Math.random() * 0.0011,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          halo: z > 0.8 && Math.random() < 0.18,
        }
      })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
      if (reduced) drawFrame(0, true)
    }

    const wrap = (v: number, max: number) => ((v % max) + max) % max

    const drawFrame = (t: number, still = false) => {
      ctx.clearRect(0, 0, w, h)
      const scroll = window.scrollY

      // Ease mouse parallax toward target
      px += (mouseX - px) * 0.035
      py += (mouseY - py) * 0.035

      const driftY = still ? 0 : t * 0.0035 // slow upward drift of the whole field

      for (const s of stars) {
        const depth = s.z
        const x = wrap(s.x * w + px * depth * 22, w + 8) - 4
        const y = wrap(s.y * h - scroll * depth * 0.30 + py * depth * 14 + driftY * depth, h + 8) - 4

        const tw = still ? 1 : 0.74 + 0.26 * Math.sin(s.phase + t * s.speed)
        const alpha = s.a * tw

        if (s.halo) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 7)
          g.addColorStop(0, `rgba(${s.color},${alpha * 0.5})`)
          g.addColorStop(1, `rgba(${s.color},0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(x, y, s.r * 7, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(${s.color},${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (still) return

      // Shooting stars
      if (t > nextMeteor && !document.hidden) {
        nextMeteor = t + 6000 + Math.random() * 9000
        const fromLeft = Math.random() < 0.5
        meteors.push({
          x: w * (fromLeft ? Math.random() * 0.4 : 0.6 + Math.random() * 0.4),
          y: h * Math.random() * 0.45,
          vx: (fromLeft ? 1 : -1) * (0.45 + Math.random() * 0.35),
          vy: 0.28 + Math.random() * 0.22,
          born: t,
          life: 1100 + Math.random() * 500,
        })
      }

      meteors = meteors.filter((m) => t - m.born < m.life)
      for (const m of meteors) {
        const age = (t - m.born) / m.life
        const fade = age < 0.2 ? age / 0.2 : 1 - (age - 0.2) / 0.8
        const mx = m.x + m.vx * (t - m.born)
        const my = m.y + m.vy * (t - m.born)
        const tail = 130
        const g = ctx.createLinearGradient(mx, my, mx - m.vx * tail, my - m.vy * tail)
        g.addColorStop(0, `rgba(220,240,255,${0.85 * fade})`)
        g.addColorStop(1, 'rgba(140,180,255,0)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1.4
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(mx, my)
        ctx.lineTo(mx - m.vx * tail, my - m.vy * tail)
        ctx.stroke()
      }
    }

    const loop = (t: number) => {
      drawFrame(t)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!running && !reduced) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / w - 0.5) * 2
      mouseY = (e.clientY / h - 0.5) * 2
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    start()
    if (reduced) drawFrame(0, true)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
