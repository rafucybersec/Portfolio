import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

export const HeroSkillsCircle = () => {
  return (
    <div className="relative w-[460px] h-[520px] flex items-center justify-center">
      {/* ── Cyber background effects ── */}

      {/* Outer radial glow cyber-green */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(0,255,157,0.06) 0%, rgba(0,255,157,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Inner accent glow cyber-blue */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(0,225,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Dot-grid pattern hex feel */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]"
        width="460"
        height="460"
        viewBox="0 0 460 460"
      >
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#00ff9d" />
          </pattern>
          <mask id="hero-dot-mask">
            <radialGradient id="hero-dot-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="70%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <rect width="460" height="460" fill="url(#hero-dot-fade)" />
          </mask>
        </defs>
        <rect width="460" height="460" fill="url(#hero-dots)" mask="url(#hero-dot-mask)" />
      </svg>

      {/* Decorative orbit rings */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        width="440"
        height="440"
        viewBox="0 0 440 440"
      >
        <circle
          cx="220" cy="220" r="210"
          fill="none" stroke="#00ff9d" strokeWidth="0.4"
          strokeDasharray="4 10" opacity="0.12"
        >
          <animateTransform attributeName="transform" type="rotate"
            from="0 220 220" to="360 220 220" dur="90s" repeatCount="indefinite" />
        </circle>
        <circle
          cx="220" cy="220" r="175"
          fill="none" stroke="#00ff9d" strokeWidth="0.3"
          strokeDasharray="2 14" opacity="0.08"
        >
          <animateTransform attributeName="transform" type="rotate"
            from="360 220 220" to="0 220 220" dur="70s" repeatCount="indefinite" />
        </circle>
        <circle
          cx="220" cy="220" r="130"
          fill="none" stroke="#00e1ff" strokeWidth="0.25"
          strokeDasharray="1.5 18" opacity="0.06"
        >
          <animateTransform attributeName="transform" type="rotate"
            from="0 220 220" to="360 220 220" dur="120s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Scanline sweep */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden rounded-full"
        style={{ width: 400, height: 400 }}
      >
        <div
          className="w-full animate-scanline"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,255,157,0.12), transparent)",
          }}
        />
      </div>

      {/* ── Three.js Globe ── */}
      <div className="relative w-full h-full">
        <HeroGlobe />
      </div>
    </div>
  );
};

export default HeroSkillsCircle;
