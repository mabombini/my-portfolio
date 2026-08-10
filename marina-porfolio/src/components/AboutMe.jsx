import { useRef, useState } from 'react'
import './AboutMe.css'
import profileImage from '../assets/img/me.JPG'

const aboutText = `I am an entry-level professional who recently graduated from TAFE QLD with a Diploma of Advanced Programming.

I was first introduced to programming at a young age and studied an Associate Degree in IT during high school (2009–2010). At the time, I didn’t consider IT as a career path, so I pursued a Bachelor’s degree in Civil Engineering after finishing school. During this degree, I developed strong skills in logic, problem-solving, and critical thinking, along with valuable soft and life skills.

I moved to Australia in 2019 and have been working in the cleaning industry since then. Always striving to grow and take the next step, I started and have been running my own business. While building solutions and implementing automation for my day-to-day business operations, I rediscovered my passion for programming.

Through my experience living in Australia and managing my own business, including employing others, I have developed critical skills that cannot be easily taught: great customer service, resilience, determination, a strong willingness to learn, reliability, accountability, organisation, and dedication. Most importantly, I genuinely care about everything I do and the quality of my work. I find great satisfaction in delivering successful outcomes and always consider how my work contributes to the bigger picture. I am collaborative by nature, enjoy being part of a team, and value both giving and receiving support to achieve shared goals.

With that said, I believe I would be a valuable addition to your team. While I still have much to learn, I am a fast learner with a can-do attitude who strives to bring solutions rather than problems. I am truly excited about the opportunity to dedicate myself full-time to a career I am passionate about.`

function PostActions() {
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const addComment = (event) => {
        event.preventDefault()
        const value = comment.trim()
        if (!value) return
        setComments((current) => [...current, value])
        setComment('')
    }

    return (
        <div className="post-interactions">
            <div className="post-buttons">
                <button className={liked ? 'post-button is-liked' : 'post-button'} onClick={() => setLiked(!liked)} aria-pressed={liked}>
                    <span aria-hidden="true">{liked ? '♥' : '♡'}</span> {liked ? 'Liked' : 'Like'}
                </button>
                <label className="post-button" htmlFor={`comment-${comments.length}`}><span aria-hidden="true">◇</span> Comment</label>
            </div>
            {comments.length > 0 && (
                <div className="comments-list">
                    {comments.map((item, index) => <p key={`${item}-${index}`}><strong>Guest</strong> {item}</p>)}
                </div>
            )}
            <form className="comment-form" onSubmit={addComment}>
                <span className="comment-avatar" aria-hidden="true">G</span>
                <input id={`comment-${comments.length}`} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a comment…" aria-label="Write a comment" />
                <button type="submit" aria-label="Post comment">↑</button>
            </form>
        </div>
    )
}

function AboutMe(){
    const [expanded, setExpanded] = useState(false)
    const feedRef = useRef(null)

    const updateTimeline = () => {
        const feed = feedRef.current
        if (!feed) return
        const available = feed.scrollHeight - feed.clientHeight
        const progress = available > 0 ? feed.scrollTop / available : 1
        feed.style.setProperty('--timeline-progress', progress)
    }

    return(
        <div className="about-me-container">
            <div className="social-window">
                <aside className="profile-card">
                    <div className="profile-photo-wrap"><img src={profileImage} alt="Marina Bombini" /></div>
                    <h2>Marina Bombini</h2>
                    <p><span aria-hidden="true">⌖</span> Gold Coast, Australia</p>
                    <span className="profile-status">Open to opportunities</span>
                </aside>

                <main className="social-feed" ref={feedRef} onScroll={updateTimeline}>
                    <header className="feed-heading">
                        <p>MY STORY</p>
                        <h2>Life lately</h2>
                    </header>
                    <div className="timeline" aria-hidden="true"><span /></div>

                    <article className="social-post">
                        <span className="timeline-icon" aria-hidden="true">✦</span>
                        <div className="post-header">
                            <img src={profileImage} alt="" />
                            <div><strong>Marina Bombini</strong><span>About me · Now</span></div>
                        </div>
                        <div className={expanded ? 'post-copy is-expanded' : 'post-copy'}>
                            {aboutText.split('\n\n').map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
                        </div>
                        <button className="see-more" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
                            {expanded ? 'See less' : 'See more'}
                        </button>
                        <PostActions />
                    </article>

                    <article className="social-post life-update">
                        <span className="timeline-icon" aria-hidden="true">⌁</span>
                        <div className="post-header">
                            <img src={profileImage} alt="" />
                            <div><strong>Marina Bombini</strong><span>Life update · December 2025</span></div>
                        </div>
                        <div className="update-banner"><span aria-hidden="true">🎓</span><p>Graduated with a Diploma of Advanced Programming from <strong>TAFE Queensland</strong></p></div>
                        <PostActions />
                    </article>

                    <article className="social-post life-update">
                        <span className="timeline-icon" aria-hidden="true">⌖</span>
                        <div className="post-header">
                            <img src={profileImage} alt="" />
                            <div><strong>Marina Bombini</strong><span>Life update · 2019</span></div>
                        </div>
                        <div className="update-banner move-banner"><span aria-hidden="true">✈</span><p>Moved from <strong>Brazil</strong> to <strong>Australia</strong></p></div>
                        <PostActions />
                    </article>
                </main>
            </div>
        </div>
    )
}

export default AboutMe
