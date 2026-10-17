const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { parsePositiveId, validateProject } = require('../utils/validation');

async function login(req, res) {
  const body = req.body || {};
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!username || username.length > 60 || !password || password.length > 256) {
    return res.status(401).render('login', { title: 'Login Admin', error: 'Username atau password salah' });
  }

  const { rows } = await pool.query('SELECT id,username,password_hash,role FROM users WHERE username=$1', [username]);
  const user = rows[0];
  const authenticated = user && user.role === 'admin' && await bcrypt.compare(password, user.password_hash);
  if (!authenticated) {
    return res.status(401).render('login', { title: 'Login Admin', error: 'Username atau password salah' });
  }

  await new Promise((resolve, reject) => {
    req.session.regenerate(error => error ? reject(error) : resolve());
  });
  req.session.user = { id: user.id, username: user.username, role: user.role };
  await new Promise((resolve, reject) => {
    req.session.save(error => error ? reject(error) : resolve());
  });
  return res.redirect('/admin');
}

function logout(req, res, next) {
  req.session.destroy(error => {
    if (error) return next(error);
    res.clearCookie(process.env.NODE_ENV === 'production' ? '__Host-garuda.sid' : 'garuda.sid', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });
    return res.redirect('/');
  });
}

async function dashboard(req, res) {
  const [projects, messages] = await Promise.all([
    pool.query('SELECT * FROM projects ORDER BY id'),
    pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 10')
  ]);
  res.render('admin', { title: 'Dashboard Admin', projects: projects.rows, messages: messages.rows });
}

async function updateProject(req, res) {
  const id = parsePositiveId(req.params.id);
  if (!id) return res.status(400).send('ID proyek tidak valid.');

  const result = validateProject(req.body || {}, { partial: true });
  if (result.error) return res.status(422).send(result.error);

  const entries = Object.entries(result.data);
  const assignments = entries.map(([key], index) => `${key}=$${index + 1}`);
  const values = entries.map(([, value]) => value);
  values.push(id);
  const updated = await pool.query(
    `UPDATE projects SET ${assignments.join(',')},updated_at=NOW() WHERE id=$${values.length} RETURNING id`,
    values
  );
  if (!updated.rowCount) return res.status(404).send('Proyek tidak ditemukan.');
  return res.redirect('/admin');
}

module.exports = { dashboard, login, logout, updateProject };
