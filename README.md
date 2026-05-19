# 🛡️ 0xRafuSec | Cybersecurity Portfolio

A terminal-inspired portfolio website built with Next.js 16, React 19, and Tailwind CSS v4. It features a custom 3D skill globe, an interactive particle background that repels away from your mouse cursor, a zero-knowledge password auditor, and a functional command-line interface with 5 hidden CTF flags to find.

[![Live Demo](https://img.shields.io/badge/Live_Site-rafucybersec.vercel.app-00ff9d?style=flat&logo=vercel&logoColor=black)](https://rafucybersec.vercel.app)
![Next.js 16](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2.5-blue?logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-4.2.4-38B2AC?logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.184.0-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue?logo=typescript)

***

## 🎮 Interactive Highlights

### 💻 Play the CTF inside the Terminal Zone
The website includes an interactive command line emulator. You can run normal Linux commands (`ls`, `cd`, `pwd`, `cat`, `ping`, `clear`), but it also hosts a built-in capture-the-flag mini-game. There are 5 hidden flags scattered across the files and tools.

Try finding them by running these commands:
- **flag**: Initial command checking.
- **sudo**: Attempting to escalate privileges.
- **nmap localhost**: Scanning local ports.
- **exploit**: Simulating a penetration testing framework.
- **.secret**: Discovering hidden files in the directory root.
- **Script execution**: Change directory into `~/tools` and run Python or Bash scripts:
  - `python hash_cracker.py`
  - `sh payload_gen.sh`
  - `python nmap_scanner.py`

### 🌐 Threat Network Canvas Background
A custom 2D particle system runs behind the entire site. It renders about 150 floating particles connected by proximity-based lines. The physics engine tracks your mouse coordinates, causing nearby nodes to push away from your cursor in real time. It scales particle density dynamically depending on high-DPR screens to keep animations locked at a smooth 60fps.

### 🔒 Zero-Knowledge Password Auditor
A functional utility built to demonstrate secure client-side cryptographic handling. It verifies password strength and checks if a password has been compromised in any known data breaches:
- **Hashing**: Computes a SHA-1 hash of the input password entirely client-side.
- **K-Anonymity**: It queries `/api/check-password` using only the first 5 characters of the SHA-1 hash.
- **Matching**: The API returns a list of suffix hashes matching that prefix from Have I Been Pwned. The site matches the rest of the hash locally.
- **Result**: No raw passwords ever leave your machine, preventing credential leakage.

### 🔮 3D Skills Sphere
A rotating 3D skill globe built using React Three Fiber and Three.js. It places interactive skill icons mathematically using a Fibonacci distribution across the surface of an icosahedron geometry. The sphere rotates automatically, scaling and highlighting individual skill tags when you hover over them.

***

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2 (using App Router and Turbopack)
- **Library:** React 19.2
- **Styling:** Tailwind CSS v4.2 (using PostCSS configuration)
- **3D Engine:** Three.js / React Three Fiber / Drei / Maath
- **Animations:** GSAP (entrance timelines), Framer Motion (layout states)
- **Typography:** Satoshi (Fontshare sans-serif), JetBrains Mono, Cedarville Cursive
- **Smooth Scrolling:** Lenis Scroll
- **Contact Service:** Resend API integration
- **State/Cache:** Upstash Redis (for password checks or rate limiting)

***

## 📁 Directory Structure

```text
Portfolio/
├── app/
│   ├── api/                  # Backend endpoints
│   │   ├── check-password/   # K-anonymity breach lookup
│   │   └── contact/          # Contact email via Resend
│   ├── contact/              # Contact page route
│   ├── experience/           # Experience timeline page
│   ├── projects/             # Project showcase page
│   ├── skills/               # Tech skills page
│   ├── globals.css           # Custom styles, transitions, and keyframes
│   ├── layout.tsx            # Main layout layout wrapper with fonts and analytics
│   ├── page.tsx              # Home entry point
│   ├── robots.ts             # SEO robots config
│   └── sitemap.ts            # SEO sitemap generator
├── components/               # 21 custom UI components
│   ├── PortfolioContent.tsx  # Combines all page sections
│   ├── StarBackground.tsx    # Interactive particle network canvas
│   ├── Hero.tsx              # Splash header and typing animation
│   ├── HeroGlobe.tsx         # 3D interactive Fibonacci sphere
│   ├── HeroSkillsCircle.tsx  # Floating orbital skills selector
│   ├── SplashScreen.tsx      # Boot loader screen with scanline overlay
│   ├── Terminal.tsx          # CLI terminal emulator and CTF host
│   ├── PasswordAnalyzer.tsx  # Client-side hash auditor UI
│   ├── Konami.tsx            # Key sequence detector
│   └── ...                   # About, Experience, Navbar, Footer
├── lib/
│   └── motion.ts             # Shared animation configurations
├── providers/
│   └── lenis-provider.tsx    # Lenis smooth scrolling provider
├── public/
│   ├── certificates/         # Certification badges
│   ├── icons/                # Tech stack vector graphics
│   ├── videos/               # Particle backgrounds for cards
│   ├── resume.pdf            # Downloadable CV
│   └── favicon.svg           # Custom vector favicon
├── tailwind.config.js        # Accent colors and utility classes
├── vercel.json               # Security headers and Vercel routing rules
└── tsconfig.json             # TypeScript configuration
```

***

## 🚀 Spin Up Locally

### Requirements
Ensure you have Node.js 18 or higher installed on your system.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/0xRafuSec/rafu-portfolio.git
   cd rafu-portfolio
   ```

2. **Configure environment variables:**
   Create a `.env.local` file in the root folder and add your Resend API token:
   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Launch development server:**
   Starts the Next.js Turbopack compiler.
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the site.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

***

## 🎨 Theme Tokens

The layout uses custom colors configured inside `tailwind.config.js`:
- **cyber-green (`#00ff9d`):** Primary neon accent, terminal lines, successful statuses.
- **cyber-green-dark (`#00a365`):** Soft text alternative for light backgrounds.
- **cyber-blue (`#00e1ff`):** Secondary interactive actions, informational fields.
- **cyber-blue-dark (`#0096aa`):** Soft text alternative for the secondary color.
- **cyber-black (`#050505`):** Base terminal background.

***

## 🤝 Let's Connect

- **Live URL:** [rafucybersec.vercel.app](https://rafucybersec.vercel.app)
- **GitHub profile:** [0xRafuSec](https://github.com/0xRafuSec)
- **LinkedIn network:** [Muhammad Rafay Ali](https://linkedin.com/in/muhammadrafayali)
- **Secure Email:** muhammad.rafayali@outlook.com

***

<p align="center">
  Built with passion by <strong>0xRafuSec</strong> ⚡ Co-engineered with <a href="https://github.com/claude"><strong>Claude</strong></a>
</p>
