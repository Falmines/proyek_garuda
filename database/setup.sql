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

INSERT INTO projects (
    slug, title, category, summary, description, image, progress
) VALUES
(
    'garuda-armor',
    'GARUDA ARMOR VR',
    'Kendaraan & Simulasi',
    'Riset kendaraan lapis baja generasi berikutnya berbasis rekayasa, digital twin, dan simulasi virtual.',
    'Portal konsep untuk eksplorasi desain, material, manufaktur, keselamatan, dan pengujian virtual.',
    '/images/garuda-armor.png',
    72
),
(
    'garuda-exo',
    'GARUDA EXO-SUIT',
    'Robotika',
    'Konsep sistem robotik/exoskeleton yang dikendalikan manusia untuk riset antarmuka manusia-mesin.',
    'Fokus pada ergonomi, kendali, keselamatan operator, pemetaan gerak, serta aplikasi sipil dan tanggap darurat.',
    '/images/garuda-exo.png',
    58
),
(
    'garuda-rotor',
    'GARUDA ROTOR',
    'Dirgantara',
    'Konsep wahana dual-rotor untuk eksplorasi mobilitas udara, SAR, evakuasi, dan logistik.',
    'Materi pada situs bersifat visualisasi konseptual dan tidak menyatakan spesifikasi atau program resmi.',
    '/images/garuda-rotor.png',
    64
),
(
    'garuda-samudra',
    'GARUDA SAMUDRA',
    'Maritim',
    'Eksplorasi konsep platform maritim besar untuk riset teknologi kelautan dan dukungan kemanusiaan.',
    'Menampilkan visi teknologi maritim, keselamatan, logistik, SAR, dan kemandirian industri nasional.',
    '/images/garuda-samudra.png',
    51
),
(
    'emergency-fleet',
    'AUTONOMOUS EMERGENCY FLEET',
    'Keselamatan Publik',
    'Konsep armada tanggap darurat cerdas untuk pemadam, ambulans, evakuasi, dan integrasi smart city.',
    'Fokus pada sensor, AI, navigasi, komunikasi kendaraan-infrastruktur, dan keselamatan masyarakat.',
    '/images/emergency-fleet.png',
    81
),
(
    'kapal-modern-nabi-nuh',
    'KAPAL MODERN NABI NUH',
    'Kemanusiaan',
    'Konsep futuristik yang mengambil inspirasi moral dari kisah Nabi Nuh tentang perlindungan kehidupan saat bencana.',
    'Bukan rekonstruksi keagamaan; konsep ini mengeksplorasi kapal tangguh, habitat, logistik, konservasi, dan respons bencana.',
    '/images/kapal-nuh.png',
    45
)
ON CONFLICT (slug) DO NOTHING;
