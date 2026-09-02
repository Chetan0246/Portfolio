import s from './Footer.module.css';

const NAV = ['About','Skills','Projects','Experience','Education','Résumé','Contact'];
const scrollTo = id => document.getElementById(id === 'Résumé' ? 'resume' : id.toLowerCase())?.scrollIntoView({ behavior:'smooth' });

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.inner} container`}>
        <div className={s.brand}>
          <span className={s.logo}>MC</span>
          <p className={s.tagline}>Building secure, real-time web products.</p>
        </div>
        <nav className={s.nav}>
          {NAV.map(n => (
            <button key={n} className={s.link} onClick={() => scrollTo(n)}>{n}</button>
          ))}
        </nav>
        <p className={s.copy}>© {new Date().getFullYear()} Moorthy Chetan · Crafted with React &amp; Framer Motion</p>
      </div>
    </footer>
  );
}
