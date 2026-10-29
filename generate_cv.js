import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 32, bottom: 32, left: 38, right: 38 }
});

const outputPath = 'public/CV_MUHAMMAD_ZAINAL_ARIEF.pdf';
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Color Palette
const PRIMARY = '#15803d';     // Darker professional emerald green (accessible, high-contrast)
const TEXT_DARK = '#0f172a';   // Deep slate
const TEXT_MUTED = '#475569';  // Slate muted
const BORDER_COLOR = '#cbd5e1';// Light border

// --- HEADER SECTION ---
const photoPath = 'src/assets/profilMZA_halfbody.jpg';
const hasPhoto = fs.existsSync(photoPath);

const startX = 38;
const contentWidth = 519;
const headerY = 32;

if (hasPhoto) {
  const photoW = 72;
  const photoH = 92;
  
  doc.save();
  doc.roundedRect(startX, headerY, photoW, photoH, 6).clip();
  doc.image(photoPath, startX, headerY, { width: photoW, height: photoH });
  doc.restore();
  
  doc.roundedRect(startX, headerY, photoW, photoH, 6)
     .lineWidth(1.5)
     .strokeColor(PRIMARY)
     .stroke();

  const textX = startX + photoW + 16;
  doc.font('Helvetica-Bold').fontSize(19).fillColor(TEXT_DARK)
     .text('MUHAMMAD ZAINAL ARIEF', textX, headerY + 2);
  
  doc.font('Helvetica-Bold').fontSize(10).fillColor(PRIMARY)
     .text('FULL-STACK WEB DEVELOPER  |  SISWA SMKN 1 BANGSRI (PPLG)', textX, headerY + 26);
  
  doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_MUTED)
     .text('Puring Jerukwangi RT 01 RW 07, Kec. Bangsri, Kab. Jepara, Jawa Tengah', textX, headerY + 42)
     .text('No. HP / WhatsApp: 0895-0950-7443   |   Email: theevil1896@gmail.com', textX, headerY + 56)
     .text('GitHub: github.com/Zainal29   |   LinkedIn: linkedin.com/in/muhammad-zainal-arief-6b9654433', textX, headerY + 70);
}

// Separator
const sepY = 132;
doc.moveTo(startX, sepY).lineTo(startX + contentWidth, sepY).lineWidth(1).strokeColor(BORDER_COLOR).stroke();

doc.y = sepY + 8;

function renderSectionTitle(title) {
  const y = doc.y + 4;
  doc.rect(startX, y, 4, 12).fillColor(PRIMARY).fill();
  doc.font('Helvetica-Bold').fontSize(10).fillColor(TEXT_DARK)
     .text(title.toUpperCase(), startX + 10, y);
  
  const lineY = y + 14;
  doc.moveTo(startX, lineY).lineTo(startX + contentWidth, lineY).lineWidth(0.5).strokeColor(BORDER_COLOR).stroke();
  doc.y = lineY + 6;
}

// 1. PROFIL PROFESIONAL
renderSectionTitle('Profil Profesional');
doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_DARK).lineGap(2)
   .text(
     'Siswa SMK Negeri 1 Bangsri jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) dengan spesialisasi Full-Stack Web Development. Berpengalaman membangun aplikasi web fungsional menggunakan PHP, Laravel, MySQL, React, dan Tailwind CSS. Berhasil memimpin dan menyelesaikan proyek digitalisasi sekolah (DIDISPEN) serta platform e-commerce UMKM lokal (BeWood). Memiliki pemikiran analitis, etos kerja disiplin, serta kesiapan penuh untuk berkontribusi produktif dalam program Praktik Kerja Lapangan (PKL) / Magang Industri.',
     startX, doc.y, { width: contentWidth, align: 'justify' }
   );

doc.y += 6;

// 2. KEAHLIAN TEKNIS
renderSectionTitle('Keahlian Teknis & Kompetensi');
const col1 = startX;
const col2 = startX + 265;
const skillsTopY = doc.y;

doc.font('Helvetica-Bold').fontSize(8.5).fillColor(TEXT_DARK).text('Frontend Development:', col1, skillsTopY);
doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text('HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Blade', col1, skillsTopY + 11);

doc.font('Helvetica-Bold').fontSize(8.5).fillColor(TEXT_DARK).text('Backend & Database:', col2, skillsTopY);
doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text('PHP Modern, Laravel Framework, RESTful API, MySQL Database', col2, skillsTopY + 11);

const skillsMidY = skillsTopY + 24;
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(TEXT_DARK).text('Tools & Workflow:', col1, skillsMidY);
doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text('Git, GitHub, VS Code, Zed, Laragon, Figma UI/UX Design', col1, skillsMidY + 11);

doc.font('Helvetica-Bold').fontSize(8.5).fillColor(TEXT_DARK).text('Soft Skills & Etos Kerja:', col2, skillsMidY);
doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text('Problem Solving, Berpikir Kritis, Kolaborasi Tim, Cepat Beradaptasi', col2, skillsMidY + 11);

doc.y = skillsMidY + 28;

// 3. PENGALAMAN PROYEK
renderSectionTitle('Pengalaman Proyek Nyata');

function renderProject(title, subtitle, stack, bullets) {
  const curY = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(TEXT_DARK).text(title, startX, curY);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(PRIMARY).text(subtitle, startX, curY + 1, { align: 'right', width: contentWidth });
  
  doc.y = curY + 12;
  doc.font('Helvetica-Oblique').fontSize(8).fillColor(TEXT_MUTED).text(`Stack: ${stack}`, startX, doc.y);
  
  doc.y += 11;
  bullets.forEach(b => {
    const by = doc.y;
    doc.font('Helvetica').fontSize(8).fillColor(TEXT_DARK)
       .text('•', startX + 4, by, { width: 8 })
       .text(b, startX + 14, by, { width: contentWidth - 14, lineGap: 1.5 });
    doc.y += 2;
  });
  doc.y += 4;
}

renderProject(
  'DIDISPEN — Sistem Digital Pengajuan & Pengelolaan Dispensasi Siswa',
  'SMKN 1 Bangsri  |  Lead Full-Stack Developer',
  'Laravel, PHP, MySQL, Blade Engine, Tailwind CSS, Git',
  [
    'Membangun sistem web terpadu untuk mendigitalisasi proses perizinan dispensasi siswa di SMK Negeri 1 Bangsri.',
    'Merancang basis data relasional MySQL dan alur persetujuan bertingkat (Siswa -> Guru Pengajar -> Wali Kelas -> Kesiswaan).',
    'Mengembangkan rekapitulasi data kehadiran real-time dan ekspor laporan yang menekan penggunaan kertas hingga 90%.',
    'Tautan Demo: didispen.smkn1bangsri.sch.id   |   GitHub: github.com/Zainal29/Didispen'
  ]
);

renderProject(
  'BeWood — Platform E-Commerce & Pemasaran Mebel Jepara',
  'UMKM Mebel Jepara  |  Full-Stack Developer',
  'Laravel, PHP, MySQL, JavaScript, Tailwind CSS',
  [
    'Mengembangkan platform katalog digital dan pemesanan mebel untuk membantu UMKM Jepara memperluas pasar digital.',
    'Membangun antarmuka katalog responsif, filter kategori produk, keranjang belanja, serta manajemen pesanan terstruktur.'
  ]
);

renderProject(
  'Zaducation & ZeroMoney — Desain Antarmuka UI/UX',
  'UI/UX Prototyping  |  UI/UX Designer',
  'Figma, Wireframing, Component System, Interactive Prototyping',
  [
    'Merancang landing page platform edukasi (Zaducation) dan dashboard visualisasi finansial pribadi (ZeroMoney) dengan prinsip hierarki visual modern dan konsistensi komponen.'
  ]
);

// 4. RIWAYAT PENDIDIKAN
renderSectionTitle('Riwayat Pendidikan');
const eduY = doc.y;
doc.font('Helvetica-Bold').fontSize(9).fillColor(TEXT_DARK).text('SMK Negeri 1 Bangsri', startX, eduY);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(PRIMARY).text('2024 – Sekarang', startX, eduY, { align: 'right', width: contentWidth });
doc.y = eduY + 12;
doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text('Jurusan: Pengembangan Perangkat Lunak dan Gim (PPLG)', startX, doc.y);
doc.y += 10;
doc.font('Helvetica').fontSize(8).fillColor(TEXT_DARK)
   .text('• Fokus Studi: Pemrograman Web (PHP, Laravel, React), Desain Basis Data MySQL, Algoritma Pemrograman, dan UI/UX Design.', startX + 4, doc.y, { width: contentWidth - 4 });

doc.y += 14;

// 5. PENGALAMAN ORGANISASI
renderSectionTitle('Pengalaman Organisasi & Kepemimpinan');
const orgY = doc.y;
doc.font('Helvetica-Bold').fontSize(9).fillColor(TEXT_DARK).text('Pramuka SMKN 1 Bangsri — Divisi TEKPRAM', startX, orgY);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(PRIMARY).text('2024 – Sekarang', startX, orgY, { align: 'right', width: contentWidth });
doc.y = orgY + 12;
doc.font('Helvetica').fontSize(8).fillColor(TEXT_DARK)
   .text('• Berperan aktif menyusun materi teknik kepramukaan, manajemen kegiatan lapangan, serta melatih koordinasi dan kepemimpinan tim.', startX + 4, doc.y, { width: contentWidth - 4 });

doc.end();

stream.on('finish', () => {
  console.log(`CV generated successfully at ${outputPath}`);
});
