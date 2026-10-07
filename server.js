const path=require('path');
require('dotenv').config({path:path.join(__dirname,'.env')});
const express=require('express'), session=require('express-session');
const {initDb}=require('./src/config/db');
const app=express();
app.set('view engine','ejs'); app.set('views',path.join(__dirname,'src/views'));
app.use(express.urlencoded({extended:true})); app.use(express.json()); app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:process.env.SESSION_SECRET||'garuda-dev-secret',resave:false,saveUninitialized:false,cookie:{maxAge:86400000}}));
app.use((req,res,next)=>{res.locals.user=req.session.user||null; next();});
app.use('/',require('./src/routes/publicRoutes')); app.use('/admin',require('./src/routes/adminRoutes'));
app.use((req,res)=>res.status(404).render('404',{title:'Halaman Tidak Ditemukan'}));
const port=process.env.PORT||3000;
initDb().then(()=>app.listen(port,()=>console.log(`PROYEK GARUDA berjalan di http://localhost:${port}`))).catch(e=>{
 if(e instanceof Error && e.message==='SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string'){
  console.error('PostgreSQL meminta password, tetapi DATABASE_URL tidak menyediakannya. Isi password PostgreSQL pada file .env.');
 }
 console.error(e); process.exit(1);
});
