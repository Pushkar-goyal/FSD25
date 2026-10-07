import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { journey } from '../data/config'

export default function Journey() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Drive horizontal translation of the track from vertical scroll progress.
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-72%'])
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="relative">
      <div className="section-pad pb-0">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-4"
          >
            04 — Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight max-w-2xl"
          >
            Not a resume — a trajectory.
          </motion.h2>
        </div>
      </div>

      {/* Tall scroll region that drives the horizontal scrub on desktop */}
      <div ref={containerRef} className="relative h-[280vh] hidden md:block">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="relative w-full">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10 mx-20" />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute left-20 right-20 top-1/2 -translate-y-1/2 h-px bg-grad-primary origin-left"
            />
            <motion.div style={{ x }} className="flex gap-10 pl-20 pr-[40vw] w-max">
              {journey.map((step, i) => (
                <div key={step.id} className="w-[320px] shrink-0 flex flex-col items-start">
                  <div className="relative mb-8">
                    <div className="w-4 h-4 rounded-full bg-grad-primary shadow-glow" />
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-signal mb-3">
                    Stage {i + 1} — {step.label}
                  </span>
                  <h3 className="font-display text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-mist text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vertical fallback timeline on mobile */}
      <div className="md:hidden section-pad pt-10">
        <div className="max-w-lg mx-auto relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
          <div className="space-y-10">
            {journey.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative"
              >
                <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-grad-primary" />
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-signal mb-2 block">
                  Stage {i + 1} — {step.label}
                </span>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-mist text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
