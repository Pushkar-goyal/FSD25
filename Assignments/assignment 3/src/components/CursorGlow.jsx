import { useEffect, useRef } from 'react'

// A soft glow that follows the pointer on fine-pointer (desktop) devices.
// No-ops entirely on touch devices and when reduced motion is requested.
export default function CursorGlow() {
  const ref = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const frame = useRef(null)

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reduceMotion) return

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 200}px, ${pos.current.y - 200}px, 0)`
      }
      frame.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    frame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0 will-change-transform hidden md:block"
      style={{
        background:
          'radial-gradient(circle, rgba(110,123,255,0.10) 0%, rgba(160,107,255,0.06) 40%, transparent 70%)',
      }}
    />
  )
}
