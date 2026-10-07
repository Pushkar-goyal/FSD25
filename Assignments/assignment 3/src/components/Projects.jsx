import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Github, Image as ImageIcon } from 'lucide-react'
import { projects } from '../data/config'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [6, -6])
  const rotateY = useTransform(springX, [0, 1], [-6, 6])

  const handleMove = (e) => {
    if (!ref.current || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative rounded-[1.75rem] glass-strong overflow-hidden"
      >
        {/* Preview / image placeholder */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-grad-radial opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(110,123,255,0.25), rgba(160,107,255,0.15), transparent 70%)',
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
          />
          {project.imageUrl ? (
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-mist">
              <ImageIcon size={34} strokeWidth={1.2} />
              <span className="font-mono text-[10px] tracking-widest uppercase">Add project preview</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />

          <span className="absolute top-5 left-6 font-mono text-xs text-mist">
            0{index + 1}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-mist text-sm leading-relaxed mb-5 max-w-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 text-signal/90"
              >
                {t}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium glass hover:bg-white/[0.08] transition-colors"
            >
              <Github size={14} /> Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-grad-primary text-void hover:shadow-glow-purple transition-shadow"
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-4"
        >
          03 — Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight mb-14 max-w-2xl"
        >
          Selected work, built to solve real problems.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
