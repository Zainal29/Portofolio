import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import {
  ArrowUpRight, Download, Mail,
  Phone, MapPin, Sparkles, Check, Send, Award,
  Code2, Database, Layout, GitBranch, ChevronUp, Menu, X,
  Layers, Terminal, Server, Globe, ArrowRight, FileText,
  AlertCircle, Info, ExternalLink
} from 'lucide-react';

import TerminalWindow from './components/TerminalWindow';
import DeveloperShowcaseCard from './components/DeveloperShowcaseCard';
import MzaLogo from './components/MzaLogo';
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
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('about');

  // Hacker persona hover / pin state
  const portraitStageRef = useRef(null);
  const [isHackerHovered, setIsHackerHovered] = useState(false);

  const triggerAuraPulse = () => {
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
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'activation_needed' | 'error'
  const [formStatusMsg, setFormStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setNavScrolled(window.scrollY > 20);
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
    try {
      if (window.location.hash && window.location.hash.length > 1) {
        const hash = window.location.hash;
        const timer = setTimeout(() => {
          try {
            const el = document.querySelector(hash);
            if (el) {
              if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: hash === '#hero' ? 0 : -70, immediate: true });
              } else {
                el.scrollIntoView();
              }
            }
          } catch {
            // Safe fallback
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Safe fallback
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage || isSubmitting) return;

    // Honeypot check for bots
    const botField = e.target.elements['botcheck'];
    if (botField && botField.checked) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus('submitting');
    setFormStatusMsg('');

    try {
      // Send directly to theevil1896@gmail.com via FormSubmit.co AJAX API
      const res = await fetch('https://formsubmit.co/ajax/theevil1896@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage,
          _subject: `[MZA Portfolio] Pesan Baru dari ${formName}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === 'true' || data.success === true)) {
        setFormStatus('success');
        setFormStatusMsg('Pesan berhasil terkirim dan diteruskan langsung ke theevil1896@gmail.com.');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#2563eb', '#38bdf8', '#10b981', '#ffffff']
        });
        triggerAuraPulse();
        setFormSubmitted(true);
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setFormStatus('activation_needed');
        setFormStatusMsg('FormSubmit memerlukan aktivasi email pertama kali: Cek inbox atau folder Spam/Promosi pada theevil1896@gmail.com dan klik "Activate Form".');
        setFormSubmitted(true);
      } else {
        setFormStatus('error');
        setFormStatusMsg(data.message || 'Gagal mengirim otomatis. Silakan gunakan tombol langsung WhatsApp atau Gmail di bawah.');
        setFormSubmitted(true);
      }
    } catch {
      setFormStatus('error');
      setFormStatusMsg('Koneksi terhambat. Silakan hubungi langsung via WhatsApp atau Gmail di bawah.');
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-page-container">
      {/* High-Performance Precision Solid Tech Blueprint Grid (Zero GPU Overhead, No Gradients/Blur) */}
      <div className="solid-tech-grid-bg" aria-hidden="true" />

      {/* Floating Modern Pill Navbar */}
      <header className="navbar-root fixed top-3 md:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <div className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-8 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 max-w-4xl w-full ${
          navScrolled
            ? 'bg-[#0c121e]/95 border-slate-700/80 shadow-2xl backdrop-blur-md'
            : 'bg-[#0c121e]/90 border-slate-800 shadow-xl backdrop-blur-sm'
        }`}>

          {/* Simple Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center shrink-0"
            aria-label="MZA.dev - Muhammad Zainal Arief"
          >
            <MzaLogo size={28} showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(link.label.toLowerCase());
                  scrollTo(link.href);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeNav === link.label.toLowerCase()
                    ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              <span>Let's Talk</span>
              <ArrowRight size={13} />
            </a>

            <button
              type="button"
              className="md:hidden p-1.5 text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
                <h1 className="hero-h1-accent">Zainal Arief.</h1>
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

            {/* Right Column: Developer Engineering Spec Card (High-Performance Replacement) */}
            <div className="hero-visual-col flex items-center justify-center relative w-full">
              <DeveloperShowcaseCard />
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
                className={`about-portrait-stage is-in-view cursor-pointer ${isHackerHovered ? 'spider-hovered hacker-active' : ''}`}
                onMouseEnter={() => setIsHackerHovered(true)}
                onMouseLeave={() => setIsHackerHovered(false)}
                onMouseMove={handlePortraitMouseMove}
                onClick={() => setIsHackerHovered(!isHackerHovered)}
                title="Arahkan kursor atau ketuk foto untuk beralih kostum Hacker"
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
              <button
                type="button"
                onClick={() => setIsHackerHovered(!isHackerHovered)}
                className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isHackerHovered ? '⚡ MODE HACKER AKTIF' : 'KETUK / HOVER: MODE HACKER'}</span>
              </button>
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
            <div className="flex justify-center w-full mb-10">
              <div className="portfolio-tab-bar" role="tablist" aria-label="Portfolio sections">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'projects'}
                  onClick={() => setActiveTab('projects')}
                  className={`portfolio-tab-btn ${activeTab === 'projects' ? 'is-active' : ''}`}
                >
                  <Layers size={15} className="portfolio-tab-icon" />
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
                  <Code2 size={15} className="portfolio-tab-icon" />
                  <span className="portfolio-tab-text">Tech Skills</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'certificates'}
                  onClick={() => setActiveTab('certificates')}
                  className={`portfolio-tab-btn ${activeTab === 'certificates' ? 'is-active' : ''}`}
                >
                  <Award size={15} className="portfolio-tab-icon" />
                  <span className="portfolio-tab-text">Certificates</span>
                  <span className="portfolio-tab-badge">Persiapan</span>
                </button>
              </div>
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
              <div className="p-6 md:p-8 rounded-2xl bg-[#0c121e] border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-2">Kirim Pesan Langsung</h3>
                <p className="text-xs text-zinc-400 mb-6 font-light">
                  Formulir ini terhubung langsung untuk mengirim pesan ke email <strong>theevil1896@gmail.com</strong> dengan proteksi anti-spam Cloudflare.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Honeypot Anti-Spam Hidden Checkbox */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1.5">Alamat Email Anda</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="budi@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1.5">Pesan / Topik Diskusi</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Tuliskan pesan atau tawaran kerjasama Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile Anti-Spam Widget */}
                  <div className="py-1">
                    <div
                      className="cf-turnstile"
                      data-sitekey="1x00000000000000000000AA"
                      data-theme="dark"
                      data-size="flexible"
                    />
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Proteksi Cloudflare Turnstile Aktif (Bebas Spam & Bot)</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                        <span className="truncate">Mengirim pesan...</span>
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <Check size={16} className="text-emerald-300 shrink-0" />
                        <span>Pesan Berhasil Terkirim!</span>
                      </>
                    ) : formStatus === 'activation_needed' ? (
                      <>
                        <Info size={16} className="text-amber-300 shrink-0" />
                        <span>Aktivasi Diperlukan!</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="shrink-0" />
                        <span>Kirim Pesan</span>
                        <span className="hidden sm:inline"> ke theevil1896@gmail.com</span>
                        <span className="sm:hidden"> ➔</span>
                      </>
                    )}
                  </button>

                  {/* Form Status Card with Transparent Feedback & Instant Direct Actions */}
                  {formSubmitted && (
                    <div className={`p-4 rounded-xl border text-xs space-y-2.5 mt-3 transition-all ${
                      formStatus === 'success'
                        ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-200'
                        : formStatus === 'activation_needed'
                        ? 'bg-slate-900/90 border-amber-500/40 text-amber-200'
                        : 'bg-slate-900/90 border-rose-500/40 text-rose-200'
                    }`}>
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        {formStatus === 'success' && <Check size={16} className="text-emerald-400 shrink-0" />}
                        {formStatus === 'activation_needed' && <Info size={16} className="text-amber-400 shrink-0" />}
                        {formStatus === 'error' && <AlertCircle size={16} className="text-rose-400 shrink-0" />}
                        <span>
                          {formStatus === 'success' && 'Terkirim ke theevil1896@gmail.com'}
                          {formStatus === 'activation_needed' && 'Aktivasi Form Diperlukan (Cek Email Anda)'}
                          {formStatus === 'error' && 'Pengiriman Otomatis Terkendala'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed font-light">
                        {formStatus === 'success' && 'Pesan Anda telah berhasil dikirim ke theevil1896@gmail.com. Kami akan segera merespons.'}
                        {formStatus === 'activation_needed' && (
                          <>
                            FormSubmit telah mengirimkan email konfirmasi ke <strong className="text-white">theevil1896@gmail.com</strong>.
                            Silakan buka Gmail Anda (cek folder <strong className="text-white">Spam, Promosi, atau Info Terbaru</strong>) dan klik tombol <strong className="text-amber-300">"Activate Form"</strong> satu kali saja. Setelah aktif, semua pesan pengunjung akan langsung masuk ke inbox utama Anda!
                          </>
                        )}
                        {formStatus === 'error' && (
                          <>
                            Form otomatis terkendala. Jangan khawatir, Anda dapat langsung mengirim pesan ini dengan 1-klik melalui tombol Gmail Web atau WhatsApp di bawah:
                          </>
                        )}
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                        {/* Direct Gmail Web Compose */}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=theevil1896@gmail.com&su=${encodeURIComponent('Pesan Portofolio dari ' + (formName || 'Pengunjung'))}&body=${encodeURIComponent((formMessage || '') + '\n\nDari: ' + (formName || '') + ' (' + (formEmail || '') + ')')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-500/50 text-blue-300 hover:bg-blue-600 hover:text-white text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Mail size={13} />
                          <span>Buka di Gmail Web ➔</span>
                        </a>

                        {/* Direct WhatsApp Message */}
                        <a
                          href={`https://wa.me/6289509507443?text=${encodeURIComponent('Halo Zainal, saya ' + (formName || '') + ' (' + (formEmail || '') + ').\n\nPesan:\n' + (formMessage || ''))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Phone size={13} />
                          <span>Kirim via WhatsApp ➔</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormStatus('idle');
                            setFormName('');
                            setFormEmail('');
                            setFormMessage('');
                          }}
                          className="px-2.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
                        >
                          Tulis Ulang
                        </button>
                      </div>
                    </div>
                  )}
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
