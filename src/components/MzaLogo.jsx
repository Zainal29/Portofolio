export default function MzaLogo({ size = 32, showText = true, className = '' }) {
  return (
    <div className={`mza-brand-badge inline-flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* Simple, Crisp Minimalist MZA Developer Monogram */}
      <div
        className="flex items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-400 font-mono font-extrabold tracking-tight shrink-0 transition-all duration-200 hover:border-blue-400 hover:bg-blue-600/25"
        style={{
          width: size,
          height: size,
          fontSize: Math.max(10, Math.round(size * 0.36))
        }}
        title="Muhammad Zainal Arief (MZA)"
      >
        <span>MZA</span>
      </div>

      {showText && (
        <span className="font-mono text-sm md:text-base tracking-tight leading-none whitespace-nowrap">
          <span className="font-bold text-white">mza</span><span className="text-blue-400 font-semibold">.dev</span>
        </span>
      )}
    </div>
  );
}
