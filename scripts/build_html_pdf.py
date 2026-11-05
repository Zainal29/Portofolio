#!/usr/bin/env python3
"""
Refined HTML-to-PDF Generator for Muhammad Zainal Arief (MZA.dev) 4-Page Portfolio PDF.
Pixel-perfect dark theme, authentic MZA vector logo, perfect single-line typography,
and exact 4-page A4 print layout.
"""

import os
import base64
import subprocess
from PIL import Image
import qrcode

def to_base64(path):
    with open(path, "rb") as f:
        data = f.read()
    ext = os.path.splitext(path)[1].lower().replace(".", "")
    mime = "image/jpeg" if ext in ["jpg", "jpeg"] else "image/png"
    return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"

def prepare_assets():
    os.makedirs("/tmp/mza_pdf_assets", exist_ok=True)
    
    # 1. Crop Zaducation banner to 16:9
    zad_orig = "src/assets/projects/zaducation.png"
    zad_dest = "/tmp/mza_pdf_assets/zaducation_banner.png"
    if os.path.exists(zad_orig):
        im = Image.open(zad_orig)
        crop_h = int(im.width * (9 / 16))
        cropped = im.crop((0, 0, im.width, min(crop_h, im.height)))
        cropped.save(zad_dest)

    # 2. QR Code
    qr = qrcode.QRCode(version=1, box_size=8, border=2)
    qr.add_data("https://maccer.vercel.app")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#22c55e", back_color="#090d16")
    qr_img.save("/tmp/mza_pdf_assets/portfolio_qr.png")

def generate_html():
    prepare_assets()
    
    photo_b64 = to_base64("src/assets/profilMZA_suit.jpg")
    didispen_b64 = to_base64("src/assets/projects/didispen.png")
    bewood_b64 = to_base64("src/assets/projects/bewood.png")
    zaducation_b64 = to_base64("/tmp/mza_pdf_assets/zaducation_banner.png")
    zeromoney_b64 = to_base64("src/assets/projects/zeromoney.png")
    qr_b64 = to_base64("/tmp/mza_pdf_assets/portfolio_qr.png")

    mza_svg_logo = """
    <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0c152a] via-[#090e1f] to-[#050813] border border-cyan-400/40 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.25)] flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 14 74 L 14 26 L 25 48 L 36 26 L 36 74" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 42 27 L 60 27 L 42 73 L 60 73" stroke="#10b981" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 66 74 L 77 26 L 88 74" stroke="#818cf8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 70 56 L 84 56" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
            <circle cx="77" cy="26" r="3" fill="#818cf8"/>
        </svg>
    </div>
    """

    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Muhammad Zainal Arief - Portofolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    colors: {{
                        brand: {{
                            50: '#f0fdf4',
                            400: '#4ade80',
                            500: '#22c55e',
                            600: '#16a34a',
                        }},
                        dark: {{
                            950: '#040711',
                            900: '#080d1a',
                            850: '#0c1326',
                            800: '#111b33',
                            700: '#1e293b'
                        }}
                    }},
                    fontFamily: {{
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                        display: ['Space Grotesk', 'sans-serif']
                    }}
                }}
            }}
        }}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <style>
        @page {{
            size: A4 portrait;
            margin: 0;
        }}
        *, *::before, *::after {{
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}
        html, body {{
            margin: 0;
            padding: 0;
            background: #040711;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }}
        .page {{
            width: 210mm;
            height: 297mm;
            page-break-after: always;
            page-break-inside: avoid;
            position: relative;
            background: #040711;
            padding: 12mm 14mm 10mm;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}
        .glass-card {{
            background: rgba(12, 19, 38, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
        }}
        .glass-card-accent {{
            background: rgba(12, 19, 38, 0.85);
            border: 1px solid rgba(34, 197, 94, 0.35);
            border-radius: 14px;
        }}
        .tech-pill {{
            background: #080d1a;
            border: 1px solid #1e293b;
            color: #cbd5e1;
            border-radius: 6px;
            padding: 3px 8px;
            font-size: 9.5px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }}
        .flow-badge {{
            background: #0b152d;
            border: 1px solid #38bdf8;
            color: #ffffff;
            border-radius: 6px;
            padding: 3px 8px;
            font-size: 9px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
        }}
        .flow-badge.highlight {{
            background: #064e3b;
            border-color: #22c55e;
            color: #4ade80;
        }}
    </style>
</head>
<body>

    <!-- =========================================================================
         PAGE 1: HERO, ABOUT ME, & SKILLS & TECHNOLOGIES
         ========================================================================= -->
    <div class="page">
        <div class="flex flex-col gap-5">

            <!-- Navbar with authentic MZA Logo -->
            <header class="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div class="flex items-center gap-2.5">
                    {mza_svg_logo}
                    <div class="flex flex-col">
                        <span class="font-extrabold text-base tracking-tight text-white font-mono leading-none">
                            MZA<span class="text-emerald-400">.dev</span>
                        </span>
                        <span class="text-[8px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">
                            Zainal Arief
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-6 text-[11px] font-medium text-slate-400">
                    <span class="text-emerald-400 font-semibold">Home</span>
                    <span>About</span>
                    <span>Skills</span>
                    <span>Projects</span>
                    <span>Experience</span>
                    <span>Contact</span>
                </div>

                <div class="flex items-center gap-2">
                    <span class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-semibold text-emerald-400">
                        Let's Talk &rarr;
                    </span>
                </div>
            </header>

            <!-- Hero Section -->
            <section class="grid grid-cols-12 gap-6 items-center pt-1">
                <div class="col-span-8 flex flex-col">
                    <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 mb-2.5 w-fit">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>WEB DEVELOPER · 2024 — SEKARANG</span>
                    </div>

                    <div class="text-slate-400 text-xs font-mono">Halo, saya</div>
                    <h1 class="text-3xl font-extrabold text-white tracking-tight leading-tight my-1">
                        Muhammad Zainal <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Arief.</span>
                    </h1>

                    <div class="flex items-center gap-1.5 text-slate-300 font-mono text-xs font-semibold mb-2">
                        <span class="text-emerald-400">&gt;_</span>
                        <span>Laravel Backend Developer &amp; Full-Stack Web Developer</span>
                    </div>

                    <p class="text-slate-300 text-[11px] leading-relaxed max-w-lg mb-3.5">
                        Saya siswa jurusan PPLG di <strong>SMK Negeri 1 Bangsri</strong>. Membangun aplikasi web yang memadukan logika arsitektur backend Laravel yang aman, relasi basis data MySQL terstruktur, dan antarmuka modern untuk menghadirkan pengalaman digital yang bermanfaat.
                    </p>

                    <!-- Buttons -->
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <span class="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-[11px] font-bold flex items-center gap-1">
                            Jelajahi Proyek &rarr;
                        </span>
                        <span class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 text-[11px] font-medium">
                            Hubungi Saya
                        </span>
                    </div>

                    <!-- Tech Badges Row -->
                    <div class="flex flex-wrap gap-1.5">
                        <span class="tech-pill"><span class="text-red-500 font-bold">L</span> Laravel</span>
                        <span class="tech-pill"><span class="text-purple-400 font-bold">&lt;?</span> PHP</span>
                        <span class="tech-pill"><span class="text-blue-400 font-bold">◈</span> MySQL</span>
                        <span class="tech-pill"><span class="text-cyan-400 font-bold">⚛</span> React</span>
                        <span class="tech-pill"><span class="text-sky-400 font-bold">~</span> Tailwind CSS</span>
                        <span class="tech-pill"><span class="text-emerald-400 font-bold">🍃</span> MongoDB</span>
                    </div>
                </div>

                <!-- Right Hero ID Card -->
                <div class="col-span-4 flex justify-end">
                    <div class="glass-card overflow-hidden border border-emerald-500/30 p-2.5 w-48 shadow-xl">
                        <div class="w-full h-56 rounded-lg overflow-hidden relative bg-slate-950">
                            <img src="{photo_b64}" alt="Muhammad Zainal Arief" class="w-full h-full object-cover">
                            <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[8.5px] font-mono text-emerald-300 font-semibold">
                                Clean Code
                            </div>
                        </div>
                        <div class="pt-2 text-center">
                            <div class="text-xs font-bold text-white">Muhammad Zainal Arief</div>
                            <div class="text-[9.5px] font-mono text-slate-400">SMKN 1 Bangsri · PPLG</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Tentang Saya (About Me) Section -->
            <section class="pt-1">
                <div class="flex items-baseline gap-2 mb-2">
                    <h2 class="text-xl font-extrabold text-white tracking-tight">
                        Tentang <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Saya.</span>
                    </h2>
                    <span class="text-[9px] font-mono text-slate-500">01 // PROFIL PENGEMBANG</span>
                </div>

                <div class="grid grid-cols-12 gap-5 items-start">
                    <div class="col-span-7 flex flex-col gap-2 text-[10.5px] text-slate-300 leading-relaxed">
                        <p>
                            Saya siswa dari SMK Negeri 1 Bangsri jurusan Pengembangan Perangkat Lunak dan Gim (PPLG), seorang web developer yang memiliki ketertarikan pada pengembangan aplikasi web modern, baik dari sisi frontend maupun arsitektur backend.
                        </p>
                        <p>
                            Saya senang mempelajari bagaimana sebuah website tidak hanya terlihat baik, tetapi juga dapat menyelesaikan masalah nyata secara fungsional, memiliki integritas basis data yang kokoh, dan memberikan pengalaman yang mudah digunakan bagi penggunanya.
                        </p>
                    </div>

                    <div class="col-span-5 flex flex-col gap-2">
                        <div class="glass-card p-2.5 flex items-start gap-2.5">
                            <span class="text-xs font-mono font-bold text-emerald-400">01</span>
                            <div>
                                <h4 class="text-xs font-bold text-white">Web Development</h4>
                                <p class="text-[9.5px] text-slate-400 leading-normal">Fokus pada pengembangan website responsif dan arsitektur backend yang aman.</p>
                            </div>
                        </div>
                        <div class="glass-card p-2.5 flex items-start gap-2.5">
                            <span class="text-xs font-mono font-bold text-emerald-400">02</span>
                            <div>
                                <h4 class="text-xs font-bold text-white">Problem Solving</h4>
                                <p class="text-[9.5px] text-slate-400 leading-normal">Mengubah kebutuhan administrasi menjadi solusi sistem digital yang terstruktur.</p>
                            </div>
                        </div>
                        <div class="glass-card p-2.5 flex items-start gap-2.5">
                            <span class="text-xs font-mono font-bold text-emerald-400">03</span>
                            <div>
                                <h4 class="text-xs font-bold text-white">Continuous Learning</h4>
                                <p class="text-[9.5px] text-slate-400 leading-normal">Aktif mengeksplorasi teknologi modern untuk meningkatkan efisiensi sistem.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skills & Technologies (2x2 Grid matching reference) -->
            <section class="pt-1">
                <div class="mb-2">
                    <h2 class="text-xl font-extrabold text-white tracking-tight">
                        Skills &amp; <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Technologies.</span>
                    </h2>
                    <p class="text-[10px] text-slate-400">Teknologi yang saya gunakan untuk membangun dan mengembangkan aplikasi web (revisi resmi industri).</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="glass-card p-3">
                        <h4 class="text-xs font-bold text-white mb-1">Frontend Development</h4>
                        <p class="text-[9.5px] text-slate-400 mb-2 leading-relaxed">Membangun antarmuka website yang responsif, interaktif, dan nyaman digunakan.</p>
                        <div class="flex flex-wrap gap-1">
                            <span class="tech-pill">HTML5</span>
                            <span class="tech-pill">CSS3</span>
                            <span class="tech-pill">JavaScript (ES6+)</span>
                            <span class="tech-pill">React.js</span>
                            <span class="tech-pill">Tailwind CSS</span>
                        </div>
                    </div>

                    <div class="glass-card p-3">
                        <h4 class="text-xs font-bold text-white mb-1">Backend Development</h4>
                        <p class="text-[9.5px] text-slate-400 mb-2 leading-relaxed">Mengembangkan sistem web dengan struktur backend yang terorganisir dan mudah dikembangkan.</p>
                        <div class="flex flex-wrap gap-1">
                            <span class="tech-pill">PHP+</span>
                            <span class="tech-pill">Laravel Framework</span>
                            <span class="tech-pill">MySQL Database</span>
                            <span class="tech-pill">RESTful API</span>
                        </div>
                    </div>

                    <div class="glass-card p-3">
                        <h4 class="text-xs font-bold text-white mb-1">Full-Stack Development</h4>
                        <p class="text-[9.5px] text-slate-400 mb-2 leading-relaxed">Menghubungkan frontend dan backend untuk menghasilkan sistem web yang fungsional dan terpadu.</p>
                        <div class="flex flex-wrap gap-1">
                            <span class="tech-pill">Laravel</span>
                            <span class="tech-pill">React</span>
                            <span class="tech-pill">REST API</span>
                            <span class="tech-pill">Eloquent ORM</span>
                        </div>
                    </div>

                    <div class="glass-card p-3">
                        <h4 class="text-xs font-bold text-white mb-1">Development Tools</h4>
                        <p class="text-[9.5px] text-slate-400 mb-2 leading-relaxed">Menggunakan berbagai tools untuk membantu proses pengembangan, debugging, dan pengelolaan kode.</p>
                        <div class="flex flex-wrap gap-1">
                            <span class="tech-pill">Git &amp; GitHub</span>
                            <span class="tech-pill">VS Code</span>
                            <span class="tech-pill">MongoDB</span>
                            <span class="tech-pill">Figma</span>
                            <span class="tech-pill">Postman</span>
                            <span class="tech-pill">Linux</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer Bar -->
        <footer class="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>Muhammad Zainal Arief · SMKN 1 Bangsri</span>
            <span class="text-emerald-400">Halaman 1 dari 4 · https://maccer.vercel.app</span>
        </footer>
    </div>


    <!-- =========================================================================
         PAGE 2: SELECTED PROJECTS (DIDISPEN, BEWOOD, ZADUCATION)
         ========================================================================= -->
    <div class="page">
        <div class="flex flex-col gap-4">

            <!-- Header -->
            <div class="pb-2 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-extrabold text-white tracking-tight">
                        Selected <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Projects.</span>
                    </h2>
                    <p class="text-[10px] text-slate-400 mt-0.5">Beberapa aplikasi web yang saya bangun untuk menerapkan kemampuan backend, frontend, database, dan problem solving.</p>
                </div>
                <div class="text-right font-mono text-[9px] text-slate-500">
                    <div>MZA.dev // 2026</div>
                    <div class="text-emerald-400">KARYA PROYEK PRODUKSI</div>
                </div>
            </div>

            <!-- PROJECT 1: DIDISPEN -->
            <div class="glass-card overflow-hidden p-3.5 border border-slate-800">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-mono font-bold text-emerald-400 tracking-wider">WEB APPLICATION</span>
                        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            Peran: Backend Developer
                        </span>
                        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            SMKN 1 Bangsri
                        </span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">&nearr;</span>
                </div>

                <div class="w-full h-40 rounded-lg overflow-hidden border border-slate-800 mb-2.5 bg-slate-950">
                    <img src="{didispen_b64}" alt="DIDISPEN" class="w-full h-full object-cover">
                </div>

                <div class="flex items-baseline justify-between mb-1">
                    <h3 class="text-base font-bold text-white">DIDISPEN</h3>
                    <div class="text-[9.5px] font-mono text-slate-400">didispen.smkn1bangsri.sch.id</div>
                </div>

                <p class="text-[10px] text-slate-300 leading-relaxed mb-2">
                    Sistem digital pengajuan dan pengelolaan dispensasi siswa secara real-time terintegrasi untuk guru piket dan wali kelas SMK Negeri 1 Bangsri, memangkas birokrasi manual menjadi sistem daring anti-duplikasi.
                </p>

                <!-- Stack Flow Box -->
                <div class="p-2 rounded-lg bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between mb-2">
                    <span class="text-[9px] font-mono font-bold text-emerald-400">Alur Stack:</span>
                    <div class="flex items-center gap-1.5 text-[8.5px] font-mono font-bold">
                        <span class="flow-badge highlight">Laravel 10</span>
                        <span class="text-emerald-400">&rarr;</span>
                        <span class="flow-badge">PHP</span>
                        <span class="text-emerald-400">&rarr;</span>
                        <span class="flow-badge">CSS3</span>
                        <span class="text-emerald-400">&rarr;</span>
                        <span class="flow-badge">JavaScript</span>
                        <span class="text-emerald-400">&rarr;</span>
                        <span class="flow-badge highlight">MySQL</span>
                    </div>
                </div>

                <div class="flex flex-wrap gap-1 text-[9px] font-mono text-slate-400">
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Laravel 10</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">PHP</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">MySQL Database</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Tailwind CSS</span>
                </div>
            </div>

            <!-- PROJECT 2: BEWOOD -->
            <div class="glass-card overflow-hidden p-3.5 border border-slate-800">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-mono font-bold text-amber-400 tracking-wider">WEB E-COMMERCE</span>
                        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            Peran: Backend Developer
                        </span>
                        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            UMKM Mebel Jepara
                        </span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">&nearr;</span>
                </div>

                <div class="w-full h-36 rounded-lg overflow-hidden border border-slate-800 mb-2.5 bg-slate-950">
                    <img src="{bewood_b64}" alt="BeWood" class="w-full h-full object-cover">
                </div>

                <div class="flex items-baseline justify-between mb-1">
                    <h3 class="text-base font-bold text-white">BeWood</h3>
                    <div class="text-[9.5px] font-mono text-slate-400">Katalog Mebel Digital</div>
                </div>

                <p class="text-[10px] text-slate-300 leading-relaxed mb-2">
                    Platform katalog digital dan pemasaran produk mebel khas Jepara untuk memperluas jangkauan UMKM pengrajin lokal melalui pemesanan langsung WhatsApp.
                </p>

                <!-- Stack Flow Box -->
                <div class="p-2 rounded-lg bg-slate-950/80 border border-amber-500/30 flex items-center justify-between mb-2">
                    <span class="text-[9px] font-mono font-bold text-amber-400">Alur Stack:</span>
                    <div class="flex items-center gap-1.5 text-[8.5px] font-mono font-bold">
                        <span class="flow-badge highlight">Laravel</span>
                        <span class="text-amber-400">&rarr;</span>
                        <span class="flow-badge">PHP</span>
                        <span class="text-amber-400">&rarr;</span>
                        <span class="flow-badge">Tailwind CSS</span>
                        <span class="text-amber-400">&rarr;</span>
                        <span class="flow-badge">JavaScript</span>
                        <span class="text-amber-400">&rarr;</span>
                        <span class="flow-badge highlight">MySQL</span>
                    </div>
                </div>

                <div class="flex flex-wrap gap-1 text-[9px] font-mono text-slate-400">
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Laravel</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">PHP</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">MySQL</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">JavaScript</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Tailwind CSS</span>
                </div>
            </div>

            <!-- PROJECT 3: ZADUCATION -->
            <div class="glass-card overflow-hidden p-3 border border-slate-800">
                <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2">
                        <span class="text-[9.5px] font-mono font-bold text-cyan-400 tracking-wider">LANDING PAGE DESIGN</span>
                        <span class="text-[8.5px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Edukasi &amp; Kursus
                        </span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">&nearr;</span>
                </div>

                <div class="grid grid-cols-12 gap-3 items-center">
                    <div class="col-span-5 h-20 rounded overflow-hidden border border-slate-800 bg-slate-950">
                        <img src="{zaducation_b64}" alt="Zaducation" class="w-full h-full object-cover">
                    </div>
                    <div class="col-span-7">
                        <h4 class="text-sm font-bold text-white mb-0.5">Zaducation</h4>
                        <p class="text-[9.5px] text-slate-300 leading-normal mb-1.5">Desain landing page bertema edukasi yang dibuat dengan fokus pada tampilan modern, struktur informasi, dan kenyamanan orientasi belajar.</p>
                        <div class="flex gap-1 text-[8px] font-mono text-slate-400">
                            <span class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">Figma</span>
                            <span class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">UI/UX Design</span>
                            <span class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">Prototyping</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <footer class="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>Muhammad Zainal Arief · Selected Projects</span>
            <span class="text-emerald-400">Halaman 2 dari 4 · https://maccer.vercel.app</span>
        </footer>
    </div>


    <!-- =========================================================================
         PAGE 3: ZEROMONEY & MY JOURNEY (TIMELINE)
         ========================================================================= -->
    <div class="page">
        <div class="flex flex-col gap-5">

            <!-- Header -->
            <div class="pb-2 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-extrabold text-white tracking-tight">
                        Selected Projects <span class="text-slate-400">&amp;</span> <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Journey.</span>
                    </h2>
                    <p class="text-[10px] text-slate-400 mt-0.5">Desain antarmuka finansial dan rekam jejak perkembangan kompetensi teknologi saya.</p>
                </div>
                <div class="text-right font-mono text-[9px] text-slate-500">
                    <div>MZA.dev // 2026</div>
                    <div class="text-emerald-400">REKAM JEJAK KOMPETENSI</div>
                </div>
            </div>

            <!-- PROJECT 4: ZEROMONEY -->
            <div class="glass-card overflow-hidden p-3.5 border border-slate-800">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-mono font-bold text-amber-400 tracking-wider">FINANCE DASHBOARD</span>
                        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            Peran: Interface &amp; Dashboard Designer
                        </span>
                        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Fintech UI
                        </span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">&nearr;</span>
                </div>

                <div class="w-full h-44 rounded-lg overflow-hidden border border-slate-800 mb-2.5 bg-slate-950">
                    <img src="{zeromoney_b64}" alt="ZeroMoney" class="w-full h-full object-cover">
                </div>

                <div class="flex items-baseline justify-between mb-1">
                    <h3 class="text-base font-bold text-white">ZeroMoney</h3>
                    <div class="text-[9.5px] font-mono text-slate-400">Fintech Management Dashboard</div>
                </div>

                <p class="text-[10.5px] text-slate-300 leading-relaxed mb-2">
                    Desain antarmuka dashboard finance untuk menampilkan informasi keuangan secara terstruktur, analitik cashflow pengeluaran harian, dan visualisasi tabungan melalui tampilan yang sederhana dan mudah dipahami.
                </p>

                <div class="flex flex-wrap gap-1 text-[9px] font-mono text-slate-400">
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">UI Design</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Dashboard Layout</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Data Visualization</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Figma</span>
                </div>
            </div>

            <!-- MY JOURNEY (Vertical timeline matching reference) -->
            <section class="pt-1">
                <div class="mb-3">
                    <h3 class="text-xl font-extrabold text-white tracking-tight">
                        My <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Journey.</span>
                    </h3>
                    <p class="text-[10px] text-slate-400">Perjalanan saya dalam mempelajari, membangun, dan terus mengembangkan kemampuan di dunia web development.</p>
                </div>

                <div class="flex flex-col gap-2.5">
                    <div class="glass-card p-3 flex items-start gap-3">
                        <span class="text-[8.5px] font-mono font-bold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 tracking-wider">
                            BEGINNING
                        </span>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">Mulai Mempelajari Web Development</h4>
                            <p class="text-[10px] text-slate-400 leading-relaxed">
                                Memulai perjalanan dengan mempelajari dasar HTML, CSS, JavaScript, dan bagaimana sebuah website dibangun dari sisi frontend di SMK Negeri 1 Bangsri.
                            </p>
                        </div>
                    </div>

                    <div class="glass-card p-3 flex items-start gap-3">
                        <span class="text-[8.5px] font-mono font-bold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 tracking-wider">
                            DEVELOPMENT
                        </span>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">Mendalami Backend Development &amp; Database</h4>
                            <p class="text-[10px] text-slate-400 leading-relaxed">
                                Mulai membangun aplikasi web dengan PHP dan Laravel serta mempelajari arsitektur MVC, database relasional MySQL, routing, authentication, dan struktur aplikasi yang aman.
                            </p>
                        </div>
                    </div>

                    <div class="glass-card p-3 flex items-start gap-3">
                        <span class="text-[8.5px] font-mono font-bold px-2 py-1 rounded bg-slate-900 border border-emerald-500/40 text-emerald-400 tracking-wider">
                            PROJECT
                        </span>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">Membangun Project Nyata (DIDISPEN)</h4>
                            <p class="text-[10px] text-slate-400 leading-relaxed">
                                Mengembangkan project sistem informasi DIDISPEN untuk menerapkan kemampuan web development dalam menyelesaikan kebutuhan nyata perizinan siswa di sekolah.
                            </p>
                        </div>
                    </div>

                    <div class="glass-card p-3 flex items-start gap-3">
                        <span class="text-[8.5px] font-mono font-bold px-2 py-1 rounded bg-slate-900 border border-emerald-500/40 text-emerald-400 tracking-wider">
                            PROJECT
                        </span>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">Membangun Project Nyata (BeWood)</h4>
                            <p class="text-[10px] text-slate-400 leading-relaxed">
                                Mengembangkan platform katalog e-commerce BeWood untuk membantu digitalisasi UMKM mebel khas Jepara dan memperluas pemasaran produk kayu lokal.
                            </p>
                        </div>
                    </div>

                    <div class="glass-card p-3 flex items-start gap-3">
                        <span class="text-[8.5px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 tracking-wider">
                            NOW &amp; PKL
                        </span>
                        <div>
                            <h4 class="text-xs font-bold text-white mb-0.5">Mengembangkan Skill Full-Stack &amp; Kesiapan Industri</h4>
                            <p class="text-[10px] text-slate-400 leading-relaxed">
                                Terus mengembangkan kemampuan backend dan frontend serta mengeksplorasi React, MongoDB, REST API, dan siap terjun pada program Praktik Kerja Lapangan (PKL).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <footer class="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>Muhammad Zainal Arief · My Journey</span>
            <span class="text-emerald-400">Halaman 3 dari 4 · https://maccer.vercel.app</span>
        </footer>
    </div>


    <!-- =========================================================================
         PAGE 4: LET'S CONNECT & CONTACT DIRECTORY (MATCHING REFERENCE)
         ========================================================================= -->
    <div class="page">
        <div class="flex flex-col gap-6">

            <!-- Header with authentic MZA logo -->
            <header class="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div class="flex items-center gap-2.5">
                    {mza_svg_logo}
                    <span class="font-bold text-base tracking-tight text-white font-mono">
                        MZA<span class="text-emerald-400">.dev</span>
                    </span>
                </div>
                <div class="text-[10px] font-mono text-emerald-400">
                    LET'S CONNECT // CONTACT
                </div>
            </header>

            <!-- Main Big Headline (Matching reference Page 4) -->
            <section class="grid grid-cols-12 gap-8 items-start pt-4">
                <div class="col-span-7 flex flex-col">
                    <div class="text-[10px] font-mono text-emerald-400 tracking-widest uppercase mb-3">
                        HAVE A PROJECT IN MIND?
                    </div>

                    <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
                        Mari buat<br>
                        sesuatu yang<br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">bermanfaat.</span>
                    </h1>

                    <p class="text-slate-400 text-xs leading-relaxed max-w-md mb-8">
                        Saya terbuka untuk berdiskusi mengenai penugasan magang industri (PKL), proyek website, pengembangan aplikasi berbasis Laravel, maupun kolaborasi di bidang web development.
                    </p>

                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
                            ✉
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[9px] font-mono text-slate-500 uppercase">Email Utama</span>
                            <span class="text-sm font-bold text-white font-mono">theevil1896@gmail.com &nearr;</span>
                        </div>
                    </div>
                </div>

                <!-- Right Side Metadata List (5 columns for single line urls) -->
                <div class="col-span-5 flex flex-col gap-4 text-xs">
                    <div>
                        <div class="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">BASED IN</div>
                        <div class="font-bold text-white">Indonesia, Jepara (Jawa Tengah)</div>
                    </div>

                    <div>
                        <div class="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">SEKOLAH</div>
                        <div class="font-bold text-white">SMK Negeri 1 Bangsri (PPLG)</div>
                    </div>

                    <div>
                        <div class="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">FOCUS</div>
                        <div class="font-bold text-emerald-400">Web Development (Laravel Backend)</div>
                    </div>

                    <div>
                        <div class="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">STACK</div>
                        <div class="font-semibold text-slate-200">Laravel · React · MySQL · Tailwind</div>
                    </div>

                    <div>
                        <div class="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">WHATSAPP</div>
                        <div class="font-semibold text-slate-200 font-mono">+62 895-0950-7443</div>
                    </div>

                    <div>
                        <div class="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">SOCIAL</div>
                        <div class="flex flex-col gap-1 font-mono text-[10.5px] text-slate-300">
                            <span>GitHub: <strong class="text-white">github.com/Zainal29</strong></span>
                            <span>LinkedIn: <strong class="text-white">linkedin.com/in/muhammad-zainal-arief</strong></span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Bottom Online Portfolio Box with QR Code (Matching reference) -->
            <section class="glass-card p-5 border border-emerald-500/30 mt-8 flex items-center justify-between">
                <div class="flex flex-col gap-2">
                    <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        AKSES PORTOFOLIO ONLINE &amp; INTERAKTIF
                    </span>
                    <h3 class="text-base font-bold text-white">
                        Kunjungi Versi Web Interaktif
                    </h3>
                    <p class="text-[11px] text-slate-400 max-w-sm leading-relaxed">
                        Pindai QR code di samping atau klik tautan di bawah untuk melihat live demo, animasi interaktif terminal, dan kode sumber proyek.
                    </p>
                    <div class="text-xs font-mono font-bold text-emerald-400">
                        Link Website: <span class="underline">https://maccer.vercel.app</span>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-emerald-500/40">
                    <img src="{qr_b64}" alt="QR Code Portfolio" class="w-24 h-24 rounded-lg">
                    <span class="text-[8px] font-mono text-emerald-400 font-semibold">SCAN ME</span>
                </div>
            </section>

        </div>

        <!-- Footer -->
        <footer class="pt-3 border-t border-slate-800 flex items-center justify-between text-[9.5px] text-slate-400 font-mono">
            <span>MZA.dev · © 2026 Muhammad Zainal Arief</span>
            <span class="text-emerald-400">Dokumen Portofolio Resmi Diperbarui · Halaman 4 dari 4</span>
        </footer>
    </div>

</body>
</html>"""

    output_html = "/home/zainal/Documents/portofolio/test_build_template.html"
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Generated HTML template: {output_html}")
    return output_html

def convert_html_to_pdf(html_path):
    output_pdf = "/home/zainal/Documents/portofolio/Portofolio_Muhammad_Zainal_Arief.pdf"
    public_pdf = "/home/zainal/Documents/portofolio/public/Portofolio_Muhammad_Zainal_Arief.pdf"
    
    cmd = [
        "flatpak", "run",
        "--share=network",
        "--filesystem=host",
        "com.google.Chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={output_pdf}",
        f"file://{html_path}"
    ]
    print("Running headless Chrome print...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    print("STDOUT:", res.stdout)
    print("STDERR:", res.stderr)
    
    if os.path.exists(output_pdf):
        import shutil
        shutil.copy2(output_pdf, public_pdf)
        print(f"Successfully created {output_pdf} and {public_pdf}")
    else:
        print("Error: output PDF not found!")
    
    if os.path.exists(html_path):
        os.remove(html_path)

if __name__ == "__main__":
    html_file = generate_html()
    convert_html_to_pdf(html_file)
