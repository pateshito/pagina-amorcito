import { useEffect, useRef } from 'react'
import './Starfield.css'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars()
    }

    const generateStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 6000) // densidad
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,       
        alpha: Math.random() * 0.6 + 0.3,   
        speed: Math.random() * 0.05 + 0.01, 
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // color según tema
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const color = isDark ? '255,255,255' : '20,20,20'

      stars.forEach((s) => {
        s.x -= s.speed
        s.y -= s.speed
        if (s.x < 0) s.x = canvas.width
        if (s.y < 0) s.y = canvas.height

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${s.alpha})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}