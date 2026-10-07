import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { about, stats } from '../data/config'

function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          variants={fadeUp}
          className="eyebrow mb-4"
        >
          01 — About
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15% 0px' }}
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] font-medium tracking-tight mb-8"
            >
              A student engineer working across{' '}
              <span className="text-gradient">intelligence</span> and{' '}
              <span className="text-gradient">interface</span>.
            </motion.h2>

            <div className="space-y-5 max-w-xl">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-15% 0px' }}
                  variants={fadeUp}
                  custom={i + 2}
                  className="text-mist text-base leading-relaxed"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15% 0px' }}
              variants={fadeUp}
              custom={5}
              className="mt-10 flex flex-wrap gap-2"
            >
              {about.interests.map((interest) => (
                <span
                  key={interest}
                  className="glass rounded-full px-4 py-2 text-xs font-mono tracking-wide text-paper/80"
                >
                  {interest}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 content-start">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-15% 0px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass rounded-2xl p-6 flex flex-col justify-between h-36 sm:h-40 group hover:shadow-glow transition-shadow duration-500"
              >
                <span className="font-display text-4xl sm:text-5xl font-semibold text-gradient">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
                  {stat.overrideLabel ?? stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
