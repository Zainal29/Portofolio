
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Menu,
  X,
  Mail,
  Sparkles,
  Download,
} from 'lucide-react'
import heroImg from './assets/profilMZA.png'
import didispenImg from './assets/projects/didispen.png'
import bewoodImg from './assets/projects/bewood.png'
import zaducationImg from './assets/projects/zaducation.png'
import zeromoneyImg from './assets/projects/zeromoney.png'
import './App.css'
// import { image } from 'framer-motion/m'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

// const technologies = ['Laravel', 'React', 'Tailwind CSS']

const technologies = ['Laravel', 'React', 'Tailwind CSS', 'Figma']

  // skills
const skills = [
  {
    number: '01',
    title: 'Frontend Development',
    description:
      'Membangun antarmuka website yang responsif, interaktif, dan nyaman digunakan.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Backend Development',
    description:
      'Mengembangkan sistem web dengan struktur backend yang terorganisir dan mudah dikembangkan.',
    tools: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    number: '03',
    title: 'Full-Stack Development',
    description:
      'Menghubungkan frontend dan backend untuk menghasilkan aplikasi web yang fungsional dari sisi pengguna hingga sistem.',
    tools: ['Laravel', 'React', 'REST API'],
  },
  {
    number: '04',
    title: 'Development Tools',
    description:
      'Menggunakan berbagai tools untuk membantu proses pengembangan, debugging, dan pengelolaan kode.',
    tools: ['Git', 'GitHub', 'VS Code','Zed'],
  },
]

// Projects
const projects = [
  {
    number: '01',
    title: 'DIDISPEN',
    category: 'WEB APPLICATION',
    description:
      'Sistem digital untuk membantu proses pengajuan dan pengelolaan dispensasi siswa secara lebih terstruktur dan terintegrasi.',
    image:didispenImg,
    tools: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS'],
    featured: true,
    links: {
      demo: 'https://didispen.smkn1bangsri.sch.id',
      github: 'https://github.com/Zainal29/Didispen',
    }
  },
  {
    number: '02',
    title: 'BeWood',
    category: 'WEB E-COMMERCE',
    description:
      'Aplikasi web yang dikembangkan untuk membantu usaha mebel di Jepara.',
    image: bewoodImg,
    tools: ['Laravel', 'PHP', 'MySQL', 'JavaScript','Tailwind CSS'],
    featured: false,
    links: {
      demo: '',
      github: 'https://github.com/Zainal29/BeWood_3',
    },
  },
  {
    number: '03',
    title: 'Zaducation',
    category: 'LANDING PAGE DESIGN',
    description:
      'Desain landing page bertema edukasi yang dibuat dengan fokus pada tampilan modern, struktur informasi, dan pengalaman pengguna.',
    image: zaducationImg,
    tools: ['UI Design', 'Landing Page', 'Figma'],
    featured: false,
    links: {
      demo: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=805-93&t=KiWeNoUMVrqMuPzq-1',
      github: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=805-93&t=KiWeNoUMVrqMuPzq-1',
    },
  },
  {
    number: '04',
    title: 'ZeroMoney',
    category: 'FINANCE DASHBOARD',
    description:
      'Desain dashboard finance untuk menampilkan informasi keuangan secara terstruktur melalui tampilan yang sederhana dan mudah dipahami.',
    image: zeromoneyImg,
    tools: ['UI Design', 'Dashboard', 'Figma'],
    featured: false,
    links: {
      demo: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=1136-2322&t=KiWeNoUMVrqMuPzq-1',
      github: 'https://www.figma.com/design/KYmCNlJZEAnKjm2ED2MN3Y/XII-PPLG-2-DIGIPEN?node-id=1136-2322&t=KiWeNoUMVrqMuPzq-1',
    },
  },
]



// Journey
const journeyItems = [
  {
    number: '01',
    period: 'BEGINNING',
    title: 'Mulai Mempelajari Web Development',
    description:
      'Memulai perjalanan dengan mempelajari dasar HTML, CSS, JavaScript, dan bagaimana sebuah website dibangun dari sisi frontend.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    number: '02',
    period: 'DEVELOPMENT',
    title: 'Mendalami Backend Development',
    description:
      'Mulai membangun aplikasi web dengan PHP dan Laravel serta mempelajari database, routing, authentication, dan struktur aplikasi.',
    tags: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    number: '03',
    period: 'PROJECT',
    title: 'Membangun Project Nyata',
    description:
      'Mengembangkan project seperti DIDISPEN dan PiketKu untuk menerapkan kemampuan web development dalam menyelesaikan kebutuhan nyata.',
    tags: ['Laravel', 'Web Application', 'Problem Solving'],
  },
  {
    number: '04',
    period: 'NOW',
    title: 'Mengembangkan Skill Full-Stack',
    description:
      'Terus mengembangkan kemampuan frontend dan backend serta mengeksplorasi React, REST API, dan teknologi web modern.',
    tags: ['React', 'REST API', 'Full-Stack'],
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="ZA.dev Home">
        <span className="brand-icon">Z</span>
        <span>ZAIN<span className="brand-muted">.dev</span></span>
      </a>

      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={
              activeSection === link.href.substring(1)
                ? 'active'
                : ''
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          Let's Talk <ArrowUpRight size={15} />
        </a>
      </nav>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero-section section-container" id="home">
      <div className="hero-copy">
        <motion.div
          className="availability"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <span className="status-dot" />
          WEB DEVELOPER
          <span className="availability-divider">/</span>
          INDONESIA
        </motion.div>

        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Halo, saya
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Muhammad
          <br />
          Zainal <span className="accent-text">Arief.</span>
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Code2 size={18} />
          <span>Full-Stack Web Developer</span>
        </motion.div>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Saya membangun website yang menggabungkan desain intuitif,
          fungsionalitas, dan teknologi modern untuk menghadirkan
          pengalaman digital yang bermanfaat.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
            download="CV_MUHAMMAD_ZAINAL_ARIEF.pdf"
            className="hero-button"
          >
            <Download size={18} />
            Download CV
          </a>
          <a href="#projects" className="button-primary">
            Jelajahi Proyek <ArrowDownRight size={18} />
          </a>
          <a href="#contact" className="button-secondary">
            <Mail size={17} /> Hubungi Saya
          </a>
        </motion.div>

        <motion.div
          className="hero-tech"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="tech-label">TECH I WORK WITH</span>
          <div className="tech-list">
            {technologies.map((tech) => (
              <span className="tech-pill" key={tech}>{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.94, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />

        <div className="profile-card">
          <div className="profile-card-top">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="profile-card-label">PROFILE / 001</span>
          </div>

          <div className="profile-image-wrap">
            <img
              src={heroImg}
              alt="Ilustrasi profil Muhammad Zainal Arief"
              className="profile-image"
            />
            <div className="image-overlay" />
            <span className="image-index">ZAIN — 2026</span>
          </div>

          <div className="profile-card-bottom">
            <div>
              <p className="profile-name">Muhammad Zainal Arief</p>
              <p className="profile-title">Web Developer · Indonesia</p>
            </div>
            <span className="profile-arrow">
              <ArrowUpRight size={19} />
            </span>
          </div>
        </div>

        <div className="floating-badge badge-code">
          <span className="floating-icon"><Code2 size={17} /></span>
          <span>
            <strong>Clean Code</strong>
            <small>Built with purpose</small>
          </span>
        </div>

        <div className="floating-badge badge-spark">
          <Sparkles size={18} />
          <span>Creative Developer</span>
        </div>

        <div className="visual-caption">
          <span>DESIGN</span>
          <span className="caption-line" />
          <span>DEVELOP</span>
          <span className="caption-line" />
          <span>DEPLOY</span>
        </div>
      </motion.div>

      <a href="#about" className="scroll-indicator">
        <span className="scroll-icon"><ArrowDown size={15} /></span>
        SCROLL TO EXPLORE
      </a>

      <span className="hero-index">01 / 06</span>
    </section>
  )
}

function PlaceholderSection({ id, number, title, description }) {
  return (
    <section className="placeholder-section section-container" id={id}>
      <span className="section-eyebrow">SECTION / {number}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="coming-soon">CONTENT COMING NEXT <ArrowDownRight size={16} /></span>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="content-section about-section section-container" id="about">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">SECTION / 02</span>
          <h2>
            Tentang <span className="accent-text">Saya.</span>
          </h2>
        </div>

        <span className="section-number">02</span>
      </div>

      <div className="about-grid">
        <div className="about-intro">
          <p className="about-lead">
            Saya siswa dari SMK Negeri 1 Bangsri jurusan Pengembangan Perangkat Lunak dan Gim (PPLG), seorang web developer yang memiliki ketertarikan pada
            pengembangan aplikasi web modern, baik dari sisi frontend maupun
            backend.
          </p>

          <p>
            Saya senang mempelajari bagaimana sebuah website tidak hanya
            terlihat baik, tetapi juga dapat menyelesaikan masalah dan
            memberikan pengalaman yang mudah digunakan bagi penggunanya.
          </p>
        </div>

        <div className="about-details">
          <div className="detail-item">
            <span>01</span>
            <div>
              <strong>Web Development</strong>
              <p>
                Fokus pada pengembangan website responsif dan aplikasi web
                menggunakan teknologi modern.
              </p>
            </div>
          </div>

          <div className="detail-item">
            <span>02</span>
            <div>
              <strong>Problem Solving</strong>
              <p>
                Mengubah kebutuhan menjadi solusi digital yang terstruktur,
                fungsional, dan mudah dikembangkan.
              </p>
            </div>
          </div>

          <div className="detail-item">
            <span>03</span>
            <div>
              <strong>Continuous Learning</strong>
              <p>
                Terus mengeksplorasi teknologi dan pendekatan baru untuk
                meningkatkan kemampuan dalam pengembangan web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// skils
function SkillsSection() {
  return (
    <section className="content-section skills-section section-container" id="skills">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">SECTION / 03</span>
          <h2>
            Skills & <span className="accent-text">Technologies.</span>
          </h2>
        </div>

        <span className="section-number">03</span>
      </div>

      <p className="section-description">
        Teknologi yang saya gunakan untuk membangun dan mengembangkan aplikasi
        web.
      </p>

      <div className="skills-grid">
        {skills.map((skill) => (
          <motion.article
            className="skill-card"
            key={skill.number}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="skill-card-top">
              <span>{skill.number}</span>
              <ArrowUpRight size={18} />
            </div>

            <h3>{skill.title}</h3>

            <p>{skill.description}</p>

            <div className="skill-tools">
              {skill.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// projects
function ProjectsSection() {
  return (
    <section
      className="content-section projects-section section-container"
      id="projects"
    >
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">SECTION / 04</span>

          <h2>
            Selected <span className="accent-text">Projects.</span>
          </h2>
        </div>

        <span className="section-number">04</span>
      </div>

      <p className="section-description">
        Beberapa aplikasi web yang saya bangun untuk menerapkan kemampuan
        frontend, backend, database, dan problem solving.
      </p>

      <div className="projects-list">
        {projects.map((project) => (
          <motion.article
            className={`project-card ${
              project.featured ? 'project-featured' : ''
            }`}
            key={project.number}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
          >
            <div className="project-top">
              <span className="project-number">
                {project.number}
              </span>

              <span className="project-category">
                {project.category}
              </span>
            </div>

            {/* PROJECT IMAGE */}
            <a
              href={project.links.demo || project.links.github}
              target="_blank"
              rel="noreferrer"
              className="project-preview"
              aria-label={`Buka project ${project.title}`}
            >
              <img
                src={project.image}
                alt={`Screenshot ${project.title}`}
              />

              <div className="project-preview-overlay">
                <span>VIEW PROJECT</span>
                <ArrowUpRight size={20} />
              </div>
            </a>

            {/* PROJECT CONTENT */}
            <div className="project-content">
              <div>
                <h3>{project.title}</h3>

                <p>{project.description}</p>
              </div>

              <a
                href={project.links.demo || project.links.github}
                target="_blank"
                rel="noreferrer"
                className="project-arrow"
                aria-label={`Buka project ${project.title}`}
              >
                <ArrowUpRight size={24} />
              </a>
            </div>

            {/* TOOLS */}
            <div className="project-tools">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// Journey
function JourneySection() {
  return (
    <section
      className="content-section journey-section section-container"
      id="journey"
    >
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">SECTION / 05</span>

          <h2>
            My <span className="accent-text">Journey.</span>
          </h2>
        </div>

        <span className="section-number">05</span>
      </div>

      <p className="section-description">
        Perjalanan saya dalam mempelajari, membangun, dan terus mengembangkan
        kemampuan di dunia web development.
      </p>

      <div className="journey-timeline">
        {journeyItems.map((item) => (
          <motion.article
            className="journey-item"
            key={item.number}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <div className="journey-marker">
              <span>{item.number}</span>
            </div>

            <div className="journey-period">
              {item.period}
            </div>

            <div className="journey-content">
              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <div className="journey-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// Contact
function ContactSection() {
  return (
    <section
      className="content-section contact-section section-container"
      id="contact"
    >
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">SECTION / 06</span>

          <h2>
            Let's <span className="accent-text">Connect.</span>
          </h2>
        </div>

        <span className="section-number">06</span>
      </div>

      <div className="contact-layout">
        <motion.div
          className="contact-main"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="contact-label">HAVE A PROJECT IN MIND?</p>

          <h3>
            Mari buat sesuatu yang
            <span className="accent-text"> bermanfaat.</span>
          </h3>

          <p className="contact-description">
            Saya terbuka untuk berdiskusi mengenai project website,
            pengembangan aplikasi, maupun kolaborasi di bidang web
            development.
          </p>

          <a
            href="mailto:theevil1896@gmail.com"
            className="contact-email"
          >
            <Mail size={20} />
            <span>theevil1896@gmail.com</span>
            <ArrowUpRight size={20} />
          </a>
        </motion.div>

        <motion.div
          className="contact-side"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="contact-meta">
            <span>BASED IN</span>
            <strong>Indonesia</strong>
          </div>

          <div className="contact-meta">
            <span>FOCUS</span>
            <strong>Web Development</strong>
          </div>

          <div className="contact-meta">
            <span>STACK</span>
            <strong>Laravel · React</strong>
          </div>

          <div className="contact-socials">
            <a
              href="https://github.com/Zainal29"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/muhammad-zainal-arief-6b9654433/?isSelfProfile=true"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#home">
        <span className="brand-icon">Z</span>
        <span>
          ZAIN<span className="brand-muted">.dev</span>
        </span>
      </a>

      <p>
        © {new Date().getFullYear()} Muhammad Zainal Arief
      </p>

      <a href="#home" className="back-top">
        Back to top <ArrowUpRight size={15} />
      </a>
    </footer>
  )
}

function App() {
  return (
    <>
      <div className="site-background" />
      <Navbar />

      <main>
        <HeroSection />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <JourneySection />

        <ContactSection />

      </main>

      <Footer />
    </>
  )
}

export default App
