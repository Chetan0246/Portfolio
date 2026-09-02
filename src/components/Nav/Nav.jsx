import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import s from './Nav.module.css';

const NAV_LINKS = [
  { id: 'hero',       label: 'Home',       dot: 'blue'   },
  { id: 'about',      label: 'About',      dot: 'red'    },
  { id: 'skills',     label: 'Skills',     dot: 'blue'   },
  { id: 'projects',   label: 'Projects',   dot: 'green'  },
  { id: 'experience', label: 'Experience', dot: 'red'    },
  { id: 'education',  label: 'Education',  dot: 'yellow' },
  { id: 'resume',     label: 'Résumé',     dot: 'red'    },
  { id: 'contact',    label: 'Contact',    dot: 'yellow' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const activeId = useScrollSpy(NAV_LINKS.map(l => l.id));

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close drawer on Escape key
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  }, [open]);
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const close = () => setOpen(false);

  const scrollTo = (id) => {
    close();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      {/* Skip to main content — first focusable element for keyboard users */}
      <a href="#main-content" className={s.skipLink}>Skip to main content</a>

      <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
        <nav className={`${s.nav} container`} aria-label="Primary navigation">
          <button className={s.logo} onClick={() => scrollTo('hero')} aria-label="Go to top">
            <span>M</span><span>C</span>
          </button>

          <ul className={s.links} role="list">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`${s.link} ${activeId === id ? s.active : ''}`}
                  onClick={() => scrollTo(id)}
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      className={s.activeDot}
                      layoutId="nav-dot"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`${s.hamburger} ${open ? s.hamOpen : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={s.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-drawer"
              className={s.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              aria-label="Mobile navigation menu"
              role="navigation"
            >
              <div className={s.drawerHeader}>
                <span className={s.drawerLogo} aria-hidden="true">MC</span>
                <button
                  className={s.drawerClose}
                  onClick={close}
                  aria-label="Close navigation menu"
                >
                  ✕
                </button>
              </div>
              <ul className={s.drawerLinks} role="list">
                {NAV_LINKS.map(({ id, label, dot }, idx) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.055, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      className={`${s.drawerLink} ${activeId === id ? s.drawerActive : ''}`}
                      onClick={() => scrollTo(id)}
                      aria-current={activeId === id ? 'page' : undefined}
                    >
                      <span className={`${s.drawerDot} ${s[dot]}`} aria-hidden="true" />
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
