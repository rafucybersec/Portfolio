import AppLayout from '../components/AppLayout'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Certifications from '../components/Certifications'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Insights from '../components/Insights'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import PasswordAnalyzer from '../components/PasswordAnalyzer'
import Terminal from '../components/Terminal'

export default function Home() {
  return (
    <AppLayout>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Projects />
      <Insights />
      <PasswordAnalyzer />
      
      <section id="interactive" className="py-20 relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white font-satoshi">
            Interactive <span className="text-cyber-green">Terminal</span>
          </h2>
          <p className="text-white text-center mb-8 font-satoshi text-sm">
            Try commands like <code className="text-cyber-green bg-white/5 px-1.5 py-0.5 rounded">help</code>, <code className="text-cyber-green bg-white/5 px-1.5 py-0.5 rounded">whoami</code>, or <code className="text-cyber-green bg-white/5 px-1.5 py-0.5 rounded">skills</code>
          </p>
          <div className="max-w-3xl mx-auto">
            <Terminal />
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </AppLayout>
  )
}
