import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import {
  ArrowUpRight, Download, Mail,
  Phone, MapPin, Sparkles, Check, Send, Award,
  Code2, Database, Layout, GitBranch, ChevronUp, Menu, X,
  Layers, Terminal, Server, Globe, ArrowRight, Music, FileText
} from 'lucide-react';

import TerminalWindow from './components/TerminalWindow';
import DraggableIdCard from './components/DraggableIdCard';
import MzaLogo from './components/MzaLogo';
import CyberEdgeAura from './components/CyberEdgeAura';
import ScrollCraftIntro from './components/ScrollCraftIntro';
import {
  HtmlIcon, CssIcon, JsIcon, ReactIcon, TailwindIcon,
  PhpIcon, LaravelIcon, MysqlIcon, RestApiIcon,
  GitIcon, VsCodeIcon, MongoDbIcon, FigmaIcon, PostmanIcon, LinuxIcon, ViteIcon
} from './components/TechIcons';

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}



// --- ASSETS ---
import suitImg from './assets/profilMZA_suit.jpg';
import hackerImg from './assets/profilMZA_hacker.jpg';
import didispenImg from './assets/projects/didispen.png';
import bewoodImg from './assets/projects/bewood.png';
import zaducationImg from './assets/projects/zaducation.png';
import zeromoneyImg from './assets/projects/zeromoney.png';
import './App.css';

// --- DATA DEFINITIONS ---
const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const typewriterWords = [
  'Full-Stack Web Developer',
  'Laravel Backend Developer',
  'Siswa PPLG SMKN 1 Bangsri',
];

const socialLinks = [
  { name: 'GitHub', icon: <GithubIcon size={18} />, href: 'https://github.com/Zainal29' },
  { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/muhammad-zainal-arief' },
  { name: 'WhatsApp', icon: <Phone size={18} />, href: 'https://wa.me/6289509507443' },
  { name: 'Email', icon: <Mail size={18} />, href: 'mailto:theevil1896@gmail.com' },
  // { name: 'Instagram', icon: <InstagramIcon size={18} />, href: 'https://instagram.com/' },
];

const projectsData = [
  {
    id: 'didispen',
    title: 'DIDISPEN',
    category: 'WEB APPLICATION',
    badge: 'SMKN 1 Bangsri',
    role: 'Backend Developer',
    stackFlow: ['Laravel', 'PHP', 'CSS', 'JavaScript', 'MySQL'],
    desc: 'Sistem digital pengajuan dan pengelolaan dispensasi siswa secara real-time terintegrasi untuk guru piket dan wali kelas.',
    fullDesc: 'DIDISPEN adalah aplikasi web komprehensif yang dirancang dan diimplementasikan khusus untuk SMK Negeri 1 Bangsri. Aplikasi ini mendigitalisasi proses perizinan siswa yang sebelumnya manual menjadi sistem daring terstruktur, lengkap dengan verifikasi bertingkat, rekapitulasi data harian, dan ekspor arsip resmi.',
    image: didispenImg,
    tools: ['Laravel', 'PHP', 'CSS3', 'JavaScript', 'MySQL', 'Tailwind CSS'],
    features: [
      'Alur pengajuan dispensasi terstruktur dan anti-duplikasi',
      'Persetujuan bertingkat oleh Wali Kelas dan Guru Piket',
      'Ekspor laporan perizinan format Excel & PDF untuk tata usaha',
      'Dashboard statistik frekuensi izin siswa per kelas'
    ],
    architecture: [
      'Backend: Laravel MVC Architecture & Eloquent ORM',
      'Database: MySQL Relational Schema (Dispen, Users, Activity Logs)',
      'Frontend: Responsive Tailwind CSS & UI Components',
      'Alur Pipeline: Laravel ➔ PHP ➔ CSS ➔ JavaScript ➔ MySQL'
    ],
    demo: 'https://didispen.smkn1bangsri.sch.id',
    github: 'https://github.com/Zainal29/Didispen'
  },
  {
    id: 'bewood',
    title: 'BeWood',
    category: 'WEB E-COMMERCE',
    badge: 'UMKM Mebel Jepara',
    role: 'Backend Developer',
    stackFlow: ['Laravel', 'PHP', 'Tailwind', 'JavaScript', 'MySQL'],
    desc: 'Platform katalog digital dan pemasaran produk mebel khas Jepara untuk memperluas jangkauan UMKM pengrajin lokal.',
    fullDesc: 'BeWood dikembangkan untuk memberdayakan para pelaku usaha dan pengrajin mebel di Jepara dalam memamerkan katalog produk kayu berkualitas tinggi, mempermudah manajemen pesanan, serta menghubungkan calon pembeli langsung dengan produsen.',
    image: bewoodImg,
    tools: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    features: [
      'Galeri katalog produk furnitur Jepara beresolusi tinggi',
      'Filter pencarian berdasarkan kategori kayu, tipe, dan rentang harga',
      'Integrasi direct checkout & negosiasi pesanan via WhatsApp pengrajin',
      'Panel manajemen inventaris dan katalog untuk admin mebel'
    ],
    architecture: [
      'Routing: RESTful Resource Routing & Middleware Authentication',
      'Database: Skema Relasional Produk, Kategori Kayu, & Pesanan',
      'Frontend: Responsive Tailwind CSS & UI Components',
      'Alur Pipeline: Laravel ➔ PHP ➔ Tailwind CSS ➔ JavaScript ➔ MySQL'
    ],
    demo: '',
    github: 'https://github.com/Zainal29/BeWood_3'
  },
  {
    id: 'zaducation',
    title: 'Zaducation',
    category: 'LANDING PAGE DESIGN',
    badge: 'Education UI/UX',
    role: 'UI/UX Designer',
    desc: 'Konsep desain landing page edukasi interaktif dengan penekanan pada kejelasan visual dan onboarding siswa.',
    fullDesc: 'Zaducation merupakan perancangan UI/UX landing page platform edukasi modern. Dibuat menyeluruh di Figma dengan hierarki visual yang seimbang, tipografi jelas, serta prototipe interaktif untuk kenyamanan penjelajahan kursus.',
    image: zaducationImg,
    tools: ['Figma', 'UI/UX Design', 'Design System', 'Prototyping'],
    features: [
      'Interaksi onboarding calon siswa yang interaktif & ramah pengguna',
      'Hierarki kartu silabus pembelajaran dengan visual clear',
      'Desain responsif mobile-first untuk kenyamanan smartphone'
    ],
    architecture: [
      'Figma Design System: Typography, Color Tokens, & Auto-Layout',
      'Component Architecture: Reusable UI Kit & Component Variants',
      'Prototype: Micro-interactions & Smart Animate Transitions'
    ],
    demo: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=805-93&t=KiWeNoUMVrqMuPzq-1',
    github: ''
  },
  {
    id: 'zeromoney',
    title: 'ZeroMoney',
    category: 'FINANCE DASHBOARD',
    badge: 'Fintech UI',
    role: 'UI Designer',
    desc: 'Desain antarmuka dashboard manajemen finansial personal untuk visualisasi arus kas dan target anggaran bulanan.',
    fullDesc: 'ZeroMoney adalah konsep perancangan dashboard finansial yang menyederhanakan data keuangan yang rumit menjadi visualisasi antarmuka analitik yang intuitif, bersih, dan mempermudah pemantauan saldo harian.',
    image: zeromoneyImg,
    tools: ['Figma'],
    features: [
      'Widget grafik interaktif arus kas pemasukan dan pengeluaran',
      'Visualisasi progress target tabungan dan batas anggaran bulanan',
      'Dark mode aesthetic bernuansa cyber modern dan glassmorphism'
    ],
    architecture: [
      'Dashboard Layout: Bento Grid Component Modular Structure',
      'Data Visualization: Analytical Hierarchy & Metric Blocks',
      'Figma Prototype: High-Fidelity Interactive State Machine'
    ],
    demo: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=1136-2322&t=KiWeNoUMVrqMuPzq-1',
    github: ''
  }
];

const skillsCategories = [
  {
    category: 'Frontend Development',
    icon: <Layout size={20} />,
    skills: [
      { name: 'HTML5', level: 'Advanced', icon: <HtmlIcon size={22} /> },
      { name: 'CSS3', level: 'Advanced', icon: <CssIcon size={22} /> },
      { name: 'JavaScript (ES6+)', level: 'Advanced', icon: <JsIcon size={22} /> },
      { name: 'React.js', level: 'Intermediate', icon: <ReactIcon size={22} /> },
      { name: 'Tailwind CSS', level: 'Advanced', icon: <TailwindIcon size={22} /> },
    ]
  },
  {
    category: 'Backend Development',
    icon: <Server size={20} />,
    skills: [
      { name: 'PHP', level: 'Advanced', icon: <PhpIcon size={22} /> },
      { name: 'Laravel Framework', level: 'Advanced', icon: <LaravelIcon size={22} /> },
      { name: 'MySQL Relational DB', level: 'Advanced', icon: <MysqlIcon size={22} /> },
      { name: 'RESTful API Design', level: 'Intermediate', icon: <RestApiIcon size={22} /> },
    ]
  },
  {
    category: 'Tools & Workflow',
    icon: <GitBranch size={20} />,
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', icon: <GitIcon size={22} /> },
      { name: 'VS Code & CLI', level: 'Advanced', icon: <VsCodeIcon size={22} /> },
      { name: 'MongoDB', level: 'Intermediate', icon: <MongoDbIcon size={22} /> },
      { name: 'Figma UI/UX', level: 'Intermediate', icon: <FigmaIcon size={22} /> },
      { name: 'Postman API Testing', level: 'Intermediate', icon: <PostmanIcon size={22} /> },
      { name: 'Linux / Bash', level: 'Intermediate', icon: <LinuxIcon size={22} /> },
      { name: 'Vite & NPM', level: 'Advanced', icon: <ViteIcon size={22} /> },
    ]
  }
];

// --- 3D AMBIENT PARTICLES & CYBER ORB BACKGROUND ---
function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25));

    // Stardust Particles
    const count = isMobile ? 120 : 260;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 60;
      pos[i + 1] = (Math.random() - 0.5) * 60;
      pos[i + 2] = (Math.random() - 0.5) * 40;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.75)');
      grad.addColorStop(1, 'rgba(44, 103, 237, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(pCanvas);
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.45,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Subtle Hologram Torus Ring
    const torusGeo = new THREE.TorusGeometry(6.5, 0.02, 16, 64);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    torus.rotation.y = Math.PI / 6;
    scene.add(torus);

    let animationFrameId;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;
      torus.rotation.z += 0.002;
      torus.rotation.y += 0.0015;

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}


// --- TYPEWRITER HOOK ---
function useTypewriter(words, speed = 80, delay = 2200) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];
    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, !isDeleting && text === currentWord ? delay : isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words, speed, delay]);

  return text;
}

// --- MAIN PORTFOLIO COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'skills' | 'certificates'
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('about');

  // Hacker persona hover / pin state
  const portraitStageRef = useRef(null);
  const [isHackerHovered, setIsHackerHovered] = useState(false);

  // Edge Aura interactive states
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [auraPulseTime, setAuraPulseTime] = useState(0);

  const triggerAuraPulse = () => {
    setAuraPulseTime(Date.now());
    try {
      window.dispatchEvent(new CustomEvent('aura:saved-pulse'));
    } catch {
      // Ignore in non-browser environments
    }
  };

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const typewriterText = useTypewriter(typewriterWords);

  // Track portrait cursor position for dynamic costume mask reveal
  const handlePortraitMouseMove = (e) => {
    if (!portraitStageRef.current) return;
    const rect = portraitStageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    portraitStageRef.current.style.setProperty('--hover-x', `${x}%`);
    portraitStageRef.current.style.setProperty('--hover-y', `${y}%`);
  };

  // Force fresh MZA brand favicon on mount to bust browser cache
  useEffect(() => {
    try {
      const existingIcons = document.querySelectorAll("link[rel*='icon']");
      existingIcons.forEach(el => el.remove());

      const svgLink = document.createElement('link');
      svgLink.rel = 'icon';
      svgLink.type = 'image/svg+xml';
      svgLink.href = `/favicon.svg?v=${Date.now()}`;
      document.head.appendChild(svgLink);

      const pngLink = document.createElement('link');
      pngLink.rel = 'alternate icon';
      pngLink.type = 'image/png';
      pngLink.href = `/favicon.png?v=${Date.now()}`;
      document.head.appendChild(pngLink);
    } catch {
      // Ignore if DOM manipulation restricted
    }
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const introThreshold = window.innerHeight * 0.45;
      setShowNavbar(scrollPos > introThreshold);
      setNavScrolled(scrollPos > introThreshold + 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Auto-scroll to hash target if URL contains a deep link (e.g. #hero, #portfolio)
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: hash === '#hero' ? 0 : -70, immediate: true });
          } else {
            el.scrollIntoView();
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Lock body scroll and pause Lenis when project modal is open
  useEffect(() => {
    if (selectedProject) {
      if (window.__lenis) window.__lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Auto-close mobile menu when scrolling or resizing
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: hash === '#hero' ? 0 : -70, duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2c67ed', '#38bdf8', '#818cf8', '#ffffff']
    });

    triggerAuraPulse();

    setFormSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormMessage('');
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="home-page-container">
      {/* 1. Interactive ScrollCraft Scroll-to-Open Curtain Gateway */}
      <ScrollCraftIntro onScrollDown={() => scrollTo('#hero')} />

      {/* 2. Rich Cyber Tech Background Textures & Ambient Nebula (Anti-Empty) */}
      <div className="cyber-bg-nebula-beams" aria-hidden="true" />
      <div className="cyber-bg-texture-grid" aria-hidden="true" />
      <div className="cyber-bg-texture-noise" aria-hidden="true" />

      {/* 2b. Ambient Glowing Orbs & Meteor Backdrop */}
      <div className="gsap-ambient" aria-hidden="true">
        <span className="gsap-ambient-orb gsap-ambient-orb-one" />
        <span className="gsap-ambient-orb gsap-ambient-orb-two" />
        <span className="gsap-ambient-orb gsap-ambient-orb-three" />
      </div>

      {/* 3. Meteor Shower Animation */}
      <div className="meteor-background" aria-hidden="true">
        <span className="meteor" style={{ '--meteor-top': '8%', '--meteor-left': '25%', '--meteor-duration': '6.5s', '--meteor-delay': '0s' }} />
        <span className="meteor" style={{ '--meteor-top': '18%', '--meteor-left': '65%', '--meteor-duration': '7.2s', '--meteor-delay': '2.1s' }} />
        <span className="meteor" style={{ '--meteor-top': '42%', '--meteor-left': '80%', '--meteor-duration': '8s', '--meteor-delay': '4.5s' }} />
        <span className="meteor" style={{ '--meteor-top': '68%', '--meteor-left': '15%', '--meteor-duration': '6.8s', '--meteor-delay': '1.3s' }} />
      </div>

      {/* 4. Canvas Particles Engine */}
      <div className="particles-container">
        <AmbientParticles />
      </div>

      {/* 4b. Ambient Cyber Edge Glow Aura (takuyajodai/edge-aura) */}
      <CyberEdgeAura
        isHacker={isHackerHovered}
        isTyping={isUserTyping}
        pulseTrigger={auraPulseTime}
      />

      {/* 5. Floating Glass Surface Navbar (Revealed after scrolling past intro) */}
      <header className={`navbar-root ${navScrolled ? 'navbar-scrolled' : ''} ${showNavbar ? 'navbar-visible' : 'navbar-hidden-on-intro'}`}>
        <div className="navbar-container glass-surface glass-surface--fallback">
          <div className="glass-surface__sheen" />
          <div className="glass-surface__rim" />
          <div className="glass-surface__content">

            {/* Logo Brand with MZA Monogram */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
              className="navbar-brand"
              aria-label="MZA.dev - Muhammad Zainal Arief"
            >
              <MzaLogo size={34} showText={true} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="navbar-links" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav(link.label.toLowerCase());
                    scrollTo(link.href);
                  }}
                  className={`navbar-link-item ${activeNav === link.label.toLowerCase() ? 'is-active' : ''}`}
                >
                  <span>{link.label}</span>
                  {activeNav === link.label.toLowerCase() && (
                    <span className="navbar-active-pill" />
                  )}
                </a>
              ))}
            </nav>

            {/* Navbar Actions */}
            <div className="navbar-actions">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                className="navbar-cta-btn"
              >
                <span>Let's Talk</span>
                <ArrowRight size={14} />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="navbar-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay & Container */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              key="navbar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="navbar-mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer Panel */}
            <motion.div
              key="navbar-drawer"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="navbar-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu Navigasi Mobile"
            >
              <div className="navbar-mobile-drawer-header">
                <MzaLogo size={30} showText={true} />
                <button
                  type="button"
                  className="navbar-mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Tutup menu navigasi"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="navbar-mobile-drawer-links">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(link.label.toLowerCase());
                      setMobileMenuOpen(false);
                      scrollTo(link.href);
                    }}
                    className={`navbar-mobile-link-item ${activeNav === link.label.toLowerCase() ? 'is-active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <span className="navbar-mobile-indicator" />
                  </a>
                ))}
              </div>

              <div className="navbar-mobile-drawer-footer">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollTo('#contact');
                  }}
                  className="navbar-mobile-cta"
                >
                  <Mail size={16} />
                  <span>Hubungi Saya (Kontak)</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="home-ui-scale">

        {/* =========================================================================
           HERO SECTION
           ========================================================================= */}
        <section id="hero" className="hero-root-section">
          <div className="hero-container-inner">

            {/* Left Column: Heading, Typewriter, Bio, Actions, Socials */}
            <div className="hero-text-col">

              {/* Status Pill */}
              <div className="hero-status-pill">
                <span className="hero-status-dot" />
                <span className="hero-status-label">AVAILABLE FOR PKL & MITRA INDUSTRI</span>
              </div>

              {/* Display Headline */}
              <div className="hero-heading-group">
                <h1 className="hero-h1-white">Muhammad</h1>
                <h1 className="hero-h1-gradient">Zainal Arief.</h1>
              </div>

              {/* Typewriter Row */}
              <div className="hero-typewriter-row">
                <span className="hero-typewriter-text">{typewriterText}</span>
                <span className="hero-typewriter-cursor" />
              </div>

              {/* Description */}
              <p className="hero-description-copy">
                Siswa jurusan PPLG di <strong>SMK Negeri 1 Bangsri</strong>. Berfokus pada perancangan arsitektur backend Laravel yang kokoh serta antarmuka web modern yang responsif, interaktif, dan siap berkontribusi pada industri.
              </p>

              {/* Actions Row */}
              <div className="hero-action-row">
                <a
                  href="#portfolio"
                  onClick={(e) => { e.preventDefault(); scrollTo('#portfolio'); }}
                  className="hero-btn-primary"
                >
                  <span>Lihat Proyek</span>
                  <ArrowUpRight size={17} />
                </a>

                <a
                  href="/CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
                  download="CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
                  className="hero-btn-secondary"
                >
                  <Download size={16} />
                  <span>Unduh CV ATS</span>
                </a>
              </div>

              {/* Find Me On Social Dock */}
              <div className="hero-find-me-wrap">
                <span className="hero-find-me-label">FIND ME ON:</span>
                <div className="hero-social-buttons">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-icon-btn"
                      title={s.name}
                      aria-label={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Draggable ID Card (Tarik-tarik Badge) */}
            <div className="hero-visual-col flex items-center justify-center relative">
              <DraggableIdCard />
            </div>

          </div>
        </section>

        {/* =========================================================================
           ABOUT SECTION (PORTRAIT HOVER COSTUME CHANGE: FORMAL SUIT <-> HACKER)
           ========================================================================= */}
        <section id="about" className="about-root-section">
          <div className="section-display-title">
            About Developer
          </div>

          <div className="about-container-inner">

            {/* Left Column: Greeting, Title, Actions */}
            <div className="about-intro">
              <div className="about-title">
                <span className="about-title-greeting">Transforming Ideas into</span>
                <span>Digital Reality.</span>
              </div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                Perjalanan pemrograman saya dimulai dari rasa ingin tahu yang mendalam tentang bagaimana teknologi internet bekerja. Sebagai siswa PPLG di SMK Negeri 1 Bangsri, saya memadukan logika algoritma backend Laravel yang aman dengan antarmuka frontend yang modern, cepat, dan ramah pengguna.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
                  download="CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
                  className="about-action about-action-primary"
                >
                  <Download size={16} />
                  <span>Download Resume (CV)</span>
                </a>

                <a
                  href="/Portofolio_Muhammad_Zainal_Arief.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-action about-action-secondary"
                >
                  <FileText size={16} />
                  <span>Portofolio PDF (Update)</span>
                </a>
              </div>
            </div>

            {/* Center Column: Portrait Stage with Costume Hover Transformation */}
            <div className="flex flex-col items-center justify-center">
              <div
                ref={portraitStageRef}
                className={`about-portrait-stage is-in-view ${isHackerHovered ? 'spider-hovered hacker-active' : ''}`}
                onMouseEnter={() => setIsHackerHovered(true)}
                onMouseLeave={() => setIsHackerHovered(false)}
                onMouseMove={handlePortraitMouseMove}
                title="Arahkan kursor ke foto untuk beralih kostum Hacker"
              >
                <div className="about-portrait-glow" />

                <div className="about-portrait">
                  {/* Formal Suit Base Layer */}
                  <img
                    src={suitImg}
                    alt="Muhammad Zainal Arief Formal Suit"
                    className="about-person-image"
                  />
                  {/* Cyber Hacker Persona Layer with Dynamic Radial Mask */}
                  <img
                    src={hackerImg}
                    alt="Muhammad Zainal Arief Cyber Hacker Persona"
                    className="about-spider-image about-hacker-image"
                  />
                </div>
              </div>

              {/* Clean non-intrusive caption below portrait (tidak menutupi wajah) */}
              <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isHackerHovered ? '⚡ MODE HACKER AKTIF' : 'ARAHKAN KURSOR: MODE HACKER'}</span>
              </div>
            </div>

            {/* Right Column: Bio Pillars */}
            <div className="about-bio space-y-4">
              <div>
                <strong className="text-white block mb-1">01. Arsitektur Backend Solid</strong>
                <p>Berpengalaman menyusun struktur arsitektur Laravel, relasi database Eloquent ORM, serta endpoint REST API yang aman dan teruji.</p>
              </div>

              <div>
                <strong className="text-white block mb-1">02. Pengalaman Sistem Nyata</strong>
                <p>Telah merilis dan mengelola DIDISPEN (sistem dispensasi sekolah) dan BeWood (katalog mebel Jepara) sebagai Backend Developer.</p>
              </div>

              <div>
                <strong className="text-white block mb-1">03. Kesiapan Magang & PKL</strong>
                <p>Memiliki etos kerja disiplin, kebiasaan riset mandiri, kemampuan version control Git, dan komitmen tinggi untuk berkolaborasi bersama tim mitra industri.</p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
           EXPERIENCE & EDUCATION SECTION
           ========================================================================= */}
        <section id="experience" className="experience-section">
          <div className="experience-container">

            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="section-display-title" style={{ marginBottom: '12px' }}>
                Education & Experience
              </h2>
              <p className="text-zinc-400 text-sm md:text-base">
                Rekam jejak akademik di SMKN 1 Bangsri dan pengalaman membangun aplikasi web skala nyata.
              </p>
            </div>

            <div className="experience-columns">

              {/* Left Column: Education */}
              <div className="experience-group">
                <h2>Pendidikan Formal</h2>

                <div className="experience-card">
                  <div className="experience-stat-icon">
                    <Code2 size={24} />
                  </div>
                  <div className="experience-card-copy">
                    <h3>SMK Negeri 1 Bangsri</h3>
                    <p>Pengembangan Perangkat Lunak dan Gim (PPLG)</p>
                    <span className="experience-date">2024 — Sekarang · Kelas XII</span>
                  </div>
                </div>

                <div className="experience-card">
                  <div className="experience-stat-icon">
                    <Database size={24} />
                  </div>
                  <div className="experience-card-copy">
                    <h3>PPLG Web Engineering Focus</h3>
                    <p>Fokus mendalam pada Laravel, MySQL, REST API, dan React.js</p>
                    <span className="experience-date">2024 — Sekarang</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Real-World Experience */}
              <div className="experience-group">
                <h2>Pengalaman Proyek Nyata</h2>

                <div className="experience-card">
                  <div className="experience-stat-icon">
                    <Globe size={24} />
                  </div>
                  <div className="experience-card-copy">
                    <h3>Backend Developer — DIDISPEN</h3>
                    <p>Sistem digitalisasi perizinan dan dispensasi siswa SMKN 1 Bangsri</p>
                    <span className="experience-date">Production Web Application · 2026</span>
                  </div>
                </div>

                <div className="experience-card">
                  <div className="experience-stat-icon">
                    <Layout size={24} />
                  </div>
                  <div className="experience-card-copy">
                    <h3>Backend Developer — BeWood</h3>
                    <p>Platform e-commerce katalog mebel dan furnitur pengrajin lokal Jepara</p>
                    <span className="experience-date">Full-Stack Web · 2025</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Metric Stat Cards */}
            <div className="experience-stats">
              <div className="experience-stat-card">
                <div className="experience-stat-top">
                  <div className="experience-stat-icon">
                    <Layers size={22} />
                  </div>
                  <strong>4+</strong>
                </div>
                <h3>PROYEK SELESAI</h3>
                <p>DIDISPEN, BeWood, Zaducation, ZeroMoney</p>
              </div>

              <div className="experience-stat-card">
                <div className="experience-stat-top">
                  <div className="experience-stat-icon">
                    <Sparkles size={22} />
                  </div>
                  <strong>100%</strong>
                </div>
                <h3>KESIAPAN INDUSTRI</h3>
                <p>Siap kontribusi langsung magang / PKL mitra</p>
              </div>

              <div className="experience-stat-card">
                <div className="experience-stat-top">
                  <div className="experience-stat-icon">
                    <Terminal size={22} />
                  </div>
                  <strong>2+</strong>
                </div>
                <h3>TAHUN PRAKTIK</h3>
                <p>Pengembangan web PHP, Laravel, MySQL & React</p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
           SPOTIFY SECTION (CODING SOUNDTRACK)
           ========================================================================= */}
        <section className="spotify-section">
          <div className="spotify-card">
            <div className="spotify-copy">
              <div className="spotify-eyebrow">
                <span className="spotify-eyebrow-dot" />
                <span>NOW PLAYING // CODING SOUNDTRACK</span>
              </div>
              <h2>
                Soundtrack yang Menemani <span>Setiap Baris Kode.</span>
              </h2>
              <p className="spotify-description">
                Musik lo-fi, synthwave, dan ambient yang menjaga fokus ritme komputasi saat merancang relasi basis data dan menyempurnakan interaksi UI.
              </p>
              <a
                href="https://open.spotify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-open-link"
              >
                <Music size={16} />
                <span>Dengarkan di Spotify</span>
              </a>
            </div>

            <div className="spotify-player-frame">
              <iframe
                title="Spotify Coding Soundtrack"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="spotify-embed"
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
           TERMINAL LAYOUT (GAMBAR 3 REVISION)
           ========================================================================= */}
        <section className="terminal-section py-4">
          <div className="max-w-[1200px] mx-auto px-4">
            <TerminalWindow />
          </div>
        </section>

        {/* =========================================================================
           PORTFOLIO SECTION (PROJECTS 2X2, REVISED SKILLS, EMPTY CERTIFICATES)
           ========================================================================= */}
        <section id="portfolio" className="portfolio-root-section">
          <div className="portfolio-container-inner">

            <div className="portfolio-section-header">
              <div className="portfolio-section-badge">
                <span className="portfolio-badge-dot" />
                <span>EXPLORE MY WORK</span>
              </div>
              <h2 className="portfolio-section-title">
                Featured Projects & Capabilities
              </h2>
              <p className="portfolio-section-subtitle">
                Kumpulan karya sistem informasi nyata, keahlian teknis pemrograman, serta dokumentasi sertifikasi.
              </p>
            </div>

            {/* Tab Switcher Bar */}
            <div className="portfolio-tab-bar" role="tablist" aria-label="Portfolio sections">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'projects'}
                onClick={() => setActiveTab('projects')}
                className={`portfolio-tab-btn ${activeTab === 'projects' ? 'is-active' : ''}`}
              >
                <Layers size={16} className="portfolio-tab-icon" />
                <span className="portfolio-tab-text">Projects</span>
                <span className="portfolio-tab-badge">{projectsData.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'skills'}
                onClick={() => setActiveTab('skills')}
                className={`portfolio-tab-btn ${activeTab === 'skills' ? 'is-active' : ''}`}
              >
                <Code2 size={16} className="portfolio-tab-icon" />
                <span className="portfolio-tab-text">Tech Skills</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'certificates'}
                onClick={() => setActiveTab('certificates')}
                className={`portfolio-tab-btn ${activeTab === 'certificates' ? 'is-active' : ''}`}
              >
                <Award size={16} className="portfolio-tab-icon" />
                <span className="portfolio-tab-text">Certificates</span>
                <span className="portfolio-tab-badge">0</span>
              </button>
            </div>

            {/* TAB CONTENT: PROJECTS (BALANCED 2X2 GRID WITH STACK FLOW & ROLES) */}
            {activeTab === 'projects' && (
              <div className="portfolio-cards-grid">
                {projectsData.map((project) => (
                  <div key={project.id} className="portfolio-project-card">
                    <div className="portfolio-project-card-content">
                      <div className="portfolio-card-thumbnail">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="portfolio-card-thumbnail-image"
                          loading="lazy"
                        />
                      </div>

                      <div className="portfolio-card-body">
                        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                          <span className="text-[11px] font-mono text-blue-400 font-semibold tracking-wider">
                            {project.category}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {project.role && (
                              <span className="role-chip">
                                {project.role}
                              </span>
                            )}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-400/20 text-blue-300">
                              {project.badge}
                            </span>
                          </div>
                        </div>

                        <h3 className="portfolio-card-title">{project.title}</h3>
                        <p className="portfolio-card-desc">{project.desc}</p>

                        {/* Stack Pipeline for DIDISPEN */}
                        {project.stackFlow && (
                          <div className="stack-flow-container">
                            <div className="stack-flow-header">
                              <GitBranch size={13} />
                              <span>Alur Stack:</span>
                            </div>
                            <div className="stack-flow-pipeline">
                              {project.stackFlow.map((step, idx) => (
                                <div key={step} className="stack-flow-item">
                                  <span className={`stack-flow-badge ${step === 'Laravel' || step === 'MySQL' ? 'highlight' : ''}`}>
                                    {step}
                                  </span>
                                  {idx < project.stackFlow.length - 1 && (
                                    <span className="stack-flow-arrow">➔</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tools.map((t) => (
                            <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="portfolio-details-btn"
                        >
                          <span>Lihat Detail Proyek</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: SKILLS (WITH AUTHENTIC TECH ICONS & REVISED STACK) */}
            {activeTab === 'skills' && (
              <div className="space-y-12">
                {skillsCategories.map((group) => (
                  <div key={group.category} className="space-y-4">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                      <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/25">
                        {group.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{group.category}</h3>
                    </div>

                    <div className="skills-grid-wrapper">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="skill-item-card group"
                        >
                          <div className="skill-icon-box group-hover:border-blue-400/50 group-hover:bg-white/10 transition-colors">
                            {skill.icon}
                          </div>
                          <div className="skill-info">
                            <span className="skill-title group-hover:text-blue-300 transition-colors">
                              {skill.name}
                            </span>
                            <span className="skill-level-text">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: CERTIFICATES (EMPTY STATE PLACEHOLDER) */}
            {activeTab === 'certificates' && (
              <div className="portfolio-empty-state">
                <div className="empty-state-icon-wrap">
                  <Award size={36} className="text-blue-400" />
                </div>
                <h3 className="empty-state-title">Belum Memiliki Sertifikat Resmi</h3>
                <p className="empty-state-desc">
                  Saat ini saya belum memiliki sertifikat resmi yang dipublikasikan. Seluruh fokus kompetensi saat ini didedikasikan pada penyelesaian proyek nyata (DIDISPEN & BeWood), penguatan arsitektur backend Laravel, dan persiapan sertifikasi kompetensi keahlian PPLG.
                </p>
                <div className="empty-state-badge">
                  <span className="empty-state-dot" />
                  <span>Fokus Portofolio Proyek Riil & Kesiapan PKL</span>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* =========================================================================
           CONTACT SECTION
           ========================================================================= */}
        <section id="contact" className="contact-root-section">
          <div className="contact-container-inner">

            <div className="contact-section-header">
              <div className="contact-section-badge">
                <span className="contact-badge-dot" />
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="contact-section-title">
                Let's Build Something Remarkable Together.
              </h2>
              <p className="contact-section-subtitle">
                Terbuka untuk tawaran magang / PKL mitra industri, proyek lepas web development, atau sekadar bertukar ide seputar teknologi.
              </p>
            </div>

            <div className="contact-main-grid">

              {/* Left Column: Direct Contact Cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#0c121e] border border-white/10 space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Informasi Kontak</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    Silakan hubungi saya melalui kanal langsung di bawah ini. Saya akan merespons secepat mungkin.
                  </p>

                  <div className="space-y-3 pt-2">
                    <a
                      href="mailto:theevil1896@gmail.com"
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 flex items-center gap-3.5 text-zinc-200 hover:text-white transition-all group"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-zinc-400 block">EMAIL RESMI</span>
                        <span className="text-sm font-semibold">theevil1896@gmail.com</span>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/6289509507443"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 flex items-center gap-3.5 text-zinc-200 hover:text-white transition-all group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-zinc-400 block">WHATSAPP / DIRECT CALL</span>
                        <span className="text-sm font-semibold">+62 895-0950-7443</span>
                      </div>
                    </a>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5 text-zinc-200">
                      <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-zinc-400 block">DOMISILI / LOKASI</span>
                        <span className="text-sm font-semibold">Jepara, Jawa Tengah, Indonesia</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available for PKL Callout Card */}
                <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/25 flex items-center gap-4">
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping flex-none" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Status: Siap PKL / Magang</h4>
                    <p className="text-xs text-zinc-300 mt-0.5 font-light">
                      Berkomitmen penuh berkontribusi di perusahaan software house, instansi, atau mitra industri.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Message Form */}
              <div className="p-6 md:p-8 rounded-2xl bg-[#0c121e] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Kirim Pesan Langsung</h3>
                <p className="text-xs text-zinc-400 mb-6 font-light">
                  Formulir ini terhubung langsung untuk diskusi tawaran kerjasama atau konsultasi proyek.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      onFocus={() => setIsUserTyping(true)}
                      onBlur={() => setIsUserTyping(false)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1.5">Alamat Email</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      onFocus={() => setIsUserTyping(true)}
                      onBlur={() => setIsUserTyping(false)}
                      placeholder="budi@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1.5">Pesan / Topik Diskusi</label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      onFocus={() => setIsUserTyping(true)}
                      onBlur={() => setIsUserTyping(false)}
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 text-white text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(44,103,237,0.4)] flex items-center justify-center gap-2"
                  >
                    {formSubmitted ? (
                      <>
                        <Check size={16} className="text-emerald-300" />
                        <span>Pesan Berhasil Terkirim!</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Kirim Pesan Sekarang</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
           FOOTER
           ========================================================================= */}
        <footer className="footer-root">
          <div className="footer-container">
            <div className="footer-top-row">

              <div className="footer-brand-wrap">
                <div className="footer-logo mb-3">
                  <MzaLogo size={36} showText={true} />
                </div>
                <p className="footer-tagline">
                  Full-Stack Web Developer & Siswa PPLG SMK Negeri 1 Bangsri. Berfokus pada arsitektur sistem informasi Laravel, basis data relasional MySQL, dan pengalaman antarmuka web modern.
                </p>
              </div>

              <div className="footer-nav-col">
                <span className="footer-col-heading">NAVIGASI CEPAT</span>
                <div className="footer-links-list">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer-nav-col">
                <span className="footer-col-heading">JARINGAN SOSIAL</span>
                <div className="footer-social-row">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      aria-label={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            <div className="footer-bottom-row">
              <p className="footer-copyright">
                © {new Date().getFullYear()} Muhammad Zainal Arief. All rights reserved.
              </p>

              <button
                type="button"
                onClick={() => scrollTo('#hero')}
                className="footer-back-to-top"
              >
                <span>Kembali ke Atas</span>
                <ChevronUp size={15} />
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* =========================================================================
         PROJECT DETAIL MODAL (SCROLLS VIA WEB WINDOW RIGHT SCROLLBAR)
         ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="portfolio-modal-backdrop" data-lenis-prevent="true" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="portfolio-modal-content"
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="portfolio-modal-close-btn"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>

              <div className="portfolio-modal-header-banner">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="portfolio-modal-body">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="portfolio-modal-badge">{selectedProject.badge}</span>
                  <span className="text-xs font-mono text-blue-400">{selectedProject.category}</span>
                  {selectedProject.role && (
                    <span className="role-chip">
                      Peran: {selectedProject.role}
                    </span>
                  )}
                </div>

                <h3 className="portfolio-modal-title">{selectedProject.title}</h3>
                <p className="portfolio-modal-desc">{selectedProject.fullDesc}</p>

                {/* Stack Architecture Flow for DIDISPEN */}
                {selectedProject.stackFlow && (
                  <div className="stack-flow-container my-4">
                    <div className="stack-flow-header">
                      <GitBranch size={14} />
                      <span className="text-xs">Alur Arsitektur Stack (Pipeline):</span>
                    </div>
                    <div className="stack-flow-pipeline">
                      {selectedProject.stackFlow.map((step, idx) => (
                        <div key={step} className="stack-flow-item">
                          <span className={`stack-flow-badge ${step === 'Laravel' || step === 'MySQL' ? 'highlight' : ''}`}>
                            {step}
                          </span>
                          {idx < selectedProject.stackFlow.length - 1 && (
                            <span className="stack-flow-arrow">➔</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h4 className="portfolio-modal-subheading">Fitur-Fitur Utama:</h4>
                <ul className="portfolio-modal-features">
                  {selectedProject.features.map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>

                <h4 className="portfolio-modal-subheading">Arsitektur & Komponen:</h4>
                <ul className="portfolio-modal-features">
                  {selectedProject.architecture.map((arch) => (
                    <li key={arch}>{arch}</li>
                  ))}
                </ul>

                <h4 className="portfolio-modal-subheading">Teknologi yang Digunakan:</h4>
                <div className="portfolio-modal-tags">
                  {selectedProject.tools.map((tool) => (
                    <span key={tool} className="portfolio-modal-tag-chip">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="portfolio-modal-actions">
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-modal-btn solid"
                    >
                      <Globe size={16} />
                      <span>Kunjungi Live Demo</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-modal-btn outline"
                    >
                      <GithubIcon size={16} />
                      <span>Lihat Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
