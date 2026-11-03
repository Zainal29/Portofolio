import { useState } from 'react';
import {
  Sparkles, Terminal, Copy, Check, Play, Pause, RefreshCw,
  Sliders, Box, Zap, ChevronRight, Laptop
} from 'lucide-react';
import { AsciiArt } from './AsciiArt';

const CURATED_PIECES = [
  {
    slug: 'matrix-rain',
    name: 'Digital Rain',
    category: 'Screens & Code',
    badge: 'Popular',
    desc: 'Hujan kode biner dan karakter hijau legendaris berkecepatan dinamis ala Matrix cyberpunk.',
    cols: 84,
    rows: 30,
    fps: 24,
    defaultSize: 10,
    tags: ['matrix', 'cyberpunk', 'terminal', 'demoscene']
  },
  {
    slug: 'code-editor',
    name: 'Live Code Editor',
    category: 'Screens & Code',
    badge: 'Developer',
    desc: 'Simulasi text editor modern dengan syntax highlighting kode rate-limiter yang sedang diketik aktif.',
    cols: 86,
    rows: 30,
    fps: 30,
    defaultSize: 9.5,
    tags: ['code', 'ide', 'developer', 'typing']
  },
  {
    slug: 'terminal-session',
    name: 'Terminal Session',
    category: 'Screens & Code',
    badge: 'CLI',
    desc: 'Sesi prompt shell Linux interaktif lengkap dengan pengetikan perintah sistem dan output terminal.',
    cols: 82,
    rows: 28,
    fps: 24,
    defaultSize: 10,
    tags: ['terminal', 'bash', 'linux', 'sysadmin']
  },
  {
    slug: 'cpu-cores',
    name: 'Multi-Core CPU Monitor',
    category: 'Screens & Code',
    badge: 'System',
    desc: 'Visualisasi monitor utilisasi thread CPU multi-core waktu-nyata dengan indikator bar progres.',
    cols: 78,
    rows: 24,
    fps: 20,
    defaultSize: 10,
    tags: ['cpu', 'hardware', 'monitoring', 'performance']
  },
  {
    slug: 'git-branching',
    name: 'Git Branch Graph',
    category: 'Screens & Code',
    badge: 'Git Flow',
    desc: 'Animasi alur commit Git bercabang dari main, feature branch berkolaborasi lalu melakukan merge.',
    cols: 96,
    rows: 17,
    fps: 24,
    defaultSize: 9,
    tags: ['git', 'version-control', 'branch', 'github']
  },
  {
    slug: 'api-request-inspector',
    name: 'API Request Inspector',
    category: 'Screens & Code',
    badge: 'REST API',
    desc: 'Inspeksi lalu lintas request HTTP REST API, status 200 OK, latency headers, dan payload JSON.',
    cols: 80,
    rows: 26,
    fps: 24,
    defaultSize: 10,
    tags: ['api', 'http', 'rest', 'network']
  },
  {
    slug: 'wireframe-globe',
    name: '3D Wireframe Globe',
    category: '3D & Math',
    badge: '3D Geometry',
    desc: 'Bola dunia kawat 3D berputar halus dengan garis lintang bujur berformat karakter monospaced.',
    cols: 72,
    rows: 32,
    fps: 24,
    defaultSize: 9,
    tags: ['globe', '3d', 'sphere', 'rotation']
  },
  {
    slug: 'spinning-torus',
    name: 'Spinning Donut Torus',
    category: '3D & Math',
    badge: 'Mathematics',
    desc: 'Donut geometri 3D berputar pada sumbu X & Z dengan kalkulasi shading pencahayaan ASCII matematis.',
    cols: 64,
    rows: 28,
    fps: 24,
    defaultSize: 10.5,
    tags: ['torus', 'math', 'geometry', 'algorithm']
  },
  {
    slug: 'torus-knot',
    name: 'Complex Torus Knot',
    category: '3D & Math',
    badge: 'Fractal',
    desc: 'Simpul torus 3D kompleks yang berputar melingkar dalam simetri topologi kurva ruang.',
    cols: 68,
    rows: 30,
    fps: 24,
    defaultSize: 10,
    tags: ['knot', 'topology', '3d', 'animation']
  },
  {
    slug: 'holo-grid-sphere',
    name: 'Holo Grid Sphere',
    category: '3D & Math',
    badge: 'Sci-Fi',
    desc: 'Orb hologram futuristik bersinar dengan kisi grid bersudut melengkung rotasi kontinyu.',
    cols: 70,
    rows: 30,
    fps: 24,
    defaultSize: 10,
    tags: ['hologram', 'grid', 'scifi', 'glow']
  },
  {
    slug: 'retro-synth-sunset',
    name: 'Retro Synthwave Sunset',
    category: 'Retro & Art',
    badge: '80s Aesthetic',
    desc: 'Cakrawala synthwave outrun klasik tahun 80-an dengan matahari terbenam bergaris dan grid jalanan neon.',
    cols: 80,
    rows: 28,
    fps: 24,
    defaultSize: 9.5,
    tags: ['synthwave', 'outrun', 'retro', 'sunset']
  },
  {
    slug: 'cyberpunk-alley',
    name: 'Neo Cyberpunk Alley',
    category: 'Retro & Art',
    badge: 'Atmosphere',
    desc: 'Pemandangan lorong kota masa depan dengan papan reklame neon, kabel gantung, dan refleksi lantai basah.',
    cols: 82,
    rows: 30,
    fps: 24,
    defaultSize: 9.5,
    tags: ['cyberpunk', 'city', 'neon', 'urban']
  },
];

const LOOKS = [
  { id: '', name: 'Original', desc: 'Palet karakter asli bawaan karya' },
  { id: 'dots', name: 'Halftone Dots', desc: 'Titik halftone bulat lembut (·•●)' },
  { id: 'dense', name: 'Dense ASCII', desc: 'Rapatan karakter tebal penuh' },
  { id: 'binary', name: 'Binary 01', desc: 'Biner murni digital hacker (0 & 1)' },
  { id: 'numbers', name: 'Numbers', desc: 'Karakter angka desimal (0-9)' },
  { id: 'blocks', name: 'Blocks', desc: 'Blok shading UTF-8 (░▒▓█)' },
  { id: 'lines', name: 'Lines', desc: 'Karakter garis horisontal (╌─━═)' },
  { id: 'dither', name: 'Dither Bayer', desc: 'Matriks Bayer dither berpola 8x8' },
];

const COLOR_THEMES = [
  { id: 'original', name: 'Multicolor', color: null, mono: false, bgDot: 'bg-emerald-400' },
  { id: 'emerald', name: 'Emerald Cyber', color: '#22c55e', mono: true, bgDot: 'bg-green-500' },
  { id: 'amber', name: 'Amber CRT', color: '#f59e0b', mono: true, bgDot: 'bg-amber-500' },
  { id: 'cyan', name: 'Neon Cyan', color: '#06b6d4', mono: true, bgDot: 'bg-cyan-400' },
  { id: 'ice', name: 'Monochrome White', color: '#f4f4f5', mono: true, bgDot: 'bg-zinc-200' },
];

export function AsciiStudio() {
  const [selectedSlug, setSelectedSlug] = useState('matrix-rain');
  const [activeCategory, setActiveCategory] = useState('All');
  const [look, setLook] = useState('');
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0]);
  const [speed, setSpeed] = useState(1);
  const [size, setSize] = useState(10);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const selectedPiece = CURATED_PIECES.find((p) => p.slug === selectedSlug) || CURATED_PIECES[0];

  const categories = ['All', 'Screens & Code', '3D & Math', 'Retro & Art'];
  const filteredPieces = activeCategory === 'All'
    ? CURATED_PIECES
    : CURATED_PIECES.filter((p) => p.category === activeCategory);

  const handleCopyCli = () => {
    const cmd = `npx ascii-magic-art ${selectedPiece.slug}${look ? ` --look=${look}` : ''}${colorTheme.mono ? ' --mono' : ''}`;
    navigator.clipboard?.writeText(cmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  const handleCopyPrompt = () => {
    const promptText = `Add the animated ASCII art piece "${selectedPiece.slug}" (${selectedPiece.name}) from ASCII Magic (https://www.ascii-magic.com/ascii/${selectedPiece.slug}) to this project.
<script type="module" src="https://www.ascii-magic.com/ascii/ascii.js"></script>
<ascii-art piece="${selectedPiece.slug}"${look ? ` look="${look}"` : ''}${colorTheme.mono ? ' mono' : ''} size="${size}"></ascii-art>`;
    navigator.clipboard?.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  return (
    <section id="ascii-studio" className="section-container relative z-10 py-20">
      {/* Background Cyber Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="section-header-editorial text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
          <Zap size={13} className="text-emerald-400 animate-pulse" />
          <span>ASCII MAGIC ART ENGINE // 734 OPEN-SOURCE ANIMATIONS</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Interactive <span className="text-gradient-emerald">ASCII Art Studio</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Koleksi seni ASCII teranimasi berbasis <span className="text-emerald-400 font-mono">ascii-magic-art</span> (MIT License). 
          Jelajahi karya interaktif di bawah, sesuaikan <em>look karakter</em>, kecepatan, dan tint warna secara real-time langsung di browser Anda.
        </p>
      </div>

      {/* Studio Workbench Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Piece Selector & Categories (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex gap-1.5 p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(34,197,94,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Piece Cards List */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
            {filteredPieces.map((p) => {
              const isSelected = p.slug === selectedPiece.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => {
                    setSelectedSlug(p.slug);
                    if (p.defaultSize) setSize(p.defaultSize);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-emerald-950/50 border-emerald-500/60 shadow-[0_0_20px_rgba(34,197,94,0.18)]'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-lg mt-0.5 transition-colors ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800/80 text-zinc-400 group-hover:text-zinc-200'
                    }`}>
                      {p.category.includes('Screens') ? <Terminal size={16} /> :
                       p.category.includes('3D') ? <Box size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-emerald-300' : 'text-zinc-200'}`}>
                          {p.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={15} className={`shrink-0 ml-2 transition-transform ${
                    isSelected ? 'text-emerald-400 translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Quick Terminal Tip Box */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 text-xs text-zinc-400 font-mono space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Laptop size={14} />
              <span>Jalankan di Terminal Anda:</span>
            </div>
            <div className="p-2 rounded bg-black/80 border border-zinc-800 text-zinc-300 text-[11px] select-all flex items-center justify-between">
              <code>npx ascii-magic-art {selectedPiece.slug}</code>
              <button
                onClick={handleCopyCli}
                className="ml-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                title="Salin perintah CLI"
              >
                {copiedCli ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500">
              Menjalankan preview animasi berkecepatan 60 FPS langsung di layar konsol shell Linux, Mac, atau Windows terminal Anda.
            </p>
          </div>

        </div>

        {/* Right Column: Live Art Stage & Interactive Controller (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Visual Stage */}
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Stage Top Bar (Retro Terminal Styling) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/50" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
                </div>
                <div className="h-4 w-px bg-zinc-800 mx-1" />
                <span className="text-xs font-mono text-zinc-300 font-medium">
                  ascii-art // {selectedPiece.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  {selectedPiece.cols}×{selectedPiece.rows} @ {selectedPiece.fps}fps
                </span>
              </div>

              {/* Stage Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`p-1.5 rounded-lg border text-xs font-mono flex items-center gap-1 transition-colors ${
                    isPaused
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:text-white'
                  }`}
                  title={isPaused ? 'Putar animasi' : 'Jeda (freeze frame)'}
                >
                  {isPaused ? <Play size={13} /> : <Pause size={13} />}
                  <span className="hidden sm:inline">{isPaused ? 'Paused' : 'Playing'}</span>
                </button>

                <button
                  onClick={() => {
                    setLook('');
                    setColorTheme(COLOR_THEMES[0]);
                    setSpeed(1);
                    setSize(selectedPiece.defaultSize || 10);
                    setIsPaused(false);
                  }}
                  className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  title="Reset parameter ke default"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>

            {/* Stage Canvas Area */}
            <div className="relative min-h-[380px] max-h-[520px] flex items-center justify-center p-4 md:p-8 bg-black/95 overflow-hidden">
              
              {/* Subtle CRT Scanline Effect Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 z-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 2px)',
                  backgroundSize: '100% 2px'
                }}
              />

              {/* Glowing Ambient Radial Backdrop */}
              <div
                className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
                style={{
                  backgroundColor: colorTheme.color || '#22c55e',
                }}
              />

              {/* The Live Rendered AsciiArt Web Component */}
              <div className="relative z-0 max-w-full overflow-x-auto flex items-center justify-center">
                <AsciiArt
                  key={`${selectedPiece.slug}-${look}-${colorTheme.id}-${speed}-${size}`}
                  piece={selectedPiece.slug}
                  size={size}
                  speed={speed}
                  look={look}
                  mono={colorTheme.mono}
                  color={colorTheme.color}
                  still={isPaused}
                />
              </div>

              {/* Active Look & Tint Tag in Corner */}
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-400 border border-zinc-800 backdrop-blur-sm">
                  look: {look || 'original'}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-400 border border-zinc-800 backdrop-blur-sm flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${colorTheme.bgDot}`} />
                  {colorTheme.name}
                </span>
              </div>
            </div>

            {/* Piece Description & Metadata Strip */}
            <div className="p-4 bg-zinc-900/50 border-t border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-zinc-300">
                  <span className="text-emerald-400 font-semibold">{selectedPiece.name}</span>
                  <span className="text-zinc-600">//</span>
                  <span className="text-zinc-400">{selectedPiece.desc}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedPiece.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800/80 text-zinc-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyCli}
                  className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-mono font-medium hover:bg-emerald-900/50 hover:border-emerald-500 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                >
                  {copiedCli ? <Check size={13} className="text-emerald-400" /> : <Terminal size={13} />}
                  <span>{copiedCli ? 'Tersalin!' : 'Copy CLI (npx)'}</span>
                </button>

                <button
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 text-zinc-300 text-xs font-mono hover:text-white hover:bg-zinc-700/60 transition-all flex items-center gap-1.5"
                  title="Salin prompt untuk Claude / Cursor / Copilot"
                >
                  {copiedPrompt ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedPrompt ? 'Prompt Disalin!' : 'Copy AI Prompt'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Controls Panel (Looks, Color, Speed, Size) */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md space-y-5">
            
            {/* Control 1: Looks Redraw Characters */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Sliders size={14} className="text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                    Character Shading Look
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Menggambar ulang pixel dengan set glif khusus
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LOOKS.map((item) => {
                  const isActive = look === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLook(item.id)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                          : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-mono font-medium truncate">{item.name}</div>
                      <div className="text-[10px] text-zinc-500 truncate mt-0.5">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Color Themes & Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-3 border-t border-zinc-800/80">
              
              {/* Palette / Monochromatic Tint (5 cols) */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                  Color Theme / Phosphor
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_THEMES.map((theme) => {
                    const isActive = colorTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => setColorTheme(theme)}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-950 text-emerald-300'
                            : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${theme.bgDot}`} />
                        <span>{theme.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Size Slider (4 cols) */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold uppercase tracking-wider">Font Size</span>
                  <span className="text-emerald-400">{size}px</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="14"
                  step="0.5"
                  value={size}
                  onChange={(e) => setSize(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>7px (Kecil)</span>
                  <span>10px (Ideal)</span>
                  <span>14px (Besar)</span>
                </div>
              </div>

              {/* Playback Speed (3 cols) */}
              <div className="md:col-span-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold uppercase tracking-wider">Speed</span>
                  <span className="text-emerald-400">{speed}x</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0.5, 1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`flex-1 py-1 rounded text-xs font-mono transition-all ${
                        speed === s
                          ? 'bg-emerald-500 text-black font-semibold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AsciiStudio;
