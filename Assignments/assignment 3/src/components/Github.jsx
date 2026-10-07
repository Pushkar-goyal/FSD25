import { motion } from 'framer-motion'
import { Github as GithubIcon, GitBranch, Star, ArrowUpRight } from 'lucide-react'
import { github } from '../data/config'

// Static structure ready to be wired to the GitHub REST API
// (e.g. `/users/${github.username}/repos`) once desired — no
// repository stats are fabricated here.
const placeholderRepoSlots = [1, 2, 3]

export default function Github() {
  return (
    <section id="github-section" className="section-pad relative">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-4"
        >
          05 — GitHub
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 glass-strong rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
              <GithubIcon size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold mb-1">@{github.username}</h3>
              <p className="text-mist text-sm leading-relaxed">{github.featuredRepoNote}</p>
            </div>
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full text-xs font-medium bg-grad-primary text-void hover:shadow-glow-purple transition-shadow"
            >
              View Profile <ArrowUpRight size={14} />
            </a>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {placeholderRepoSlots.map((slot, i) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 flex flex-col justify-between h-40 hover:shadow-glow transition-shadow duration-500"
              >
                <div className="flex items-center gap-2 text-mist">
                  <GitBranch size={14} />
                  <span className="font-mono text-[11px] tracking-widest uppercase">Repository slot</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mist/70 font-mono">Connect GitHub API to populate</span>
                  <Star size={14} className="text-mist/50" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
