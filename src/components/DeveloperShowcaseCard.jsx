import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Server, Database,
  Cpu, ArrowUpRight, CheckCircle2, MapPin
} from 'lucide-react';
import heroImg from '../assets/profilMZA_halfbody.jpg';
import {
  LaravelIcon, PhpIcon, MysqlIcon, ReactIcon, TailwindIcon
} from './TechIcons';

export default function DeveloperShowcaseCard() {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Ultra-lightweight, hardware-accelerated 3D tilt without physics lag
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = Math.max(-6, Math.min(6, ((y - centerY) / centerY) * -5));
    const rotateY = Math.max(-6, Math.min(6, ((x - centerX) / centerX) * 5));

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="dev-showcase-stage relative w-full max-w-[440px] mx-auto select-none px-1 sm:px-0">
      {/* Main Solid Engineering Card (No Heavy Gradients) */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: isHovered ? -3 : 0
        }}
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.18
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="dev-showcase-card relative rounded-2xl bg-[#0c121e] border border-slate-800 p-4 sm:p-5 md:p-6 shadow-xl transition-colors hover:border-blue-500/50 w-full box-border"
      >
        {/* Card Header: Terminal Controls & Live Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
            <span className="ml-1.5 font-mono text-[10px] sm:text-[11px] text-zinc-400 hidden xs:inline-block">
              mza.dev
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-300 font-semibold tracking-wider whitespace-nowrap">
              ONLINE · PKL READY
            </span>
          </div>
        </div>

        {/* Developer Profile Header */}
        <div className="flex items-center gap-3 sm:gap-4 my-3.5">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl overflow-hidden border border-blue-400/40 bg-zinc-900 shadow-md">
              <img
                src={heroImg}
                alt="Muhammad Zainal Arief"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0c121e] border-2 border-emerald-400 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate">
                Muhammad Zainal Arief
              </h3>
              <span title="Verified Student Engineer" className="shrink-0">
                <ShieldCheck size={15} className="text-blue-400" />
              </span>
            </div>
            <p className="text-xs text-blue-300 font-medium mt-0.5 truncate">
              Laravel Backend & Web Developer
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
              <span className="flex items-center gap-1 shrink-0">
                <MapPin size={11} className="text-zinc-500" />
                Jepara, ID
              </span>
              <span>•</span>
              <span className="truncate">SMK Negeri 1 Bangsri</span>
            </div>
          </div>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between min-w-0">
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 flex items-center gap-1 truncate">
              <Server size={11} className="text-blue-400 shrink-0" />
              <span className="truncate">BACKEND ENGINE</span>
            </span>
            <div className="flex items-center gap-1.5 mt-1 min-w-0">
              <LaravelIcon size={13} />
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-200 truncate">Laravel + PHP</span>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between min-w-0">
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 flex items-center gap-1 truncate">
              <Database size={11} className="text-emerald-400 shrink-0" />
              <span className="truncate">DATABASE</span>
            </span>
            <div className="flex items-center gap-1.5 mt-1 min-w-0">
              <MysqlIcon size={13} />
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-200 truncate">MySQL Relational</span>
            </div>
          </div>
        </div>

        {/* Real-World Systems Live Indicator */}
        <div className="space-y-2 mb-3.5">
          <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 tracking-wider uppercase flex items-center justify-between">
            <span>PRODUKSI SISTEM AKTIF</span>
            <span className="text-blue-400 font-semibold">2 PROJECTS</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-950/25 border border-blue-500/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">
                  DIDISPEN — SMKN 1 Bangsri
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block truncate">
                  Live School Dispensation System
                </span>
              </div>
            </div>
            <a
              href="https://didispen.smkn1bangsri.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500 hover:text-white transition-colors flex-shrink-0"
              title="Kunjungi Live Demo"
            >
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-200 block truncate">
                  BeWood — E-Commerce Mebel
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block truncate">
                  Katalog Pengrajin Jepara
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 shrink-0">
              Laravel
            </span>
          </div>
        </div>

        {/* Core Stack Mini-Dock */}
        <div className="flex items-center justify-between px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/[0.02] border border-white/5 mb-3">
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 shrink-0">STACK UTAMA:</span>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span title="PHP" className="hover:scale-110 transition-transform"><PhpIcon size={14} /></span>
            <span title="Laravel" className="hover:scale-110 transition-transform"><LaravelIcon size={14} /></span>
            <span title="MySQL" className="hover:scale-110 transition-transform"><MysqlIcon size={14} /></span>
            <span title="React.js" className="hover:scale-110 transition-transform"><ReactIcon size={14} /></span>
            <span title="Tailwind CSS" className="hover:scale-110 transition-transform"><TailwindIcon size={14} /></span>
          </div>
        </div>

        {/* Card Footer: Pipeline Strip & Kesiapan */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono gap-1">
          <div className="flex items-center gap-1 text-zinc-400 truncate">
            <Cpu size={12} className="text-blue-400 shrink-0" />
            <span className="truncate">PPLG XII // 2026</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-300 font-semibold shrink-0">
            <CheckCircle2 size={12} className="shrink-0" />
            <span>SIAP PKL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
