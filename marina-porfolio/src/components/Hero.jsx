import './Hero.css'
import bubbleImg from '../assets/img/bubble.png'

function Bubble({ children }) {
    return (
        <div className="bubble">
            <img className="bubble-img" src={bubbleImg} alt="" aria-hidden="true" />
            <span className="bubble-text">{children}</span>
        </div>
    )
}

function Hero(){
    const moveNameGradient = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
        event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
    }

    return(
        <section className="hero-section">
            <div className="hero-text">
                <a className="hero-hello">Hello there, I'm</a>
                <span
                    className="hero-name"
                    onPointerMove={moveNameGradient}
                    onPointerLeave={(event) => event.currentTarget.style.removeProperty('--pointer-x')}
                >
                    Marina
                </span>
                <a className="hero-hello">Welcome to my corner of the internet</a>
            </div>
            <div className="hero-image">
                <img className="hero-img" src="/src/assets/img/me.JPG" alt="Hero Image" />
                <img className="arrow-img" src="/src/assets/img/arrow.png" alt="Arrow Image" />
                <Bubble>LET'S PLAY!</Bubble>
                <div className="green-rectangle"></div>
                <div className="yellow-elipse"></div>
                <div className="pink-rectangle"></div>
            </div>
            
        </section>
    )
}

export default Hero
