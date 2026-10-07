import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/config'
import MagneticButton from './MagneticButton'

const links = [
  { label: 'Email', value: profile.email, href: profile.socials.email, icon: Mail },
  { label: 'GitHub', value: '@' + profile.socials.github.split('/').pop(), href: profile.socials.github, icon: Github },
  { label: 'LinkedIn', value: 'Connect', href: profile.socials.linkedin, icon: Linkedin },
]

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(110,123,255,0.14), transparent 70%)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          06 — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase font-semibold leading-[0.95] tracking-tight text-[11vw] sm:text-6xl lg:text-7xl mb-10"
        >
          Let's Build<br />
          <span className="text-gradient">Something.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-mist max-w-md mx-auto mb-14"
        >
          Open to internships, collaborations, and interesting problems worth solving.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <MagneticButton
                as="a"
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group glass-strong rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-glow transition-shadow duration-500 h-full"
              >
                <link.icon size={20} className="text-signal" />
                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-mist mb-1">
                    {link.label}
                  </div>
                  <div className="text-sm text-paper flex items-center gap-1 justify-center">
                    {link.value}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
