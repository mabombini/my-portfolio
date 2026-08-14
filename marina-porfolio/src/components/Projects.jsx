import { useState } from 'react'
import './Projects.css'
import resultsScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102651.png'
import addResultScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102752.png'
import updateTeamScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102818.png'
import filteredResultsScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102901.png'
import filteredResultsScreenTwo from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102925.png'
import leaderboardScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102952.png'
import recyclerScreen from '../assets/img/recyclers-screenshots/computer-screen.png'
import miederswellScreen from '../assets/img/miederswell.png'

const screenshots = [
    { src: resultsScreen, alt: 'Competition results and event leaderboard', label: 'Results & leaderboard' },
    { src: addResultScreen, alt: 'Form for adding a competition result', label: 'Add competition result' },
    { src: updateTeamScreen, alt: 'Form for updating an existing esports team', label: 'Update team' },
    { src: filteredResultsScreen, alt: 'Competition results filtered by event and team', label: 'Filtered results' },
    { src: filteredResultsScreenTwo, alt: 'DOTA 2 event results and leaderboard', label: 'Event leaderboard' },
    { src: leaderboardScreen, alt: 'Gold Coast Esports leaderboard export screen', label: 'Leaderboard export' },
]

function GitHubIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.18 1.77 1.18 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.28-5.27-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.12 3.05a4.45 4.45 0 0 1 1.18 3.09c0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>
}

function LiveIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.41l-9.3 9.3-1.4-1.42L17.58 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
}

function ProjectLink({ href, children, live = false }) {
    return <a className="project-github" href={href} target="_blank" rel="noopener noreferrer">{live ? <LiveIcon /> : <GitHubIcon />} {children} <span aria-hidden="true">↗</span></a>
}

function EsportsGallery() {
    const [active, setActive] = useState(0)
    const previous = () => setActive((current) => (current - 1 + screenshots.length) % screenshots.length)
    const next = () => setActive((current) => (current + 1) % screenshots.length)

    return <div className="project-preview">
        <div className="preview-bar"><i /><i /><i /><span>GC Esports · {screenshots[active].label}</span></div>
        <div className="screenshot-stage">
            <img src={screenshots[active].src} alt={screenshots[active].alt} />
            <button className="gallery-arrow gallery-previous" onClick={previous} aria-label="Previous screenshot">←</button>
            <button className="gallery-arrow gallery-next" onClick={next} aria-label="Next screenshot">→</button>
        </div>
        <div className="gallery-footer">
            <span>{screenshots[active].label}</span>
            <div className="gallery-dots" aria-label="Choose screenshot">
                {screenshots.map((screenshot, index) => <button className={index === active ? 'is-active' : ''} key={screenshot.label} onClick={() => setActive(index)} aria-label={`Show ${screenshot.label}`} aria-current={index === active ? 'true' : undefined} />)}
            </div>
            <span>{String(active + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</span>
        </div>
    </div>
}

function RecyclerPreview() {
    return <div className="project-preview recycler-preview">
        <div className="preview-bar"><i /><i /><i /><span>Local Recyclers</span></div>
        <div className="screenshot-stage recycler-stage"><img src={recyclerScreen} alt="Local Recycler Contacts Windows application" /></div>
        <div className="gallery-footer"><span>Local Recycler Contacts</span><span /><span>C# / .NET 8</span></div>
    </div>
}

function IndustryPreview() {
    return <div className="project-preview industry-preview">
        <div className="preview-bar"><i /><i /><i /><span>Miederswell · Macadamia Nuts</span></div>
        <div className="screenshot-stage industry-stage"><img src={miederswellScreen} alt="Miederswell Macadamia Nuts online store" /></div>
        <div className="gallery-footer"><span>Live website</span><span /><span>React / Express</span></div>
    </div>
}

function ProjectDetails({ number, title, description, technologies, href, linkLabel, liveHref }) {
    return <div className="project-details">
        <div className="project-number">PROJECT {number} · 2025</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="technology-list" aria-label="Technologies used">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <div className="project-links">
            {liveHref && <ProjectLink href={liveHref} live>View live</ProjectLink>}
            <ProjectLink href={href}>{linkLabel}</ProjectLink>
        </div>
    </div>
}

export default function Projects() {
    return <div className="projects-content">
        <header className="projects-heading"><span>02 / SELECTED WORK</span><h2>Things I’ve built</h2></header>
        <div className="project-stack">
            <article className="project-card"><EsportsGallery /><ProjectDetails number="01" title={<>Gold Coast<br />Esports Manager</>} description="A Java desktop application for managing esports competitions. Staff can filter results, calculate leaderboards, register outcomes, maintain teams and events, and export data to CSV." technologies={['Java 21', 'Java Swing', 'MySQL', 'JDBC', 'SQL', 'NetBeans']} href="https://github.com/mabombini/java-esports" linkLabel="View repository" /></article>
            <article className="project-card recycler-card"><RecyclerPreview /><ProjectDetails number="02" title={<>Local Recyclers<br />Directory</>} description="A Windows desktop directory for local recycling services. Users can search, filter and navigate recyclers, maintain validated records, open company websites, and persist updates to CSV." technologies={['C#', '.NET 8', 'WinForms', 'CSV', 'OOP', 'Binary Search']} href="https://github.com/mabombini/c-sharp-recycler" linkLabel="View repository" /></article>
            <article className="project-card industry-card"><IndustryPreview /><ProjectDetails number="03" title={<>Miederswell<br />Macadamia Nuts</>} description="A full-stack e-commerce website for a local macadamia producer. Customers can browse products, manage their cart and account, complete checkout with PayPal, and review past orders." technologies={['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'PayPal']} href="https://github.com/mabombini/online-store-industry-project" linkLabel="View repository" liveHref="https://live-industryproject.netlify.app/" /></article>
        </div>
    </div>
}
