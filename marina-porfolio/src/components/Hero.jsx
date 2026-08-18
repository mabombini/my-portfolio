import { useEffect, useState } from 'react'
import './Hero.css'
import bubbleImg from '../assets/img/bubble.png'
import meImg from '../assets/img/me.JPG'
import arrowImg from '../assets/img/arrow.png'
import SkillRunner from './SkillRunner'

function Bubble({ children }) {
    return (
        <div className="bubble">
            <img className="bubble-img" src={bubbleImg} alt="" aria-hidden="true" />
            <span className="bubble-text">{children}</span>
        </div>
    )
}

function Hero(){
    const [gameMessage, setGameMessage] = useState('PRESS ← → OR A / D TO PLAY')
    const [showGame, setShowGame] = useState(() => window.matchMedia('(min-width: 901px)').matches)

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width: 901px)')
        const updateGameVisibility = (event) => setShowGame(event.matches)
        desktopQuery.addEventListener('change', updateGameVisibility)
        return () => desktopQuery.removeEventListener('change', updateGameVisibility)
    }, [])

    const moveNameGradient = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
        event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
    }

    return(
        <section className="hero-section">
            {showGame && <SkillRunner onMessageChange={setGameMessage} />}
            <div className="hero-text">
                <a className="hero-hello">Hello there, I'm</a>
                <span
                    className="hero-name"
                    onPointerMove={moveNameGradient}
                    onPointerLeave={(event) => event.currentTarget.style.removeProperty('--pointer-x')}
                >
                    Marina
                </span>
                <p className="hero-hello hero-intro">Welcome to my corner of the internet.</p>
                <p className="my-tools">My tools:</p>
            </div>
            <div className="hero-image">
                <img className="hero-img" src={meImg} alt="Marina" />
                <span className="hero-opportunity-status">Open to opportunities</span>
                <img className="arrow-img" src={arrowImg} alt="" aria-hidden="true" />
                <Bubble>{gameMessage}</Bubble>
                <div className="green-rectangle"></div>
                <div className="yellow-elipse"></div>
                <div className="pink-rectangle"></div>
            </div>
            
        </section>
    )
}

export default Hero
