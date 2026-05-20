import type { Metadata, Viewport } from 'next'
import { Cedarville_Cursive, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import ErrorBoundary from './components/ErrorBoundary'
import StructuredData from './components/StructuredData'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Providers from '@/providers'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const cedarvilleCursive = Cedarville_Cursive({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rafucybersec.vercel.app'),
  title: {
    default: 'Muhammad Rafay Ali | Cyber Security Engineer',
    template: '%s | Muhammad Rafay Ali',
  },
  description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response. Explore my portfolio, projects, and cybersecurity expertise.',
  keywords: [
    'cyber security engineer',
    'SOC analyst',
    'SIEM engineering',
    'threat detection',
    'incident response',
    'cybersecurity portfolio',
    'security consultant',
    'ISO 27001',
    'MITRE ATT&CK',
    'Wazuh',
    'Threat Hawk',
    'Muhammad Rafay Ali',
  ],
  authors: [{ name: 'Muhammad Rafay Ali', url: 'https://rafucybersec.vercel.app' }],
  creator: 'Muhammad Rafay Ali',
  publisher: 'Muhammad Rafay Ali',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rafucybersec.vercel.app',
    siteName: 'Muhammad Rafay Ali Portfolio',
    title: 'Muhammad Rafay Ali | Cyber Security Engineer',
    description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Rafay Ali - Cyber Security Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Rafay Ali | Cyber Security Engineer',
    description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, and threat detection.',
    creator: '@rafucybersec',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ElRIclZ7K1Uy3Nuuwc9z8h5qeUByzlZ6mQJjW4dM-B8',
    yandex: '5bd5801e72ab9c06',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth dark ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${cedarvilleCursive.variable}`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://rafucybersec.vercel.app/" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <meta name="author" content="Muhammad Rafay Ali" />
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <noscript>
          <div style={{ padding: '2rem', color: '#00ff9d', background: '#020a05', fontFamily: 'system-ui, sans-serif' }}>
            <h1>Muhammad Rafay Ali — Cyber Security Engineer</h1>
            <p>Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response. 2+ years of experience deploying Wazuh, building custom detection rules, and managing enterprise security operations.</p>
            <p>Certified: ISO/IEC 27001 Lead Auditor | ISC2 CC | Google Cybersecurity Professional | SOC Analyst Foundation</p>
            <p>Skills: Wazuh, Splunk, QRadar, MITRE ATT&amp;CK, Python, Active Directory, Penetration Testing, Threat Intelligence</p>
            <p>Contact: <a href="mailto:muhammad.rafayali@outlook.com" style={{ color: '#00e1ff' }}>muhammad.rafayali@outlook.com</a></p>
            <nav>
              <a href="/projects" style={{ color: '#00ff9d', marginRight: '1rem' }}>Projects</a>
              <a href="/experience" style={{ color: '#00ff9d', marginRight: '1rem' }}>Experience</a>
              <a href="/skills" style={{ color: '#00ff9d', marginRight: '1rem' }}>Skills</a>
              <a href="/contact" style={{ color: '#00ff9d' }}>Contact</a>
            </nav>
          </div>
        </noscript>
        <Providers>
        <StructuredData />
        <ErrorBoundary>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyber-green-dark dark:focus:bg-cyber-green focus:text-white dark:focus:text-black focus:rounded-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          {children}
          <SpeedInsights />
          <Analytics />
        </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
