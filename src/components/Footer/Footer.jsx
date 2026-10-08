import s from './Footer.module.css';

const NAV = [
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Profiles & Certifications' },
  { id: 'education',  label: 'Education' },
  { id: 'resume',     label: 'Résumé' },
  { id: 'contact',    label: 'Contact' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.inner} container`}>
        <div className={s.brand}>
          <span className={s.logo}>MC</span>
          <p className={s.tagline}>Building secure, real-time web products.</p>
        </div>
        <nav className={s.nav}>
          {NAV.map(({ id, label }) => (
            <button key={id} className={s.link} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
        <p className={s.copy}>© {new Date().getFullYear()} Moorthy Chetan · Crafted with React &amp; Framer Motion</p>
      </div>
    </footer>
  );
}
