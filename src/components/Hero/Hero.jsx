import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import s from './Hero.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// Static (no animation) version for reduced-motion
const staticProps = { initial: false, animate: false };

export default function Hero() {
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [tilt,  setTilt]  = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (cy - 0.5) * -13, y: (cx - 0.5) * 13 });
    setGlare({ x: cx * 100, y: cy * 100 });
  };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setGlare({ x: 50, y: 50 }); };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const animate = prefersReduced ? staticProps : {};

  return (
    <section id="hero" className={s.hero} aria-label="Introduction">
      <div className={`${s.grid} container`}>

        {/* ── Left: Text ──────────────────────────────── */}
        <div className={s.content}>
          <motion.p className={s.greeting} {...(prefersReduced ? {} : fadeUp(0.1))}>
            Hello, I'm
          </motion.p>

          <motion.h1 className={s.name} {...(prefersReduced ? {} : fadeUp(0.2))}>
            Moorthy<br />
            <span className={s.nameAccent}>Chetan</span>
          </motion.h1>

          <motion.div className={s.roleRow} {...(prefersReduced ? {} : fadeUp(0.32))}>
            <span className={s.roleDot} aria-hidden="true" />
            <p className={s.role}>Full-Stack Developer</p>
          </motion.div>

          <motion.p className={s.tagline} {...(prefersReduced ? {} : fadeUp(0.42))}>
            "Building secure, real-time web products that matter."
          </motion.p>

          <motion.p className={s.bio} {...(prefersReduced ? {} : fadeUp(0.5))}>
            Third-year B.Tech IT student at VIT Vellore — crafting performant,
            secure, and user-focused web applications with React, Node.js, and PostgreSQL.
          </motion.p>

          <motion.div className={s.ctas} {...(prefersReduced ? {} : fadeUp(0.6))}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('contact')}>
              Contact Me
            </button>
          </motion.div>

          <motion.div className={s.socials} {...(prefersReduced ? {} : fadeUp(0.7))}>
            <SocialLink href="https://github.com/Chetan0246"                                     label="GitHub (opens in new tab)"   icon="github"   external />
            <SocialLink href="https://www.linkedin.com/in/moorthy-chetan-38a176325" label="LinkedIn (opens in new tab)" icon="linkedin" external />
            <SocialLink href="mailto:moorthychetan06@gmail.com"       label="Send email"                  icon="mail"     />
          </motion.div>
        </div>

        {/* ── Right: Profile Card (desktop/tablet) ─────── */}
        <motion.div
          className={s.cardWrap}
          initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
          animate={prefersReduced ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`${s.deco} ${s.decoTL}`} aria-hidden="true" />
          <span className={`${s.deco} ${s.decoTR}`} aria-hidden="true" />
          <span className={`${s.deco} ${s.decoBL}`} aria-hidden="true" />
          <span className={`${s.deco} ${s.decoBR}`} aria-hidden="true" />

          <div
            ref={cardRef}
            className={s.profileCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: prefersReduced ? undefined : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <div className={s.glare} aria-hidden="true"
              style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)` }}
            />
            <div className={s.photoWrap}>
              <img src="/profile.jpg" alt="Moorthy Chetan — Full-Stack Developer" className={s.photo} />
            </div>
            <div className={s.cardInfo}>
              <span className={s.cardName}>Moorthy Chetan</span>
              <span className={s.cardRole}>Full-Stack Developer</span>
              <div className={s.cardDots} aria-hidden="true">
                <span style={{ background: 'var(--red)' }} />
                <span style={{ background: 'var(--green)' }} />
                <span style={{ background: 'var(--yellow)' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Compact mobile card (below text, visible only <480px) ── */}
      <div className={s.mobileCard}>
        <img src="/profile.jpg" alt="Moorthy Chetan" className={s.mobilePhoto} />
        <div className={s.mobileCardInfo}>
          <span className={s.mobileCardName}>Moorthy Chetan</span>
          <span className={s.mobileCardRole}>Full-Stack Developer</span>
        </div>
      </div>

      {/* Scroll indicator */}
      {!prefersReduced && (
        <motion.div
          className={s.scrollHint}
          aria-hidden="true"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className={s.scrollLine} />
          <span>scroll</span>
        </motion.div>
      )}
    </section>
  );
}

function SocialLink({ href, label, icon, external }) {
  const icons = {
    github:   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></>,
    mail:     <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
  };
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={s.socialBtn}
      aria-label={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[icon]}
      </svg>
    </a>
  );
}
