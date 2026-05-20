import type { Metadata } from 'next'
import AppLayout from '../../components/AppLayout'
import Navbar from '../../components/Navbar'
import Contact from '../../components/Contact'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Rafay Ali — Cyber Security Engineer available for SOC consulting, SIEM engineering, and security architecture projects.',
  openGraph: {
    title: 'Contact | Muhammad Rafay Ali',
    description: 'Get in touch with Muhammad Rafay Ali — Cyber Security Engineer available for SOC consulting, SIEM engineering, and security architecture projects.',
    url: 'https://rafucybersec.vercel.app/contact',
  },
  alternates: {
    canonical: 'https://rafucybersec.vercel.app/contact',
  },
}

export default function ContactPage() {
  return (
    <AppLayout>
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
    </AppLayout>
  )
}
