import { motion } from 'framer-motion';
import { certifications, codingProfiles, achievements } from '../../data/experience';
import s from './Experience.module.css';

/* ── Animation variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Platform icons (inline SVG paths) ─────────────────────── */
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LeetCodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const ICON_MAP = { github: GitHubIcon, leetcode: LeetCodeIcon };

/* ── Placeholder card (empty state) ────────────────────────── */
function PlaceholderCard({ label, wide = false }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`${s.placeholder} ${wide ? s.placeholderWide : ''}`}
    >
      <span className={s.placeholderPlus}>+</span>
      <span className={s.placeholderLabel}>{label}</span>
    </motion.div>
  );
}

/* ── Sub-section wrapper ────────────────────────────────────── */
function SubSection({ title, color = 'red', children }) {
  return (
    <div className={s.subSection}>
      <div className={s.subHeader}>
        <span className={`${s.subDot} ${s[color]}`} />
        <h3 className={s.subTitle}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Experience() {
  return (
    <section id="experience" className={`${s.experience} section`}>
      <div className="container">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Track record</p>
          <h2 className="section-title">
            Experience &amp; <span style={{ color: 'var(--red)' }}>Achievements</span>
          </h2>
          <div className="section-line red" />
        </motion.div>

        {/* ── Coding Profiles ─────────────────────────────── */}
        <SubSection title="Coding Profiles" color="blue">
          <motion.div
            className={s.profileGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {codingProfiles.map((p) => {
              const Icon = ICON_MAP[p.icon] || null;
              return (
                <motion.a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  className={`${s.profileCard} ${s[p.color]}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className={s.profileIconWrap}>
                    {Icon && <Icon />}
                  </div>
                  <div className={s.profileText}>
                    <span className={s.profileName}>{p.name}</span>
                    <span className={s.profileHandle}>{p.handle}</span>
                    <span className={s.profileDesc}>{p.description}</span>
                  </div>
                  <span className={s.profileArrow}>↗</span>
                </motion.a>
              );
            })}
            <PlaceholderCard label="Add a profile" />
          </motion.div>
        </SubSection>

        {/* ── Certifications ──────────────────────────────── */}
        <SubSection title="Certifications" color="yellow">
          <motion.div
            className={s.certGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certifications.length > 0 ? (
              certifications.map((c) => (
                <motion.div key={c.id} variants={cardVariants} className={s.certCard}>
                  <span className={s.certIcon}>📜</span>
                  <span className={s.certTitle}>{c.title}</span>
                  <span className={s.certIssuer}>{c.issuer}</span>
                  <span className={`tech-badge ${c.color || 'yellow'}`}>{c.year}</span>
                </motion.div>
              ))
            ) : (
              <PlaceholderCard label="Add your certifications here" />
            )}
          </motion.div>
        </SubSection>

        {/* ── Hackathons & Awards ──────────────────────────── */}
        <SubSection title="Hackathons &amp; Awards" color="red">
          <motion.div
            className={s.achList}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {achievements.length > 0 ? (
              achievements.map((a) => (
                <motion.div key={a.id} variants={cardVariants} className={s.achCard}>
                  <div className={s.achIconWrap}>🏆</div>
                  <div className={s.achBody}>
                    <span className={s.achTitle}>{a.title}</span>
                    <span className={s.achMeta}>{a.position} · {a.org} · {a.year}</span>
                    {a.desc && <span className={s.achDesc}>{a.desc}</span>}
                  </div>
                  <span className="tech-badge red">{a.position}</span>
                </motion.div>
              ))
            ) : (
              <PlaceholderCard label="Add hackathons &amp; awards here" wide />
            )}
          </motion.div>
        </SubSection>

      </div>
    </section>
  );
}
