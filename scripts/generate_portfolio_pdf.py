#!/usr/bin/env python3
"""
Enhanced Generator for Muhammad Zainal Arief (MZA.dev) 4-Page Portfolio PDF.
Pixel-perfect dark theme, zero text cutoffs, balanced layout across all pages.
"""

import os
from PIL import Image
import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

PAGE_W, PAGE_H = A4

COLOR_BG = HexColor("#050814")
COLOR_BG_CARD = HexColor("#0a1024")
COLOR_BG_CARD_ALT = HexColor("#0e1730")
COLOR_BORDER = HexColor("#1e293b")
COLOR_BORDER_ACCENT = HexColor("#2563eb")
COLOR_CYAN = HexColor("#38bdf8")
COLOR_BLUE = HexColor("#2563eb")
COLOR_EMERALD = HexColor("#10b981")
COLOR_PURPLE = HexColor("#818cf8")
COLOR_AMBER = HexColor("#f59e0b")
COLOR_WHITE = HexColor("#f8fafc")
COLOR_MUTED = HexColor("#94a3b8")
COLOR_MUTED_LIGHT = HexColor("#cbd5e1")
COLOR_MUTED_DARK = HexColor("#64748b")

def prepare_assets():
    os.makedirs("/tmp/mza_pdf_assets", exist_ok=True)
    
    zad_orig = "src/assets/projects/zaducation.png"
    zad_dest = "/tmp/mza_pdf_assets/zaducation_banner.png"
    if os.path.exists(zad_orig):
        im = Image.open(zad_orig)
        crop_h = int(im.width * (9 / 16))
        cropped = im.crop((0, 0, im.width, min(crop_h, im.height)))
        cropped.save(zad_dest)

    qr = qrcode.QRCode(version=1, box_size=8, border=2)
    qr.add_data("https://maccer.vercel.app")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#38bdf8", back_color="#090e1f")
    qr_img.save("/tmp/mza_pdf_assets/portfolio_qr.png")

def draw_mza_logo_icon(c, x, y, size=24):
    c.saveState()
    c.setFillColor(HexColor("#090e1f"))
    c.setStrokeColor(HexColor("#38bdf8"))
    c.setLineWidth(1)
    c.roundRect(x, y, size, size, 5, fill=1, stroke=1)
    
    scale = size / 100.0
    c.setLineCap(1)
    c.setLineJoin(1)
    
    # Letter M
    c.setStrokeColor(HexColor("#38bdf8"))
    c.setLineWidth(6.5 * scale)
    p_m = c.beginPath()
    p_m.moveTo(x + 14 * scale, y + (100 - 74) * scale)
    p_m.lineTo(x + 14 * scale, y + (100 - 26) * scale)
    p_m.lineTo(x + 25 * scale, y + (100 - 48) * scale)
    p_m.lineTo(x + 36 * scale, y + (100 - 26) * scale)
    p_m.lineTo(x + 36 * scale, y + (100 - 74) * scale)
    c.drawPath(p_m, stroke=1, fill=0)
    
    # Letter Z
    c.setStrokeColor(HexColor("#10b981"))
    p_z = c.beginPath()
    p_z.moveTo(x + 42 * scale, y + (100 - 27) * scale)
    p_z.lineTo(x + 60 * scale, y + (100 - 27) * scale)
    p_z.lineTo(x + 42 * scale, y + (100 - 73) * scale)
    p_z.lineTo(x + 60 * scale, y + (100 - 73) * scale)
    c.drawPath(p_z, stroke=1, fill=0)
    
    # Letter A
    c.setStrokeColor(HexColor("#818cf8"))
    p_a = c.beginPath()
    p_a.moveTo(x + 66 * scale, y + (100 - 74) * scale)
    p_a.lineTo(x + 77 * scale, y + (100 - 26) * scale)
    p_a.lineTo(x + 88 * scale, y + (100 - 74) * scale)
    c.drawPath(p_a, stroke=1, fill=0)
    
    # Crossbar A
    c.setStrokeColor(HexColor("#38bdf8"))
    c.setLineWidth(5.5 * scale)
    c.line(x + 70 * scale, y + (100 - 56) * scale, x + 84 * scale, y + (100 - 56) * scale)
    
    # Apex node
    c.setFillColor(HexColor("#818cf8"))
    c.circle(x + 77 * scale, y + (100 - 26) * scale, 2 * scale, fill=1, stroke=0)
    c.restoreState()

def draw_header(c, page_title="PORTOFOLIO PENGEMBANGAN WEB"):
    c.saveState()
    c.setFillColor(COLOR_BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    
    c.setStrokeColor(HexColor("#1e293b"))
    c.setLineWidth(0.75)
    c.line(30, PAGE_H - 46, PAGE_W - 30, PAGE_H - 46)
    
    draw_mza_logo_icon(c, 30, PAGE_H - 40, size=24)
    
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(COLOR_WHITE)
    c.drawString(60, PAGE_H - 30, "MZA")
    
    c.setFillColor(HexColor("#2563eb"))
    c.roundRect(94, PAGE_H - 34, 28, 12, 3, fill=1, stroke=0)
    c.setFont("Courier-Bold", 8)
    c.setFillColor(HexColor("#38bdf8"))
    c.drawCentredString(108, PAGE_H - 30, ".dev")
    
    c.setFont("Helvetica", 7)
    c.setFillColor(COLOR_MUTED_DARK)
    c.drawString(60, PAGE_H - 38, "MUHAMMAD ZAINAL ARIEF")
    
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(COLOR_CYAN)
    c.drawRightString(PAGE_W - 30, PAGE_H - 30, page_title)
    c.setFont("Helvetica", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawRightString(PAGE_W - 30, PAGE_H - 39, "SMKN 1 BANGSRI • PPLG • REVISI RESMI 2026")
    c.restoreState()

def draw_footer(c, current_page, total_pages=4):
    c.saveState()
    c.setStrokeColor(HexColor("#1e293b"))
    c.setLineWidth(0.75)
    c.line(30, 36, PAGE_W - 30, 36)
    
    c.setFont("Helvetica", 8)
    c.setFillColor(COLOR_MUTED)
    c.drawString(30, 24, "Muhammad Zainal Arief • Laravel Backend Developer • Jepara, Jawa Tengah")
    
    c.setFillColor(COLOR_CYAN)
    c.drawRightString(PAGE_W - 30, 24, f"Halaman {current_page} dari {total_pages} • https://maccer.vercel.app")
    c.restoreState()

def draw_page_1(c):
    draw_header(c, "RINGKASAN PROFIL & KEAHLIAN TEKNIS")
    
    # 1. HERO BOX
    hero_y = PAGE_H - 262
    hero_h = 202
    c.saveState()
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(HexColor("#2563eb"))
    c.setLineWidth(1)
    c.roundRect(30, hero_y, PAGE_W - 60, hero_h, 12, fill=1, stroke=1)
    
    # Status Pill
    c.setFillColor(HexColor("#0c1c38"))
    c.setStrokeColor(HexColor("#38bdf8"))
    c.setLineWidth(0.75)
    c.roundRect(46, hero_y + hero_h - 26, 175, 16, 8, fill=1, stroke=1)
    c.setFillColor(COLOR_CYAN)
    c.circle(54, hero_y + hero_h - 18, 3, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(62, hero_y + hero_h - 21, "AVAILABLE FOR PKL & INDUSTRI")
    
    # Name & Title
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(COLOR_WHITE)
    c.drawString(46, hero_y + hero_h - 52, "Muhammad Zainal Arief")
    
    c.setFont("Helvetica-Bold", 11.5)
    c.setFillColor(COLOR_CYAN)
    c.drawString(46, hero_y + hero_h - 68, "Laravel Backend Developer & Full-Stack Web Developer")
    
    # Summary
    c.setFont("Helvetica", 8.2)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawString(46, hero_y + hero_h - 86, "Siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) di SMK Negeri 1 Bangsri.")
    c.drawString(46, hero_y + hero_h - 98, "Berfokus pada perancangan arsitektur backend Laravel yang kokoh, relasi basis data MySQL terstruktur,")
    c.drawString(46, hero_y + hero_h - 110, "serta antarmuka web modern yang cepat, aman, responsif, dan siap berkontribusi pada industri.")
    
    # Contact chips (2x2 grid with plenty of space)
    chips_r1 = [
        ("WhatsApp:", "+62 895-0950-7443"),
        ("Email:", "theevil1896@gmail.com")
    ]
    chips_r2 = [
        ("Lokasi:", "Jepara, Jawa Tengah"),
        ("GitHub:", "https://github.com/Zainal29")
    ]
    
    # Row 1
    c.setFillColor(HexColor("#0f172a"))
    c.setStrokeColor(HexColor("#334155"))
    c.roundRect(46, hero_y + 42, 176, 22, 5, fill=1, stroke=1)
    c.setFont("Helvetica", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawString(52, hero_y + 53, "WhatsApp:")
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_WHITE)
    c.drawString(100, hero_y + 53, "+62 895-0950-7443")
    
    c.setFillColor(HexColor("#0f172a"))
    c.roundRect(228, hero_y + 42, 185, 22, 5, fill=1, stroke=1)
    c.setFont("Helvetica", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawString(234, hero_y + 53, "Email:")
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_WHITE)
    c.drawString(266, hero_y + 53, "theevil1896@gmail.com")
    
    # Row 2
    c.setFillColor(HexColor("#0f172a"))
    c.roundRect(46, hero_y + 14, 176, 22, 5, fill=1, stroke=1)
    c.setFont("Helvetica", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawString(52, hero_y + 25, "Lokasi:")
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_WHITE)
    c.drawString(100, hero_y + 25, "Jepara, Jawa Tengah")
    
    c.setFillColor(HexColor("#0f172a"))
    c.roundRect(228, hero_y + 14, 185, 22, 5, fill=1, stroke=1)
    c.setFont("Helvetica", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawString(234, hero_y + 25, "GitHub:")
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_CYAN)
    c.drawString(272, hero_y + 25, "github.com/Zainal29")
    
    # Photo on right
    photo_path = "src/assets/profilMZA_suit.jpg"
    if os.path.exists(photo_path):
        c.setStrokeColor(COLOR_CYAN)
        c.setLineWidth(1.5)
        c.roundRect(PAGE_W - 156, hero_y + 24, 110, 150, 8, fill=0, stroke=1)
        c.drawImage(photo_path, PAGE_W - 154, hero_y + 26, width=106, height=146, mask='auto')
        c.setFillColor(HexColor("#090e1f"))
        c.roundRect(PAGE_W - 154, hero_y + 8, 106, 14, 3, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 6.5)
        c.setFillColor(COLOR_CYAN)
        c.drawCentredString(PAGE_W - 101, hero_y + 12, "NIS: 2024.PPLG.0929")
    c.restoreState()
    
    # 2. ABOUT DEVELOPER SECTION
    about_y = hero_y - 146
    c.saveState()
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(COLOR_WHITE)
    c.drawString(30, about_y + 130, "01 // TENTANG PENGEMBANG (ABOUT DEVELOPER)")
    
    pillars = [
        ("01. Arsitektur Backend Solid",
         "Berpengalaman menyusun struktur MVC Laravel, relasi database Eloquent ORM, middleware autentikasi, serta endpoint REST API yang aman dan teruji."),
        ("02. Pengalaman Sistem Riil",
         "Telah merilis dan mengelola DIDISPEN (sistem dispensasi sekolah SMKN 1 Bangsri) dan BeWood (katalog mebel Jepara) sebagai Backend Developer."),
        ("03. Kesiapan Magang & PKL",
         "Memiliki etos kerja disiplin, kebiasaan riset mandiri, kemampuan version control Git, dan komitmen tinggi untuk berkolaborasi bersama tim mitra industri.")
    ]
    
    col_w = (PAGE_W - 60 - 16) / 3
    col_x = 30
    for title, desc in pillars:
        c.setFillColor(COLOR_BG_CARD)
        c.setStrokeColor(COLOR_BORDER)
        c.roundRect(col_x, about_y, col_w, 118, 8, fill=1, stroke=1)
        
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(COLOR_CYAN)
        c.drawString(col_x + 10, about_y + 98, title)
        
        c.setFont("Helvetica", 7.5)
        c.setFillColor(COLOR_MUTED_LIGHT)
        words = desc.split()
        line = ""
        line_y = about_y + 80
        for w in words:
            test_line = line + " " + w if line else w
            if c.stringWidth(test_line, "Helvetica", 7.5) < col_w - 20:
                line = test_line
            else:
                c.drawString(col_x + 10, line_y, line)
                line_y -= 11
                line = w
        if line:
            c.drawString(col_x + 10, line_y, line)
            
        col_x += col_w + 8
    c.restoreState()

    # 3. TECH STACK & TOOLS (BALANCED HEIGHT WITH DETAILED CAPABILITIES)
    skills_y = 52
    skills_h = about_y - skills_y - 14
    c.saveState()
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(COLOR_WHITE)
    c.drawString(30, about_y - 12, "02 // TECH STACK & KEMAMPUAN TEKNIS (REVISI STANDAR INDUSTRI)")
    
    skill_groups = [
        ("Frontend Development",
         ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS"],
         "Spesialisasi antarmuka modern responsif dengan komponen modular, tata letak fluid flexbox/grid, dan interaktivitas JavaScript murni & React (telah disesuaikan tanpa Three.js).",
         [("Kategori", "Frontend Modern"), ("Standar", "Mobile-First UI"), ("Status", "Aktif Digunakan")]),
        ("Backend Development",
         ["PHP", "Laravel Framework", "MySQL Database", "RESTful API"],
         "Perancangan logika bisnis backend, routing terstruktur, Eloquent ORM, migrasi database, relasi tabel (one-to-many, many-to-many), dan otentikasi aman tanpa duplikasi.",
         [("Kategori", "Backend Architecture"), ("Standar", "Clean Code"), ("Status", "Spesialisasi Utama")]),
        ("Tools & Workflow",
         ["Git & GitHub", "VS Code", "MongoDB", "Figma", "Postman", "Linux", "Vite"],
         "Alur kerja pengembangan modern dengan version control branching Git, pengujian endpoint Postman, desain mockup Figma, dan NoSQL database MongoDB.",
         [("Kategori", "DevOps & Tools"), ("Standar", "Git Collaboration"), ("Status", "Siap Industri")])
    ]
    
    sg_w = (PAGE_W - 60 - 16) / 3
    sg_x = 30
    for grp_title, tags, grp_desc, cap_badges in skill_groups:
        c.setFillColor(COLOR_BG_CARD)
        c.setStrokeColor(COLOR_BORDER)
        c.roundRect(sg_x, skills_y, sg_w, skills_h, 8, fill=1, stroke=1)
        
        # Header Box
        c.setFillColor(HexColor("#0f172a"))
        c.roundRect(sg_x, skills_y + skills_h - 26, sg_w, 26, 8, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(COLOR_WHITE)
        c.drawString(sg_x + 10, skills_y + skills_h - 18, grp_title)
        
        # Tags pills
        tag_x = sg_x + 10
        tag_y = skills_y + skills_h - 48
        for t in tags:
            tag_len = c.stringWidth(t, "Helvetica-Bold", 7.5) + 12
            if tag_x + tag_len > sg_x + sg_w - 10:
                tag_x = sg_x + 10
                tag_y -= 19
            c.setFillColor(HexColor("#1e293b"))
            c.setStrokeColor(HexColor("#334155"))
            c.roundRect(tag_x, tag_y, tag_len, 14, 4, fill=1, stroke=1)
            c.setFont("Helvetica-Bold", 7)
            c.setFillColor(COLOR_CYAN if ("Laravel" in t or "React" in t or "MySQL" in t or "MongoDB" in t or "PHP" in t) else COLOR_MUTED_LIGHT)
            c.drawString(tag_x + 6, tag_y + 4, t)
            tag_x += tag_len + 4
            
        # Description paragraph
        c.setFont("Helvetica", 7.3)
        c.setFillColor(COLOR_MUTED_LIGHT)
        words = grp_desc.split()
        line = ""
        p_y = tag_y - 20
        for w in words:
            test_line = line + " " + w if line else w
            if c.stringWidth(test_line, "Helvetica", 7.3) < sg_w - 20:
                line = test_line
            else:
                c.drawString(sg_x + 10, p_y, line)
                p_y -= 11
                line = w
        if line:
            c.drawString(sg_x + 10, p_y, line)
            
        # Capability specs at bottom of card
        spec_y = skills_y + 14
        for s_label, s_val in cap_badges:
            c.setFont("Helvetica", 6.8)
            c.setFillColor(COLOR_MUTED_DARK)
            c.drawString(sg_x + 10, spec_y, s_label + ":")
            c.setFont("Helvetica-Bold", 7)
            c.setFillColor(COLOR_EMERALD if s_label == "Status" else COLOR_CYAN)
            c.drawRightString(sg_x + sg_w - 10, spec_y, s_val)
            c.setStrokeColor(HexColor("#1e293b"))
            c.setLineWidth(0.5)
            c.line(sg_x + 10, spec_y - 3, sg_x + sg_w - 10, spec_y - 3)
            spec_y += 14
            
        sg_x += sg_w + 8
    c.restoreState()
    
    draw_footer(c, 1, 4)
    c.showPage()

def draw_page_2(c):
    draw_header(c, "SELECTED PROJECTS // SISTEM RIIL & APLIKASI WEB")
    
    c.saveState()
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(COLOR_WHITE)
    c.drawString(30, PAGE_H - 70, "03 // KARYA PROYEK PRODUKSI & SISTEM INFORMASI")
    c.setFont("Helvetica", 8)
    c.setFillColor(COLOR_MUTED)
    c.drawString(30, PAGE_H - 82, "Dua implementasi aplikasi nyata berbasis Laravel yang memecahkan kendala administrasi sekolah dan UMKM mebel.")
    
    # PROJECT 1: DIDISPEN
    d_y = PAGE_H - 425
    d_h = 330
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(HexColor("#2563eb"))
    c.roundRect(30, d_y, PAGE_W - 60, d_h, 10, fill=1, stroke=1)
    
    # Badges row
    c.setFillColor(HexColor("#1e293b"))
    c.roundRect(44, d_y + d_h - 24, 96, 14, 3, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(COLOR_CYAN)
    c.drawCentredString(92, d_y + d_h - 20, "WEB APPLICATION")
    
    c.setFillColor(HexColor("#064e3b"))
    c.roundRect(146, d_y + d_h - 24, 110, 14, 3, fill=1, stroke=0)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(201, d_y + d_h - 20, "ROLE: BACKEND DEVELOPER")
    
    c.setFillColor(HexColor("#1e1b4b"))
    c.roundRect(262, d_y + d_h - 24, 95, 14, 3, fill=1, stroke=0)
    c.setFillColor(COLOR_PURPLE)
    c.drawCentredString(309, d_y + d_h - 20, "SMKN 1 BANGSRI")
    
    # Title & Desc
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(COLOR_WHITE)
    c.drawString(44, d_y + d_h - 44, "DIDISPEN — Sistem Digital Dispensasi Siswa")
    
    c.setFont("Helvetica", 8)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawString(44, d_y + d_h - 58, "Sistem informasi pengelolaan pengajuan dan approval perizinan dispensasi siswa terintegrasi secara real-time.")
    c.drawString(44, d_y + d_h - 69, "Mendigitalisasi alur surat fisik manual menjadi sistem daring anti-duplikasi untuk Guru Piket dan Wali Kelas.")
    
    # Image DIDISPEN
    did_img = "src/assets/projects/didispen.png"
    if os.path.exists(did_img):
        c.setStrokeColor(COLOR_BORDER)
        c.roundRect(44, d_y + 115, PAGE_W - 88, 140, 6, fill=0, stroke=1)
        c.drawImage(did_img, 45, d_y + 116, width=PAGE_W - 90, height=138, mask='auto')
        
    # Stack Flow Pipeline Box
    c.setFillColor(HexColor("#080e22"))
    c.setStrokeColor(HexColor("#38bdf8"))
    c.roundRect(44, d_y + 58, PAGE_W - 88, 48, 6, fill=1, stroke=1)
    
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_CYAN)
    c.drawString(54, d_y + 92, "ALUR PIPELINE STACK DIDISPEN:")
    
    flow_steps = ["Laravel 10", "PHP", "CSS3 Modern", "JavaScript", "MySQL Relational"]
    p_x = 54
    for i, step in enumerate(flow_steps):
        c.setFillColor(HexColor("#1e293b"))
        c.setStrokeColor(HexColor("#38bdf8") if "Laravel" in step or "MySQL" in step else HexColor("#475569"))
        c.roundRect(p_x, d_y + 66, 76, 18, 4, fill=1, stroke=1)
        c.setFont("Helvetica-Bold", 7)
        c.setFillColor(COLOR_WHITE)
        c.drawCentredString(p_x + 38, d_y + 72, step)
        p_x += 80
        if i < len(flow_steps) - 1:
            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(COLOR_CYAN)
            c.drawString(p_x - 3, d_y + 71, "➔")
            p_x += 14
            
    c.setFont("Helvetica", 7.5)
    c.setFillColor(COLOR_MUTED)
    c.drawString(44, d_y + 40, "• Validasi bertingkat anti-duplikasi izin")
    c.drawString(44, d_y + 28, "• Ekspor rekapitulasi data format Excel & PDF")
    c.drawString(220, d_y + 40, "• Relasi basis data siswa, kelas, guru piket (MySQL)")
    c.drawString(220, d_y + 28, "• Tautan Resmi: https://didispen.smkn1bangsri.sch.id")
    c.drawString(410, d_y + 28, "• Repo: github.com/Zainal29/Didispen")
    
    # PROJECT 2: BEWOOD
    b_y = 52
    b_h = d_y - b_y - 14
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(HexColor("#10b981"))
    c.roundRect(30, b_y, PAGE_W - 60, b_h, 10, fill=1, stroke=1)
    
    c.setFillColor(HexColor("#1e293b"))
    c.roundRect(44, b_y + b_h - 24, 96, 14, 3, fill=0, stroke=0)
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(HexColor("#f59e0b"))
    c.drawString(44, b_y + b_h - 17, "WEB E-COMMERCE")
    
    c.setFillColor(HexColor("#064e3b"))
    c.roundRect(146, b_y + b_h - 24, 110, 14, 3, fill=1, stroke=0)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(201, b_y + b_h - 20, "ROLE: BACKEND DEVELOPER")
    
    c.setFillColor(HexColor("#1e1b4b"))
    c.roundRect(262, b_y + b_h - 24, 105, 14, 3, fill=1, stroke=0)
    c.setFillColor(COLOR_PURPLE)
    c.drawCentredString(314, b_y + b_h - 20, "UMKM MEBEL JEPARA")
    
    c.setFont("Helvetica-Bold", 15)
    c.setFillColor(COLOR_WHITE)
    c.drawString(44, b_y + b_h - 42, "BeWood — Platform E-Commerce Katalog Mebel Jepara")
    
    c.setFont("Helvetica", 8)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawString(44, b_y + b_h - 55, "Platform digital katalog pemasaran furnitur kayu Jepara untuk memperluas jangkauan UMKM pengrajin lokal.")
    
    bew_img = "src/assets/projects/bewood.png"
    if os.path.exists(bew_img):
        c.setStrokeColor(COLOR_BORDER)
        c.roundRect(44, b_y + 85, PAGE_W - 88, 135, 6, fill=0, stroke=1)
        c.drawImage(bew_img, 45, b_y + 86, width=PAGE_W - 90, height=133, mask='auto')
        
    c.setFillColor(HexColor("#080e22"))
    c.setStrokeColor(HexColor("#10b981"))
    c.roundRect(44, b_y + 35, PAGE_W - 88, 42, 6, fill=1, stroke=1)
    
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_EMERALD)
    c.drawString(54, b_y + 64, "ALUR PIPELINE STACK BEWOOD:")
    
    flow_steps_b = ["Laravel", "PHP", "Tailwind CSS", "JavaScript", "MySQL"]
    p_x = 54
    for i, step in enumerate(flow_steps_b):
        c.setFillColor(HexColor("#1e293b"))
        c.setStrokeColor(HexColor("#10b981") if "Laravel" in step or "MySQL" in step else HexColor("#475569"))
        c.roundRect(p_x, b_y + 42, 76, 16, 4, fill=1, stroke=1)
        c.setFont("Helvetica-Bold", 7)
        c.setFillColor(COLOR_WHITE)
        c.drawCentredString(p_x + 38, b_y + 47, step)
        p_x += 80
        if i < len(flow_steps_b) - 1:
            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(COLOR_EMERALD)
            c.drawString(p_x - 3, b_y + 46, "➔")
            p_x += 14
            
    c.setFont("Helvetica", 7.5)
    c.setFillColor(COLOR_MUTED)
    c.drawString(44, b_y + 16, "• Manajemen produk kayu Jati & Mahoni")
    c.drawString(220, b_y + 16, "• Integrasi order direct WhatsApp")
    c.drawString(390, b_y + 16, "• Optimasi query database katalog MySQL")
    
    c.restoreState()
    draw_footer(c, 2, 4)
    c.showPage()

def draw_page_3(c):
    draw_header(c, "SELECTED PROJECTS & REKAM JEJAK PERJALANAN")
    
    c.saveState()
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(COLOR_WHITE)
    c.drawString(30, PAGE_H - 70, "04 // UI/UX DESIGN & REKAM JEJAK (MY JOURNEY)")
    
    card_w = (PAGE_W - 60 - 12) / 2
    top_y = PAGE_H - 355
    top_h = 270
    
    # PROJECT 3: ZADUCATION
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(COLOR_BORDER)
    c.roundRect(30, top_y, card_w, top_h, 8, fill=1, stroke=1)
    
    zad_img = "/tmp/mza_pdf_assets/zaducation_banner.png"
    if os.path.exists(zad_img):
        c.drawImage(zad_img, 38, top_y + 130, width=card_w - 16, height=130, mask='auto')
        
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(COLOR_CYAN)
    c.drawString(38, top_y + 115, "LANDING PAGE DESIGN // EDUKASI INTERAKTIF")
    
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(COLOR_WHITE)
    c.drawString(38, top_y + 98, "Zaducation — Landing Page Kursus")
    
    c.setFont("Helvetica", 7.5)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawString(38, top_y + 82, "Konsep landing page edukasi interaktif dengan penekanan")
    c.drawString(38, top_y + 71, "pada kejelasan visual, kurikulum, dan onboarding siswa.")
    
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawString(38, top_y + 54, "TOOLS:")
    tools_z = ["Figma", "UI/UX Design", "Design System", "Prototyping"]
    t_x = 72
    for t in tools_z:
        c.setFillColor(HexColor("#1e293b"))
        c.roundRect(t_x, top_y + 50, c.stringWidth(t, "Helvetica", 6.5) + 8, 12, 3, fill=1, stroke=0)
        c.setFont("Helvetica", 6.5)
        c.setFillColor(COLOR_WHITE)
        c.drawString(t_x + 4, top_y + 53, t)
        t_x += c.stringWidth(t, "Helvetica", 6.5) + 12
        
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(COLOR_EMERALD)
    c.drawString(38, top_y + 24, "Peran: UI/UX & Prototyper")
    
    # PROJECT 4: ZEROMONEY
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(COLOR_BORDER)
    c.roundRect(30 + card_w + 12, top_y, card_w, top_h, 8, fill=1, stroke=1)
    
    zero_img = "src/assets/projects/zeromoney.png"
    if os.path.exists(zero_img):
        c.drawImage(zero_img, 30 + card_w + 20, top_y + 130, width=card_w - 16, height=130, mask='auto')
        
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(HexColor("#f59e0b"))
    c.drawString(30 + card_w + 20, top_y + 115, "FINANCE DASHBOARD // FINTECH UI")
    
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(COLOR_WHITE)
    c.drawString(30 + card_w + 20, top_y + 98, "ZeroMoney — Expense Management")
    
    c.setFont("Helvetica", 7.5)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawString(30 + card_w + 20, top_y + 82, "Desain antarmuka dashboard manajemen finansial untuk")
    c.drawString(30 + card_w + 20, top_y + 71, "menampilkan arus kas, analitik saldo, dan visualisasi grafik.")
    
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(COLOR_MUTED)
    c.drawString(30 + card_w + 20, top_y + 54, "TOOLS:")
    tools_zm = ["Figma", "Fintech UI", "Data Visualization", "Tailwind"]
    t_x = 30 + card_w + 54
    for t in tools_zm:
        c.setFillColor(HexColor("#1e293b"))
        c.roundRect(t_x, top_y + 50, c.stringWidth(t, "Helvetica", 6.5) + 8, 12, 3, fill=1, stroke=0)
        c.setFont("Helvetica", 6.5)
        c.setFillColor(COLOR_WHITE)
        c.drawString(t_x + 4, top_y + 53, t)
        t_x += c.stringWidth(t, "Helvetica", 6.5) + 12
        
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(COLOR_EMERALD)
    c.drawString(30 + card_w + 20, top_y + 24, "Peran: Interface & Dashboard Designer")
    
    # 2. MY JOURNEY SECTION (BALANCED 5 PHASES WITH 2-LINE DESCRIPTIONS)
    j_y = 52
    j_h = top_y - j_y - 20
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(HexColor("#2563eb"))
    c.roundRect(30, j_y, PAGE_W - 60, j_h, 10, fill=1, stroke=1)
    
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(COLOR_WHITE)
    c.drawString(44, j_y + j_h - 22, "REKAM JEJAK PERJALANAN TEKNOLOGI (MY JOURNEY)")
    
    timeline = [
        ("FASE 01", "Mulai Mempelajari Web Development Dasar",
         "Menguasai fondasi HTML5 terstruktur, layout responsif CSS3, algoritma logika komputasi,",
         "serta manipulasi Document Object Model (DOM) JavaScript di SMKN 1 Bangsri."),
        ("FASE 02", "Mendalami Arsitektur Backend & Database Relasional",
         "Mendalami arsitektur MVC PHP & Laravel Framework, routing aman, sanitasi input,",
         "serta perancangan skema database relasional MySQL dan query Eloquent ORM."),
        ("FASE 03", "Membangun & Merilis Proyek Riil Produksi (DIDISPEN)",
         "Merancang sistem perizinan dan dispensasi siswa resmi untuk SMK Negeri 1 Bangsri,",
         "mencakup multi-level role approval (Siswa, Wali Kelas, Guru Piket) dan rekapitulasi data."),
        ("FASE 04", "Ekspansi E-Commerce UMKM & Ekosistem Modern (BeWood)",
         "Membangun platform katalog digital mebel Jepara terintegrasi WhatsApp checkout direct,",
         "serta memperluas integrasi komponen antarmuka React, Tailwind, dan NoSQL MongoDB."),
        ("FASE 05", "Kesiapan Praktik Kerja Lapangan (PKL) & Kemitraan Industri",
         "Siap terjun berkontribusi profesional dalam tim rekayasa perangkat lunak industri,",
         "didukung etos kerja disiplin, kolaborasi version control Git, dan kebiasaan riset mandiri.")
    ]
    
    step_y = j_y + j_h - 52
    for phase, p_title, line1, line2 in timeline:
        c.setFillColor(HexColor("#1e293b"))
        c.setStrokeColor(HexColor("#38bdf8"))
        c.roundRect(44, step_y + 6, 48, 14, 3, fill=1, stroke=1)
        c.setFont("Helvetica-Bold", 6.5)
        c.setFillColor(COLOR_CYAN)
        c.drawCentredString(68, step_y + 10, phase)
        
        c.setFillColor(COLOR_CYAN)
        c.circle(104, step_y + 13, 3.5, fill=1, stroke=0)
        
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(COLOR_WHITE)
        c.drawString(116, step_y + 10, p_title)
        
        c.setFont("Helvetica", 7.2)
        c.setFillColor(COLOR_MUTED_LIGHT)
        c.drawString(116, step_y - 1, line1)
        c.drawString(116, step_y - 11, line2)
        
        step_y -= 50
        
    c.restoreState()
    draw_footer(c, 3, 4)
    c.showPage()

def draw_page_4(c):
    draw_header(c, "KONTAK & KOLABORASI RESMI")
    
    c.saveState()
    
    # 1. BIG CTA HERO
    cta_y = PAGE_H - 320
    cta_h = 240
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(HexColor("#2563eb"))
    c.roundRect(30, cta_y, PAGE_W - 60, cta_h, 12, fill=1, stroke=1)
    
    # Accent badge
    c.setFillColor(HexColor("#0c1e3d"))
    c.setStrokeColor(HexColor("#38bdf8"))
    c.roundRect(PAGE_W / 2 - 100, cta_y + cta_h - 32, 200, 18, 9, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(COLOR_CYAN)
    c.drawCentredString(PAGE_W / 2, cta_y + cta_h - 25, "HAVE A PROJECT OR OPPORTUNITY?")
    
    # Headline
    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(PAGE_W / 2, cta_y + cta_h - 68, "Mari Buat Sesuatu yang")
    c.setFillColor(COLOR_CYAN)
    c.drawCentredString(PAGE_W / 2, cta_y + cta_h - 96, "Bermanfaat & Berkelanjutan.")
    
    # Subtitle
    c.setFont("Helvetica", 9)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawCentredString(PAGE_W / 2, cta_y + cta_h - 122, "Saya terbuka untuk berdiskusi mengenai penugasan magang industri (PKL), proyek website,")
    c.drawCentredString(PAGE_W / 2, cta_y + cta_h - 136, "pengembangan sistem informasi Laravel, basis data MySQL, maupun kolaborasi teknologi.")
    
    # Values pills
    vals = [
        "✓ Arsitektur Kode Terstruktur",
        "✓ Keamanan Data & Validasi Input",
        "✓ Disiplin & Siap Kolaborasi Tim"
    ]
    v_x = 75
    for v in vals:
        c.setFillColor(HexColor("#1e293b"))
        c.roundRect(v_x, cta_y + cta_h - 172, 138, 20, 5, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(COLOR_EMERALD)
        c.drawCentredString(v_x + 69, cta_y + cta_h - 163, v)
        v_x += 150
        
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(PAGE_W / 2, cta_y + 25, "Email Utama: theevil1896@gmail.com  •  WhatsApp: +62 895-0950-7443")
    
    # 2. CONTACT DETAILS & QR CODE
    btm_y = 52
    btm_h = cta_y - btm_y - 20
    
    # Left Column: Detailed Directory (No cutoff text!)
    col_w = (PAGE_W - 60 - 16) / 2
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(COLOR_BORDER)
    c.roundRect(30, btm_y, col_w, btm_h, 10, fill=1, stroke=1)
    
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(COLOR_WHITE)
    c.drawString(46, btm_y + btm_h - 26, "DIREKTORI KONTAK PENGEMBANG")
    
    contact_list = [
        ("Nama Lengkap", "Muhammad Zainal Arief"),
        ("Institusi", "SMK Negeri 1 Bangsri (PPLG)"),
        ("Lokasi", "Jepara, Jawa Tengah, Indonesia"),
        ("Spesialisasi", "Laravel Backend & Full-Stack Web"),
        ("WhatsApp", "+62 895-0950-7443"),
        ("Email", "theevil1896@gmail.com"),
        ("GitHub", "github.com/Zainal29"),
        ("LinkedIn", "linkedin.com/in/muhammad-zainal-arief"),
    ]
    
    row_y = btm_y + btm_h - 52
    for label, val in contact_list:
        c.setFont("Helvetica", 7.5)
        c.setFillColor(COLOR_MUTED)
        c.drawString(46, row_y, label)
        
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(COLOR_CYAN if ("@" in val or "http" in val or "+62" in val or "github" in val or "linkedin" in val) else COLOR_WHITE)
        c.drawString(116, row_y, val)
        
        c.setStrokeColor(HexColor("#1e293b"))
        c.setLineWidth(0.5)
        c.line(46, row_y - 4, 30 + col_w - 16, row_y - 4)
        row_y -= 23
        
    # Right Column: QR Code & Website Verification
    qr_x = 30 + col_w + 16
    c.setFillColor(COLOR_BG_CARD)
    c.setStrokeColor(COLOR_BORDER)
    c.roundRect(qr_x, btm_y, col_w, btm_h, 10, fill=1, stroke=1)
    
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(COLOR_WHITE)
    c.drawString(qr_x + 16, btm_y + btm_h - 26, "AKSES PORTOFOLIO ONLINE")
    
    qr_path = "/tmp/mza_pdf_assets/portfolio_qr.png"
    if os.path.exists(qr_path):
        c.setStrokeColor(COLOR_CYAN)
        c.setLineWidth(1)
        c.roundRect(qr_x + col_w / 2 - 55, btm_y + btm_h - 150, 110, 110, 6, fill=0, stroke=1)
        c.drawImage(qr_path, qr_x + col_w / 2 - 53, btm_y + btm_h - 148, width=106, height=106)
        
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(COLOR_CYAN)
    c.drawCentredString(qr_x + col_w / 2, btm_y + btm_h - 166, "https://maccer.vercel.app")
    
    c.setFont("Helvetica", 7.5)
    c.setFillColor(COLOR_MUTED_LIGHT)
    c.drawCentredString(qr_x + col_w / 2, btm_y + btm_h - 182, "Pindai QR code di atas menggunakan smartphone")
    c.drawCentredString(qr_x + col_w / 2, btm_y + btm_h - 194, "untuk mengakses web portofolio interaktif secara langsung.")
    
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(qr_x + col_w / 2, btm_y + 16, "✓ Dokumen Resmi Portofolio MZA.dev Diperbarui 2026")
    
    c.restoreState()
    draw_footer(c, 4, 4)
    c.showPage()

def main():
    prepare_assets()
    output_pdf = "public/Portofolio_Muhammad_Zainal_Arief.pdf"
    root_pdf = "Portofolio_Muhammad_Zainal_Arief.pdf"
    
    c = canvas.Canvas(output_pdf, pagesize=A4)
    c.setTitle("Portofolio Muhammad Zainal Arief - MZA.dev")
    c.setAuthor("Muhammad Zainal Arief")
    c.setSubject("Portofolio Web Developer & Laravel Backend Developer")
    c.setKeywords(["Portofolio", "Laravel", "Backend", "Muhammad Zainal Arief", "DIDISPEN", "BeWood", "SMKN 1 Bangsri"])
    
    draw_page_1(c)
    draw_page_2(c)
    draw_page_3(c)
    draw_page_4(c)
    
    c.save()
    
    import shutil
    shutil.copy2(output_pdf, root_pdf)
    print(f"Successfully generated {output_pdf} and {root_pdf}")

if __name__ == "__main__":
    main()
