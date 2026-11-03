import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, User, Code2, Globe, Box } from 'lucide-react';
import { AsciiArt } from './AsciiArt';

const HERO_PIECES = [
  { slug: 'matrix-rain', label: 'Matrix Rain', icon: <Terminal size={12} />, size: 9 },
  { slug: 'code-editor', label: 'Code Editor', icon: <Code2 size={12} />, size: 8.5 },
  { slug: 'wireframe-globe', label: '3D Globe', icon: <Globe size={12} />, size: 8 },
  { slug: 'spinning-torus', label: '3D Torus', icon: <Box size={12} />, size: 9.5 },
];

export function AsciiHeroVisual({ heroImg, BorderBeam, TiltedCard }) {
  const [viewMode, setViewMode] = useState('ascii'); // 'photo' | 'ascii' - defaults to ASCII mode
  const [activeSlug, setActiveSlug] = useState('matrix-rain');
  const [asciiLook, setAsciiLook] = useState(''); // '' | 'dots' | 'binary'

  const currentPiece = HERO_PIECES.find((p) => p.slug === activeSlug) || HERO_PIECES[0];

  return (
    <div className="portrait-showcase-wrapper">
      <div className="portrait-ambient-glow" />

      {/* Mode Switcher Pill Above Card */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-lg backdrop-blur-md">
          <button
            onClick={() => setViewMode('photo')}
            className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              viewMode === 'photo'
                ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User size={13} />
            <span>Foto Asli</span>
          </button>

          <button
            onClick={() => setViewMode('ascii')}
            className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              viewMode === 'ascii'
                ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles size={13} className="text-current" />
            <span>ASCII Mode</span>
          </button>
        </div>

        {/* When in ASCII Mode, show Piece Selector Tabs */}
        {viewMode === 'ascii' && (
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            {HERO_PIECES.map((p) => (
              <button
                key={p.slug}
                onClick={() => setActiveSlug(p.slug)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-all ${
                  activeSlug === p.slug
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={p.label}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <TiltedCard maxTilt={6} perspective={1100}>
        <div className="profile-portrait-card relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-3xl min-h-[460px] flex items-center justify-center">
          <BorderBeam duration={9} size={260} />

          <AnimatePresence mode="wait">
            {viewMode === 'photo' ? (
              <motion.div
                key="photo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="profile-portrait-image-box w-full h-full relative"
              >
                <img
                  src={heroImg}
                  alt="Muhammad Zainal Arief - Full-Stack Developer SMKN 1 Bangsri"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Floating Aesthetic Chips */}
                <div className="portrait-floating-chip chip-top-right">
                  <span className="status-dot" />
                  <span>SMKN 1 Bangsri</span>
                </div>
                <div className="portrait-floating-chip chip-top-left">
                  <span>✦ Full-Stack Dev</span>
                </div>

                {/* Dark Gradient Overlay for Contrast */}
                <div className="portrait-gradient-overlay" />

                {/* Bottom Overlay Info */}
                <div className="portrait-bottom-info">
                  <div className="portrait-name-group">
                    <h3>Muhammad Zainal Arief</h3>
                    <p>Laravel & React · Ready for PKL</p>
                  </div>
                  <div className="portrait-badge-pill">
                    <span>2024 — Sekarang</span>
                  </div>
                </div>

                {/* Clickable Hint to switch to ASCII */}
                <button
                  onClick={() => setViewMode('ascii')}
                  className="absolute bottom-16 right-4 z-20 px-2.5 py-1 rounded-lg bg-black/75 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 backdrop-blur-md flex items-center gap-1.5 hover:bg-emerald-950/80 transition-all shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                >
                  <Terminal size={12} />
                  <span>Buka ASCII Mode</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="ascii"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full p-4 flex flex-col justify-between items-center relative min-h-[460px] bg-black"
              >
                {/* CRT Scanline Effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 z-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 2px)',
                    backgroundSize: '100% 2px'
                  }}
                />

                {/* Top Bar inside ASCII Frame */}
                <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 z-20 pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                    <span className="text-emerald-400 font-semibold">{currentPiece.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setAsciiLook(asciiLook === '' ? 'dots' : asciiLook === 'dots' ? 'binary' : '')}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
                      title="Ubah look karakter"
                    >
                      look: {asciiLook || 'original'}
                    </button>
                  </div>
                </div>

                {/* Central Canvas Container */}
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden my-auto py-2 z-0">
                  <AsciiArt
                    key={`${currentPiece.slug}-${asciiLook}`}
                    piece={currentPiece.slug}
                    size={currentPiece.size}
                    look={asciiLook}
                    color="#22c55e"
                    mono={true}
                  />
                </div>

                {/* Mobile Pieces Switcher Buttons */}
                <div className="flex sm:hidden items-center gap-1 w-full justify-center z-20 py-1">
                  {HERO_PIECES.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setActiveSlug(p.slug)}
                      className={`px-2 py-1 rounded text-[10px] font-mono ${
                        activeSlug === p.slug
                          ? 'bg-emerald-500 text-black font-semibold'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Bottom Bar Info */}
                <div className="w-full pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono z-20 text-zinc-400">
                  <span>ascii-magic-art v1.1</span>
                  <a
                    href="#ascii-studio"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Eksplorasi Studio</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TiltedCard>
    </div>
  );
}

export default AsciiHeroVisual;
