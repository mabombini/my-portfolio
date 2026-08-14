import './TopBar.css'

function TopBar() {
    return(
    <nav className="topbar" aria-label="Primary navigation">

    <div className="logo">
        <strong>MARINA BOMBINI</strong> / Full Stack Developer
    </div>

    <div className="topbar-links">
        <a href="https://www.linkedin.com/in/marina-bombini0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.35 7.9H1.2V21h4.15V7.9ZM3.27 1.4a2.42 2.42 0 1 0 0 4.84 2.42 2.42 0 0 0 0-4.84ZM21.8 13.5c0-3.95-2.1-5.78-4.92-5.78a4.25 4.25 0 0 0-3.86 2.12V7.9H9.04V21h4.15v-6.48c0-1.71.32-3.37 2.45-3.37 2.1 0 2.12 1.96 2.12 3.48V21h4.14l-.1-7.5Z"/></svg>
            <span>+LINKEDIN</span>
        </a>
        <a href="https://github.com/mabombini" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.18 1.77 1.18 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.28-5.27-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.12 3.05a4.45 4.45 0 0 1 1.18 3.09c0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>
            <span>+GITHUB</span>
        </a>
        <a href="mailto:marina.bombini@example.com" aria-label="Email Marina">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm9 8.3L20.2 7H3.8l8.2 5.3ZM3 18h18V9.3l-8.46 5.47a1 1 0 0 1-1.08 0L3 9.3V18Z"/></svg>
            <span>+CONTACT ME</span>
        </a>
    </div>

    </nav>
    )
}

export default TopBar
