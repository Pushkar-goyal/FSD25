import { motion } from 'framer-motion'

// Fixed, whole-page ambient layer: animated grid + slow drifting gradient
// blobs + film-grain noise. Purely decorative, aria-hidden, GPU-friendly
// (opacity/transform only).
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none noise" aria-hidden="true">
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      <motion.div
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(110,123,255,0.22), transparent 70%)' }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-[550px] h-[550px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(160,107,255,0.18), transparent 70%)' }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(94,230,208,0.10), transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
