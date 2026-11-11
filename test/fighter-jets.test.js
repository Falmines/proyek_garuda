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
  assert.equal((html.match(/class="fighter-jet-card"/g) || []).length, 80);
  assert.equal(posterPaths.length, 80);
  assert.match(html, /<i data-progress="72"><\/i>/);
  assert.doesNotMatch(html, /<i style=/);
  const homepageScript = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'main.js'), 'utf8');
  assert.match(homepageScript, /bar\.style\.width=`\$\{bar\.dataset\.progress\}%`/);
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
    assert.equal((section.match(/class="fighter-jet-card"/g) || []).length, 10, `Batch ${batch} should contain 10 posters`);
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

  for (const posterPath of posterPaths) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', posterPath.slice(1))), `Missing poster asset: ${posterPath}`);
  }
});
