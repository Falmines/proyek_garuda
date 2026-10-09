const {Pool}=require('pg'); const bcrypt=require('bcryptjs');
function getDatabaseConfig(){
 const connectionString=process.env.DATABASE_URL?.trim();
 if(connectionString) return {connectionString};
 return {
  host:process.env.PGHOST,
  port:process.env.PGPORT?Number(process.env.PGPORT):5432,
  database:process.env.PGDATABASE,
  user:process.env.PGUSER,
  password:process.env.PGPASSWORD
 };
}
const pool=new Pool({...getDatabaseConfig(),max:process.env.VERCEL?1:10});
let initialization;
function initDb(){
 if(!initialization) initialization=initializeDb().catch(error=>{
  initialization=undefined;
  throw error;
 });
 return initialization;
}
async function initializeDb(){
 if(process.env.NODE_ENV==='production'&&!process.env.SESSION_SECRET?.trim()) throw new Error('SESSION_SECRET must be set in the Vercel project environment variables.');
 const connectionString=process.env.DATABASE_URL?.trim();
 if(connectionString){
  let connectionUrl;
  try { connectionUrl=new URL(connectionString); }
  catch { throw new Error('Format DATABASE_URL tidak valid. Gunakan URL koneksi PostgreSQL yang benar di file .env.'); }
  if(!['postgres:','postgresql:'].includes(connectionUrl.protocol)) throw new Error('DATABASE_URL harus menggunakan protokol PostgreSQL (postgresql://).');
  if(!connectionUrl.password||/^(your_password|isi_password_postgres_anda)$/i.test(decodeURIComponent(connectionUrl.password))) throw new Error('Password PostgreSQL belum diisi. Periksa konfigurasi database di file .env.');
 }else{
  const missing=['PGHOST','PGDATABASE','PGUSER','PGPASSWORD'].filter(key=>!process.env[key]?.trim());
  if(missing.length) throw new Error(`Konfigurasi PostgreSQL belum lengkap di file .env. Isi: ${missing.join(', ')}.`);
  const port=Number(process.env.PGPORT||5432);
  if(!Number.isInteger(port)||port<1||port>65535) throw new Error('PGPORT harus berupa nomor port PostgreSQL yang valid (1-65535).');
  if(/^(your_password|isi_password_postgres_anda)$/i.test(process.env.PGPASSWORD.trim())) throw new Error('Password PostgreSQL belum diisi. Periksa konfigurasi database di file .env.');
 }
 await pool.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,username VARCHAR(60) UNIQUE NOT NULL,password_hash TEXT NOT NULL,role VARCHAR(20) DEFAULT 'admin',created_at TIMESTAMP DEFAULT NOW());
 CREATE TABLE IF NOT EXISTS projects(id SERIAL PRIMARY KEY,slug VARCHAR(80) UNIQUE NOT NULL,title VARCHAR(160) NOT NULL,category VARCHAR(80),summary TEXT,description TEXT,image VARCHAR(255),status VARCHAR(40) DEFAULT 'Konsep R&D',progress INT DEFAULT 0,updated_at TIMESTAMP DEFAULT NOW());
 CREATE TABLE IF NOT EXISTS messages(id SERIAL PRIMARY KEY,name VARCHAR(120) NOT NULL,phone VARCHAR(40),email VARCHAR(160),subject VARCHAR(180),message TEXT NOT NULL,created_at TIMESTAMP DEFAULT NOW());
 CREATE TABLE IF NOT EXISTS session(sid VARCHAR NOT NULL PRIMARY KEY,sess JSON NOT NULL,expire TIMESTAMP(6) NOT NULL);
 CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire);`);
 await pool.query(`UPDATE projects SET image=regexp_replace(image,'\\.png$','.webp')
  WHERE image IN ('/images/garuda-armor.png','/images/garuda-exo.png','/images/garuda-rotor.png','/images/garuda-samudra.png','/images/emergency-fleet.png','/images/kapal-nuh.png');`);
 const u=process.env.ADMIN_USERNAME||'admin', p=process.env.ADMIN_PASSWORD||'Garuda123!';
 const exists=await pool.query('SELECT id FROM users WHERE username=$1',[u]); if(!exists.rowCount) await pool.query('INSERT INTO users(username,password_hash) VALUES($1,$2) ON CONFLICT(username) DO NOTHING',[u,await bcrypt.hash(p,10)]);
 const c=await pool.query('SELECT COUNT(*)::int c FROM projects'); if(c.rows[0].c===0){
  const items=[
 ['garuda-armor','GARUDA ARMOR VR','Kendaraan & Simulasi','Riset kendaraan lapis baja generasi berikutnya berbasis rekayasa, digital twin, dan simulasi virtual.','Portal konsep untuk eksplorasi desain, material, manufaktur, keselamatan, dan pengujian virtual.','/images/garuda-armor.webp',72],
 ['garuda-exo','GARUDA EXO-SUIT','Robotika','Konsep sistem robotik/exoskeleton yang dikendalikan manusia untuk riset antarmuka manusia-mesin.','Fokus pada ergonomi, kendali, keselamatan operator, pemetaan gerak, serta aplikasi sipil dan tanggap darurat.','/images/garuda-exo.webp',58],
 ['garuda-rotor','GARUDA ROTOR','Dirgantara','Konsep wahana dual-rotor untuk eksplorasi mobilitas udara, SAR, evakuasi, dan logistik.','Materi pada situs bersifat visualisasi konseptual dan tidak menyatakan spesifikasi atau program resmi.','/images/garuda-rotor.webp',64],
 ['garuda-samudra','GARUDA SAMUDRA','Maritim','Eksplorasi konsep platform maritim besar untuk riset teknologi kelautan dan dukungan kemanusiaan.','Menampilkan visi teknologi maritim, keselamatan, logistik, SAR, dan kemandirian industri nasional.','/images/garuda-samudra.webp',51],
 ['emergency-fleet','AUTONOMOUS EMERGENCY FLEET','Keselamatan Publik','Konsep armada tanggap darurat cerdas untuk pemadam, ambulans, evakuasi, dan integrasi smart city.','Fokus pada sensor, AI, navigasi, komunikasi kendaraan-infrastruktur, dan keselamatan masyarakat.','/images/emergency-fleet.webp',81],
 ['kapal-modern-nabi-nuh','KAPAL MODERN NABI NUH','Kemanusiaan','Konsep futuristik yang mengambil inspirasi moral dari kisah Nabi Nuh tentang perlindungan kehidupan saat bencana.','Bukan rekonstruksi keagamaan; konsep ini mengeksplorasi kapal tangguh, habitat, logistik, konservasi, dan respons bencana.','/images/kapal-nuh.webp',45]
  ]; for(const x of items) await pool.query('INSERT INTO projects(slug,title,category,summary,description,image,progress) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(slug) DO NOTHING',x);
 }
}
module.exports={pool,initDb};
