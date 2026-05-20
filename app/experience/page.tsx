import type { Metadata } from 'next'
import AppLayout from '../../components/AppLayout'
import Navbar from '../../components/Navbar'
import Experience from '../../components/Experience'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience of Muhammad Rafay Ali — SOC Analyst, Cyber Security Analyst, and Security Engineer roles with expertise in Wazuh, SIEM, and MITRE ATT&CK.',
  openGraph: {
    title: 'Experience | Muhammad Rafay Ali',
    description: 'Professional experience of Muhammad Rafay Ali — SOC Analyst, Cyber Security Analyst, and Security Engineer roles.',
    url: 'https://rafucybersec.vercel.app/experience',
  },
  alternates: {
    canonical: 'https://rafucybersec.vercel.app/experience',
  },
}

export default function ExperiencePage() {
  return (
    <AppLayout>
      <Navbar />
      <main>
        <Experience />
      </main>
      <Footer />
    </AppLayout>
  )
}
