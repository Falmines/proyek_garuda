const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ejs = require('ejs');

test('renders futuristic tank posters in three batches with navigation and image assets', async () => {
  const html = await ejs.renderFile(path.join(__dirname, '..', 'src', 'views', 'index.ejs'), {
    title: 'PROYEK GARUDA',
    projects: [],
    user: null,
    csrfToken: ''
  });
  const posterPaths = [...html.matchAll(/data-lightbox-src="([^"]+\/tanks\/[^"]+)"/g)]
    .map((match) => match[1]);

  assert.match(html, /href="\/#tanks">Kendaraan Darat/);
  assert.match(html, /id="tanks" aria-labelledby="tanks-title"/);
  assert.match(html, /href="#tank-batch-1">Kendaraan Darat Futuristik — Seri 1/);
  assert.match(html, /href="#tank-batch-2">Kendaraan Darat Futuristik — Seri 2/);
  assert.match(html, /href="#tank-batch-3">Kendaraan Darat Futuristik — Seri 3/);
  assert.equal((html.match(/class="tank-card"/g) || []).length, 28);
  assert.equal(posterPaths.length, 28);
  assert.match(html, /konsep fiksi/);

  for (const [batch, expectedCount] of [[1, 10], [2, 9], [3, 9]]) {
    const start = html.indexOf(`id="tank-batch-${batch}"`);
    const nextBatch = html.indexOf(`id="tank-batch-${batch + 1}"`, start);
    const section = html.slice(start, nextBatch === -1 ? html.indexOf('</section>', start) : nextBatch);
    assert.equal((section.match(/class="tank-card"/g) || []).length, expectedCount);
  }

  for (const posterPath of posterPaths) {
    assert.ok(
      fs.existsSync(path.join(__dirname, '..', 'public', posterPath.slice(1))),
      `Missing poster asset: ${posterPath}`
    );
  }
});
