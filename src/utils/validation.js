const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_PATH_PATTERN = /^\/images\/[a-z0-9][a-z0-9._/-]*\.(?:webp|png|jpe?g)$/i;

function optionalText(value, field, maxLength) {
  if (value === undefined || value === null || value === '') return { value: null };
  if (typeof value !== 'string') return { error: `${field} harus berupa teks.` };
  const trimmed = value.trim();
  if (trimmed.length > maxLength) return { error: `${field} maksimal ${maxLength} karakter.` };
  if (trimmed.includes('\0')) return { error: `${field} mengandung karakter yang tidak valid.` };
  return { value: trimmed || null };
}

function validateContact(input) {
  const fields = [
    ['name', 'Nama', 120, true],
    ['phone', 'Nomor telepon', 40, false],
    ['email', 'Email', 160, false],
    ['subject', 'Subjek', 180, false],
    ['message', 'Pesan', 5000, true]
  ];
  const data = {};

  for (const [key, label, maxLength, required] of fields) {
    const result = optionalText(input[key], label, maxLength);
    if (result.error) return { error: result.error };
    if (required && !result.value) return { error: `${label} wajib diisi.` };
    data[key] = result.value;
  }

  if (data.email && !EMAIL_PATTERN.test(data.email)) {
    return { error: 'Format email tidak valid.' };
  }
  if (data.phone && !/^[+\d\s().-]+$/.test(data.phone)) {
    return { error: 'Format nomor telepon tidak valid.' };
  }
  if (!data.email && !data.phone) {
    return { error: 'Isi minimal email atau nomor telepon agar kami dapat membalas.' };
  }

  return { data };
}

function validateProject(input, { partial = false } = {}) {
  const fields = {
    slug: ['Slug', 80],
    title: ['Judul', 160],
    category: ['Kategori', 80],
    summary: ['Ringkasan', 1000],
    description: ['Deskripsi', 10000],
    image: ['Path gambar', 255],
    status: ['Status', 40]
  };
  const allowedFields = new Set([...Object.keys(fields), 'progress']);
  const unknownField = Object.keys(input).find(key => !allowedFields.has(key) && key !== '_csrf');
  if (unknownField) return { error: `Field ${unknownField} tidak diizinkan.` };

  const data = {};
  for (const [key, [label, maxLength]] of Object.entries(fields)) {
    if (partial && !Object.hasOwn(input, key)) continue;
    const result = optionalText(input[key], label, maxLength);
    if (result.error) return { error: result.error };
    if (!result.value) return { error: `${label} wajib diisi.` };
    data[key] = result.value;
  }

  if ((!partial || Object.hasOwn(input, 'progress')) && input.progress !== undefined) {
    const rawProgress = input.progress;
    const progress = typeof rawProgress === 'string' && rawProgress.trim() !== ''
      ? Number(rawProgress)
      : rawProgress;
    if (typeof progress !== 'number') return { error: 'Progres harus berupa angka bulat antara 0 dan 100.' };
    if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
      return { error: 'Progres harus berupa angka bulat antara 0 dan 100.' };
    }
    data.progress = progress;
  } else if (!partial) {
    data.progress = 0;
  }

  if (data.slug && !SLUG_PATTERN.test(data.slug)) {
    return { error: 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.' };
  }
  if (data.image && (!IMAGE_PATH_PATTERN.test(data.image) || data.image.includes('..'))) {
    return { error: 'Path gambar harus menunjuk ke berkas gambar lokal di /images/.' };
  }
  if (Object.keys(data).length === 0) return { error: 'Tidak ada perubahan yang dikirim.' };
  return { data };
}

function parsePositiveId(value) {
  if (!/^[1-9]\d*$/.test(String(value))) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

module.exports = { parsePositiveId, validateContact, validateProject };
