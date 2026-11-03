export default function MzaLogo({ size = 34, showText = true, className = '' }) {
  return (
    <div className={`mza-brand-badge inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* MZA Geometric Emblem Icon */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0c152a] via-[#090e1f] to-[#050813] border border-cyan-400/35 shadow-[0_0_20px_rgba(56,189,248,0.22)] transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600/25 via-sky-500/15 to-emerald-400/20 blur-[5px] -z-10 pointer-events-none" />

        <svg
          width={Math.round(size * 0.72)}
          height={Math.round(size * 0.72)}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="mzaGradM" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="mzaGradZ" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="mzaGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>

          {/* Letter 'M' (Left) */}
          <path
            d="M 12 76 L 12 24 L 24 50 L 36 24 L 36 76"
            stroke="url(#mzaGradM)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'Z' (Center dynamic zig-zag) */}
          <path
            d="M 41 26 L 61 26 L 41 74 L 61 74"
            stroke="url(#mzaGradZ)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'A' (Right apex peak & crossbar) */}
          <path
            d="M 66 76 L 78 24 L 90 76"
            stroke="url(#mzaGradA)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 71 56 L 85 56"
            stroke="#38bdf8"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Neon Apex Circuit Nodes */}
          <circle cx="24" cy="50" r="2.2" fill="#38bdf8" />
          <circle cx="51" cy="50" r="2.2" fill="#10b981" />
          <circle cx="78" cy="24" r="2.2" fill="#818cf8" />
        </svg>

        {/* Pulsing Corner Status Dot */}
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[15px] sm:text-[16px] tracking-tight text-white font-mono leading-none">
              MZA
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30 leading-none">
              .dev
            </span>
          </div>
          <span className="text-[8.5px] font-mono text-zinc-400 tracking-[0.14em] uppercase leading-none mt-1">
            ZAINAL ARIEF
          </span>
        </div>
      )}
    </div>
  );
}
