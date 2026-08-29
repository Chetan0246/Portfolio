import { motion } from 'framer-motion';
import { PrivChatPreview, FocusSyncPreview } from './ProjectPreview';
import ps from './Preview.module.css';
import s from './Projects.module.css';

const accentMap = { green: 'var(--green)', blue: 'var(--blue)' };
const glowMap   = { green: 'var(--green-glow)', blue: 'var(--blue-glow)' };

export default function ProjectCard({ project, onOpen }) {
  const accentColor = accentMap[project.accent];
  const glowColor   = glowMap[project.accent];

  return (
    <motion.article
      className={s.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      style={{ '--accent': accentColor, '--glow': glowColor }}
    >
      {/* Top accent bar */}
      <div className={s.topBar} style={{ background: accentColor }} />

      {/* Abstract Preview Panel */}
      <div className={`${s.preview} ${ps[project.previewType]}`}>
        {project.previewType === 'privchat'   && <PrivChatPreview />}
        {project.previewType === 'focussync'  && <FocusSyncPreview />}
      </div>

      {/* Card body */}
      <div className={s.body}>
        <div className={s.titleRow}>
          <h3 className={s.title}>{project.name}</h3>
          <span className={s.accentBadge} style={{ background: `${accentColor}20`, color: accentColor, borderColor: `${accentColor}40` }}>
            {project.accent === 'green' ? '🔒' : '🎯'}
          </span>
        </div>
        <p className={s.tagline}>{project.tagline}</p>
        <p className={s.desc}>{project.shortDesc}</p>

        {/* Tech badges */}
        <div className={s.badges}>
          {project.tech.slice(0, 5).map(t => (
            <span key={t} className={`tech-badge ${project.accent}`}>{t}</span>
          ))}
          {project.tech.length > 5 && (
            <span className={`tech-badge ${project.accent}`}>+{project.tech.length - 5}</span>
          )}
        </div>

        {/* Actions */}
        <div className={s.actions}>
          <button
            className={`btn btn-ghost ${project.accent}`}
            onClick={() => onOpen(project.id)}
          >
            View Details →
          </button>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={s.ghLink} aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
