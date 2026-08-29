import { motion } from 'framer-motion';
import { education } from '../../data/experience';
import { fadeUpVariant, scaleInVariant } from '../../hooks/useAnimations';
import s from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className={`${s.edu} section`}>
      <div className="container">

        {/* Heading */}
        <motion.div
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p variants={fadeUpVariant} className="section-label">Academic background</motion.p>
          <motion.h2 variants={fadeUpVariant} className="section-title">
            My <span style={{ color: 'var(--yellow)' }}>Education</span>
          </motion.h2>
          <motion.div variants={fadeUpVariant} className="section-line yellow" />
        </motion.div>

        {/* Card */}
        <motion.div
          className={s.card}
          variants={scaleInVariant}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={s.timeline}>
            <div className={s.dot} />
            <div className={s.line} />
          </div>

          <div className={s.body}>
            <div className={s.header}>
              <div>
                <h3 className={s.institution}>{education.institution}</h3>
                <p className={s.degree}>{education.degree}</p>
              </div>
              <div className={s.meta}>
                <span className="tech-badge yellow">{education.period}</span>
                <div className={s.cgpa}>
                  <span className={s.cgpaValue}>{education.cgpa}</span>
                  <span className={s.cgpaLabel}>CGPA</span>
                </div>
              </div>
            </div>

            <p className={s.location}>📍 {education.location}</p>

            <div className={s.tags}>
              <span className="tech-badge">Information Technology</span>
              <span className="tech-badge">B.Tech</span>
              <span className="tech-badge yellow">CGPA {education.cgpa}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
