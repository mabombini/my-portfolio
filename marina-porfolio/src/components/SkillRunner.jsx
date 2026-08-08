import { useCallback, useEffect, useRef, useState } from 'react'
import './SkillRunner.css'

import reactBlack from '../assets/icons/react-black.svg'
import reactColor from '../assets/icons/react-color.svg'
import jsBlack from '../assets/icons/js-black.svg'
import jsColor from '../assets/icons/js-color.svg'
import htmlBlack from '../assets/icons/html-black.svg'
import htmlColor from '../assets/icons/html-color.svg'
import cssBlack from '../assets/icons/css-black.svg'
import cssColor from '../assets/icons/css-color.svg'
import mongodbBlack from '../assets/icons/mongodb-black.svg'
import mongodbColor from '../assets/icons/mongodb-color.svg'
import csharpBlack from '../assets/icons/csharp-black.svg'
import csharpColor from '../assets/icons/csharp-color.svg'

const SKILLS = [
    { id: 'react', label: 'React', black: reactBlack, color: reactColor },
    { id: 'javascript', label: 'JavaScript', black: jsBlack, color: jsColor },
    { id: 'html', label: 'HTML', black: htmlBlack, color: htmlColor },
    { id: 'css', label: 'CSS', black: cssBlack, color: cssColor },
    { id: 'mongodb', label: 'MongoDB', black: mongodbBlack, color: mongodbColor },
    { id: 'csharp', label: 'C#', black: csharpBlack, color: csharpColor },
]

const PLAYER_WIDTH = 28
const PLAYER_HEIGHT = 18
const FLOOR_OFFSET = 42

export default function SkillRunner({ onMessageChange }) {
    const arenaRef = useRef(null)
    const playerXRef = useRef(0.5)
    const livesRef = useRef(3)
    const collectedRef = useRef(new Set())
    const keysRef = useRef({ left: false, right: false })
    const nextIdRef = useRef(1)
    const resetTimerRef = useRef(null)

    const [playerX, setPlayerX] = useState(0.5)
    const [drops, setDrops] = useState([])
    const [lives, setLives] = useState(3)
    const [collected, setCollected] = useState([])
    const [gameState, setGameState] = useState('playing')

    const announce = useCallback((message) => {
        onMessageChange?.(message)
    }, [onMessageChange])

    const resetGame = useCallback(() => {
        window.clearTimeout(resetTimerRef.current)
        playerXRef.current = 0.5
        livesRef.current = 3
        collectedRef.current = new Set()
        setPlayerX(0.5)
        setLives(3)
        setCollected([])
        setDrops([])
        setGameState('playing')
        announce('CATCH MY SKILLS!  ← → OR A / D')
    }, [announce])

    useEffect(() => {
        announce('CATCH MY SKILLS!  ← → OR A / D')
    }, [announce])

    useEffect(() => {
        const keyChange = (pressed) => (event) => {
            const key = event.key.toLowerCase()
            if (key === 'arrowleft' || key === 'a') {
                keysRef.current.left = pressed
                event.preventDefault()
            }
            if (key === 'arrowright' || key === 'd') {
                keysRef.current.right = pressed
                event.preventDefault()
            }
        }
        const down = keyChange(true)
        const up = keyChange(false)
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        return () => {
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
        }
    }, [])

    useEffect(() => {
        if (gameState !== 'playing') return

        let animationFrame
        let lastTime = performance.now()
        let obstacleClock = 0
        let skillClock = 0

        const spawn = (type) => {
            const skill = type === 'skill'
                ? SKILLS[Math.floor(Math.random() * SKILLS.length)]
                : null
            setDrops((current) => [
                ...current,
                {
                    id: nextIdRef.current++,
                    type,
                    skill,
                    x: 0.06 + Math.random() * 0.88,
                    y: -60,
                    size: type === 'skill' ? 62 : 18 + Math.random() * 20,
                    speed: type === 'skill' ? 175 : 210 + Math.random() * 90,
                    shape: Math.floor(Math.random() * 3),
                },
            ])
        }

        const tick = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.04)
            lastTime = time
            const arena = arenaRef.current
            if (!arena) return
            const width = arena.clientWidth
            const height = arena.clientHeight

            const direction = Number(keysRef.current.right) - Number(keysRef.current.left)
            if (direction) {
                playerXRef.current = Math.max(0.035, Math.min(0.965, playerXRef.current + direction * dt * 0.62))
                setPlayerX(playerXRef.current)
            }

            obstacleClock += dt
            skillClock += dt
            if (obstacleClock > 0.6) {
                obstacleClock = 0
                spawn('obstacle')
            }
            if (skillClock > 1.4) {
                skillClock = 0
                const remaining = SKILLS.filter((skill) => !collectedRef.current.has(skill.id))
                if (remaining.length) {
                    const skill = remaining[Math.floor(Math.random() * remaining.length)]
                    setDrops((current) => [...current, {
                        id: nextIdRef.current++, type: 'skill', skill,
                        x: 0.06 + Math.random() * 0.88, y: -60, size: 62, speed: 175,
                    }])
                }
            }

            const playerCenter = playerXRef.current * width
            const playerTop = height - FLOOR_OFFSET - PLAYER_HEIGHT
            const playerLeft = playerCenter - PLAYER_WIDTH / 2
            const playerRight = playerCenter + PLAYER_WIDTH / 2

            setDrops((current) => {
                const next = []
                let wasHit = false
                for (const drop of current) {
                    const moved = { ...drop, y: drop.y + drop.speed * dt }
                    const visualSize = drop.type === 'skill' ? 42 : drop.size
                    const center = drop.x * width
                    const overlaps = center - visualSize / 2 < playerRight
                        && center + visualSize / 2 > playerLeft
                        && moved.y + visualSize > playerTop
                        && moved.y < playerTop + PLAYER_HEIGHT

                    if (overlaps && drop.type === 'skill') {
                        if (!collectedRef.current.has(drop.skill.id)) {
                            const updated = new Set(collectedRef.current).add(drop.skill.id)
                            collectedRef.current = updated
                            setCollected([...updated])
                            if (updated.size === SKILLS.length) {
                                setGameState('won')
                                announce('YOU WIN! ALL SKILLS COLLECTED!')
                            } else {
                                announce(`${drop.skill.label.toUpperCase()} CAUGHT!`)
                            }
                        }
                        continue
                    }
                    if (overlaps && drop.type === 'obstacle' && !wasHit) {
                        wasHit = true
                        const nextLives = Math.max(0, livesRef.current - 1)
                        livesRef.current = nextLives
                        setLives(nextLives)
                        if (nextLives === 0) {
                            setGameState('over')
                            announce('GAME OVER — TRY AGAIN!')
                            resetTimerRef.current = window.setTimeout(resetGame, 1800)
                        } else {
                            announce(`OUCH! ${nextLives} ${nextLives === 1 ? 'LIFE' : 'LIVES'} LEFT`)
                        }
                        continue
                    }
                    if (moved.y < height + 70) next.push(moved)
                }
                return next
            })

            animationFrame = requestAnimationFrame(tick)
        }

        animationFrame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(animationFrame)
    }, [announce, gameState, resetGame])

    useEffect(() => () => window.clearTimeout(resetTimerRef.current), [])

    return (
        <div className="skill-runner" ref={arenaRef} aria-label="Skill Runner game">
            <div className="runner-lives" aria-label={`${lives} lives remaining`}>
                {[0, 1, 2].map((heart) => (
                    <span className={heart < lives ? 'life active' : 'life'} key={heart}>♥</span>
                ))}
            </div>

            {drops.map((drop) => drop.type === 'skill' ? (
                <img
                    className="falling-skill"
                    key={drop.id}
                    src={drop.skill.color}
                    alt={drop.skill.label}
                    style={{ left: `${drop.x * 100}%`, top: drop.y, width: drop.size }}
                />
            ) : (
                <span
                    className={`runner-obstacle shape-${drop.shape}`}
                    key={drop.id}
                    style={{ left: `${drop.x * 100}%`, top: drop.y, width: drop.size, height: drop.size }}
                />
            ))}

            <div className="runner-player" style={{ left: `${playerX * 100}%` }} aria-label="player" />

            <div className="skill-shelf" aria-label="Skills collected">
                {SKILLS.map((skill) => {
                    const active = collected.includes(skill.id)
                    return (
                        <div className={`shelf-item ${active ? 'collected' : ''}`} key={skill.id}>
                            <img src={active ? skill.color : skill.black} alt={skill.label} />
                            <span>{skill.label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
