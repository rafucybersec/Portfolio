const personData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Rafay Ali',
  jobTitle: 'Cyber Security Engineer',
  description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response.',
  url: 'https://rafucybersec.vercel.app',
  image: 'https://rafucybersec.vercel.app/rafu.png',
  sameAs: [
    'https://github.com/rafucybersec',
    'https://www.linkedin.com/in/muhammadrafayali/',
    'https://www.instagram.com/rafucybersec/',
  ],
  email: 'muhammad.rafayali@outlook.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Hamdard University',
  },
  knowsAbout: [
    'Cyber Security',
    'SOC Operations',
    'SIEM Engineering',
    'Threat Detection',
    'Incident Response',
    'ISO 27001',
    'MITRE ATT&CK',
    'Wazuh',
    'Threat Hawk',
    'Active Directory',
    'Penetration Testing',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: 'ISO/IEC 27001:2022 Lead Auditor',
      issuer: {
        '@type': 'Organization',
        name: 'MasterMind',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: 'Certified SOC Analyst Foundation',
      issuer: {
        '@type': 'Organization',
        name: 'SIEM XPERT',
      },
    },
  ],
}

const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Hero',
      item: 'https://rafucybersec.vercel.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://rafucybersec.vercel.app/#projects',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Experience',
      item: 'https://rafucybersec.vercel.app/#experience',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Contact',
      item: 'https://rafucybersec.vercel.app/#contact',
    },
  ],
}

const websiteData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Muhammad Rafay Ali Portfolio',
  url: 'https://rafucybersec.vercel.app',
  author: {
    '@type': 'Person',
    name: 'Muhammad Rafay Ali',
  },
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}
