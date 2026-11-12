const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const ejs = require('ejs');

test('shows campaign image first as a non-affiliation visual reference', async () => {
  const html = await ejs.renderFile(path.join(__dirname, '..', 'src', 'views', 'index.ejs'), {
    title: 'PROYEK GARUDA',
    projects: [],
    user: null,
    csrfToken: ''
  });

  const collaborationSection = html.slice(html.indexOf('class="section collaboration-section"'));
  const referenceImage = collaborationSection.indexOf('collaboration-reference-prabowo-gibran-2024-updated.png');
  const firstProspectivePartner = collaborationSection.indexOf('collaboration-esa-unggul.png');

  assert.match(html, /Proyek Garuda adalah platform independen untuk mengeksplorasi dan mendokumentasikan gagasan teknologi/);
  assert.match(html, /Mengenalkan gagasan\. Membuka perspektif\./);
  assert.match(html, /href="\/#fighter-jets">Pesawat Futuristik/);
  assert.notEqual(referenceImage, -1);
  assert.notEqual(firstProspectivePartner, -1);
  assert.ok(referenceImage < firstProspectivePartner);
  assert.match(collaborationSection, /REFERENSI VISUAL/);
  assert.match(collaborationSection, /bukan pernyataan kemitraan atau afiliasi resmi/);
  assert.match(collaborationSection, /collaboration-mitsubishi-motors\.png/);
  assert.match(collaborationSection, /Mitsubishi Motors Japan/);
  assert.ok(collaborationSection.indexOf('collaboration-mitsubishi-motors.png') < collaborationSection.indexOf('collaboration-priorities'));
  assert.doesNotMatch(collaborationSection, /collaboration-krama-yudha-(?:tiga-berlian|ratu)/);
  assert.match(collaborationSection, /STRATEGIC PARTNERSHIP/);
  assert.match(collaborationSection, /kemitraan strategis/i);
  assert.match(collaborationSection, /bukan mitra resmi/);
  assert.match(collaborationSection, /Fokus kemitraan strategis/);
  assert.match(collaborationSection, /bukan konfirmasi afiliasi, dukungan, endorsement, atau kemitraan strategis resmi/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--reference"/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--esa-unggul"/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--mitsubishi collaboration-featured"/);
  assert.match(collaborationSection, /collaboration-pindad-poster\.png/);
  assert.match(collaborationSection, /collaboration-dirgantara-indonesia-poster\.png/);
  assert.match(collaborationSection, /collaboration-pal-indonesia-poster\.png/);
  assert.match(collaborationSection, /PT Pindad \(Persero\)/);
  assert.match(collaborationSection, /PT Dirgantara Indonesia/);
  assert.match(collaborationSection, /PT PAL Indonesia \(Persero\)/);
  assert.match(collaborationSection, /Seluruh logo pada bagian ini ditampilkan sebagai referensi visual/);
  for (const logo of [
    'collaboration-pindad-poster.png',
    'collaboration-dirgantara-indonesia-poster.png',
    'collaboration-pal-indonesia-poster.png'
  ]) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'images', logo)), `Missing poster logo asset: ${logo}`);
  }
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'images', 'collaboration-mitsubishi-motors.png')));
});

test('provides persistent Indonesian, English, and Japanese language selection', () => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'src', 'views', 'partials', 'header.ejs'), 'utf8');
  const translations = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'i18n.js'), 'utf8');

  assert.match(header, /data-language="id"/);
  assert.match(header, /data-language="en"/);
  assert.match(header, /data-language="ja"/);
  for (const flag of ['flag-indonesian.png', 'flag-english.png', 'flag-japanese.png']) {
    assert.match(header, new RegExp(flag));
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'images', flag)), `Missing supplied flag: ${flag}`);
  }
  assert.match(translations, /garuda-language=/);
  assert.match(translations, /Proyek Garuda is an independent platform/);
  assert.match(translations, /Proyek Garudaは、テクノロジーのアイデアを探求/);
});

test('translates all strategic partnership section copy in English and Japanese', () => {
  const translations = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'i18n.js'), 'utf8');
  const partnershipCopy = [
    'STRATEGIC PARTNERSHIP',
    'Merancang kemitraan strategis yang berdampak.',
    'Proyek Garuda terbuka untuk menjajaki kemitraan strategis di bidang inovasi, edukasi, dan pertukaran pengetahuan. Organisasi di bawah merupakan referensi poster atau peluang penjajakan, bukan mitra resmi.',
    'Fokus kemitraan strategis',
    '01 / INOVASI',
    'Eksplorasi gagasan dan teknologi.',
    'Membuka ruang berbagi perspektif untuk pengembangan konsep lintas bidang.',
    '02 / EDUKASI',
    'Mendukung pembelajaran yang bermakna.',
    'Menyampaikan pengetahuan dan wawasan teknologi dengan cara yang mudah dipahami.',
    '03 / KOLABORASI',
    'Membangun dialog dan peluang bersama.',
    'Menjajaki pertukaran pengetahuan yang transparan dan bertanggung jawab.',
    'Referensi organisasi dan peluang penjajakan',
    'Logo dan keterangan berikut hanya menjadi referensi visual atau penanda peluang untuk dijajaki; bukan bukti hubungan maupun kemitraan resmi.',
    'REFERENSI VISUAL • BELUM RESMI',
    'Logo Mitsubishi Motors ditampilkan pada gambar referensi. Penayangan ini bukan pernyataan kemitraan atau afiliasi resmi.',
    'Seluruh logo pada bagian ini ditampilkan sebagai referensi visual dari materi yang tersedia dan bukan konfirmasi afiliasi, dukungan, endorsement, atau kemitraan strategis resmi. Label peluang penjajakan tidak menyatakan adanya komunikasi atau kerja sama dengan organisasi terkait.'
  ];

  for (const copy of partnershipCopy) {
    assert.ok(translations.includes(`['${copy}'`), `Missing English/Japanese translation for: ${copy}`);
  }
});

test('shows complete concept posters without cropping', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'style.css'), 'utf8');
  const posterImageStyles = css.match(/\.company-programs \.program-image-link \.poster-main-image\{[^}]+\}/);
  const posterFrameStyles = css.match(/\.company-programs \.program-image-link\{[^}]+\}/);

  assert.ok(posterImageStyles);
  assert.match(posterImageStyles[0], /object-fit:contain/);
  assert.match(posterImageStyles[0], /height:100%/);
  assert.ok(posterFrameStyles);
  assert.match(posterFrameStyles[0], /aspect-ratio:3\/4/);
  assert.match(css, /\.company-programs \.program-image-link \.poster-fill-backdrop\{[^}]*object-fit:cover/);
  assert.match(css, /\.company-programs \.program-image-link \.poster-main-image\{[^}]*object-fit:contain/);
});

test('aligns portfolio cards consistently across responsive layouts', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'style.css'), 'utf8');

  assert.match(css, /\.company-programs>\.grid\{[^}]*repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(css, /\.company-programs \.card-body\{[^}]*display:flex[^}]*flex-direction:column/);
  assert.match(css, /\.company-programs \.card-body>a:last-child\{margin-top:auto\}/);
  assert.match(css, /@media\(max-width:1000px\)/);
  assert.match(css, /\.company-programs>\.grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:20px\}/);
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /\.company-programs>\.grid,.collaboration-grid\{grid-template-columns:1fr\}/);
});
