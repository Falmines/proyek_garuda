const { pool } = require('../config/db');
const { validateContact, validateProject, parsePositiveId } = require('../utils/validation');

const PROJECT_FIELDS = 'id,slug,title,category,summary,description,image,status,progress,updated_at';

async function health(req, res) {
  await pool.query('SELECT 1');
  res.json({ data: { status: 'ok' } });
}

async function listProjects(req, res) {
  const limit = req.query.limit === undefined ? 50 : Number(req.query.limit);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'limit harus berupa angka bulat antara 1 dan 100.' }
    });
  }
  const { rows } = await pool.query(`SELECT ${PROJECT_FIELDS} FROM projects ORDER BY id LIMIT $1`, [limit]);
  return res.json({ data: rows });
}

async function getProject(req, res) {
  const { rows } = await pool.query(`SELECT ${PROJECT_FIELDS} FROM projects WHERE slug=$1`, [req.params.slug]);
  if (!rows[0]) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Proyek tidak ditemukan.' } });
  return res.json({ data: rows[0] });
}

async function createContact(req, res) {
  const result = validateContact(req.body || {});
  if (result.error) {
    return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: result.error } });
  }
  const { name, phone, email, subject, message } = result.data;
  const { rows } = await pool.query(
    'INSERT INTO messages(name,phone,email,subject,message) VALUES($1,$2,$3,$4,$5) RETURNING id,created_at',
    [name, phone, email, subject, message]
  );
  return res.status(201).json({ data: { id: rows[0].id, createdAt: rows[0].created_at } });
}

async function createProject(req, res) {
  const result = validateProject(req.body || {});
  if (result.error) {
    return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: result.error } });
  }
  const { slug, title, category, summary, description, image, status, progress } = result.data;
  try {
    const { rows } = await pool.query(
      `INSERT INTO projects(slug,title,category,summary,description,image,status,progress)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${PROJECT_FIELDS}`,
      [slug, title, category, summary, description, image, status || 'Konsep R&D', progress]
    );
    return res.status(201).json({ data: rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: { code: 'CONFLICT', message: 'Slug proyek sudah digunakan.' } });
    }
    throw error;
  }
}

async function updateProject(req, res) {
  const id = parsePositiveId(req.params.id);
  if (!id) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'ID proyek tidak valid.' } });

  const result = validateProject(req.body || {}, { partial: true });
  if (result.error) {
    return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: result.error } });
  }

  const entries = Object.entries(result.data);
  const assignments = entries.map(([key], index) => `${key}=$${index + 1}`);
  const values = entries.map(([, value]) => value);
  values.push(id);
  try {
    const { rows } = await pool.query(
      `UPDATE projects SET ${assignments.join(',')},updated_at=NOW() WHERE id=$${values.length} RETURNING ${PROJECT_FIELDS}`,
      values
    );
    if (!rows[0]) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Proyek tidak ditemukan.' } });
    return res.json({ data: rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: { code: 'CONFLICT', message: 'Slug proyek sudah digunakan.' } });
    }
    throw error;
  }
}

async function deleteProject(req, res) {
  const id = parsePositiveId(req.params.id);
  if (!id) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'ID proyek tidak valid.' } });
  const result = await pool.query('DELETE FROM projects WHERE id=$1', [id]);
  if (!result.rowCount) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Proyek tidak ditemukan.' } });
  return res.status(204).end();
}

module.exports = { createContact, createProject, deleteProject, getProject, health, listProjects, updateProject };
