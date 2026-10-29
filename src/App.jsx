import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import {
  ArrowUpRight, Code2, Menu, X, Mail, Download, Terminal,
  Database, Layout, GitBranch, Copy, Check, Sparkles, Layers,
  ExternalLink, Search, TrendingUp, Compass, FolderGit2, FileText, Globe,
  Volume2, VolumeX, ArrowUp, Activity, CheckCircle2, ChevronRight, ChevronDown,
  Image as ImageIcon, Zap, Cpu, FileCode, Clock, HelpCircle, User, Radio, Trash2, RotateCcw, AlertCircle
} from 'lucide-react';
import { AsciiReveal, AsciiSkeleton } from 'ascii-reveal';

// --- ASSETS ---
import heroImg from './assets/profilMZA_halfbody.jpg';
import didispenImg from './assets/projects/didispen.png';
import bewoodImg from './assets/projects/bewood.png';
import zaducationImg from './assets/projects/zaducation.png';
import zeromoneyImg from './assets/projects/zeromoney.png';
import './App.css';

// --- DATA DEFINITIONS ---
const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const skills = [
  {
    number: '01',
    icon: <Layout size={22} />,
    title: 'Frontend Development',
    description: 'Membangun antarmuka web modern yang responsif, terstruktur rapi, dan cepat diakses di berbagai perangkat.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind']
  },
  {
    number: '02',
    icon: <Database size={22} />,
    title: 'Backend Development',
    description: 'Mengembangkan sistem logika server, autentikasi, dan basis data relasional yang efisien serta aman.',
    tools: ['PHP', 'Laravel', 'MySQL', 'REST API']
  },
  {
    number: '03',
    icon: <Code2 size={22} />,
    title: 'Full-Stack Integration',
    description: 'Menyatukan frontend dan backend secara terpadu melalui arsitektur MVC dan integrasi API yang solid.',
    tools: ['Laravel', 'React', 'Blade', 'MySQL']
  },
  {
    number: '04',
    icon: <GitBranch size={22} />,
    title: 'Tools & Workflow',
    description: 'Menggunakan alat kolaborasi modern untuk version control, debugging, dan perancangan prototipe UI/UX.',
    tools: ['Git', 'GitHub', 'Figma', 'VS Code', 'Three.js']
  },
];

const projects = [
  {
    id: 'didispen',
    type: 'web',
    number: '01',
    title: 'DIDISPEN',
    category: 'WEB APPLICATION',
    badge: 'SMKN 1 Bangsri',
    description: 'Sistem digital pengajuan dan pengelolaan izin dispensasi siswa secara terpadu dan otomatis.',
    longDescription: 'DIDISPEN adalah aplikasi web komprehensif yang dirancang khusus untuk SMK Negeri 1 Bangsri. Aplikasi ini mendigitalisasi proses perizinan siswa yang sebelumnya manual menjadi online, lengkap dengan alur persetujuan guru berjenjang, rekapitulasi data real-time, dan filter pencarian yang cepat.',
    image: didispenImg,
    tools: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind'],
    features: [
      'Alur pengajuan dispensasi online terstruktur & anti-duplikasi',
      'Verifikasi persetujuan bertingkat (Wali Kelas & Guru Piket)',
      'Ekspor laporan perizinan format Excel & PDF untuk arsip tata usaha'
    ],
    architecture: [
      'Backend: Laravel 10 MVC Architecture & Eloquent ORM',
      'Database: MySQL Relational Schema (Dispen, Users, Logs)',
      'Frontend: Responsive Tailwind CSS & Blade Template Engine'
    ],
    links: {
      demo: 'https://didispen.smkn1bangsri.sch.id',
      github: 'https://github.com/Zainal29/Didispen'
    }
  },
  {
    id: 'bewood',
    type: 'web',
    number: '02',
    title: 'BeWood',
    category: 'WEB E-COMMERCE',
    badge: 'UMKM Mebel Jepara',
    description: 'Platform katalog digital dan pemasaran produk mebel khas Jepara untuk memperluas jangkauan UMKM lokal.',
    longDescription: 'BeWood dikembangkan untuk membantu pengrajin dan pelaku usaha mebel di Jepara dalam memamerkan katalog produk, pengelolaan pesanan, serta mempermudah calon pembeli berinteraksi langsung dengan penyedia mebel secara digital.',
    image: bewoodImg,
    tools: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind'],
    features: [
      'Galeri katalog produk furnitur Jepara beresolusi tinggi',
      'Filter pencarian berdasarkan kategori kayu, tipe, dan harga',
      'Integrasi direct checkout & negosiasi ke WhatsApp pengrajin'
    ],
    architecture: [
      'Routing: RESTful Resource Routing & Middleware Auth',
      'Database: Katalog Relasional Produk, Kategori, & Pesanan',
      'Performance: Asset Optimization & Responsive UI Tailwind'
    ],
    links: {
      demo: '',
      github: 'https://github.com/Zainal29/BeWood_3'
    }
  },
  {
    id: 'zaducation',
    type: 'design',
    number: '03',
    title: 'Zaducation',
    category: 'LANDING PAGE DESIGN',
    badge: 'Education UI',
    description: 'Konsep desain landing page edukasi interaktif dengan fokus visual yang modern dan ramah pengguna.',
    longDescription: 'Zaducation adalah proyek perancangan UI/UX landing page platform edukasi. Dibuat menyeluruh di Figma dengan penekanan pada kejelasan informasi, hierarki visual yang seimbang, dan prototipe interaktif untuk kenyamanan navigasi pengguna.',
    image: zaducationImg,
    tools: ['Figma', 'HTML5', 'CSS3'],
    features: [
      'Interaksi onboarding calon siswa interaktif & modern',
      'Hierarki kartu silabus pembelajaran dengan visual clear',
      'Desain responsif mobile-first untuk kenyamanan smartphone'
    ],
    architecture: [
      'Figma Design System: Typography & Color Tokens',
      'Component Architecture: Reusable UI Kit & Auto-Layout',
      'Prototype: Micro-interactions & Smart Animate Transitions'
    ],
    links: {
      demo: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=805-93&t=KiWeNoUMVrqMuPzq-1',
      github: ''
    }
  },
  {
    id: 'zeromoney',
    type: 'design',
    number: '04',
    title: 'ZeroMoney',
    category: 'FINANCE DASHBOARD',
    badge: 'Fintech UI',
    description: 'Desain antarmuka dashboard keuangan pribadi untuk mempermudah visualisasi arus kas dan anggaran.',
    longDescription: 'ZeroMoney merupakan perancangan dashboard finansial yang menyederhanakan data keuangan yang rumit (pemasukan, pengeluaran harian, grafik tren) menjadi antarmuka visual yang intuitif, bersih, dan mudah dipahami.',
    image: zeromoneyImg,
    tools: ['Figma', 'React', 'Tailwind'],
    features: [
      'Widget grafik interaktif arus kas pemasukan & pengeluaran',
      'Visualisasi progress target tabungan & anggaran bulanan',
      'Dark mode aesthetic bernuansa cyber emerald & glassmorphism'
    ],
    architecture: [
      'Dashboard Layout: Bento Grid Component Modular Structure',
      'Data Visualization: Analytical Hierarchy & Metric Blocks',
      'Figma Prototype: High-Fidelity Interactive State Machine'
    ],
    links: {
      demo: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=1136-2322&t=KiWeNoUMVrqMuPzq-1',
      github: ''
    }
  },
];

// --- JOURNEY DEFINITIONS (KELAS 10, 11, 12 SESUAI INSTRUKSI USER) ---
const journeyItems = [
  {
    number: '01',
    period: '2023 — 2024 · KELAS 10',
    title: 'Fondasi Pemrograman Web & Algoritma',
    role: 'Siswa PPLG SMKN 1 Bangsri',
    description: 'Mempelajari dasar-dasar pemrograman web dari nol, merancang antarmuka semantik dengan HTML5 & CSS3, serta mengasah pemecahan masalah komputasional menggunakan algoritma dasar JavaScript.',
    highlights: [
      'Memahami struktur web semantik dan prinsip responsive web design multi-perangkat',
      'Mengembangkan logika algoritma, manipulasi DOM, dan event handling JavaScript',
      'Pengenalan version control Git dan kolaborasi kode via GitHub'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Algoritma', 'Git', 'Responsive Web']
  },
  {
    number: '02',
    period: '2024 — 2025 · KELAS 11',
    title: 'Backend Laravel, Database & Membangun Sistem Nyata',
    role: 'Backend & Full-Stack Developer',
    description: 'Mendalami perancangan sistem backend dengan PHP dan Framework Laravel. Menghubungkan basis data relasional MySQL, merancang RESTful API, serta mengimplementasikan dua sistem nyata untuk sekolah dan UMKM lokal.',
    highlights: [
      'Membangun sistem DIDISPEN (Digitalisasi Dispensasi Siswa SMKN 1 Bangsri)',
      'Mengembangkan BeWood (Platform E-Commerce Produk Mebel Khas Jepara)',
      'Penerapan autentikasi multi-role, migrasi database, dan relasi Eloquent ORM'
    ],
    tags: ['PHP 8.2', 'Laravel', 'MySQL', 'REST API', 'Blade', 'Tailwind', 'DIDISPEN', 'BeWood']
  },
  {
    number: '03',
    period: '2025 — SEKARANG · KELAS 12',
    title: 'Pengembangan Lanjutan, Frontend Modern & Kesiapan PKL',
    role: 'Candidate Full-Stack Web Developer (Siap PKL)',
    description: 'Memperluas kapabilitas ke ekosistem frontend modern berbasis React, Tailwind CSS, animasi WebGL Three.js, serta menyempurnakan arsitektur kode dan portfolio untuk siap berkontribusi langsung pada mitra industri.',
    highlights: [
      'Penguasaan React.js modern: Hooks, State Management, dan animasi Framer Motion',
      'Eksplorasi grafis 3D interaktif Three.js dan micro-interactions berkinerja tinggi',
      '100% Siap Magang / PKL dengan etos kerja disiplin dan komitmen kolaborasi tim'
    ],
    tags: ['React', 'Laravel', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Siap PKL / Mitra']
  },
];

// --- 3D THREE.JS BACKGROUND COMPONENT (LIGHTWEIGHT, BATTERY-EFFICIENT CYBER ORB) ---
function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: !isMobile, // Disable on mobile high-DPI screens for maximum FPS
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Geodesic Cyber Sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(4.2, isMobile ? 1 : 2);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.16
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    mainGroup.add(sphereMesh);

    // 2. Inner Glowing Octahedron Core
    const coreGeometry = new THREE.OctahedronGeometry(2.1, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 3. Hologram Orbital Laser Ring 1 (Optimized segment count)
    const ring1Geometry = new THREE.TorusGeometry(5.6, 0.035, 12, 48);
    const ring1Material = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 });
    const ring1Mesh = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    mainGroup.add(ring1Mesh);

    // 4. Hologram Orbital Laser Ring 2 (Optimized segment count)
    const ring2Geometry = new THREE.TorusGeometry(5.2, 0.03, 12, 48);
    const ring2Material = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.28 });
    const ring2Mesh = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2Mesh.rotation.x = -Math.PI / 3.5;
    ring2Mesh.rotation.z = Math.PI / 4;
    mainGroup.add(ring2Mesh);

    // 5. Floating Green Ambient Stardust Particles (Adaptive count)
    const particleCount = isMobile ? 120 : 300;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.35, 'rgba(74, 222, 128, 0.8)');
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.45 : 0.55,
      map: particleTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 6) return;
      lastW = window.innerWidth;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    };

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    let isTabVisible = !document.hidden;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Stop work completely if tab is hidden (saves 100% idle laptop/mobile battery)
      if (!isTabVisible) return;

      // Skip render pass when scrolled far below hero section into content
      if (scrollY > window.innerHeight * 2.2) return;

      const elapsedTime = clock.getElapsedTime();

      sphereMesh.rotation.y = elapsedTime * 0.08;
      sphereMesh.rotation.x = elapsedTime * 0.05;

      coreMesh.rotation.y = -elapsedTime * 0.14;
      coreMesh.rotation.x = -elapsedTime * 0.10;

      ring1Mesh.rotation.z = elapsedTime * 0.12;
      ring2Mesh.rotation.z = -elapsedTime * 0.15;

      particleField.rotation.y = elapsedTime * 0.015;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 1.1;
      mainGroup.rotation.x = targetY * 1.1;

      camera.position.y = -(scrollY * 0.0025);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      sphereGeometry.dispose();
      sphereMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="webgl-canvas" ref={canvasRef} />;
}

// --- SYNTHESIZED WEB AUDIO API SFX ENGINE (ZERO ASSET LATENCY) ---
let audioCtx = null;
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playSound = (type = 'click') => {
  if (typeof window !== 'undefined' && window.__soundEnabled === false) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.045);
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'hover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.025);
    } else if (type === 'tab') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.setValueAtTime(750, now + 0.035);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + idx * 0.045);
        g.gain.setValueAtTime(0.035, now + idx * 0.045);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.16);
        o.start(now + idx * 0.045);
        o.stop(now + idx * 0.045 + 0.16);
      });
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Graceful fallback
  }
};

// --- CLEAR, HIGH-CONTRAST, OFFICIAL BRAND TECH LOGOS (INTERACTIVE FILTERABLE) ---
const TechLogo = ({ name, active = false, onClick }) => {
  const logos = {
    Laravel: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <path d="M43.5 12.8L25.8 2.6c-.5-.3-1.1-.3-1.6 0L6.5 12.8c-.5.3-.8.8-.8 1.4v20.4c0 .6.3 1.1.8 1.4l17.7 10.2c.5.3 1.1.3 1.6 0l17.7-10.2c.5-.3.8-.8.8-1.4V14.2c0-.6-.3-1.1-.8-1.4z" fill="#FF2D20"/>
        <path d="M25 6.2l13.9 8-13.9 8-13.9-8L25 6.2z" fill="#ffffff" fillOpacity="0.85"/>
        <path d="M11.1 16.2l12.9 7.4v15L11.1 31.2v-15z" fill="#ffffff" fillOpacity="0.6"/>
        <path d="M26 38.6V23.6l12.9-7.4v15L26 38.6z" fill="#ffffff" fillOpacity="0.95"/>
      </svg>
    ),
    React: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="25" rx="9" ry="21" stroke="#61DAFB" strokeWidth="2.5"/>
        <ellipse cx="25" cy="25" rx="9" ry="21" transform="rotate(60 25 25)" stroke="#61DAFB" strokeWidth="2.5"/>
        <ellipse cx="25" cy="25" rx="9" ry="21" transform="rotate(120 25 25)" stroke="#61DAFB" strokeWidth="2.5"/>
        <circle cx="25" cy="25" r="3.5" fill="#61DAFB"/>
      </svg>
    ),
    Tailwind: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <path d="M13.5 22.5c2-8 7-12 15-12 10 0 11.5 7.5 15.5 9.5-2 8-7 12-15 12-10 0-11.5-7.5-15.5-9.5z" fill="#38BDF8"/>
        <path d="M6 34.5c1.8-7 6.3-10.5 13.5-10.5 9 0 10.4 6.5 14 8.3-1.8 7-6.3 10.5-13.5 10.5-9 0-10.4-6.5-14-8.3z" fill="#38BDF8" fillOpacity="0.8"/>
      </svg>
    ),
    PHP: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="25" rx="23" ry="14" fill="#777BB4"/>
        <text x="25" y="29" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PHP</text>
      </svg>
    ),
    MySQL: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="10" fill="#00758F"/>
        <text x="25" y="27" fill="#F29111" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">MY</text>
        <text x="25" y="38" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">SQL</text>
      </svg>
    ),
    Figma: (
      <svg className="tech-icon-svg" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    ),
    JavaScript: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="8" fill="#F7DF1E"/>
        <path d="M16 22v16c0 4-3 5-7 5-2 0-4-.5-5-1.5l1.5-3.5c.8.5 2 .8 3.5.8 2 0 3-.8 3-2.8V22h4zm22 10.5c0 5-3.5 8.5-9.5 8.5-3.5 0-6.5-1-8-2.5l2-3.5c1.2 1 3.5 2 6 2 3 0 5-1.5 5-4s-2-3.5-5.5-5c-5-2-7.5-4-7.5-8 0-4.5 3.5-8 8.5-8 3 0 5 .8 6.5 1.8l-1.8 3.5c-1-.8-2.5-1.3-4.7-1.3-3 0-4.5 1.5-4.5 3.5 0 2 1.5 3 4.5 4.2 5.5 2.3 9 4.3 9 9.8z" fill="#000000"/>
      </svg>
    ),
    HTML5: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <path d="M7 3l4 39 14 5 14-5 4-39H7z" fill="#E44D26"/>
        <path d="M25 43.5l11-4 3.5-33.5H25v37.5z" fill="#F16529"/>
        <path d="M25 15h9.5l-.8 8.5H25v-8.5zm0 13.5l-.2 2.5-4.5-1.2-.3-3.3h-4.5l.5 6.5 9 2.5v-7z" fill="#EBEBEB"/>
        <path d="M25 15v8.5h-9.2l-.3-3.5H25zm0 13.5v7l-9-2.5-.5-6.5h4.5l.3 3.3 4.5 1.2.2-2.5z" fill="#ffffff"/>
      </svg>
    ),
    CSS3: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <path d="M7 3l4 39 14 5 14-5 4-39H7z" fill="#1572B6"/>
        <path d="M25 43.5l11-4 3.5-33.5H25v37.5z" fill="#33A9DC"/>
        <path d="M25 15h9.5l-.8 8.5H25v-8.5zm0 13.5l-.2 2.5-4.5-1.2-.3-3.3h-4.5l.5 6.5 9 2.5v-7z" fill="#EBEBEB"/>
      </svg>
    ),
    Git: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="10" fill="#F05032"/>
        <circle cx="25" cy="14" r="5" fill="#ffffff"/>
        <circle cx="16" cy="34" r="5" fill="#ffffff"/>
        <circle cx="34" cy="34" r="5" fill="#ffffff"/>
        <path d="M25 19v10M25 29l-9 5M25 29l9 5" stroke="#ffffff" strokeWidth="3"/>
      </svg>
    ),
    GitHub: (
      <svg className="tech-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#f1f5f9" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    'VS Code': (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <path d="M37 3.5l8.5 4.5v34L37 46.5 17 31.5 7 38.5 3 35.5V14.5l4-3 10 7 20-15z" fill="#007ACC"/>
        <path d="M37 13.5L24 25l13 11.5V13.5z" fill="#ffffff" fillOpacity="0.8"/>
      </svg>
    ),
    'Three.js': (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <path d="M25 5L42 15v20L25 45 8 35V15L25 5z" stroke="#4ADE80" strokeWidth="3"/>
        <path d="M25 5v40M8 15l17 10 17-10M8 35l17-10 17 10" stroke="#4ADE80" strokeWidth="2"/>
      </svg>
    ),
    Blade: (
      <svg className="tech-icon-svg" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="8" fill="#F05340"/>
        <path d="M12 25h26M25 12l13 13-13 13" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'REST API': (
      <svg className="tech-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    )
  };

  const handleClick = (e) => {
    triggerSpark(e, 'click');
    if (onClick) {
      onClick(name);
    } else if (typeof window !== 'undefined' && window.__filterByTech) {
      window.__filterByTech(name);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => playSound('hover')}
      className={`tech-pill-interactive ${active ? 'active-tech' : ''}`}
      title={`Klik untuk filter proyek dengan ${name}`}
      aria-label={`Filter dengan ${name}`}
    >
      {logos[name] || <Code2 size={16} style={{ color: 'var(--accent)' }} />}
      <span>{name}</span>
    </button>
  );
};

// --- REACT BITS: CLICK SPARK HELPER WITH SOUND FEEDBACK ---
const triggerSpark = (e, sound = 'click') => {
  playSound(sound);
  if (!e) return;
  const target = e.currentTarget || e.target;
  if (!target || typeof target.getBoundingClientRect !== 'function' || !target.appendChild) return;
  try {
    const rect = target.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : rect.left + rect.width / 2;
    const clientY = e.clientY !== undefined ? e.clientY : rect.top + rect.height / 2;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const count = 8;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.className = 'click-spark-dot';
      const angle = (i / count) * 2 * Math.PI;
      const distance = 22 + Math.random() * 22;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      spark.style.setProperty('--dx', `${dx}px`);
      spark.style.setProperty('--dy', `${dy}px`);
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      target.appendChild(spark);
      setTimeout(() => spark.remove(), 550);
    }
  } catch {
    // Graceful fallback if DOM is unmounting
  }
};

// --- CANVAS-CONFETTI CELEBRATORY MICRO-INTERACTION ---
const fireConfetti = (e, type = 'normal') => {
  try {
    let origin = { y: 0.65 };
    if (e && e.clientX && e.clientY) {
      origin = {
        x: Math.max(0.1, Math.min(0.9, e.clientX / window.innerWidth)),
        y: Math.max(0.1, Math.min(0.9, e.clientY / window.innerHeight))
      };
    }
    if (type === 'stars') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin,
        shapes: ['star', 'circle'],
        colors: ['#22c55e', '#4ade80', '#ffffff', '#86efac']
      });
    } else {
      confetti({
        particleCount: 65,
        spread: 80,
        origin,
        colors: ['#22c55e', '#4ade80', '#10b981', '#ffffff']
      });
    }
  } catch (err) {
    console.error('Confetti error:', err);
  }
};

// --- REACT BITS & 21ST.DEV: SPOTLIGHT CARD COMPONENT ---
function SpotlightCard({ children, className = '', spotlightColor = 'rgba(34, 197, 94, 0.18)', onClick, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (e.pointerType === 'touch' || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`spotlight-card ${className}`}
      style={{ '--spotlight-color': spotlightColor }}
      {...props}
    >
      <div className="spotlight-overlay" />
      <div className="spotlight-content">{children}</div>
    </div>
  );
}

// --- REACT BITS: DECRYPTED / SCRAMBLE TEXT ANIMATION ---
function DecryptedText({ text, speed = 35, className = '', sequential = true }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '0123456789ABCDEF!@#$%^&*~_+<>{}[]/\\';
  const animatingRef = useRef(false);

  const scramble = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    let iteration = 0;
    const totalLength = text.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              if (index < iteration) return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      iteration += 1 / 2;

      if (iteration >= totalLength) {
        clearInterval(interval);
        setDisplayText(text);
        animatingRef.current = false;
      }
    }, speed);
  };

  useEffect(() => {
    scramble();
  }, [text]);

  return (
    <span
      className={`decrypted-text ${className}`}
      onMouseEnter={scramble}
      style={{ cursor: 'default' }}
      title="Hover untuk scramble text"
    >
      {displayText}
    </span>
  );
}

// --- REACT BITS: TILTED 3D CARD FOR HALF-BODY PORTRAIT ---
function TiltedCard({ children, maxTilt = 8, perspective = 1000, className = '' }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilted-card-wrapper ${className}`}
      style={{
        transform,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
}

// --- 21ST.DEV & REACT BITS: INFINITE TECH MARQUEE TICKER ---
function InfiniteMarquee() {
  const items = [
    '✦ SMKN 1 BANGSRI · PPLG',
    '✦ LARAVEL BACKEND ARCHITECTURE',
    '✦ REACT & MODERN FRONTEND',
    '✦ RELATIONAL DATABASE (MYSQL)',
    '✦ TAILWIND CSS',
    '✦ THREE.JS 3D GRAPHICS',
    '✦ RESTFUL API INTEGRATION',
    '✦ FIGMA UI/UX PROTOTYPING',
    '✦ PRODUCTION-READY CODE',
    '✦ READY FOR PKL & INDUSTRI'
  ];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-fade-left" />
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, idx) => (
            <span key={idx} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-fade-right" />
    </div>
  );
}

// --- 21ST.DEV & PRO REACT BITS: ANIMATED BORDER BEAM ---
function BorderBeam({ className = '', size = 200, duration = 8, delay = 0 }) {
  return (
    <div
      className={`border-beam-container ${className}`}
      style={{
        '--beam-size': `${size}px`,
        '--beam-duration': `${duration}s`,
        '--beam-delay': `${delay}s`,
      }}
    >
      <div className="border-beam-line" />
    </div>
  );
}

// --- REACT BITS: MAGNET HOVER WRAPPER ---
function Magnet({ children, strength = 0.2, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnet-wrapper ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.08s ease-out'
      }}
    >
      {children}
    </div>
  );
}

// --- REACT BITS: COUNT UP NUMERICAL ANIMATION ---
function CountUp({ to, duration = 1.5, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * to));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(to);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// --- COMPONENTRY: KINETIC FLIPPING WORD SWAP (https://componentry.dev/docs) ---
function FlippingWordSwap({
  words = [
    'Full-Stack Web Developer',
    'Laravel Backend Architect',
    'Modern React & UI Engineer',
    'SMKN 1 Bangsri · PPLG Student'
  ],
  interval = 3000
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="componentry-flip-container" aria-label={words[index]}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 16, opacity: 0, filter: 'blur(4px)', rotateX: -55 }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
          exit={{ y: -16, opacity: 0, filter: 'blur(4px)', rotateX: 55 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="componentry-flip-word"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// --- UNTITLED UI: BADGE & STATUS PILL (https://www.untitledui.com/react/components) ---
function UntitledBadge({
  children,
  variant = 'success', // 'success' | 'gray' | 'brand' | 'outline'
  dot = true,
  pulse = true,
  className = '',
  onClick,
  ...props
}) {
  return (
    <span
      className={`uui-badge uui-badge-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {dot && <span className={`uui-dot ${pulse ? 'uui-dot-pulse' : ''}`} />}
      {children}
    </span>
  );
}

// --- UNTITLED UI: ENTERPRISE METRIC CARD (https://www.untitledui.com/react/components) ---
function UntitledMetricCard({ title, value, suffix = '', prefix = '', trend, icon, footer }) {
  return (
    <div className="uui-metric-card">
      <div className="uui-metric-header">
        <span className="uui-metric-title">{title}</span>
        {trend && (
          <span className="uui-trend-badge uui-trend-up">
            <TrendingUp size={12} /> {trend}
          </span>
        )}
      </div>
      <div className="uui-metric-body">
        <div className="uui-metric-value">
          {typeof value === 'number' ? (
            <CountUp to={value} prefix={prefix} suffix={suffix} />
          ) : (
            <span>{value}</span>
          )}
        </div>
        {icon && <div className="uui-metric-icon-box">{icon}</div>}
      </div>
      {footer && <div className="uui-metric-footer">{footer}</div>}
    </div>
  );
}

// --- UNTITLED UI: COMMAND PALETTE / ⌘K MODAL (https://www.untitledui.com/react/components) ---
function UntitledCommandPalette({ isOpen, onClose, onCopyEmail, onTriggerConfetti }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  const items = [
    {
      id: 'nav-about',
      group: 'Navigasi Cepat',
      title: 'Tentang & Pendekatan',
      desc: 'Latar belakang Muhammad Zainal Arief & SMKN 1 Bangsri',
      icon: <Compass size={16} />,
      badge: 'Section #01',
      action: () => {
        const el = document.querySelector('#about');
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-skills',
      group: 'Navigasi Cepat',
      title: 'Skills & Stack Teknologi',
      desc: 'Laravel, React, MySQL, PHP, Tailwind CSS, Three.js',
      icon: <Code2 size={16} />,
      badge: 'Section #02',
      action: () => {
        const el = document.querySelector('#skills');
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-projects',
      group: 'Navigasi Cepat',
      title: 'Selected Projects & Bento',
      desc: 'DIDISPEN, BeWood, Zaducation, ZeroMoney',
      icon: <FolderGit2 size={16} />,
      badge: 'Section #03',
      action: () => {
        const el = document.querySelector('#projects');
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-journey',
      group: 'Navigasi Cepat',
      title: 'Perjalanan & Rekam Jejak',
      desc: 'Kelas 10, Kelas 11, dan Kelas 12 SMKN 1 Bangsri',
      icon: <Sparkles size={16} />,
      badge: 'Section #04',
      action: () => {
        const el = document.querySelector('#journey');
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-contact',
      group: 'Navigasi Cepat',
      title: 'Kontak & Kolaborasi',
      desc: 'theevil1896@gmail.com / LinkedIn',
      icon: <Mail size={16} />,
      badge: 'Section #05',
      action: () => {
        const el = document.querySelector('#contact');
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'proj-didispen',
      group: 'Proyek Unggulan',
      title: 'DIDISPEN (Live Production)',
      desc: 'Sistem Dispensasi Siswa SMKN 1 Bangsri (Laravel)',
      icon: <Globe size={16} />,
      badge: 'Live App',
      action: () => {
        window.open('https://didispen.smkn1bangsri.sch.id', '_blank');
        onClose();
      }
    },
    {
      id: 'proj-didispen-git',
      group: 'Proyek Unggulan',
      title: 'DIDISPEN GitHub Repository',
      desc: 'Source code & arsitektur Laravel',
      icon: <GitBranch size={16} />,
      badge: 'Repo',
      action: () => {
        window.open('https://github.com/Zainal29/Didispen', '_blank');
        onClose();
      }
    },
    {
      id: 'proj-bewood',
      group: 'Proyek Unggulan',
      title: 'BeWood E-Commerce GitHub',
      desc: 'Katalog mebel khas Jepara (Laravel)',
      icon: <GitBranch size={16} />,
      badge: 'Repo',
      action: () => {
        window.open('https://github.com/Zainal29/BeWood_3', '_blank');
        onClose();
      }
    },
    {
      id: 'proj-zaducation',
      group: 'Proyek Unggulan',
      title: 'Zaducation Figma Design',
      desc: 'Konsep interaktif landing page edukasi',
      icon: <Layout size={16} />,
      badge: 'Figma',
      action: () => {
        window.open('https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=805-93&t=KiWeNoUMVrqMuPzq-1', '_blank');
        onClose();
      }
    },
    {
      id: 'act-cv',
      group: 'Aksi Pengembang',
      title: 'Unduh CV ATS Profesional (PDF)',
      desc: 'CV resmi Muhammad Zainal Arief',
      icon: <Download size={16} />,
      badge: 'PDF',
      action: () => {
        const link = document.createElement('a');
        link.href = '/CV_MUHAMMAD_ZAINAL_ARIEF.pdf';
        link.download = 'CV_MUHAMMAD_ZAINAL_ARIEF.pdf';
        link.click();
        onClose();
      }
    },
    {
      id: 'act-email',
      group: 'Aksi Pengembang',
      title: 'Salin Email ke Clipboard',
      desc: 'theevil1896@gmail.com',
      icon: <Copy size={16} />,
      badge: 'Copy',
      action: (e) => {
        if (onCopyEmail) onCopyEmail(e);
        onClose();
      }
    },
    {
      id: 'act-confetti',
      group: 'Aksi Pengembang',
      title: 'Rayakan dengan Efek Confetti!',
      desc: 'Pesta partikel canvas confetti',
      icon: <Sparkles size={16} />,
      badge: 'Celebrate',
      action: (e) => {
        if (onTriggerConfetti) onTriggerConfetti(e);
        onClose();
      }
    },
    {
      id: 'act-ascii',
      group: 'Aksi Pengembang',
      title: 'Efek ASCII Reveal (Quan Hoang Engine)',
      desc: 'Decode teks & kartu proyek melalui grid karakter ASCII',
      icon: <Terminal size={16} />,
      badge: 'ASCII',
      action: () => {
        const el = document.querySelector('#projects');
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.group.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action(e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="uui-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="uui-command-dialog"
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="uui-command-input-row">
            <Search size={18} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              className="uui-command-input"
              placeholder="Cari perintah, navigasi, proyek, CV, atau aksi..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
              aria-label="Tutup command palette"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results List */}
          <div className="uui-command-list">
            {filteredItems.length === 0 ? (
              <div style={{ padding: '28px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                Tidak ada perintah yang cocok untuk "{query}".
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`uui-command-item ${idx === selectedIndex ? 'active' : ''}`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={(e) => item.action(e)}
                >
                  <div className="uui-command-item-left">
                    <div className="uui-command-item-icon">{item.icon}</div>
                    <div className="uui-command-item-info">
                      <span className="uui-command-item-title">{item.title}</span>
                      <span className="uui-command-item-desc">{item.desc}</span>
                    </div>
                  </div>
                  <span className="uui-command-item-badge">{item.badge}</span>
                </div>
              ))
            )}
          </div>

          {/* Footer Hints */}
          <div className="uui-command-footer">
            <div className="uui-command-footer-hints">
              <span><kbd className="uui-kbd">↑</kbd><kbd className="uui-kbd">↓</kbd> Navigasi</span>
              <span><kbd className="uui-kbd">↵</kbd> Pilih</span>
              <span><kbd className="uui-kbd">ESC</kbd> Tutup</span>
            </div>
            <span style={{ color: 'var(--accent)' }}>Untitled UI &times; Componentry</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- INTERACTIVE DEV CONSOLE / TERMINAL COMPONENT WITH SOUND & VISUAL FX ---
function TerminalWindow() {
  const [history, setHistory] = useState([
    { type: 'output', tag: 'SYS', text: 'MZA Interactive Developer Shell v2.4.0 (smkn1bangsri-pplg)' },
    { type: 'output', text: 'Ketik "help" atau klik pintasan ber-ikon di bawah untuk eksplorasi interaktif.' },
  ]);
  const [input, setInput] = useState('');
  const termRef = useRef(null);

  const commandChips = [
    { cmd: 'help', icon: <HelpCircle size={11} />, label: 'help' },
    { cmd: 'about', icon: <User size={11} />, label: 'about' },
    { cmd: 'skills', icon: <Code2 size={11} />, label: 'skills' },
    { cmd: 'projects', icon: <FolderGit2 size={11} />, label: 'projects' },
    { cmd: 'confetti', icon: <Sparkles size={11} />, label: 'confetti' },
    { cmd: 'time', icon: <Clock size={11} />, label: 'time' },
    { cmd: 'ping', icon: <Radio size={11} />, label: 'ping' },
    { cmd: 'cv', icon: <Download size={11} />, label: 'cv' },
    { cmd: 'contact', icon: <Mail size={11} />, label: 'contact' },
    { cmd: 'clear', icon: <Trash2 size={11} />, label: 'clear' },
  ];

  const executeCmd = (commandStr) => {
    const cmd = commandStr.trim().toLowerCase();
    if (!cmd) return;

    playSound('tab');
    const newHistory = [...history, { type: 'input', text: cmd }];

    if (cmd === 'help') {
      newHistory.push({ type: 'output', tag: 'SYS', text: 'Perintah shell interaktif yang tersedia:' });
      newHistory.push({ type: 'output', text: '  about     - Profil siswa & SMKN 1 Bangsri' });
      newHistory.push({ type: 'output', text: '  skills    - Keahlian teknis & tools stack' });
      newHistory.push({ type: 'output', text: '  projects  - Ringkasan proyek nyata (DIDISPEN, BeWood, dll)' });
      newHistory.push({ type: 'output', text: '  confetti  - Luncurkan simulasi animasi partikel confetti' });
      newHistory.push({ type: 'output', text: '  time      - Cek waktu lokal sekarang di Jepara (WIB)' });
      newHistory.push({ type: 'output', text: '  ping      - Cek latensi koneksi backend real-time' });
      newHistory.push({ type: 'output', text: '  cv        - Unduh otomatis CV ATS PDF resmi' });
      newHistory.push({ type: 'output', text: '  contact   - Kontak WhatsApp & Email pengembang' });
      newHistory.push({ type: 'output', text: '  clear     - Bersihkan riwayat konsol terminal' });
    } else if (cmd === 'about') {
      newHistory.push({ type: 'output', tag: 'INFO', text: 'Muhammad Zainal Arief — Siswa SMKN 1 Bangsri (PPLG).' });
      newHistory.push({ type: 'output', text: 'Fokus: Full-Stack Web Development (Laravel, React, MySQL, Tailwind).' });
    } else if (cmd === 'skills') {
      newHistory.push({ type: 'output', tag: 'INFO', text: 'Tech Stack: Laravel, React, Tailwind CSS, PHP, MySQL, Three.js, Git, Figma.' });
    } else if (cmd === 'projects') {
      newHistory.push({ type: 'output', tag: 'INFO', text: '1. DIDISPEN - Sistem Izin Siswa SMKN 1 Bangsri (Production Web)' });
      newHistory.push({ type: 'output', tag: 'INFO', text: '2. BeWood - Platform E-Commerce Mebel Jepara (Full-Stack Web)' });
      newHistory.push({ type: 'output', tag: 'INFO', text: '3. Zaducation & ZeroMoney - Fintech & Educational UI/UX Design' });
    } else if (cmd === 'confetti') {
      playSound('success');
      fireConfetti(null, 'stars');
      newHistory.push({ type: 'output', tag: 'SUCCESS', text: 'Confetti partikel berhasil diluncurkan! (canvas-confetti v1.9)' });
    } else if (cmd === 'time') {
      const nowWib = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
      newHistory.push({ type: 'output', tag: 'TIME', text: `Waktu lokal terkini di Jepara, Jawa Tengah: ${nowWib} WIB` });
    } else if (cmd === 'ping') {
      playSound('pop');
      newHistory.push({ type: 'output', tag: 'PING', text: 'didispen.smkn1bangsri.sch.id: 64 bytes, time=18.4ms, TTL=56 (Optimal)' });
    } else if (cmd === 'cv') {
      playSound('success');
      newHistory.push({ type: 'output', tag: 'SUCCESS', text: 'Mengunduh berkas resmi CV_MUHAMMAD_ZAINAL_ARIEF.pdf ...' });
      const link = document.createElement('a');
      link.href = '/CV_MUHAMMAD_ZAINAL_ARIEF.pdf';
      link.download = 'CV_MUHAMMAD_ZAINAL_ARIEF.pdf';
      link.click();
    } else if (cmd === 'contact') {
      newHistory.push({ type: 'output', tag: 'INFO', text: 'Email: theevil1896@gmail.com | WA: 0895-0950-7443 | GitHub: Zainal29' });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      newHistory.push({ type: 'output', tag: 'WARN', text: `command not found: "${cmd}". Ketik "help" untuk daftar perintah.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCmd(input);
    }
  };

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="terminal-container-inner">
      {/* Terminal Top Status Bar */}
      <div className="terminal-topbar">
        <div className="terminal-topbar-left">
          <Terminal size={12} className="term-icon-accent" />
          <span className="term-session-name">bash · session: active</span>
          <span className="term-branch-tag">main</span>
        </div>
        <button
          type="button"
          className="term-clear-btn"
          onClick={() => {
            playSound('pop');
            setHistory([]);
            setInput('');
          }}
          title="Bersihkan layar konsol"
        >
          <Trash2 size={11} />
          <span>Clear</span>
        </button>
      </div>

      <div className="terminal-scroll-area" ref={termRef}>
        {history.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === 'input' ? (
              <div className="terminal-input-echo">
                <span className="term-prompt">zainal@mza:~$</span>
                <span className="term-cmd-text">{line.text}</span>
              </div>
            ) : (
              <div className="terminal-output-line">
                {line.tag === 'SUCCESS' && (
                  <span className="term-tag term-tag-success">
                    <CheckCircle2 size={11} /> SUCCESS
                  </span>
                )}
                {line.tag === 'TIME' && (
                  <span className="term-tag term-tag-time">
                    <Clock size={11} /> TIME
                  </span>
                )}
                {line.tag === 'PING' && (
                  <span className="term-tag term-tag-ping">
                    <Radio size={11} /> PING
                  </span>
                )}
                {line.tag === 'INFO' && (
                  <span className="term-tag term-tag-info">
                    <Sparkles size={11} /> INFO
                  </span>
                )}
                {line.tag === 'SYS' && (
                  <span className="term-tag term-tag-sys">
                    <Terminal size={11} /> SYS
                  </span>
                )}
                {line.tag === 'WARN' && (
                  <span className="term-tag term-tag-warn">
                    <AlertCircle size={11} /> WARN
                  </span>
                )}
                <span className={`term-output-text ${line.tag ? `has-tag-${line.tag.toLowerCase()}` : ''}`}>
                  {line.text}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="term-input-wrapper">
        <span className="term-prompt">zainal@mza:~$</span>
        <input
          className="term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ketik help, confetti, time, ping, projects, cv..."
          spellCheck="false"
          autoComplete="off"
        />
        <span className="term-cursor-blink" />
      </div>

      <div className="terminal-suggestions">
        <span className="suggestions-label">
          <Terminal size={11} /> Pintasan:
        </span>
        <div className="suggestions-list">
          {commandChips.map((item) => (
            <button
              key={item.cmd}
              type="button"
              className="suggestion-chip"
              onClick={() => executeCmd(item.cmd)}
              title={`Jalankan perintah ${item.cmd}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- INTERACTIVE LIVE REST API SANDBOX & BENCHMARK ---
function LiveApiSandbox() {
  const [activeEndpoint, setActiveEndpoint] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    status: 200,
    statusText: 'OK',
    latency: '24ms',
    timestamp: new Date().toISOString(),
    endpoint: '/api/v1/projects',
    data: [
      { id: 'didispen', name: 'DIDISPEN', type: 'Full-Stack Laravel', status: 'Production Live' },
      { id: 'bewood', name: 'BeWood', type: 'E-Commerce Mebel', status: 'Completed' },
      { id: 'zaducation', name: 'Zaducation', type: 'UI/UX Design', status: 'Completed' },
      { id: 'zeromoney', name: 'ZeroMoney', type: 'Fintech Dashboard', status: 'Completed' }
    ]
  });

  const testEndpoint = (type) => {
    playSound('tab');
    setLoading(true);
    setActiveEndpoint(type);
    setTimeout(() => {
      playSound('success');
      setLoading(false);
      const now = new Date().toISOString();
      if (type === 'projects') {
        setResponse({
          status: 200,
          statusText: 'OK',
          latency: '24ms',
          timestamp: now,
          endpoint: '/api/v1/projects',
          data: [
            { id: 'didispen', name: 'DIDISPEN', type: 'Full-Stack Laravel', status: 'Production Live' },
            { id: 'bewood', name: 'BeWood', type: 'E-Commerce Mebel', status: 'Completed' },
            { id: 'zaducation', name: 'Zaducation', type: 'UI/UX Design', status: 'Completed' },
            { id: 'zeromoney', name: 'ZeroMoney', type: 'Fintech Dashboard', status: 'Completed' }
          ]
        });
      } else if (type === 'health') {
        setResponse({
          status: 200,
          statusText: 'HEALTHY',
          latency: '14ms',
          timestamp: now,
          endpoint: '/api/v1/health',
          server: 'Laravel/PHP 8.2 + Node/Vite',
          database: 'MySQL 8.0 connected',
          memoryUsage: '14.8 MB',
          uptime: '99.98%',
          statusPkl: 'READY FOR MITRA & PKL'
        });
      } else if (type === 'verify-cv') {
        setResponse({
          status: 200,
          statusText: 'VERIFIED',
          latency: '32ms',
          timestamp: now,
          endpoint: '/api/v1/cv/verify',
          candidate: 'Muhammad Zainal Arief',
          school: 'SMK Negeri 1 Bangsri',
          major: 'Pengembangan Perangkat Lunak dan Gim (PPLG)',
          atsResumeScore: '98 / 100',
          recommendation: 'Highly Recommended for Web Development Internship'
        });
      } else if (type === 'confetti') {
        fireConfetti(null, 'stars');
        setResponse({
          status: 200,
          statusText: 'CELEBRATING',
          latency: '8ms',
          timestamp: now,
          endpoint: '/api/v1/interactive/confetti',
          message: '✦ Confetti burst triggered successfully! ✦'
        });
      }
    }, 180);
  };

  return (
    <div className="api-playground-box">
      <div className="api-presets-row">
        <button
          type="button"
          className={`api-action-btn ${activeEndpoint === 'projects' ? 'active' : ''}`}
          onClick={() => testEndpoint('projects')}
        >
          <span>GET</span> /api/projects
        </button>
        <button
          type="button"
          className={`api-action-btn ${activeEndpoint === 'health' ? 'active' : ''}`}
          onClick={() => testEndpoint('health')}
        >
          <span>GET</span> /api/health
        </button>
        <button
          type="button"
          className={`api-action-btn ${activeEndpoint === 'verify-cv' ? 'active' : ''}`}
          onClick={() => testEndpoint('verify-cv')}
        >
          <span>POST</span> /api/verify-cv
        </button>
        <button
          type="button"
          className={`api-action-btn ${activeEndpoint === 'confetti' ? 'active' : ''}`}
          onClick={() => testEndpoint('confetti')}
          style={{ borderColor: 'rgba(74, 222, 128, 0.4)' }}
        >
          <Sparkles size={12} style={{ color: 'var(--accent)' }} /> <span>TEST</span> /confetti
        </button>
      </div>

      <div className="api-response-panel">
        <div className="api-status-bar">
          <span style={{ color: '#4ade80', fontWeight: 'bold' }}>
            STATUS: {response.status} {response.statusText}
          </span>
          <span>LATENCY: {response.latency}</span>
          <span>ENDPOINT: {response.endpoint}</span>
        </div>
        <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: '1.5' }}>
          <code>
            {loading ? '// Executing API benchmark request...' : JSON.stringify(response, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}

// --- NAVBAR (21ST.DEV & REACT BITS FLOATING PILL DOCK + UNTITLED UI SEARCH) ---
function Navbar({ onOpenCommand }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Section detection for scrollspy
      const sectionIds = ['contact', 'journey', 'projects', 'skills', 'about', 'hero'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    triggerSpark(e);
    setMenuOpen(false);
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -90, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile drawer */}
      {menuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className={`navbar-pill-dock ${scrolled ? 'is-scrolled' : ''}`}>
        {/* Dynamic integrated scroll progress line along bottom rim */}
        <div
          className="navbar-scroll-progress-line"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="navbar-pill-inner">
          <a
            href="#hero"
            className="brand-pill"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <span className="brand-dot-pulse" />
            <span className="brand-title">zain<span className="accent-text">.dev</span></span>
            {scrolled && activeSection !== 'hero' ? (
              <motion.span
                key={activeSection}
                initial={{ opacity: 0, x: -8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="nav-active-section-tag"
              >
                / {activeSection}
              </motion.span>
            ) : (
              <span className="brand-tag-mini">v2.0</span>
            )}
          </a>

          {/* Desktop Links with Framer Motion Sliding Pill indicator */}
          <nav className="nav-pill-links">
            {navLinks.map((link) => {
              const sectionName = link.href.replace('#', '');
              const isActive = activeSection === sectionName;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-pill-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="nav-pill-active-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="nav-pill-text">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action / Status */}
          <div className="nav-pill-actions">
            {/* Untitled UI ⌘K Quick Action Trigger */}
            <button
              type="button"
              className="uui-search-trigger"
              onClick={(e) => {
                triggerSpark(e);
                if (onOpenCommand) onOpenCommand();
              }}
              title="Buka Command Palette (⌘K)"
              aria-label="Buka pencarian perintah"
            >
              <Search size={14} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
              <span>Cari</span>
              <span className="uui-kbd-group">
                <kbd className="uui-kbd">⌘</kbd>
                <kbd className="uui-kbd">K</kbd>
              </span>
            </button>

            <div className="status-badge-compact">
              <span className="status-dot" />
              <span>PKL Ready</span>
            </div>

            <a
              href="/CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
              download="CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
              className="btn-pill-cv"
              onClick={triggerSpark}
              title="Unduh CV ATS"
            >
              <Download size={13} />
              <span>CV</span>
            </a>

            <Magnet strength={0.16}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-pill-primary"
              >
                Contact
              </a>
            </Magnet>

            {scrolled && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="btn-pill-backtotop"
                onClick={(e) => handleNavClick(e, '#hero')}
                title="Kembali ke paling atas"
                aria-label="Kembali ke paling atas"
              >
                <ArrowUp size={13} />
              </motion.button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-pill-toggle"
              aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="mobile-pill-drawer"
            >
              <button
                type="button"
                className="mobile-pill-link"
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'var(--text)' }}
                onClick={(e) => {
                  triggerSpark(e);
                  setMenuOpen(false);
                  if (onOpenCommand) onOpenCommand();
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={14} style={{ color: 'var(--accent-light)' }} /> Quick Search
                </span>
                <span className="uui-kbd-group">
                  <kbd className="uui-kbd">⌘</kbd>
                  <kbd className="uui-kbd">K</kbd>
                </span>
              </button>

              {navLinks.map((link) => {
                const sectionName = link.href.replace('#', '');
                const isActive = activeSection === sectionName;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`mobile-pill-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="mobile-active-dot" />
                    ) : (
                      <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                    )}
                  </a>
                );
              })}
              <div className="mobile-drawer-footer">
                <a
                  href="/CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
                  download="CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
                  className="btn-pill-cv-full"
                  onClick={(e) => {
                    triggerSpark(e);
                    setMenuOpen(false);
                  }}
                >
                  <Download size={15} /> Unduh CV ATS (PDF)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

// --- SCROLL-DRIVEN OPENING EXPERIENCE (AWWWARDS / CREATIVE DEV PROLOGUE) ---
function ScrollOpeningExperience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layer 1: Opening Giant Name & Intro Tag
  const l1Scale = useTransform(scrollYProgress, [0, 0.38], [1, 1.25]);
  const l1Opacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const l1Y = useTransform(scrollYProgress, [0, 0.38], [0, -70]);

  // Layer 2: Manifesto & Core Metric Pillars
  const l2Scale = useTransform(scrollYProgress, [0.3, 0.65], [0.9, 1]);
  const l2Opacity = useTransform(scrollYProgress, [0.28, 0.45, 0.72, 0.88], [0, 1, 1, 0]);
  const l2Y = useTransform(scrollYProgress, [0.28, 0.48, 0.88], [60, 0, -50]);

  // Ambient Portal / Radial Energy Ring
  const portalScale = useTransform(scrollYProgress, [0, 0.8], [0.8, 2.4]);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [0.4, 0.85, 0]);

  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false }) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    playSound('pop');
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(heroEl, { offset: -80, duration: 1.2 });
      } else {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={containerRef} className="scroll-opening-container" aria-label="Prologue Scroll Opening">
      <div className="scroll-opening-sticky">
        {/* HUD Top Bar */}
        <div className="scroll-opening-hud-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot" />
            <span>SYS_ONLINE // ZAIN.DEV</span>
          </div>
          <div style={{ opacity: 0.7 }}>
            SMKN 1 BANGSRI · PPLG
          </div>
          <div style={{ color: 'var(--accent-light)' }}>
            {timeStr || 'Jepara · WIB'}
          </div>
        </div>

        {/* Ambient Expanding Portal Energy Ring */}
        <motion.div
          style={{
            position: 'absolute',
            width: 'min(700px, 90vw)',
            height: 'min(700px, 90vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, rgba(34, 197, 94, 0.04) 50%, transparent 75%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
            scale: portalScale,
            opacity: portalOpacity,
            zIndex: 1
          }}
        />

        {/* Center Stage with Scroll-Driven Multi-Layer Transitions */}
        <div className="scroll-opening-center">
          {/* LAYER 1: Full-Bleed Centerpiece Portrait & Giant Editorial Text */}
          <motion.div
            className="opening-layer"
            style={{
              scale: l1Scale,
              opacity: l1Opacity,
              y: l1Y,
              zIndex: 3
            }}
          >
            <div className="opening-tagline" style={{ marginBottom: '6px' }}>
              <Sparkles size={13} />
              <span>Full-Stack Web Engineering</span>
              <Sparkles size={13} />
            </div>

            <h1 className="opening-title-giant" style={{ margin: '4px 0 10px' }}>
              Muhammad <span className="text-gradient-emerald">Zainal Arief</span>
            </h1>

            {/* Center Half-Body Portrait Stage with Depth and Ambient Glow */}
            <div className="opening-portrait-wrapper">
              <div className="opening-portrait-glow" />
              <img
                src={heroImg}
                alt="Muhammad Zainal Arief - Full-Stack Developer SMKN 1 Bangsri"
                className="opening-portrait-img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              {/* Floating Chips with 3D Depth */}
              <div className="opening-floating-chip chip-opening-left">
                <span className="status-dot" />
                <span>SMKN 1 Bangsri</span>
              </div>
              <div className="opening-floating-chip chip-opening-right">
                <span>✦ Full-Stack Dev</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
              <UntitledBadge variant="success" dot={true}>
                SMK NEGERI 1 BANGSRI · PPLG
              </UntitledBadge>
              <UntitledBadge variant="brand" dot={false}>
                ✦ READY FOR MITRA & PKL
              </UntitledBadge>
            </div>
          </motion.div>

          {/* LAYER 2: Manifesto & Impact Metrics Revealed upon Scrolling */}
          <motion.div
            className="opening-layer"
            style={{
              scale: l2Scale,
              opacity: l2Opacity,
              y: l2Y,
              zIndex: 4
            }}
          >
            <div className="opening-manifesto-box">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-light)', display: 'block', marginBottom: '8px' }}>
                // ARCHITECTURE & PURPOSE
              </span>
              <h2 className="opening-manifesto-heading">
                Menghubungkan logika backend Laravel yang andal dengan antarmuka web modern yang cepat dan bermakna.
              </h2>

              <div className="opening-metrics-row">
                <div className="opening-metric-item">
                  <strong>04+ Proyek</strong>
                  <span>Sistem Nyata & Teruji (Didispen, BeWood, Zaducation, ZeroMoney)</span>
                </div>
                <div className="opening-metric-item">
                  <strong>Laravel & React</strong>
                  <span>MVC, REST API, Database Relasional MySQL</span>
                </div>
                <div className="opening-metric-item">
                  <strong>100% Siap PKL</strong>
                  <span>Kesiapan Magang & Kolaborasi Tim Industri</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HUD Bottom Bar with Interactive Scroll Prompts */}
        <div className="scroll-opening-hud-bottom">
          <div className="scroll-indicator-pill">
            <div className="scroll-mouse-icon">
              <div className="scroll-mouse-dot" />
            </div>
            <span>GULIR KE BAWAH // SCROLL TO EXPLORE</span>
            <ChevronDown size={14} style={{ color: 'var(--accent)' }} />
          </div>

          <button
            type="button"
            className="btn-skip-opening"
            onClick={handleSkip}
            title="Langsung lewati ke pengenalan diri & portofolio"
          >
            <span>Lewati Pembukaan</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

// --- HERO SECTION WITH EDITORIAL HALF-BODY PORTRAIT & CLEAR TECH STACK ---
function HeroSection() {
  return (
    <section id="hero" className="section-container">
      <div className="hero-section">
        {/* Left Column: Copy wrapped with Quan Hoang AsciiReveal */}
        <AsciiReveal preset="decode" duration="fast" origin="top-left" className="hero-copy">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }} data-ascii="fade">
            <UntitledBadge variant="success" dot={true} pulse={true}>
              SMKN 1 BANGSRI · PPLG
            </UntitledBadge>
            <UntitledBadge variant="brand" dot={false}>
              ✦ READY FOR MITRA & PKL
            </UntitledBadge>
          </div>

          <div className="hero-greeting">
            Halo, saya
          </div>

          <h1>
            Muhammad<br />
            Zainal <span className="text-gradient-emerald">Arief.</span>
          </h1>

          <div className="hero-role-editorial">
            <Terminal size={17} style={{ color: 'var(--accent)' }} />
            <FlippingWordSwap />
          </div>

          <p className="hero-desc">
            Siswa jurusan PPLG di <strong>SMK Negeri 1 Bangsri</strong>. Berfokus pada perancangan <span className="editorial-serif">arsitektur backend Laravel</span> yang kokoh serta <span className="editorial-serif">antarmuka web modern</span> yang responsif dan interaktif.
          </p>

          <div className="hero-actions" data-ascii="fade">
            <Magnet strength={0.22}>
              <a href="#projects" onClick={triggerSpark} className="btn-primary">
                Lihat Proyek <ArrowUpRight size={16} />
              </a>
            </Magnet>
            <a href="/CV_MUHAMMAD_ZAINAL_ARIEF.pdf" download="CV_MUHAMMAD_ZAINAL_ARIEF.pdf" onClick={triggerSpark} className="btn-ticket">
              <Download size={15} /> [ Unduh CV ATS (PDF) ]
            </a>
            <a href="#contact" onClick={triggerSpark} className="btn-secondary">
              <Mail size={15} /> Kontak
            </a>
          </div>

          {/* High-Contrast Clear Tech Stack Logos */}
          <div className="tech-stack-wrapper" data-ascii="fade">
            <span className="tech-stack-label">// CORE TECH STACK</span>
            <div className="tech-stack-row">
              {['Laravel', 'React', 'Tailwind', 'PHP', 'MySQL', 'Figma', 'Git'].map((tech) => (
                <TechLogo key={tech} name={tech} />
              ))}
            </div>
          </div>
        </AsciiReveal>

        {/* Right Column: React Bits Tilted 3D Half-Body Portrait Showcase */}
        <div className="hero-visual">
          <div className="portrait-showcase-wrapper">
            <div className="portrait-ambient-glow" />
            <TiltedCard maxTilt={7} perspective={1100}>
              <div className="profile-portrait-card">
                <BorderBeam duration={9} size={260} />
                <div className="profile-portrait-image-box">
                  <img
                    src={heroImg}
                    alt="Muhammad Zainal Arief - Full-Stack Developer SMKN 1 Bangsri"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />

                  {/* Floating Aesthetic Chips with 3D Depth */}
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
                </div>
              </div>
            </TiltedCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ABOUT SECTION WITH TABBED CONSOLE & METRICS ---
function AboutSection() {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'api' | 'config'

  return (
    <section id="about" className="section-container">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">// 01 ABOUT THE DEVELOPER</span>
          <h2>Tentang & Pendekatan</h2>
        </div>
      </div>

      <div className="about-grid">
        {/* Left Column: Narrative & Metrics */}
        <div className="about-text">
          <div>
            <p>
              Saya adalah siswa <strong>SMK Negeri 1 Bangsri</strong> jurusan Pengembangan Perangkat Lunak dan Gim (PPLG). Ketertarikan saya berakar pada eksplorasi bagaimana sebuah website tidak hanya memiliki estetika yang nyaman dilihat, melainkan juga menyelesaikan masalah riil secara efisien.
            </p>
            <p>
              Saya telah merancang dan membangun proyek nyata seperti <strong>DIDISPEN</strong> (sistem digital dispensasi siswa sekolah) dan <strong>BeWood</strong> (platform e-commerce produk mebel khas Jepara), dengan fondasi backend yang rapi dan antarmuka responsif.
            </p>
          </div>

          <div className="uui-metric-grid">
            <UntitledMetricCard
              title="PROYEK SELESAI"
              value={4}
              suffix="+"
              trend="+100%"
              icon={<FolderGit2 size={20} />}
              footer="Didispen, BeWood, Zaducation, ZeroMoney"
            />
            <UntitledMetricCard
              title="PERIODE STUDI"
              value="2024–Now"
              trend="Aktif"
              icon={<Sparkles size={20} />}
              footer="SMKN 1 Bangsri · Kelas XII PPLG"
            />
            <UntitledMetricCard
              title="KESIAPAN INDUSTRI"
              value={100}
              suffix="%"
              trend="Verified"
              icon={<TrendingUp size={20} />}
              footer="Siap magang/PKL & kontribusi tim"
            />
          </div>

          <div className="about-features">
            <SpotlightCard className="feature-box">
              <span>01</span>
              <strong>Modern Web Engineering</strong>
              <p>Pengembangan website cepat berbasis Laravel, React, dan Tailwind CSS.</p>
            </SpotlightCard>
            <SpotlightCard className="feature-box">
              <span>02</span>
              <strong>Structured Problem Solving</strong>
              <p>Menerjemahkan alur administrasi nyata ke dalam sistem digital yang handal.</p>
            </SpotlightCard>
          </div>
        </div>

        {/* Right Column: React Bits Spotlight Tabbed Dev Console */}
        <SpotlightCard className="tabbed-console-card">
          <BorderBeam duration={12} delay={2} size={300} />
          <div className="console-tabs-bar">
            <div className="console-dots">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            </div>

            <div className="console-tab-buttons">
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
                onClick={() => {
                  playSound('tab');
                  setActiveTab('terminal');
                }}
              >
                <Terminal size={13} className="tab-btn-icon" />
                <span>terminal.sh</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'api' ? 'active' : ''}`}
                onClick={() => {
                  playSound('tab');
                  setActiveTab('api');
                }}
              >
                <Activity size={13} className="tab-btn-icon" />
                <span>live_api.ts</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'config' ? 'active' : ''}`}
                onClick={() => {
                  playSound('tab');
                  setActiveTab('config');
                }}
              >
                <FileCode size={13} className="tab-btn-icon" />
                <span>config.ts</span>
              </button>
            </div>
          </div>

          <div className="console-content">
            <AsciiReveal key={activeTab} preset="terminal" duration="fast">
              {activeTab === 'terminal' && <TerminalWindow />}
              {activeTab === 'api' && <LiveApiSandbox />}
              {activeTab === 'config' && (
                <pre style={{ color: '#e2e8f0', lineHeight: '1.6', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  <code>
                    <span style={{ color: '#c084fc' }}>export const</span> developer = &#123;{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>name</span>: <span style={{ color: '#86efac' }}>"Muhammad Zainal Arief"</span>,{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>institution</span>: <span style={{ color: '#86efac' }}>"SMK Negeri 1 Bangsri"</span>,{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>department</span>: <span style={{ color: '#86efac' }}>"PPLG"</span>,{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>period</span>: <span style={{ color: '#86efac' }}>"2024 — Sekarang"</span>,{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>role</span>: <span style={{ color: '#86efac' }}>"Full-Stack Web Developer"</span>,{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>coreStack</span>: [<span style={{ color: '#86efac' }}>"Laravel"</span>, <span style={{ color: '#86efac' }}>"PHP"</span>, <span style={{ color: '#86efac' }}>"MySQL"</span>, <span style={{ color: '#86efac' }}>"React"</span>, <span style={{ color: '#86efac' }}>"Tailwind"</span>],{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>realWorldProjects</span>: [<span style={{ color: '#86efac' }}>"DIDISPEN"</span>, <span style={{ color: '#86efac' }}>"BeWood"</span>],{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>readyForMitra</span>: <span style={{ color: '#22c55e' }}>true</span>,{'\n'}
                    {'  '}<span style={{ color: '#4ade80' }}>location</span>: <span style={{ color: '#86efac' }}>"Jepara, Jawa Tengah, Indonesia"</span>{'\n'}
                    &#125;;
                  </code>
                </pre>
              )}
            </AsciiReveal>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

// --- SKILLS SECTION WITH SPOTLIGHT CARDS ---
function SkillsSection() {
  return (
    <section id="skills" className="section-container">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">// 02 SKILLS & TECH</span>
          <h2>Skills & Technologies</h2>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <SpotlightCard key={skill.number} className="skill-card">
            <div>
              <div className="skill-card-top">
                <span className="skill-num">[{skill.number}]</span>
                <div className="skill-icon-wrap">
                  {skill.icon}
                </div>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              {skill.tools.map((tool) => (
                <TechLogo key={tool} name={tool} />
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

// --- INTERACTIVE PROJECT CARD IN-LINE SUBTABS (PREVIEW, FEATURES, ARCHITECTURE) ---
function ProjectCardSubtabs({ project, onSelectProject }) {
  const [tab, setTab] = useState('preview'); // 'preview' | 'features' | 'architecture'

  return (
    <div className="project-subtabs-wrapper">
      <div className="project-card-subtabs">
        <button
          type="button"
          className={`subtab-btn ${tab === 'preview' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playSound('tab');
            setTab('preview');
          }}
        >
          <ImageIcon size={13} className="subtab-icon" />
          <span>Screenshot</span>
        </button>
        <button
          type="button"
          className={`subtab-btn ${tab === 'features' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playSound('tab');
            setTab('features');
          }}
        >
          <Zap size={13} className="subtab-icon" />
          <span>Fitur Utama</span>
        </button>
        <button
          type="button"
          className={`subtab-btn ${tab === 'architecture' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playSound('tab');
            setTab('architecture');
          }}
        >
          <Cpu size={13} className="subtab-icon" />
          <span>Arsitektur</span>
        </button>
      </div>

      {tab === 'preview' && (
        <div
          className="project-media-surface"
          onClick={() => {
            playSound('pop');
            onSelectProject(project);
          }}
          title="Klik untuk melihat detail & live preview modal"
        >
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
        </div>
      )}

      {tab === 'features' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="incard-panel"
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-light)', fontFamily: 'var(--font-mono)', marginBottom: '10px', display: 'block' }}>
            // FITUR UNGGULAN APLIKASI
          </span>
          {project.features?.map((feat, i) => (
            <div key={i} className="incard-feature-item">
              <CheckCircle2 size={14} className="incard-feature-icon" />
              <span>{feat}</span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              playSound('pop');
              onSelectProject(project);
            }}
            style={{ marginTop: '12px', background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.76rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            Buka modal detail &rarr;
          </button>
        </motion.div>
      )}

      {tab === 'architecture' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="incard-panel"
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-light)', fontFamily: 'var(--font-mono)', marginBottom: '10px', display: 'block' }}>
            // SPESIFIKASI ARSITEKTUR
          </span>
          {project.architecture?.map((step, i) => (
            <div key={i} className="incard-arch-step">
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>0{i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              playSound('pop');
              onSelectProject(project);
            }}
            style={{ marginTop: '10px', background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.76rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            Lihat stack lengkap &rarr;
          </button>
        </motion.div>
      )}
    </div>
  );
}

// --- PROJECTS SECTION WITH SPOTLIGHT BENTO CARDS & FILTER TABS ---
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'web' | 'design'
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    window.__filterByTech = (tech) => {
      playSound('pop');
      setSelectedTech((prev) => (prev === tech ? null : tech));
      const el = document.getElementById('projects');
      if (el && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -90 });
      }
    };
  }, []);

  const didispen = projects.find((p) => p.id === 'didispen');
  const bewood = projects.find((p) => p.id === 'bewood');
  const zaducation = projects.find((p) => p.id === 'zaducation');
  const zeromoney = projects.find((p) => p.id === 'zeromoney');

  const matchesTech = (p) => {
    if (!selectedTech) return true;
    return p.tools.some((t) => t.toLowerCase() === selectedTech.toLowerCase());
  };

  const filterTabs = [
    { id: 'all', label: 'Semua Proyek', count: 4 },
    { id: 'web', label: 'Full-Stack Web', count: 2 },
    { id: 'design', label: 'Fintech & UI/UX', count: 2 },
  ];

  return (
    <section id="projects" className="section-container section-watermark-wrap">
      <div className="section-watermark-bg" aria-hidden="true">
        WORKS
      </div>

      <div className="section-heading">
        <div>
          <span className="section-eyebrow">// 03 WORKS & BENTO SHOWCASE</span>
          <h2>Selected Projects</h2>
        </div>
      </div>

      {/* Quick Stats Pill Row (Afrian Pryo & 21st.dev style) */}
      <div className="project-stats-pill-row">
        <div className="project-stats-item">
          <span className="status-dot" />
          <span>Sistem Nyata: <strong>4 Proyek</strong></span>
        </div>
        <div className="project-stats-item">
          <Code2 size={13} style={{ color: 'var(--accent)' }} />
          <span>Core Stack: <strong>Laravel & React</strong></span>
        </div>
        <div className="project-stats-item">
          <Sparkles size={13} style={{ color: 'var(--accent)' }} />
          <span>Status: <strong>Verified Ready for PKL</strong></span>
        </div>
      </div>

      {/* Interactive Category Filter Pills (React Bits & 21st.dev) */}
      <div className="projects-filter-bar">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                triggerSpark(e);
                setActiveFilter(tab.id);
              }}
              className={`project-filter-pill ${isActive ? 'active' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="filter-active-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span>{tab.label}</span>
              <span style={{ opacity: isActive ? 0.9 : 0.6, fontSize: '0.7rem' }}>
                ({tab.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Active Tech Stack Banner */}
      {selectedTech && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="tech-filter-toast"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} />
            <span>
              Filter Aktif: Stack <strong>{selectedTech}</strong> ({projects.filter(matchesTech).length} Proyek Terkait)
            </span>
          </div>
          <button
            type="button"
            className="btn-reset-filter"
            onClick={() => {
              playSound('pop');
              setSelectedTech(null);
            }}
          >
            <X size={12} />
            <span>Reset Filter</span>
          </button>
        </motion.div>
      )}

      {/* Bento Grid: Row 1 Featured (DIDISPEN) | Row 2 Side-by-Side (BeWood + Zaducation) | Row 3 Featured Reverse (ZeroMoney) */}
      <AsciiReveal key={`${activeFilter}-${selectedTech}`} preset="terminal" duration="fast" origin="center">
        <div className="projects-bento-grid">
        {/* ROW 1: DIDISPEN FEATURED */}
        {(activeFilter === 'all' || activeFilter === 'web') && didispen && matchesTech(didispen) && (
          <SpotlightCard className="project-card project-card-featured">
            <BorderBeam duration={10} size={300} />
            <div className="project-featured-grid">
              <ProjectCardSubtabs project={didispen} onSelectProject={setSelectedProject} />

              <div className="project-featured-content">
                <div>
                  <div className="componentry-meta-strip">
                    <div className="componentry-meta-left">
                      <span className="project-index-badge">[01]</span>
                      <UntitledBadge variant="success" dot={true}>
                        {didispen.category}
                      </UntitledBadge>
                      <span style={{ color: 'var(--text-dim)' }}>•</span>
                      <span style={{ color: 'var(--text-muted)' }}>{didispen.badge}</span>
                    </div>
                    <div className="componentry-meta-right" onClick={() => setSelectedProject(didispen)} style={{ cursor: 'pointer' }}>
                      <span>View</span>
                      <ArrowUpRight size={13} />
                    </div>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(didispen)}
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px', cursor: 'pointer' }}
                  >
                    {didispen.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                    {didispen.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {didispen.tools.map((tool) => (
                      <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  {didispen.links.demo && (
                    <a
                      href={didispen.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        triggerSpark(e);
                        fireConfetti(e);
                      }}
                      className="btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                    >
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                  {didispen.links.github && (
                    <a
                      href={didispen.links.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={triggerSpark}
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      GitHub <ArrowUpRight size={14} />
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      triggerSpark(e);
                      setSelectedProject(didispen);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      marginLeft: 'auto'
                    }}
                  >
                    Detail &rarr;
                  </button>
                </div>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* ROW 2: BeWood (E-Commerce Mebel Jepara) */}
        {(activeFilter === 'all' || activeFilter === 'web') && bewood && matchesTech(bewood) && (
          <SpotlightCard className={`project-card ${activeFilter === 'web' ? 'project-card-featured' : ''}`}>
            {activeFilter === 'web' ? (
              <div className="project-featured-grid project-featured-reverse">
                <div className="project-featured-content">
                  <div>
                    <div className="componentry-meta-strip">
                      <div className="componentry-meta-left">
                        <UntitledBadge variant="gray" dot={true}>
                          {bewood.category}
                        </UntitledBadge>
                        <span style={{ color: 'var(--text-dim)' }}>•</span>
                        <span style={{ color: 'var(--text-muted)' }}>{bewood.badge}</span>
                      </div>
                      <div className="componentry-meta-right" onClick={() => setSelectedProject(bewood)} style={{ cursor: 'pointer' }}>
                        <span>View</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProject(bewood)}
                      style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px', cursor: 'pointer' }}
                    >
                      {bewood.title}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                      {bewood.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {bewood.tools.map((tool) => (
                        <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    {bewood.links.github && (
                      <a
                        href={bewood.links.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={triggerSpark}
                        className="btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      >
                        GitHub <ArrowUpRight size={14} />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        triggerSpark(e);
                        setSelectedProject(bewood);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        marginLeft: 'auto'
                      }}
                    >
                      Detail &rarr;
                    </button>
                  </div>
                </div>

                <ProjectCardSubtabs project={bewood} onSelectProject={setSelectedProject} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <ProjectCardSubtabs project={bewood} onSelectProject={setSelectedProject} />

                  <div className="project-content">
                    <div className="project-title-row">
                      <h3 onClick={() => setSelectedProject(bewood)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="project-index-badge">[02]</span>
                        <span>{bewood.title}</span>
                      </h3>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                        {bewood.badge}
                      </span>
                    </div>
                    <p>{bewood.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {bewood.tools.map((tool) => (
                        <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-footer">
                  <button
                    onClick={(e) => {
                      triggerSpark(e);
                      setSelectedProject(bewood);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Detail Proyek &rarr;
                  </button>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {bewood.links.github && (
                      <a
                        href={bewood.links.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={triggerSpark}
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        GitHub <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SpotlightCard>
        )}

        {/* ROW 2 (col 2 in 'all') / ROW 2 (Featured Reverse in 'design'): Zaducation */}
        {(activeFilter === 'all' || activeFilter === 'design') && zaducation && matchesTech(zaducation) && (
          <SpotlightCard className={`project-card ${activeFilter === 'design' ? 'project-card-featured' : ''}`}>
            {activeFilter === 'design' ? (
              <div className="project-featured-grid project-featured-reverse">
                <div className="project-featured-content">
                  <div>
                    <div className="componentry-meta-strip">
                      <div className="componentry-meta-left">
                        <UntitledBadge variant="brand" dot={true}>
                          {zaducation.category}
                        </UntitledBadge>
                        <span style={{ color: 'var(--text-dim)' }}>•</span>
                        <span style={{ color: 'var(--text-muted)' }}>{zaducation.badge}</span>
                      </div>
                      <div className="componentry-meta-right" onClick={() => setSelectedProject(zaducation)} style={{ cursor: 'pointer' }}>
                        <span>View</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProject(zaducation)}
                      style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px', cursor: 'pointer' }}
                    >
                      {zaducation.title}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                      {zaducation.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {zaducation.tools.map((tool) => (
                        <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    {zaducation.links.demo && (
                      <a
                        href={zaducation.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          triggerSpark(e);
                          fireConfetti(e);
                        }}
                        className="btn-primary"
                        style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                      >
                        Demo Figma <ArrowUpRight size={14} />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        triggerSpark(e);
                        setSelectedProject(zaducation);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        marginLeft: 'auto'
                      }}
                    >
                      Detail &rarr;
                    </button>
                  </div>
                </div>

                <ProjectCardSubtabs project={zaducation} onSelectProject={setSelectedProject} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <ProjectCardSubtabs project={zaducation} onSelectProject={setSelectedProject} />

                  <div className="project-content">
                    <div className="project-title-row">
                      <h3 onClick={() => setSelectedProject(zaducation)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="project-index-badge">[03]</span>
                        <span>{zaducation.title}</span>
                      </h3>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                        {zaducation.badge}
                      </span>
                    </div>
                    <p>{zaducation.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {zaducation.tools.map((tool) => (
                        <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-footer">
                  <button
                    onClick={(e) => {
                      triggerSpark(e);
                      setSelectedProject(zaducation);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Detail Proyek &rarr;
                  </button>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {zaducation.links.demo && (
                      <a
                        href={zaducation.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          triggerSpark(e);
                          fireConfetti(e);
                        }}
                        style={{
                          color: 'var(--text)',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Demo <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SpotlightCard>
        )}

        {/* ROW 3 (or ROW 1 in 'design'): ZeroMoney (Fintech Dashboard Featured) */}
        {(activeFilter === 'all' || activeFilter === 'design') && zeromoney && matchesTech(zeromoney) && (
          <SpotlightCard className="project-card project-card-featured">
            <BorderBeam duration={11} delay={2} size={300} />
            <div className={`project-featured-grid ${activeFilter === 'all' ? 'project-featured-reverse' : ''}`}>
              {activeFilter === 'all' ? (
                <>
                  <div className="project-featured-content">
                    <div>
                      <div className="componentry-meta-strip">
                        <div className="componentry-meta-left">
                          <span className="project-index-badge">[04]</span>
                          <UntitledBadge variant="success" dot={true}>
                            {zeromoney.category}
                          </UntitledBadge>
                          <span style={{ color: 'var(--text-dim)' }}>•</span>
                          <span style={{ color: 'var(--text-muted)' }}>{zeromoney.badge}</span>
                        </div>
                        <div className="componentry-meta-right" onClick={() => setSelectedProject(zeromoney)} style={{ cursor: 'pointer' }}>
                          <span>View</span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>

                      <h3
                        onClick={() => setSelectedProject(zeromoney)}
                        style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px', cursor: 'pointer' }}
                      >
                        {zeromoney.title}
                      </h3>

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                        {zeromoney.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {zeromoney.tools.map((tool) => (
                          <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                      {zeromoney.links.demo && (
                        <a
                          href={zeromoney.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            triggerSpark(e);
                            fireConfetti(e);
                          }}
                          className="btn-primary"
                          style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                        >
                          Demo Figma <ArrowUpRight size={14} />
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          triggerSpark(e);
                          setSelectedProject(zeromoney);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent)',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          marginLeft: 'auto'
                        }}
                      >
                        Detail &rarr;
                      </button>
                    </div>
                  </div>

                  <ProjectCardSubtabs project={zeromoney} onSelectProject={setSelectedProject} />
                </>
              ) : (
                <>
                  <ProjectCardSubtabs project={zeromoney} onSelectProject={setSelectedProject} />

                  <div className="project-featured-content">
                    <div>
                      <div className="componentry-meta-strip">
                        <div className="componentry-meta-left">
                          <UntitledBadge variant="success" dot={true}>
                            {zeromoney.category}
                          </UntitledBadge>
                          <span style={{ color: 'var(--text-dim)' }}>•</span>
                          <span style={{ color: 'var(--text-muted)' }}>{zeromoney.badge}</span>
                        </div>
                        <div className="componentry-meta-right" onClick={() => setSelectedProject(zeromoney)} style={{ cursor: 'pointer' }}>
                          <span>View</span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>

                      <h3
                        onClick={() => setSelectedProject(zeromoney)}
                        style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px', cursor: 'pointer' }}
                      >
                        {zeromoney.title}
                      </h3>

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                        {zeromoney.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {zeromoney.tools.map((tool) => (
                          <TechLogo key={tool} name={tool} active={selectedTech === tool} />
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                      {zeromoney.links.demo && (
                        <a
                          href={zeromoney.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            triggerSpark(e);
                            fireConfetti(e);
                          }}
                          className="btn-primary"
                          style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                        >
                          Demo Figma <ArrowUpRight size={14} />
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          triggerSpark(e);
                          setSelectedProject(zeromoney);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent)',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          marginLeft: 'auto'
                        }}
                      >
                        Detail &rarr;
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </SpotlightCard>
        )}
        </div>
      </AsciiReveal>

      {/* Modal Popup with Blur and Confetti on Action */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup modal"
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <UntitledBadge variant="success" dot={true}>
                  {selectedProject.category}
                </UntitledBadge>
                <UntitledBadge variant="gray" dot={false}>
                  {selectedProject.badge}
                </UntitledBadge>
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#ffffff', margin: '4px 0 16px' }}>
                {selectedProject.title}
              </h2>

              <div className="componentry-surface-inset" style={{ marginBottom: '18px' }}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  loading="lazy"
                  decoding="async"
                  className="modal-image"
                  style={{ marginBottom: 0, borderRadius: '8px' }}
                />
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '20px' }}>
                {selectedProject.longDescription}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Teknologi Terkait:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedProject.tools.map((tool) => (
                    <TechLogo key={tool} name={tool} />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                {selectedProject.links.demo && (
                  <a
                    href={selectedProject.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      triggerSpark(e);
                      fireConfetti(e);
                    }}
                    className="btn-primary"
                  >
                    Buka Live Demo <ArrowUpRight size={15} />
                  </a>
                )}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={triggerSpark}
                    className="btn-secondary"
                  >
                    Source Code GitHub <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- JOURNEY SECTION (CYBER TIMELINE & ENGINEERING CHANGELOG) ---
function JourneySection() {
  return (
    <section id="journey" className="section-container section-watermark-wrap">
      {/* Background Section Watermark */}
      <div className="section-watermark-bg" aria-hidden="true">
        TIMELINE
      </div>

      <div className="section-heading">
        <div>
          <span className="section-eyebrow">// 04 JOURNEY & CHANGELOG</span>
          <h2>My Journey & Milestones</h2>
        </div>
      </div>

      <div className="journey-timeline-enhanced">
        {/* Continuous Neon Laser Spine */}
        <div className="timeline-laser-spine" aria-hidden="true" />

        {journeyItems.map((item, idx) => (
          <SpotlightCard key={item.number} className="journey-card-modern">
            {idx === 2 && <BorderBeam duration={10} size={280} />}

            <div className="journey-node-row">
              <span className="journey-num-badge">
                [{item.number}]
              </span>
              <span className="journey-period-badge">
                {item.period}
              </span>
              <span className="journey-role-badge">
                {item.role}
              </span>
            </div>

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            {/* Highlights List */}
            {item.highlights && (
              <div className="journey-highlights-list">
                {item.highlights.map((hl, i) => (
                  <div key={i} className="journey-highlight-item">
                    <CheckCircle2 size={15} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Tags Row */}
            <div className="journey-tags-row">
              {item.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="journey-tag-pill"
                  onClick={(e) => {
                    triggerSpark(e);
                    if (window.__filterByTech && ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind', 'Three.js'].includes(tag)) {
                      window.__filterByTech(tag);
                    }
                  }}
                  title={`Klik untuk eksplorasi teknologi ${tag}`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

// --- CONTACT SECTION WITH SPOTLIGHT CARD & SPARKS ---
function ContactSection({ onCopyEmail }) {
  return (
    <section id="contact" className="section-container">
      <SpotlightCard className="contact-box">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', color: 'var(--accent-light)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '18px' }}>
          <Sparkles size={13} />
          <span>Mari Berkolaborasi</span>
        </div>

        <h2>Mari Buat Sesuatu yang Bermanfaat.</h2>
        <p>
          Terbuka untuk diskusi proyek website, peluang magang/PKL, maupun kolaborasi pembuatan sistem aplikasi.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginBottom: '32px' }}>
          <Magnet strength={0.18}>
            <button
              onClick={(e) => {
                triggerSpark(e);
                onCopyEmail(e);
              }}
              className="btn-primary"
            >
              <Copy size={16} /> Salin theevil1896@gmail.com
            </button>
          </Magnet>
          <a href="mailto:theevil1896@gmail.com" onClick={triggerSpark} className="btn-secondary">
            <Mail size={16} /> Kirim Email Langsung
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <a
            href="https://github.com/Zainal29"
            target="_blank"
            rel="noreferrer"
            onClick={triggerSpark}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            GitHub <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-zainal-arief-6b9654433/?isSelfProfile=true"
            target="_blank"
            rel="noreferrer"
            onClick={triggerSpark}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </SpotlightCard>
    </section>
  );
}

// --- CURSOR AMBIENT GLOW (REACT BITS / LAYERS.AI FLUID SPOTLIGHT) ---
function CursorAmbientGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="cursor-ambient-glow"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      aria-hidden="true"
    />
  );
}

// --- FLOATING QUICK DOCK (21ST.DEV INTERACTIVE CONTROLS + LOCAL WIB CLOCK) ---
function FloatingQuickDock({ soundEnabled, setSoundEnabled, onOpenCommand }) {
  const [timeStr, setTimeStr] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTimeStr(now.toLocaleTimeString('id-ID', options) + ' WIB');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    triggerSpark(e, 'pop');
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSound = (e) => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    window.__soundEnabled = next;
    if (next) playSound('success');
    triggerSpark(e, 'toggle');
  };

  return (
    <div className="floating-quick-dock" aria-label="Quick Action Controls">
      <div className="dock-clock" title="Waktu Lokal Jepara, Jawa Tengah (WIB)">
        <span className="status-dot" />
        <span>{timeStr || 'Jepara · WIB'}</span>
      </div>

      <button
        type="button"
        className={`dock-btn ${soundEnabled ? 'active' : ''}`}
        onClick={toggleSound}
        title={soundEnabled ? 'Matikan Suara SFX' : 'Nyalakan Suara SFX'}
        aria-label="Toggle Sound Effects"
      >
        {soundEnabled ? (
          <Volume2 size={15} style={{ color: 'var(--accent-light)' }} />
        ) : (
          <VolumeX size={15} style={{ opacity: 0.6 }} />
        )}
      </button>

      <button
        type="button"
        className="dock-btn"
        onClick={(e) => {
          triggerSpark(e, 'tab');
          if (onOpenCommand) onOpenCommand();
        }}
        title="Buka Command Palette (⌘K)"
        aria-label="Open Command Palette"
      >
        <Search size={14} />
      </button>

      <button
        type="button"
        className="dock-btn"
        onClick={(e) => {
          triggerSpark(e, 'success');
          fireConfetti(e, 'stars');
        }}
        title="Rayakan dengan Confetti!"
        aria-label="Trigger Confetti"
      >
        <Sparkles size={14} style={{ color: 'var(--accent)' }} />
      </button>

      {showTop && (
        <button
          type="button"
          className="dock-btn"
          onClick={scrollToTop}
          title="Kembali ke atas"
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} />
        </button>
      )}
    </div>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          © {new Date().getFullYear()} Muhammad Zainal Arief. All rights reserved.
        </div>
        <div>
          <a
            href="#hero"
            style={{ color: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}

// --- MAIN APP WITH LENIS SMOOTH SCROLL & SCROLL PROGRESS ---
export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to toggle Untitled UI Command Palette
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Smooth Lenis Inertia Scrolling Setup (Awwwards / ReactBits Style - Responsive & Mobile-Optimized)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page smooth hash links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -90, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  const handleCopyEmail = (e) => {
    const email = 'theevil1896@gmail.com';
    fireConfetti(e, 'stars');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2800);
      });
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2800);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Ultra-Smooth Neon Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* 3D WebGL Background (Green Cyber Orb) */}
      <ThreeBackground />

      {/* Tech Dot Grid Canvas (Layers.ai & 21st.dev) */}
      <div className="bg-grid-dots" />

      {/* Top Green Ambient Glow */}
      <div className="ambient-glow-top" />

      {/* React Bits Ambient Mouse Glow */}
      <CursorAmbientGlow />

      {/* Navigation with Untitled UI Command Palette Trigger */}
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      {/* Untitled UI ⌘K Command Palette Modal */}
      <UntitledCommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onCopyEmail={handleCopyEmail}
        onTriggerConfetti={(e) => fireConfetti(e, 'stars')}
      />

      {/* Sections with Infinite Tech Marquee */}
      <main>
        <ScrollOpeningExperience />
        <HeroSection />
        <InfiniteMarquee />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection onCopyEmail={handleCopyEmail} />
      </main>

      {/* 21st.dev Floating Quick Dock */}
      <FloatingQuickDock
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toastVisible && (
        <div className="toast-alert">
          <Check size={16} />
          <span>Email theevil1896@gmail.com berhasil disalin!</span>
        </div>
      )}
    </div>
  );
}
