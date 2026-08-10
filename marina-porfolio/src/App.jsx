import { useEffect, useState } from 'react'
import './App.css'
import Topbar from './components/TopBar'
import Hero from './components/Hero'
import MoveMe from './components/MoveMe'
import AboutMe from './components/AboutMe'

const collaborationWords = ['simplify', 'automate', 'solve problems']

function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % collaborationWords.length)
    }, 1800)

    return () => window.clearInterval(timer)
  }, [])

  return <span className="rotating-word" key={collaborationWords[wordIndex]}>{collaborationWords[wordIndex]}</span>
}

function App() {
  
      
return (
  <main className="portfolio-pages">
  <section className="page-section hero">
    <Topbar />
    <Hero />
    <div className="move-me-container">
      <MoveMe />
    </div>
  </section>

  <section className="page-section about-me" id="about">
    <AboutMe />
  </section>

  <section className="page-section projects" id="projects">
    <div className="section-intro">
      <span>02 / PROJECTS</span>
      <h2>Things I’ve built</h2>
      <p>A selection of projects is coming next.</p>
    </div>
  </section>

  <section className="page-section contact" id="contact">
    <div className="section-intro contact-intro">
      <span>03 / LET’S CONNECT</span>
      <h2>I love solving problems. Code is my weapon of choice.</h2>
      <p className="collaboration-line">Let’s <RotatingWord /><span className="together-line">together.</span></p>
      <div className="contact-links">
        <a className="contact-button" href="mailto:marina.bombini@example.com">Get in touch <span aria-hidden="true">↗</span></a>
        <a className="social-button" href="https://github.com/mabombini" target="_blank" rel="noopener noreferrer" aria-label="Visit Marina's GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.18 1.77 1.18 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.28-5.27-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.12 3.05a4.45 4.45 0 0 1 1.18 3.09c0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>
        </a>
        <a className="social-button" href="https://www.linkedin.com/in/marina-bombini0/" target="_blank" rel="noopener noreferrer" aria-label="Visit Marina's LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.35 7.9H1.2V21h4.15V7.9ZM3.27 1.4a2.42 2.42 0 1 0 0 4.84 2.42 2.42 0 0 0 0-4.84ZM21.8 13.5c0-3.95-2.1-5.78-4.92-5.78a4.25 4.25 0 0 0-3.86 2.12V7.9H9.04V21h4.15v-6.48c0-1.71.32-3.37 2.45-3.37 2.1 0 2.12 1.96 2.12 3.48V21h4.14l-.1-7.5Z"/></svg>
        </a>
      </div>
    </div>
  </section>
 </main>
  )
}

export default App
