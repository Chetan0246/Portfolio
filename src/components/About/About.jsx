import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../hooks/useAnimations';
import s from './About.module.css';

const highlights = [
  { color: 'red',    icon: '🔒', title: 'Security First',
    desc: 'Passionate about cryptography and zero-knowledge systems — privacy is an architecture decision, not an afterthought.' },
  { color: 'blue',   icon: '⚡', title: 'Full-Stack Fluency',
    desc: 'Comfortable across the entire stack — React UIs, PostgreSQL schemas, REST APIs, and real-time Socket.IO backends.' },
  { color: 'green',  icon: '🔄', title: 'Real-Time Systems',
    desc: 'Experienced building synchronized multi-user applications with precise state management and server-driven logic.' },
  { color: 'yellow', icon: '📈', title: 'Always Learning',
    desc: 'Second-year student with a builder mindset — shipping real projects while studying at VIT Vellore, CGPA 8.4.' },
];

const stats = [
  { value: '8.4',  label: 'CGPA',            color: 'yellow' },
  { value: '2',    label: 'Projects Shipped', color: 'green'  },
  { value: '2nd',  label: 'Year at VIT',      color: 'blue'   },
];

export default function About() {
  return (
    <section id="about" className={`${s.about} section`}>
      <div className="container">

        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUpVariant} className="section-label">Get to know me</motion.p>
          <motion.h2 variants={fadeUpVariant} className="section-title">
            About <span>Me</span>
          </motion.h2>
          <motion.div variants={fadeUpVariant} className="section-line red" />
        </motion.div>

        {/* Intro card */}
        <motion.div
          className={s.introCard}
          variants={fadeUpVariant}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={s.introBadge}>👋</div>
          <div>
            <p className={s.introText}>
              I'm <strong>Moorthy Chetan</strong>, a Full-Stack Developer and second-year B.Tech Information
              Technology student at <strong>VIT Vellore</strong>. I build web products that are genuinely
              secure, performant, and thoughtfully designed.
            </p>
            <p className={s.introText} style={{ marginTop: 12 }}>
              My work spans real-time communication systems, cryptographic architectures, and collaborative
              tools — areas where I believe great engineering and great UX must coexist.
            </p>
          </div>
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          className={s.grid}
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {highlights.map((h) => (
            <motion.div key={h.title} variants={fadeUpVariant} className={`${s.card} ${s[h.color]}`}>
              <span className={s.cardIcon}>{h.icon}</span>
              <h3 className={s.cardTitle}>{h.title}</h3>
              <p className={s.cardDesc}>{h.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className={s.stats}
          variants={staggerContainer(0.1)}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((st) => (
            <motion.div key={st.label} variants={fadeUpVariant} className={`${s.stat} ${s[st.color]}`}>
              <span className={s.statValue}>{st.value}</span>
              <span className={s.statLabel}>{st.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
