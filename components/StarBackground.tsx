"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/**
 * Warp Speed Hyperspace Background
 * 
 * Raw Three.js: WebGLRenderer, BufferGeometry, Points + LineSegments.
 * - Circular particle texture (canvas-generated, no image)
 * - Speed-proportional streak trails behind each star
 * - GSAP tweens speed for warp-in ramp + mouse parallax
 * 
 * Mounted globally in PortfolioContent.tsx, position: fixed, z-index: 0.
 */

// Performance scaling
const isLowEnd =
  typeof navigator !== "undefined"
    ? (navigator.hardwareConcurrency ?? 8) <= 4
    : false;

const STAR_COUNT = isLowEnd ? 700 : 1500;
const MAX_SPEED = isLowEnd ? 8 : 13;

/** Create a soft circular glow texture via Canvas 2D */
function createCircleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, "rgba(0, 255, 157, 1)");
  gradient.addColorStop(0.15, "rgba(0, 255, 157, 0.9)");
  gradient.addColorStop(0.4, "rgba(0, 255, 157, 0.4)");
  gradient.addColorStop(0.7, "rgba(0, 255, 157, 0.1)");
  gradient.addColorStop(1, "rgba(0, 255, 157, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(half, half, half, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export default function WarpSpeedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowEnd,
    });
    renderer.setPixelRatio(isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Circular texture for round stars
    const circleTexture = createCircleTexture();

    // Star Geometry (primary layer)
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = Math.random() * -2000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ff9d,
      size: 1.2,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: circleTexture,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Streak trail geometry (LineSegments: 2 vertices per star)
    const trailPositions = new Float32Array(STAR_COUNT * 6);
    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions, 3)
    );

    const trailMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff9d,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const trails = new THREE.LineSegments(trailGeometry, trailMaterial);
    scene.add(trails);

    // State for GSAP tweening
    const state = { speed: 2 };

    // Warp ramp-in
    gsap.to(state, {
      speed: MAX_SPEED,
      duration: 3,
      ease: "power2.in",
    });

    // Mouse parallax
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;

      gsap.to(camera.position, {
        x: mouse.x * 30,
        y: -mouse.y * 20,
        duration: 1.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation loop
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const trailAttr = trailGeometry.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const arr = posAttr.array as Float32Array;
      const tArr = trailAttr.array as Float32Array;
      const speedFactor = state.speed;
      // Trail length scales with speed (longer trail = faster)
      const trailLen = speedFactor * 2.5;

      for (let i = 0; i < STAR_COUNT; i++) {
        const xi = i * 3;
        const yi = i * 3 + 1;
        const zi = i * 3 + 2;

        // Move stars forward (toward camera)
        arr[zi] += speedFactor;

        // Trail: front vertex = star position, back vertex = behind the star
        const ti = i * 6;
        tArr[ti] = arr[xi];
        tArr[ti + 1] = arr[yi];
        tArr[ti + 2] = arr[zi];
        tArr[ti + 3] = arr[xi];
        tArr[ti + 4] = arr[yi];
        tArr[ti + 5] = arr[zi] - trailLen;

        // Reset star when it passes the camera
        if (arr[zi] > 100) {
          arr[zi] = -2000;
          arr[xi] = (Math.random() - 0.5) * 1600;
          arr[yi] = (Math.random() - 0.5) * 1200;

          // Reset trail too
          tArr[ti] = arr[xi];
          tArr[ti + 1] = arr[yi];
          tArr[ti + 2] = arr[zi];
          tArr[ti + 3] = arr[xi];
          tArr[ti + 4] = arr[yi];
          tArr[ti + 5] = arr[zi];
        }
      }

      posAttr.needsUpdate = true;
      trailAttr.needsUpdate = true;

      // Scale star size with speed
      material.size = 1.2 + (speedFactor / MAX_SPEED) * 2.5;
      // Trail opacity scales with speed
      trailMaterial.opacity = 0.05 + (speedFactor / MAX_SPEED) * 0.25;

      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      circleTexture.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} />;
}

export const StarsCanvas = WarpSpeedBackground;
