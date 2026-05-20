import type { Metadata } from 'next'
import AppLayout from '../../components/AppLayout'
import Navbar from '../../components/Navbar'
import Skills from '../../components/Skills'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills of Muhammad Rafay Ali — SIEM platforms (Wazuh, Splunk, QRadar), penetration testing, threat intelligence, Python automation, and compliance frameworks.',
  openGraph: {
    title: 'Skills | Muhammad Rafay Ali',
    description: 'Technical skills of Muhammad Rafay Ali — SIEM, penetration testing, threat intelligence, and compliance.',
    url: 'https://rafucybersec.vercel.app/skills',
  },
  alternates: {
    canonical: 'https://rafucybersec.vercel.app/skills',
  },
}

export default function SkillsPage() {
  return (
    <AppLayout>
      <Navbar />
      <main>
        <Skills />
      </main>
      <Footer />
    </AppLayout>
  )
}
