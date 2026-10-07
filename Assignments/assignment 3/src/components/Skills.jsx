import { motion } from 'framer-motion'
import { skills } from '../data/config'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-4"
        >
          02 — Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight mb-14 max-w-2xl"
        >
          Tools I reach for when an idea needs to become real.
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              className="group relative glass rounded-2xl px-5 py-8 flex flex-col items-center justify-center gap-2 text-center cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-grad-radial" />
              <span className="relative font-mono text-[10px] tracking-[0.2em] uppercase text-mist group-hover:text-signal transition-colors duration-300">
                {skill.category}
              </span>
              <span className="relative font-display text-lg font-medium text-paper">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
