import { profile } from '../data/config'

export default function Footer() {
  return (
    <footer className="px-6 sm:px-10 lg:px-20 py-10 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] tracking-widest uppercase text-mist">
          {profile.name} © {new Date().getFullYear()}
        </p>
        <p className="font-mono text-[11px] tracking-widest uppercase text-mist/60">
          Built with React · Framer Motion
        </p>
      </div>
    </footer>
  )
}
