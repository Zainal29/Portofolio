import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import heroImg from '../assets/profilMZA_halfbody.jpg';

export default function DraggableIdCard() {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D tilt based on drag position
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-18, 18]);

  const handleDrag = () => {
    setDragOffset({ x: x.get(), y: y.get() });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Lanyard ribbon geometry
  const anchorX = 170;
  const anchorY = 0;
  const cardClipX = anchorX + dragOffset.x;
  const cardClipY = 100 + dragOffset.y;
  const ctrlX = anchorX + dragOffset.x * 0.45;
  const ctrlY = (anchorY + cardClipY) * 0.5;

  return (
    <div className="id-card-stage relative flex flex-col items-center justify-center select-none w-full max-w-[340px] mx-auto pt-2 pb-4">
      {/* Dynamic SVG Lanyard Strap connecting from ceiling to card clip */}
      <svg
        className="absolute top-0 left-0 w-full h-[180px] pointer-events-none z-10 overflow-visible"
        viewBox="0 0 340 180"
      >
        <defs>
          <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="clipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Shadow of strap */}
        <path
          d={`M ${anchorX - 10} ${anchorY} Q ${ctrlX} ${ctrlY} ${cardClipX - 8} ${cardClipY} L ${cardClipX + 8} ${cardClipY} Q ${ctrlX + 6} ${ctrlY} ${anchorX + 10} ${anchorY} Z`}
          fill="rgba(0, 0, 0, 0.4)"
          transform="translate(0, 6)"
        />

        {/* Main Fabric Lanyard Ribbon */}
        <path
          d={`M ${anchorX - 11} ${anchorY} Q ${ctrlX} ${ctrlY} ${cardClipX - 8} ${cardClipY} L ${cardClipX + 8} ${cardClipY} Q ${ctrlX + 6} ${ctrlY} ${anchorX + 11} ${anchorY} Z`}
          fill="url(#lanyardGrad)"
          stroke="rgba(96, 165, 250, 0.4)"
          strokeWidth="1"
        />

        {/* Center stitch detail line on ribbon */}
        <path
          d={`M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${cardClipX} ${cardClipY}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Metallic Clip Hook attached to card */}
        <g transform={`translate(${cardClipX}, ${cardClipY})`}>
          <rect x="-12" y="-12" width="24" height="8" rx="2" fill="url(#clipGrad)" stroke="#475569" strokeWidth="0.5" />
          <path d="M -5 -4 L -5 10 A 5 5 0 0 0 5 10 L 5 -4 Z" fill="none" stroke="url(#clipGrad)" strokeWidth="3" />
          <circle cx="0" cy="10" r="3" fill="#cbd5e1" />
        </g>
      </svg>

      {/* Floating Prompt Pill */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className={`mb-4 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2 z-20 pointer-events-none transition-opacity ${isDragging ? 'opacity-0' : 'opacity-100'}`}
        style={{ marginTop: '50px' }}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>✦ TARIK / AYUNKAN ID CARD INI ✦</span>
      </motion.div>

      {/* Draggable Physical ID Card */}
      <motion.div
        drag
        dragConstraints={{ left: -120, right: 120, top: -50, bottom: 120 }}
        dragElastic={0.25}
        dragSnapToOrigin={true}
        style={{ x, y, rotateX, rotateY }}
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        className="relative w-full max-w-[340px] rounded-[24px] p-5 bg-gradient-to-b from-[#11192e] via-[#090e1c] to-[#060a15] border border-blue-400/35 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(44,103,237,0.3)] backdrop-blur-xl cursor-grab active:cursor-grabbing z-20 group"
      >
        {/* Holographic Top Slot Hole for Lanyard Clip */}
        <div className="mx-auto w-14 h-3 rounded-full bg-[#02050d] border border-white/25 shadow-inner mb-3 flex items-center justify-center">
          <span className="w-8 h-1 rounded-full bg-white/10" />
        </div>

        {/* Ambient Hologram Glare on Card Body */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-transparent via-blue-500/10 to-cyan-400/15 opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity rounded-[24px]" />

        {/* Card Header: School & Department */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-extrabold text-xs">
              M
            </div>
            <div>
              <p className="text-[12px] font-bold text-white tracking-wide leading-none">SMKN 1 BANGSRI</p>
              <p className="text-[9px] font-mono text-cyan-300/90 mt-0.5">PPLG · REKAYASA WEB</p>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold tracking-wider">
            VERIFIED
          </span>
        </div>

        {/* Card Photo Frame */}
        <div className="relative my-3 mx-auto w-full aspect-[4/4] max-w-[210px] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-[#040812]">
          <img
            src={heroImg}
            alt="Muhammad Zainal Arief"
            className="w-full h-full object-cover object-top pointer-events-none"
            draggable={false}
          />
          {/* Glass glare effect on photo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/15 text-[9px] font-mono text-cyan-300 font-medium">
            CLASS OF 2025
          </div>
        </div>

        {/* Card Identity Details */}
        <div className="text-center relative z-10 space-y-1.5 pt-1">
          <h3 className="text-base font-extrabold text-white tracking-tight leading-snug">
            Muhammad Zainal Arief
          </h3>
          <p className="text-[11px] text-blue-300 font-medium">
            Full-Stack Developer (Laravel Developer)
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-300 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Jepara, Jawa Tengah </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">SMKN 1 Bangsri</span>
          </div>

          <div className="pt-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: READY FOR PKL & INDUSTRI</span>
            </span>
          </div>
        </div>

        {/* Card Bottom Barcode & Security Strip (Fully Visible, No Cutoff!) */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
          {/* Faux Barcode with Numbers */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-[2.5px] h-6 px-1.5 bg-white/5 rounded">
              {[4, 2, 6, 3, 5, 2, 7, 4, 3, 6, 2, 5, 3, 7, 2, 4, 6, 3, 5].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-zinc-300 rounded-xs"
                  style={{ height: `${h * 2.8}px` }}
                />
              ))}
            </div>
            <span className="text-[8px] font-mono text-zinc-400 tracking-widest pl-1">2024 0929 1896</span>
          </div>

          {/* Microchip */}
          <div className="w-8 h-6 rounded bg-gradient-to-br from-amber-400/85 via-amber-300 to-amber-500/95 border border-amber-200/60 shadow flex items-center justify-center flex-col">
            <span className="text-[7px] font-mono text-black font-black leading-none">MZA</span>
            <span className="text-[5px] font-mono text-amber-950 font-bold leading-none mt-0.5">CHIP</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
