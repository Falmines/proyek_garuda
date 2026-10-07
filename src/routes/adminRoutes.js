const r=require('express').Router(), bcrypt=require('bcryptjs'); const {pool}=require('../config/db');
const auth=(req,res,next)=>req.session.user?next():res.redirect('/admin/login');
r.get('/login',(req,res)=>res.render('login',{title:'Login Admin',error:null}));
r.post('/login',async(req,res)=>{const {username,password}=req.body;const {rows}=await pool.query('SELECT * FROM users WHERE username=$1',[username]);if(!rows[0]||!await bcrypt.compare(password,rows[0].password_hash))return res.status(401).render('login',{title:'Login Admin',error:'Username atau password salah'});req.session.user={id:rows[0].id,username:rows[0].username,role:rows[0].role};res.redirect('/admin');});
r.get('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));
r.get('/',auth,async(req,res)=>{const [p,m]=await Promise.all([pool.query('SELECT * FROM projects ORDER BY id'),pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 10')]);res.render('admin',{title:'Dashboard Admin',projects:p.rows,messages:m.rows});});
r.post('/project/:id',auth,async(req,res)=>{const {title,category,summary,description,status,progress}=req.body;await pool.query('UPDATE projects SET title=$1,category=$2,summary=$3,description=$4,status=$5,progress=$6,updated_at=NOW() WHERE id=$7',[title,category,summary,description,status,Math.max(0,Math.min(100,Number(progress)||0)),req.params.id]);res.redirect('/admin');});
module.exports=r;
