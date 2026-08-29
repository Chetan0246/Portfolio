import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import s from './Projects.module.css';

export default function Projects() {
  const [activeId, setActiveId] = useState(null);
  const activeProject = projects.find(p => p.id === activeId);

  return (
    <section id="projects" className={`${s.projects} section`}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-label">What I've built</p>
          <h2 className="section-title">Featured <span style={{ color:'var(--green)' }}>Projects</span></h2>
          <div className="section-line green" />
        </motion.div>

        <div className={s.grid}>
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={setActiveId} />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
      )}
    </section>
  );
}
