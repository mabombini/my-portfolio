import './App.css'
import Topbar from './components/TopBar'
import Hero from './components/Hero'
import MoveMe from './components/MoveMe'

function App() {
  
      
return (
  <>
  <section className="hero">
    <Topbar />
    <Hero />
    <div className="move-me-container">
      <MoveMe />
    </div>
  </section>

  <section className="about-me">

  </section>
 </> 
  )
}

export default App
