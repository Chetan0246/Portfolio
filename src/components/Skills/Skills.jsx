import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '../../data/skills';
import s from './Skills.module.css';

const stagger = { animate: { transition: { staggerChildren: 0.06 } } };
const item = {
  initial: { opacity: 0, scale: 0.88, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
};

const ICONS = {
  'REST APIs':      '🔗',
  'Web Crypto API': '🔐',
  'IndexedDB':      '💾',
};

export default function Skills() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? skills : skills.filter(sk => sk.category === active);

  return (
    <section id="skills" className={`${s.skills} section`}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Skills &amp; <span style={{ color:'var(--blue)' }}>Technologies</span></h2>
          <div className="section-line blue" />
        </motion.div>

        {/* Tab Filter */}
        <div className={s.tabs}>
          {skillCategories.map(cat => (
            <button
              key={cat}
              className={`${s.tab} ${active === cat ? s.tabActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={s.grid}
            variants={stagger}
            initial="initial" animate="animate" exit={{ opacity: 0 }}
          >
            {filtered.map((sk) => (
              <motion.div key={sk.name} variants={item} className={s.card}>
                <div className={s.iconWrap}>
                  {sk.icon
                    ? <img src={sk.icon} alt={sk.name} className={s.icon} loading="lazy" />
                    : <span className={s.iconFallback}>{ICONS[sk.name] || '⚙'}</span>
                  }
                </div>
                <span className={s.name}>{sk.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
