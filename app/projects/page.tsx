import type { Metadata } from 'next'
import AppLayout from '../../components/AppLayout'
import Navbar from '../../components/Navbar'
import Projects from '../../components/Projects'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Cybersecurity projects by Muhammad Rafay Ali — SIEM automation tools, threat detection systems, security dashboards, and open-source security utilities.',
  openGraph: {
    title: 'Projects | Muhammad Rafay Ali',
    description: 'Cybersecurity projects by Muhammad Rafay Ali — SIEM automation tools, threat detection systems, security dashboards, and open-source security utilities.',
    url: 'https://rafucybersec.vercel.app/projects',
  },
  alternates: {
    canonical: 'https://rafucybersec.vercel.app/projects',
  },
}

export default function ProjectsPage() {
  return (
    <AppLayout>
      <Navbar />
      <main>
        <Projects />
      </main>
      <Footer />
    </AppLayout>
  )
}
