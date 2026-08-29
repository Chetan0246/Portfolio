import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import s from './ProjectModal.module.css';

const sV = { hidden:{opacity:0,y:14}, show:{opacity:1,y:0,transition:{duration:0.4,ease:[0.22,1,0.36,1]}} };
const cV = { hidden:{}, show:{transition:{staggerChildren:0.08,delayChildren:0.15}} };

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);
  const handleKey = useCallback((e) => { if (e.key==='Escape') onClose(); }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtnRef.current?.focus(), 80);
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow=''; };
  }, [handleKey]);

  const accent = project.accent==='green' ? 'var(--green)' : 'var(--blue)';
  const glow   = project.accent==='green' ? 'var(--green-glow)' : 'var(--blue-glow)';
  const dim    = project.accent==='green' ? 'var(--green-dim)' : 'var(--blue-dim)';
  const label  = project.accent==='green' ? '🔒 Security' : '🎯 Productivity';

  return createPortal(
    <AnimatePresence>
      <motion.div className={s.overlay}
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}}
        onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
      >
        <motion.div className={s.modal}
          role="dialog" aria-modal="true" aria-labelledby="modal-title"
          initial={{opacity:0,scale:0.94,y:24}} animate={{opacity:1,scale:1,y:0}}
          exit={{opacity:0,scale:0.94,y:24}}
          transition={{type:'spring',stiffness:360,damping:30}}
          style={{'--accent':accent,'--glow':glow,'--dim':dim}}
        >
          {/* Header */}
          <div className={s.header}>
            <div className={s.accentBar} style={{background:accent}} />
            <div className={s.headerInner}>
              <div>
                <span className={s.badge} style={{background:dim,color:accent,borderColor:`${accent}40`}}>{label}</span>
                <h2 id="modal-title" className={s.title}>{project.name}</h2>
                <p className={s.tagline}>{project.tagline}</p>
              </div>
              <button ref={closeBtnRef} className={s.closeBtn} onClick={onClose} aria-label="Close modal">✕</button>
            </div>
          </div>

          {/* Body */}
          <motion.div className={s.body} variants={cV} initial="hidden" animate="show">

            <motion.div variants={sV} className={s.section}>
              <h3 className={s.sectionTitle} style={{color:accent}}>Overview</h3>
              <p className={s.text}>{project.shortDesc}</p>
            </motion.div>
            <div className={s.divider} style={{background:`${accent}18`}} />

            <motion.div variants={sV} className={s.section}>
              <h3 className={s.sectionTitle} style={{color:accent}}>Key Features</h3>
              <ul className={s.featureList}>
                {project.highlights.map((h,i)=>(
                  <li key={i} className={s.featureItem}>
                    <span className={s.featureDot} style={{background:accent,boxShadow:`0 0 6px ${glow}`}} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className={s.divider} style={{background:`${accent}18`}} />

            <motion.div variants={sV} className={s.section}>
              <h3 className={s.sectionTitle} style={{color:accent}}>Architecture Note</h3>
              <blockquote className={s.quote} style={{borderColor:accent,background:dim}}>
                <span className={s.quoteIcon} style={{color:accent}}>"</span>
                {project.architecture}
              </blockquote>
            </motion.div>
            <div className={s.divider} style={{background:`${accent}18`}} />

            <motion.div variants={sV} className={s.section}>
              <h3 className={s.sectionTitle} style={{color:accent}}>Tech Stack</h3>
              <div className={s.badges}>
                {project.tech.map(t=><span key={t} className={`tech-badge ${project.accent}`}>{t}</span>)}
              </div>
            </motion.div>

            {(project.github||project.live) && (
              <motion.div variants={sV} className={s.links}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={`btn btn-ghost ${project.accent}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    View on GitHub
                  </a>
                )}
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo ↗</a>}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
