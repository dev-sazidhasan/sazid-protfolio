import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-3xl bg-surface-container-lowest/50 backdrop-blur-md border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <span className="text-2xl text-primary font-bold">Sazid Hasan</span>
          <p className="text-on-surface-variant text-sm">© 2026 Sazid Hasan — Protfolio</p>
        </div>
        <div className="flex gap-8">
          {['LinkedIn', 'GitHub', 'Twitter', 'Resume'].map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ y: -2, color: 'var(--color-primary)' }}
              className="text-on-surface-variant transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
