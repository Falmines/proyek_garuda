const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const ejs = require('ejs');
const { pool } = require('../src/config/db');
const { doneDeal } = require('../src/controllers/publicController');

test('renders Done Deal vehicle records with WhatsApp contact links', async () => {
  const html = await ejs.renderFile(path.join(__dirname, '..', 'src', 'views', 'done-deal.ejs'), {
    title: 'Done Deal',
    user: null,
    csrfToken: '',
    assets: [
      { name: 'Mobil', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-car.png', plate: 'VALSHESSH', status: 'DONE DEAL' },
      { name: 'MPV - unit tambahan', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-mpv-additional.png', plate: 'VALSHESSH', status: 'DONE DEAL' },
      { name: 'Motor', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-motorcycle.png', plate: 'VALSHESSH', status: 'DONE DEAL' },
      { name: 'SUV', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-suv-mitsubishi.png', plate: 'VALSHESSH', status: 'DONE DEAL' },
      { name: 'SUV - unit tambahan', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-suv-additional.png', plate: 'VALSHESSH', status: 'DONE DEAL' },
      { name: 'Jet pribadi', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-private-jet.png', plate: '', status: 'DONE DEAL' },
      { name: 'Gedung perkantoran', owner_name: 'Fakhruddin Naufal', image: '/images/done-deal-building-valolfshop.png', interior_image: '/images/done-deal-building-floorplan.png', plate: '', location: 'Lahan kosong di samping Gedung Mandiri, Summarecon Bekasi (lokasi rencana)', status: 'DONE DEAL' }
    ].map(asset => ({ ...asset, deal_date: '2026-10-21' }))
  });

  assert.match(html, /Done Deal/);
  assert.equal((html.match(/21 Oktober 2026/g) || []).length, 7);
  assert.match(html, /Fakhruddin Naufal/);
  assert.equal((html.match(/<dd>VALSHESSH<\/dd>/g) || []).length, 5);
  assert.match(html, /done-deal-car\.png/);
  assert.match(html, /done-deal-mpv-additional\.png/);
  assert.match(html, /done-deal-motorcycle\.png/);
  assert.match(html, /done-deal-suv-mitsubishi\.png/);
  assert.match(html, /done-deal-suv-additional\.png/);
  assert.match(html, /done-deal-private-jet\.png/);
  assert.match(html, /done-deal-building-valolfshop\.png/);
  assert.match(html, /done-deal-building-floorplan\.png/);
  assert.match(html, /class="done-deal-gallery"/);
  assert.match(html, /class="done-deal-card done-deal-building-card"/);
  assert.equal((html.match(/class="done-deal-zoom lightbox-trigger"/g) || []).length, 2);
  assert.match(html, /data-zoom="in"/);
  assert.match(html, /data-zoom="out"/);
  assert.match(html, /data-zoom="reset"/);
  assert.match(html, /Denah interior luas/);
  assert.match(html, /Visual konsep gedung - bukan foto lokasi aktual/);
  assert.match(html, /Lahan kosong di samping Gedung Mandiri, Summarecon Bekasi/);
  assert.doesNotMatch(html, /Gedung%20perkantoran%20plat/);
  assert.match(html, /https:\/\/wa\.me\/6285891099220/);
  assert.match(html, /Chat ke WhatsApp/);
});

test('loads Done Deal records from the vehicle sales table', async () => {
  const originalQuery = pool.query;
  let renderedView;
  let renderedData;
  pool.query = async (query) => {
    assert.match(query, /FROM vehicle_sales/);
    assert.match(query, /deal_date/);
    return { rows: [{ name: 'Mobil', owner_name: 'Fakhruddin Naufal', plate: 'VALSHESSH', status: 'DONE DEAL', deal_date: '2026-10-21' }] };
  };

  try {
    await doneDeal({}, {
      render(view, data) {
        renderedView = view;
        renderedData = data;
      }
    });
  } finally {
    pool.query = originalQuery;
  }

  assert.equal(renderedView, 'done-deal');
  assert.equal(renderedData.assets[0].plate, 'VALSHESSH');
  assert.equal(renderedData.assets[0].deal_date, '2026-10-21');
});
