import BackgroundCanvas from './components/Background/BackgroundCanvas';
import Nav              from './components/Nav/Nav';
import Hero             from './components/Hero/Hero';
import About            from './components/About/About';
import Skills           from './components/Skills/Skills';
import Projects         from './components/Projects/Projects';
import Experience       from './components/Experience/Experience';
import Education        from './components/Education/Education';
import Contact          from './components/Contact/Contact';
import Footer           from './components/Footer/Footer';

export default function App() {
  return (
    <>
      {/* Fixed hybrid particle + rain canvas behind everything */}
      <BackgroundCanvas />

      {/* Sticky navigation */}
      <Nav />

      {/* Page sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
