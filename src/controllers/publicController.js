const { pool } = require('../config/db');
const { validateContact } = require('../utils/validation');

const PROJECT_FIELDS = 'id,slug,title,category,summary,description,image,status,progress,updated_at';

async function home(req, res) {
  const { rows } = await pool.query(`SELECT ${PROJECT_FIELDS} FROM projects ORDER BY id`);
  res.render('index', { title: 'PROYEK GARUDA', projects: rows });
}

async function projectDetail(req, res) {
  const { rows } = await pool.query(`SELECT ${PROJECT_FIELDS} FROM projects WHERE slug=$1`, [req.params.slug]);
  if (!rows[0]) return res.status(404).render('404', { title: 'Tidak ditemukan' });
  return res.render('detail', { title: rows[0].title, project: rows[0] });
}

function about(req, res) {
  res.render('about', { title: 'Tentang Proyek Garuda' });
}

function contactForm(req, res) {
  res.render('contact', { title: 'Kontak', sent: req.query.sent });
}

async function submitContact(req, res) {
  const result = validateContact(req.body || {});
  if (result.error) return res.status(422).send(result.error);

  const { name, phone, email, subject, message } = result.data;
  await pool.query(
    'INSERT INTO messages(name,phone,email,subject,message) VALUES($1,$2,$3,$4,$5)',
    [name, phone, email, subject, message]
  );
  return res.redirect('/kontak?sent=1');
}

module.exports = { about, contactForm, home, projectDetail, submitContact };
