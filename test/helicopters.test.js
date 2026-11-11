const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ejs = require('ejs');

test('renders futuristic helicopter posters grouped by batch', async () => {
  const html = await ejs.renderFile(path.join(__dirname, '..', 'src', 'views', 'index.ejs'), {
    title: 'PROYEK GARUDA',
    projects: [],
    user: null,
    csrfToken: ''
  });
  const posterPaths = [...html.matchAll(/data-lightbox-src="([^"]+\/helicopters\/[^"]+)"/g)]
    .map((match) => match[1]);

  assert.match(html, /href="\/#helicopters">Helicopter Futuristic/);
  assert.match(html, /href="#helicopter-batch-1">Helicopter Futuristic — Batch 1/);
  assert.match(html, /href="#helicopter-batch-2">Helicopter Futuristic — Batch 2/);
  assert.match(html, /href="#helicopter-batch-3">Helicopter Futuristic — Batch 3/);
  assert.equal((html.match(/class="helicopter-card"/g) || []).length, 62);
  assert.equal(posterPaths.length, 62);
  assert.match(html, /Silver Zephyr X-117/);
  assert.match(html, /Nocturne Specter X-137/);
  assert.match(html, /Iron Bastion X-131/);
  assert.match(html, /Azure Phantom X-97/);
  assert.match(html, /Nexus Falcon X-130/);
  assert.match(html, /Verdant Specter X-125/);
  assert.match(html, /Skyline Phantom X-141/);
  assert.match(html, /Titanium Viper X-96/);
  assert.match(html, /Shadow Helix X-93/);
  assert.match(html, /Aurora Phantom X-92/);
  assert.match(html, /Silver Hawk X-109/);
  assert.match(html, /Storm Vanguard X-133/);
  assert.match(html, /Titan Skylift X-90/);
  assert.match(html, /Neon Helix X-145/);
  assert.match(html, /konsep fiksi/);

  for (const [batch, expectedCount] of [[1, 21], [2, 20], [3, 21]]) {
    const start = html.indexOf(`id="helicopter-batch-${batch}"`);
    const nextBatch = html.indexOf(`id="helicopter-batch-${batch + 1}"`, start);
    const section = html.slice(start, nextBatch === -1 ? html.indexOf('</section>', start) : nextBatch);
    assert.equal((section.match(/class="helicopter-card"/g) || []).length, expectedCount);
  }

  for (const posterPath of posterPaths) {
    assert.ok(
      fs.existsSync(path.join(__dirname, '..', 'public', posterPath.slice(1))),
      `Missing poster asset: ${posterPath}`
    );
  }
});
