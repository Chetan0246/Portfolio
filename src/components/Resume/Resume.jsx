import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../hooks/useAnimations';
import s from './Resume.module.css';

const RESUME_URL = '/resume.pdf';

const highlights = [
  { icon: '🎓', label: 'Education',  value: 'B.Tech IT · VIT Vellore · 3rd Year · CGPA 8.34' },
  { icon: '⚡', label: 'Stack',      value: 'React · Next.js · Node.js · PostgreSQL · Socket.IO' },
  { icon: '🔒', label: 'Speciality', value: 'End-to-end encryption · Real-time systems · Full-stack' },
  { icon: '🏆', label: 'Academics',  value: 'Class XII — 95.3%  ·  Class X — 96.4%' },
];

export default function Resume() {
  return (
    <section id="resume" className={`${s.resume} section`}>
      <div className="container">

        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUpVariant} className="section-label">Download or preview</motion.p>
          <motion.h2 variants={fadeUpVariant} className="section-title">
            My <span style={{ color: 'var(--red)' }}>Résumé</span>
          </motion.h2>
          <motion.div variants={fadeUpVariant} className="section-line red" />
        </motion.div>

        <div className={s.layout}>

          {/* ── Left: info panel ── */}
          <motion.div
            className={s.panel}
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p variants={fadeUpVariant} className={s.tagline}>
              A snapshot of my skills, projects, and academic background — built for
              recruiters and collaborators who want the full picture at a glance.
            </motion.p>

            <div className={s.highlights}>
              {highlights.map((h) => (
                <motion.div key={h.label} variants={fadeUpVariant} className={s.highlight}>
                  <span className={s.highlightIcon} aria-hidden="true">{h.icon}</span>
                  <div>
                    <span className={s.highlightLabel}>{h.label}</span>
                    <span className={s.highlightValue}>{h.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUpVariant} className={s.actions}>
              <a
                href={RESUME_URL}
                download="Moorthy_Chetan_Resume.pdf"
                className={`btn btn-primary ${s.downloadBtn}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Open in Browser ↗
              </a>
            </motion.div>

            <motion.p variants={fadeUpVariant} className={s.updated}>
              Last updated · September 2026
            </motion.p>
          </motion.div>

          {/* ── Right: PDF embed preview ── */}
          <motion.div
            className={s.previewWrap}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Decorative corner accents */}
            <span className={`${s.corner} ${s.cornerTL}`} aria-hidden="true" />
            <span className={`${s.corner} ${s.cornerTR}`} aria-hidden="true" />
            <span className={`${s.corner} ${s.cornerBL}`} aria-hidden="true" />
            <span className={`${s.corner} ${s.cornerBR}`} aria-hidden="true" />

            <iframe
              src={`${RESUME_URL}#view=FitH&toolbar=0`}
              title="Moorthy Chetan — Résumé PDF Preview"
              className={s.pdfFrame}
              loading="lazy"
            />

            {/* Overlay CTA for mobile (iframe not great on mobile) */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={s.mobileOverlay}
              aria-label="Open résumé PDF"
            >
              <span className={s.mobileOverlayIcon}>📄</span>
              <span className={s.mobileOverlayText}>Tap to view résumé</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
