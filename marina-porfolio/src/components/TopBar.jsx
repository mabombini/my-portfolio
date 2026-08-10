import './TopBar.css'

function TopBar() {
    return(
    <nav>

    <div className="logo">
        <strong>MARINA BOMBINI</strong> / Full Stack Developer
    </div>

    <div className="links">
        <a href="https://www.linkedin.com/in/marina-bombini0/" target="_blank" rel="noopener noreferrer">
            +LINKEDIN
        </a>
        <a href="https://github.com/mabombini" target="_blank" rel="noopener noreferrer">
            +GITHUB
        </a>
        <a href="mailto:marina.bombini@example.com">
            +CONTACT ME
        </a>
    </div>

    </nav>
    )
}

export default TopBar