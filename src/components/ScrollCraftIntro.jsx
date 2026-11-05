import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowDown } from 'lucide-react';
import MzaLogo from './MzaLogo';

/**
 * ScrollCraftIntro
 * Cinematic scroll-scrubbed opening gateway (inspired by singhharsh1708/scrollcraft & Apple product sites):
 * - Direct scroll-scrubbed physics: every millimeter of scroll smoothly morphs and peels open the curtain
 * - Interactive Canvas 2D wave aperture that dynamically parts as the user scrolls
 * - Zero artificial delay: visitor can scroll at their own pace or click to glide in smoothly
 * - Minimalist, high-contrast typography (no tacky AI rainbow gradient)
 */
export default function ScrollCraftIntro({ onScrollDown }) {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);

  // Hook into scroll progress across the 100vh track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start']
  });

  // Smooth scroll-driven transforms (Parallax & Depth on scroll)
  const introOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.05]);
  const introScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.9]);
  const introY = useTransform(scrollYProgress, [0, 0.75], [0, 80]);

  // Click / Button handler to smoothly glide past intro using Lenis
  const handleScrollToContent = () => {
    if (onScrollDown) {
      onScrollDown();
      return;
    }
    const heroEl = document.querySelector('#hero');
    if (window.__lenis && heroEl) {
      window.__lenis.scrollTo(heroEl, {
        offset: -70,
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ScrollCraft-inspired Canvas 2D wave aperture animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Get latest scroll progress
      const progress = scrollYProgress.get();

      // Number of wave lines
      const lines = 12;
      const centerY = height * 0.52;
      const spread = 28 + progress * 240; // Spreads apart as user scrolls!
      const lineAlpha = Math.max(0, (1 - progress * 1.6) * 0.22);

      if (lineAlpha > 0.01) {
        ctx.lineWidth = 1;
        for (let i = 0; i < lines; i++) {
          const offset = (i - lines / 2) * spread;
          ctx.beginPath();
          ctx.strokeStyle = i % 2 === 0 ? `rgba(59, 130, 246, ${lineAlpha})` : `rgba(56, 189, 248, ${lineAlpha * 0.8})`;

          for (let x = 0; x <= width; x += 16) {
            const normalizedX = x / width;
            const wave = Math.sin(normalizedX * 6 + t + i * 0.4) * (20 + progress * 15);
            const y = centerY + offset + wave;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress]);

  return (
    <div ref={trackRef} className="scrollcraft-intro-track" id="scrollcraft-intro">
      <div className="scrollcraft-intro-inner">
        {/* Interactive Canvas 2D Wave Aperture */}
        <canvas ref={canvasRef} className="scrollcraft-canvas-aperture" aria-hidden="true" />

        {/* Blueprint Grid Texture */}
        <div className="scrollcraft-grid-overlay" aria-hidden="true" />

        {/* Top Header Row */}
        <header className="scrollcraft-header">
          <div className="scrollcraft-brand-chip">
            <MzaLogo size={28} showText={false} />
            <span className="font-mono text-xs font-semibold text-zinc-300 tracking-wider">
              MZA<span className="text-blue-500">.dev</span>
            </span>
          </div>

          <div className="scrollcraft-status-chip">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-zinc-300">ONLINE · READY FOR WORK</span>
          </div>
        </header>

        {/* Center Presentation (Scroll-Scrubbed) */}
        <motion.div
          className="scrollcraft-center-content"
          style={{
            opacity: introOpacity,
            scale: introScale,
            y: introY
          }}
        >
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-6 backdrop-blur-sm">
            <span className="text-blue-400">#</span>
            <span>PORTFOLIO 2026</span>
            <span className="text-zinc-600">/</span>
            <span>PPLG SMK NEGERI 1 BANGSRI</span>
          </div>

          {/* Clean, High-Contrast Typography (No AI rainbow gradient) */}
          <h1 className="scrollcraft-main-title">
            Muhammad <span className="text-blue-500">Zainal Arief</span>
          </h1>

          <p className="scrollcraft-sub-role">
            Laravel Backend Specialist &amp; Full-Stack Web Developer
          </p>

          {/* Minimalist Tech Badges */}
          <div className="scrollcraft-tech-pills">
            {['Laravel', 'PHP 8.2', 'MySQL', 'REST API', 'React', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="scrollcraft-tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bottom Interactive Scroll Indicator */}
        <motion.div
          className="scrollcraft-bottom-bar"
          style={{ opacity: introOpacity }}
        >
          <button
            type="button"
            onClick={handleScrollToContent}
            className="scrollcraft-scroll-btn group"
            aria-label="Gulir ke bawah untuk membuka portofolio"
          >
            {/* Minimalist Animated Mouse */}
            <div className="scrollcraft-mouse-icon">
              <span className="scrollcraft-mouse-wheel" />
            </div>

            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block group-hover:text-zinc-200 transition-colors">
                GULIR ATAU KLIK UNTUK MEMBUKA
              </span>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <span>Buka Portofolio Lengkap</span>
                <ArrowDown size={13} className="text-blue-400 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </div>

            <ChevronDown size={18} className="text-blue-400 animate-bounce ml-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
