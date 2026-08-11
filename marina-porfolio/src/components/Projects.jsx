import { useState } from 'react'
import './Projects.css'
import resultsScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102651.png'
import addResultScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102752.png'
import updateTeamScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102818.png'
import filteredResultsScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102901.png'
import filteredResultsScreenTwo from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102925.png'
import leaderboardScreen from '../assets/img/esports-screenshots/Screenshot 2026-08-11 102952.png'

const technologies = ['Java 21', 'Java Swing', 'MySQL', 'JDBC', 'SQL', 'NetBeans']
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

export default function Projects() {
    const [activeScreenshot, setActiveScreenshot] = useState(0)
    const showPrevious = () => setActiveScreenshot((current) => (current - 1 + screenshots.length) % screenshots.length)
    const showNext = () => setActiveScreenshot((current) => (current + 1) % screenshots.length)

    return (
        <div className="projects-content">
            <header className="projects-heading">
                <span>02 / SELECTED WORK</span>
                <h2>Things I’ve built</h2>
            </header>

            <article className="project-card">
                <div className="project-preview">
                    <div className="preview-bar"><i /><i /><i /><span>GC Esports · {screenshots[activeScreenshot].label}</span></div>
                    <div className="screenshot-stage">
                        <img src={screenshots[activeScreenshot].src} alt={screenshots[activeScreenshot].alt} />
                        <button className="gallery-arrow gallery-previous" onClick={showPrevious} aria-label="Previous screenshot">←</button>
                        <button className="gallery-arrow gallery-next" onClick={showNext} aria-label="Next screenshot">→</button>
                    </div>
                    <div className="gallery-footer">
                        <span>{screenshots[activeScreenshot].label}</span>
                        <div className="gallery-dots" aria-label="Choose screenshot">
                            {screenshots.map((screenshot, index) => (
                                <button className={index === activeScreenshot ? 'is-active' : ''} key={screenshot.label} onClick={() => setActiveScreenshot(index)} aria-label={`Show ${screenshot.label}`} aria-current={index === activeScreenshot ? 'true' : undefined} />
                            ))}
                        </div>
                        <span>{String(activeScreenshot + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="project-details">
                    <div className="project-number">PROJECT 01 · 2025</div>
                    <h3>Gold Coast<br />Esports Manager</h3>
                    <p>A Java desktop application for managing esports competitions. Staff can browse and filter results, calculate event leaderboards, register competition outcomes, add events and teams, update team details, and export data to CSV.</p>
                    <ul className="technology-list" aria-label="Technologies used">
                        {technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                    <a className="project-github" href="https://github.com/mabombini" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon /> GitHub profile <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </article>
        </div>
    )
}
