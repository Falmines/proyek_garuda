const r=require('express').Router(); const {pool}=require('../config/db');
r.get('/',async(req,res)=>{const {rows}=await pool.query('SELECT * FROM projects ORDER BY id');res.render('index',{title:'PROYEK GARUDA',projects:rows});});
r.get('/proyek/:slug',async(req,res)=>{const {rows}=await pool.query('SELECT * FROM projects WHERE slug=$1',[req.params.slug]);if(!rows[0])return res.status(404).render('404',{title:'Tidak ditemukan'});res.render('detail',{title:rows[0].title,project:rows[0]});});
r.get('/tentang',(req,res)=>res.render('about',{title:'Tentang Proyek Garuda'}));
r.get('/kontak',(req,res)=>res.render('contact',{title:'Kontak',sent:req.query.sent}));
r.post('/kontak',async(req,res)=>{const {name,phone,email,subject,message}=req.body;if(!name||!message)return res.status(400).send('Nama dan pesan wajib diisi');await pool.query('INSERT INTO messages(name,phone,email,subject,message) VALUES($1,$2,$3,$4,$5)',[name,phone,email,subject,message]);res.redirect('/kontak?sent=1');});
module.exports=r;
