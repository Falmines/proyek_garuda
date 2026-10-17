-- Jalankan skrip ini melalui pgAdmin Query Tool setelah database
-- proyek_garuda dibuat dan dipilih.

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(80) UNIQUE NOT NULL,
    title VARCHAR(160) NOT NULL,
    category VARCHAR(80),
    summary TEXT,
    description TEXT,
    image VARCHAR(255),
    status VARCHAR(40) DEFAULT 'Konsep R&D',
    progress INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(40),
    email VARCHAR(160),
    subject VARCHAR(180),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicle_sales (
    id SERIAL PRIMARY KEY,
    asset_type VARCHAR(30) UNIQUE NOT NULL,
    owner_name VARCHAR(120) NOT NULL,
    plate_number VARCHAR(20) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    interior_image_path VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(40) NOT NULL DEFAULT 'DONE DEAL',
    recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE vehicle_sales ADD COLUMN IF NOT EXISTS interior_image_path VARCHAR(255);
ALTER TABLE vehicle_sales ADD COLUMN IF NOT EXISTS location VARCHAR(255);

CREATE TABLE IF NOT EXISTS session (
    sid VARCHAR NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire);

INSERT INTO vehicle_sales (asset_type, owner_name, plate_number, image_path, interior_image_path, status)
VALUES
    ('Mobil', 'Fakhruddin Naufal', 'VALSHESSH', '/images/done-deal-car.png', NULL, 'DONE DEAL'),
    ('MPV - unit tambahan', 'Fakhruddin Naufal', 'VALSHESSH', '/images/done-deal-mpv-additional.png', NULL, 'DONE DEAL'),
    ('Motor', 'Fakhruddin Naufal', 'VALSHESSH', '/images/done-deal-motorcycle.png', NULL, 'DONE DEAL'),
    ('SUV', 'Fakhruddin Naufal', 'VALSHESSH', '/images/done-deal-suv.png', NULL, 'DONE DEAL'),
    ('SUV - unit tambahan', 'Fakhruddin Naufal', 'VALSHESSH', '/images/done-deal-suv-additional.png', NULL, 'DONE DEAL'),
    ('Jet pribadi', 'Fakhruddin Naufal', '', '/images/done-deal-private-jet.png', NULL, 'DONE DEAL'),
    ('Gedung perkantoran', 'Fakhruddin Naufal', '', '/images/done-deal-building-exterior.png', '/images/done-deal-building-floorplan.png', 'DONE DEAL')
ON CONFLICT (asset_type) DO NOTHING;

UPDATE vehicle_sales
SET image_path = '/images/done-deal-suv-mitsubishi.png'
WHERE asset_type = 'SUV';

UPDATE vehicle_sales
SET image_path = '/images/done-deal-building-valolfshop.png',
    location = 'Lahan kosong di samping Gedung Mandiri, Summarecon Bekasi (lokasi rencana)'
WHERE asset_type = 'Gedung perkantoran';

UPDATE projects
SET image = regexp_replace(image, '\.png$', '.webp')
WHERE image IN (
    '/images/garuda-armor.png',
    '/images/garuda-exo.png',
    '/images/garuda-rotor.png',
    '/images/garuda-samudra.png',
    '/images/emergency-fleet.png',
    '/images/kapal-nuh.png'
);

INSERT INTO projects (
    slug, title, category, summary, description, image, progress
) VALUES
(
    'garuda-armor',
    'GARUDA ARMOR VR',
    'Kendaraan & Simulasi',
    'Riset kendaraan lapis baja generasi berikutnya berbasis rekayasa, digital twin, dan simulasi virtual.',
    'Portal konsep untuk eksplorasi desain, material, manufaktur, keselamatan, dan pengujian virtual.',
    '/images/garuda-armor.webp',
    72
),
(
    'garuda-exo',
    'GARUDA EXO-SUIT',
    'Robotika',
    'Konsep sistem robotik/exoskeleton yang dikendalikan manusia untuk riset antarmuka manusia-mesin.',
    'Fokus pada ergonomi, kendali, keselamatan operator, pemetaan gerak, serta aplikasi sipil dan tanggap darurat.',
    '/images/garuda-exo.webp',
    58
),
(
    'garuda-rotor',
    'GARUDA ROTOR',
    'Dirgantara',
    'Konsep wahana dual-rotor untuk eksplorasi mobilitas udara, SAR, evakuasi, dan logistik.',
    'Materi pada situs bersifat visualisasi konseptual dan tidak menyatakan spesifikasi atau program resmi.',
    '/images/garuda-rotor.webp',
    64
),
(
    'garuda-samudra',
    'GARUDA SAMUDRA',
    'Maritim',
    'Eksplorasi konsep platform maritim besar untuk riset teknologi kelautan dan dukungan kemanusiaan.',
    'Menampilkan visi teknologi maritim, keselamatan, logistik, SAR, dan kemandirian industri nasional.',
    '/images/garuda-samudra.webp',
    51
),
(
    'emergency-fleet',
    'AUTONOMOUS EMERGENCY FLEET',
    'Keselamatan Publik',
    'Konsep armada tanggap darurat cerdas untuk pemadam, ambulans, evakuasi, dan integrasi smart city.',
    'Fokus pada sensor, AI, navigasi, komunikasi kendaraan-infrastruktur, dan keselamatan masyarakat.',
    '/images/emergency-fleet.webp',
    81
),
(
    'kapal-modern-nabi-nuh',
    'KAPAL MODERN NABI NUH',
    'Kemanusiaan',
    'Konsep futuristik yang mengambil inspirasi moral dari kisah Nabi Nuh tentang perlindungan kehidupan saat bencana.',
    'Bukan rekonstruksi keagamaan; konsep ini mengeksplorasi kapal tangguh, habitat, logistik, konservasi, dan respons bencana.',
    '/images/kapal-nuh.webp',
    45
)
ON CONFLICT (slug) DO NOTHING;
