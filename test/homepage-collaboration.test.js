const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
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
});
