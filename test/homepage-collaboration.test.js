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

  const collaborationSection = html.slice(html.indexOf('id="collaboration-title"'));
  const referenceImage = collaborationSection.indexOf('collaboration-reference-prabowo-gibran-2024-updated.png');
  const firstProspectivePartner = collaborationSection.indexOf('collaboration-esa-unggul.png');

  assert.notEqual(referenceImage, -1);
  assert.notEqual(firstProspectivePartner, -1);
  assert.ok(referenceImage < firstProspectivePartner);
  assert.match(collaborationSection, /REFERENSI VISUAL/);
  assert.match(collaborationSection, /bukan pernyataan afiliasi, kemitraan resmi, dukungan, atau endorsement/);
  assert.match(collaborationSection, /collaboration-krama-yudha-tiga-berlian\.png/);
  assert.match(collaborationSection, /collaboration-krama-yudha-ratu-red\.png/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--reference"/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--esa-unggul"/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--ktb"/);
  assert.match(collaborationSection, /class="collaboration-card collaboration-card--krm"/);
  assert.match(collaborationSection, /collaboration-pindad-poster\.png/);
  assert.match(collaborationSection, /collaboration-dirgantara-indonesia-poster\.png/);
  assert.match(collaborationSection, /collaboration-pal-indonesia-poster\.png/);
  assert.match(collaborationSection, /PT Pindad \(Persero\)/);
  assert.match(collaborationSection, /PT Dirgantara Indonesia/);
  assert.match(collaborationSection, /PT PAL Indonesia \(Persero\)/);
  assert.match(collaborationSection, /bukan aset resmi yang diverifikasi/);
  for (const logo of [
    'collaboration-pindad-poster.png',
    'collaboration-dirgantara-indonesia-poster.png',
    'collaboration-pal-indonesia-poster.png'
  ]) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'images', logo)), `Missing poster logo asset: ${logo}`);
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
