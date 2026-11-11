const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('keeps the mobile header and batch navigation scrollable without wrapping', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'style.css'), 'utf8');

  assert.match(css, /body>header nav\{[^}]*overflow-x:auto[^}]*flex-wrap:nowrap/);
  assert.match(css, /\.fighter-jet-navigation,\.helicopter-navigation\{[^}]*flex-wrap:nowrap[^}]*overflow-x:auto/);
  assert.match(css, /\.tank-navigation\{flex-wrap:nowrap;overflow-x:auto/);
});

test('fits concept poster cards into a balanced two-column mobile layout', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'style.css'), 'utf8');

  assert.match(css, /\.fighter-jet-card,\.helicopter-card\{flex-basis:calc\(\(100% - 12px\)\/2\)/);
  assert.match(css, /\.fighter-jet-poster,\.helicopter-poster\{aspect-ratio:4\/5\}/);
  assert.match(css, /\.tank-card\{flex-basis:calc\(\(100% - 12px\)\/2\);border-radius:12px\}/);
  assert.match(css, /\.tank-poster\{aspect-ratio:4\/5\}/);
  assert.match(css, /@media\(max-width:480px\)\{\.tank-card\{flex-basis:100%;max-width:400px\}\.tank-poster\{aspect-ratio:2\/3\}/);
  assert.match(css, /@media\(max-width:560px\)\{\.lightbox-toolbar\{align-items:flex-start;flex-direction:column/);
  assert.match(css, /\.lightbox-controls\{width:100%;flex-wrap:wrap;justify-content:flex-start;gap:5px\}/);
});
