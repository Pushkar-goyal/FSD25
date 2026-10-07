import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, User } from 'lucide-react'
import { profile } from '../data/config'
import MagneticButton from './MagneticButton'

const letterVariants = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: { delay: 0.3 + i * 0.045, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

function RevealWord({ word, className = '', startIndex = 0 }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Portfolio — {new Date().getFullYear()}
        </motion.p>

        <h1 className="font-display font-semibold uppercase leading-[0.92] tracking-tight text-[13vw] sm:text-[9vw] lg:text-[7.2rem]">
          <span className="block">
            <RevealWord word={profile.firstName} startIndex={0} />
          </span>
          <span className="block text-gradient">
            <RevealWord word={profile.lastName} startIndex={profile.firstName.length} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-6 text-mist text-sm sm:text-base tracking-[0.15em] uppercase font-medium"
        >
          {profile.role}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] sm:text-xs text-signal/90"
        >
          {profile.tagline.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-signal2/60" />}
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="magnetic-btn bg-grad-primary text-void shadow-glow hover:shadow-glow-purple"
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            as="a"
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn glass text-paper hover:bg-white/[0.08]"
          >
            <Github size={16} />
            GitHub
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Portrait / avatar area — replace portrait.png in /public and set profile.portraitUrl */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="hidden lg:block absolute right-10 xl:right-24 top-1/2 -translate-y-1/2 z-0"
      >
        <div className="relative w-64 h-80 rounded-[2rem] glass-strong overflow-hidden animate-float">
          <div className="absolute inset-0 bg-grad-radial" />
          {profile.portraitUrl ? (
            <img src={profile.portraitUrl} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-mist">
              <User size={40} strokeWidth={1.2} />
              <span className="font-mono text-[10px] tracking-widest uppercase">Add portrait.jpg</span>
            </div>
          )}
          <div className="absolute inset-0 border border-white/10 rounded-[2rem]" />
        </div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 z-10 flex flex-col items-center gap-2 text-mist hover:text-paper transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
