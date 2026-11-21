import { useState } from 'react';
import { Terminal, Check, Copy } from 'lucide-react';

export default function TerminalWindow() {
  const [activeTab, setActiveTab] = useState('status');
  const [copied, setCopied] = useState(false);

  const copyContent = () => {
    let textToCopy = '';
    if (activeTab === 'status') {
      textToCopy = `zainal@mza-workstation:~$ systemctl status dev-stack.service
● dev-stack.service - Muhammad Zainal Arief Engineering Environment
     Loaded: loaded (/etc/systemd/system/dev-stack.service; enabled)
     Active: active (running) since Nov 2023; 2 years practice
     Status: "Ready for PKL & Industri"
     Tasks: 16 (backend, orm, database, frontend, api)`;
    } else if (activeTab === 'pipeline') {
      textToCopy = `# 1. DIDISPEN Production Stack Pipeline
Laravel -> PHP -> CSS3 -> JavaScript -> MySQL
Role: Backend Developer (Muhammad Zainal Arief)

# 2. BEWOOD Production Stack Pipeline
Laravel -> PHP -> Tailwind CSS -> JavaScript -> MySQL
Role: Backend Developer (Muhammad Zainal Arief)`;
    } else {
      textToCopy = JSON.stringify({
        name: "Muhammad Zainal Arief",
        school: "SMK Negeri 1 Bangsri",
        major: "PPLG",
        role: "Backend Developer",
        email: "theevil1896@gmail.com",
        location: "Jepara, Indonesia"
      }, null, 2);
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    try {
      window.dispatchEvent(new CustomEvent('aura:saved-pulse'));
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window-wrapper">
      <div className="terminal-window">
        {/* Title Bar */}
        <div className="terminal-header flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 gap-2">
          <div className="terminal-dots flex items-center gap-1.5 shrink-0">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
          </div>

          <div className="terminal-title flex items-center gap-1.5 min-w-0">
            <Terminal size={14} className="text-cyan-400 shrink-0" />
            <span className="truncate text-xs font-mono">zainal@mza-workstation</span>
            <span className="hidden sm:inline text-xs font-mono">: ~ (bash)</span>
          </div>

          <div className="terminal-actions shrink-0">
            <button
              type="button"
              onClick={copyContent}
              className="terminal-copy-btn text-xs"
              title="Salin isi terminal"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span className="hidden xs:inline">{copied ? 'Tersalin' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="terminal-tabs-bar flex items-center overflow-x-auto no-scrollbar py-1 px-2 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`terminal-tab-btn whitespace-nowrap shrink-0 text-xs px-2.5 py-1 rounded-md ${activeTab === 'status' ? 'is-active' : ''}`}
          >
            <span>systemctl_status.sh</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`terminal-tab-btn whitespace-nowrap shrink-0 text-xs px-2.5 py-1 rounded-md ${activeTab === 'pipeline' ? 'is-active' : ''}`}
          >
            <span>stack_pipeline.sh</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('whoami')}
            className={`terminal-tab-btn whitespace-nowrap shrink-0 text-xs px-2.5 py-1 rounded-md ${activeTab === 'whoami' ? 'is-active' : ''}`}
          >
            <span>whoami.json</span>
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {activeTab === 'status' && (
            <div className="terminal-code">
              <p className="terminal-line"><span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ neofetch --theme matrix</p>
              <div className="terminal-neofetch-grid">
                <div className="terminal-ascii-art hidden md:flex">
                  <span className="text-cyan-400">      /\_/\      </span>
                  <span className="text-cyan-400">     ( o.o )     </span>
                  <span className="text-blue-400">      &gt; ^ &lt;      </span>
                  <span className="text-blue-500">   [MZA // PPLG]  </span>
                  <span className="text-emerald-400">   =============  </span>
                </div>
                <div className="terminal-specs w-full">
                  <p><span className="terminal-key">OS:</span> <span className="text-white">Linux x86_64 // Ubuntu Server & Arch</span></p>
                  <p><span className="terminal-key">Host:</span> <span className="text-white">SMK Negeri 1 Bangsri · Kelas XII PPLG</span></p>
                  <p><span className="terminal-key">Role:</span> <span className="text-emerald-300 font-semibold">Backend Developer (Laravel Developer)</span></p>
                  <p><span className="terminal-key">Uptime:</span> <span className="text-white">2+ Tahun Praktik Rekayasa Web</span></p>
                  <p><span className="terminal-key">Shell:</span> <span className="text-white">bash 5.2.21 / zsh 5.9</span></p>
                  <p><span className="terminal-key">IDE:</span> <span className="text-sky-300">VS Code · Git CLI · Postman</span></p>
                  <p><span className="terminal-key">Status:</span> <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">AVAILABLE FOR PKL & INDUSTRI</span></p>
                </div>
              </div>

              <div className="terminal-divider" />

              <p className="terminal-line"><span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ systemctl --type=service --state=running</p>
              <div className="terminal-services-list">
                <p className="text-emerald-400">● didispen.service       <span className="text-zinc-400">[ONLINE]</span> Live SMKN 1 Bangsri (Perizinan Siswa)</p>
                <p className="text-emerald-400">● bewood-catalog.service  <span className="text-zinc-400">[ONLINE]</span> UMKM Mebel Jepara E-Commerce</p>
                <p className="text-cyan-400">● mysql8-database.service <span className="text-zinc-400">[ONLINE]</span> Port 3306 (Relational Schema Active)</p>
                <p className="text-green-400">● mongodb-nosql.service   <span className="text-zinc-400">[ONLINE]</span> Collections & Document Store Active</p>
              </div>

              <p className="terminal-line terminal-cursor-line">
                <span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ <span className="terminal-cursor">█</span>
              </p>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="terminal-code">
              <p className="terminal-line"><span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ cat /etc/production/didispen_pipeline.sh</p>
              <div className="terminal-script-output">
                <p className="text-zinc-500">#!/usr/bin/env bash</p>
                <p className="text-zinc-500"># ========================================================</p>
                <p className="text-zinc-500"># 1. DIDISPEN PRODUCTION PIPELINE</p>
                <p className="text-zinc-500"># ========================================================</p>
                <p className="text-sky-300 font-bold">ALUR_STACK_DIDISPEN=(</p>
                <p className="pl-4 text-emerald-300">"1. Laravel (Framework Core & MVC Routing)"</p>
                <p className="pl-4 text-emerald-300">"2. PHP (Backend Logic & Eloquent ORM)"</p>
                <p className="pl-4 text-emerald-300">"3. CSS3 & Tailwind (Modern Responsive Styling)"</p>
                <p className="pl-4 text-emerald-300">"4. JavaScript (Client Validation & Real-time DOM)"</p>
                <p className="pl-4 text-emerald-300">"5. MySQL (Relational DB & Audit Logging)"</p>
                <p className="text-sky-300 font-bold">)</p>
                <p className="text-xs text-zinc-400 mt-1"><span className="text-yellow-400">ROLE_DIDISPEN</span>="<span className="text-white font-bold">Backend Developer</span>"</p>
                <br />
                <p className="text-zinc-500"># ========================================================</p>
                <p className="text-zinc-500"># 2. BEWOOD E-COMMERCE PIPELINE</p>
                <p className="text-zinc-500"># ========================================================</p>
                <p className="text-sky-300 font-bold">ALUR_STACK_BEWOOD=(</p>
                <p className="pl-4 text-emerald-300">"1. Laravel (Routing, Controller, Middleware)"</p>
                <p className="pl-4 text-emerald-300">"2. PHP (Catalog Business Logic)"</p>
                <p className="pl-4 text-emerald-300">"3. Tailwind CSS (Product Gallery & Responsive UI)"</p>
                <p className="pl-4 text-emerald-300">"4. JavaScript (Dynamic Filter & WA Checkout)"</p>
                <p className="pl-4 text-emerald-300">"5. MySQL (Relational Catalog & Furniture Schema)"</p>
                <p className="text-sky-300 font-bold">)</p>
                <p className="text-xs text-zinc-400 mt-1"><span className="text-yellow-400">ROLE_BEWOOD</span>="<span className="text-white font-bold">Backend Developer</span>"</p>
                <p className="text-emerald-400 mt-3">[SUCCESS] Both pipelines verified: Full integration functional.</p>
              </div>
              <p className="terminal-line terminal-cursor-line">
                <span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ <span className="terminal-cursor">█</span>
              </p>
            </div>
          )}

          {activeTab === 'whoami' && (
            <div className="terminal-code">
              <p className="terminal-line"><span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ jq . /var/log/developer_info.json</p>
              <pre className="text-xs md:text-sm text-zinc-300 font-mono leading-relaxed overflow-x-auto">
                {`{
  "name": "Muhammad Zainal Arief",
  "alias": "MZA.dev",
  "education": {
    "institution": "SMK Negeri 1 Bangsri",
    "major": "Pengembangan Perangkat Lunak & Gim (PPLG)",
    "class": "XII PPLG",
    "location": "Jepara, Jawa Tengah, Indonesia"
  },
  "primary_role": "Backend Developer",
  "skills": {
    "backend": ["PHP", "Laravel Framework", "MySQL", "RESTful API"],
    "frontend": ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Tailwind CSS"],
    "tools": ["Git & GitHub", "VS Code & CLI", "MongoDB", "Figma", "Postman", "Linux/Bash", "Vite & NPM"]
  },
  "contact": {
    "email": "theevil1896@gmail.com",
    "whatsapp": "+62 895-0950-7443",
    "github": "https://github.com/Zainal29"
  },
  "availability": "Ready for PKL / Magang Mitra Industri 2024-2025"
}`}
              </pre>
              <p className="terminal-line terminal-cursor-line">
                <span className="text-emerald-400">zainal@mza-dev</span>:<span className="text-cyan-400">~</span>$ <span className="terminal-cursor">█</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

