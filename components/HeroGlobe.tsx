"use client";

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Billboard, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ─── Expanded cyber-security skill set ─────────────────────────── */
type Skill = { name: string; icon: string };

const SKILLS: Skill[] = [
  { name: "Wazuh", icon: "/icons/wazuh.svg" },
  { name: "IBM QRadar", icon: "/icons/qradar.png" },
  { name: "Python", icon: "/icons/python.png" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
  { name: "Linux", icon: "/icons/linux.svg" },
  { name: "Burp Suite", icon: "/icons/burp.png" },
  { name: "Metasploit", icon: "/icons/Metasploit.svg" },
  { name: "MITRE ATT&CK", icon: "/icons/mitre.png" },
  { name: "Kali Linux", icon: "/icons/kali_linux.svg" },
  { name: "PowerShell", icon: "/icons/powershell.svg" },
  { name: "Bash", icon: "/icons/bash.svg" },
  { name: "Windows", icon: "/icons/windows.svg" },
  { name: "OSINT", icon: "/icons/osint.png" },
  { name: "Threat Hunting", icon: "/icons/hunting.png" },
  { name: "Threat Intel", icon: "/icons/threat.svg" },
  { name: "Azure", icon: "/icons/microsoft_azure.svg" },
  { name: "Sentinel", icon: "/icons/azure_sentinel.svg" },
  { name: "Nmap", icon: "/icons/nmap_logo.png" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
];

/* ─── Fibonacci sphere distribution ─────────────────────────────── */
function fibonacciSphere(n: number, radius: number) {
  const points: [number, number, number][] = [];
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

/* ─── Icon texture loader — clean transparent backgrounds ────────── */
function useIconTextures(skills: Skill[]) {
  const [textures, setTextures] = useState<(THREE.Texture | null)[]>(() =>
    skills.map(() => null)
  );

  useEffect(() => {
    let cancelled = false;
    let loadedTextures: (THREE.CanvasTexture | null)[] = [];

    const loadIcon = (url: string): Promise<THREE.CanvasTexture | null> =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const size = 256;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(null);
          // Fully transparent background — no fill
          ctx.clearRect(0, 0, size, size);
          // Draw icon centered with padding
          const pad = 48;
          ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
          const tex = new THREE.CanvasTexture(canvas);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.needsUpdate = true;
          resolve(tex);
        };
        img.onerror = () => resolve(null);
        img.src = url;
      });

    const loadAll = async () => {
      const results = await Promise.all(skills.map((s) => loadIcon(s.icon)));
      loadedTextures = results;
      if (!cancelled) setTextures(results);
    };

    loadAll();
    return () => {
      cancelled = true;
      // Dispose textures to free GPU memory
      loadedTextures.forEach((tex) => tex?.dispose());
    };
  }, [skills]);

  return textures;
}

/* ─── Single icon sprite ──────────────────────────────────────────── */
function IconSprite({
  position,
  texture,
  name,
  onHover,
}: {
  position: [number, number, number];
  texture: THREE.Texture | null;
  name: string;
  onHover: (hovered: boolean, name: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Smooth scale
    const targetScale = hovered ? 1.4 : 1;
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 8);
    meshRef.current.scale.set(s, s, s);
    // Smooth opacity
    if (matRef.current) {
      const targetOpacity = hovered ? 1 : 0.5;
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity, delta * 8);
    }
  });

  if (!texture) return null;

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHover(true, name);
    document.body.style.cursor = "pointer";
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    onHover(false, name);
    document.body.style.cursor = "auto";
  };

  return (
    <Billboard position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          depthWrite={false}
          opacity={0.5}
        />
      </mesh>
    </Billboard>
  );
}

/* ─── Rotating group ─────────────────────────────────────────────── */
function RotatingGroup({
  textures,
  onHover,
}: {
  textures: (THREE.Texture | null)[];
  onHover: (hovered: boolean, name: string) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const radius = 2.0;
  const positions = useMemo(
    () => fibonacciSphere(SKILLS.length, radius),
    []
  );

  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (ref.current) {
      elapsed.current += delta;
      ref.current.rotation.y += delta * 0.18;
      ref.current.rotation.x =
        Math.sin(elapsed.current * 0.25) * 0.15;
    }
  });

  return (
    <group ref={ref}>
      {/* Primary wireframe — bright cyber-green */}
      <mesh>
        <icosahedronGeometry args={[radius - 0.05, 2]} />
        <meshBasicMaterial
          color="#048d59"
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[radius - 0.35, 48, 48]} />
        <meshBasicMaterial
          color="#048d59"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Skill icons */}
      {SKILLS.map((s, i) => (
        <IconSprite
          key={s.name}
          name={s.name}
          position={positions[i]}
          texture={textures[i]}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function HeroGlobe() {
  const textures = useIconTextures(SKILLS);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <RotatingGroup
          textures={textures}
          onHover={(h, name) => setHoveredName(h ? name : null)}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          rotateSpeed={0.4}
        />
      </Canvas>

      {/* Hover label */}
      <div
        className={`pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-satoshi tracking-wider transition-all duration-300 border backdrop-blur-md ${
          hoveredName
            ? "opacity-100 translate-y-0 border-[#00ff9d]/30 bg-black/70 text-[#00ff9d] shadow-[0_0_14px_rgba(0,255,157,0.2)]"
            : "opacity-0 translate-y-2 border-transparent bg-transparent text-transparent"
        }`}
      >
        <span className="text-[#00ff9d]/50 mr-1">&gt;</span>
        {hoveredName ?? ""}
      </div>
    </div>
  );
}
