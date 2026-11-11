const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ejs = require('ejs');

test('renders fighter jet posters grouped by batch with working navigation', async () => {
  const project = {
    slug: 'test-project',
    title: 'Test Project',
    category: 'Research',
    summary: 'Test summary',
    image: '/images/test-project.jpg',
    progress: 72,
    status: 'Concept'
  };
  const html = await ejs.renderFile(path.join(__dirname, '..', 'src', 'views', 'index.ejs'), {
    title: 'PROYEK GARUDA',
    projects: [project],
    user: null,
    csrfToken: ''
  });
  const posterPaths = [...html.matchAll(/data-lightbox-src="([^"]+\/fighter-jets\/[^"]+)"/g)].map((match) => match[1]);

  assert.match(html, /href="\/#fighter-jets">Fighter Jet/);
  assert.match(html, /href="#fighter-jet-batch-1">Fighter Jet — Batch 1/);
  assert.match(html, /href="#fighter-jet-batch-2">Fighter Jet — Batch 2/);
  assert.match(html, /href="#fighter-jet-batch-3">Fighter Jet — Batch 3/);
  assert.match(html, /href="#fighter-jet-batch-4">Fighter Jet — Batch 4/);
  assert.match(html, /href="#fighter-jet-batch-5">Fighter Jet — Batch 5/);
  assert.match(html, /href="#fighter-jet-batch-6">Fighter Jet — Batch 6/);
  assert.match(html, /href="#fighter-jet-batch-7">Fighter Jet — Batch 7/);
  assert.match(html, /href="#fighter-jet-batch-8">Fighter Jet — Batch 8/);
  assert.equal((html.match(/class="fighter-jet-card"/g) || []).length, 91);
  assert.equal(posterPaths.length, 91);
  assert.match(html, /<i data-progress="72"><\/i>/);
  assert.doesNotMatch(html, /<i style=/);
  const homepageScript = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'main.js'), 'utf8');
  assert.match(homepageScript, /bar\.style\.width=`\$\{bar\.dataset\.progress\}%`/);
  const homepageStyles = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'style.css'), 'utf8');
  assert.match(homepageStyles, /\.fighter-jet-grid\{display:flex;flex-wrap:wrap;justify-content:center;gap:18px\}/);
  assert.match(homepageStyles, /\.fighter-jet-card\{display:flex;flex:0 1 calc\(\(100% - 54px\)\/4\);flex-direction:column/);
  assert.match(homepageStyles, /@media\(max-width:1000px\)\{\.fighter-jet-card\{flex-basis:calc\(\(100% - 36px\)\/3\)\}\}/);
  assert.match(homepageStyles, /@media\(max-width:700px\)\{\.fighter-jet-grid\{gap:12px\}\.fighter-jet-card\{flex-basis:calc\(\(100% - 12px\)\/2\)\}/);
  for (let batch = 1; batch < 8; batch += 1) {
    assert.ok(html.indexOf(`id="fighter-jet-batch-${batch}"`) < html.indexOf(`id="fighter-jet-batch-${batch + 1}"`));
  }
  for (let batch = 1; batch <= 8; batch += 1) {
    const section = html.slice(
      html.indexOf(`id="fighter-jet-batch-${batch}"`),
      html.indexOf(`id="fighter-jet-batch-${batch + 1}"`) > -1
        ? html.indexOf(`id="fighter-jet-batch-${batch + 1}"`)
        : html.indexOf('</section>', html.indexOf(`id="fighter-jet-batch-${batch}"`))
    );
    const expectedPosterCount = [6, 7, 8].includes(batch) ? 12 : 11;
    assert.equal((section.match(/class="fighter-jet-card"/g) || []).length, expectedPosterCount, `Batch ${batch} should contain ${expectedPosterCount} posters`);
  }
  assert.match(html, /Orion A-950 Multi-Role Heavy Fighter/);
  assert.match(html, /Nightfall Spear X-167/);
  assert.match(html, /Obsidian Strike X-148/);
  assert.match(html, /Orion X-Series Next-Generation Multi-Role Tactical Fighter/);
  assert.match(html, /Storm X-156/);
  assert.match(html, /Obsidian Raven X-321/);
  assert.match(html, /Crimson Wraith X-191/);
  assert.match(html, /Sky Arc X-192/);
  assert.match(html, /Orion X-880/);
  assert.match(html, /Shadow Viper X-792/);
  assert.match(html, /Solar Arrow X-154/);
  assert.match(html, /Aero-X7/);
  assert.match(html, /Falcon Strike-X9/);
  assert.match(html, /Pesawat Siluman Hipersonik/);
  assert.match(html, /Stealth Delta X-4/);
  assert.match(html, /Stealth VTOL Dual Turbo System/);
  assert.match(html, /Skyhawk-X1/);
  assert.match(html, /Aero Seraph X-7/);
  assert.match(html, /Pesawat Futuristik/);
  assert.match(html, /Aeroguard X-04 Heavy VTOL Aircraft/);
  assert.match(html, /Shadow Veil X-31/);
  assert.match(html, /Shadow-Wing X1/);

  for (const posterPath of posterPaths) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', posterPath.slice(1))), `Missing poster asset: ${posterPath}`);
  }
});
