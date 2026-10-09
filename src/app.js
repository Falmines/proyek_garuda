const path=require('path');
require('dotenv').config({path:path.join(__dirname,'..','.env')});
const express=require('express'), session=require('express-session');
const connectPgSimple=require('connect-pg-simple');
const {pool,initDb}=require('./config/db');
const app=express();
const PgSession=connectPgSimple(session);

if(process.env.NODE_ENV==='production'&&!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET must be set in production.');

app.set('trust proxy',1);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public'),{maxAge:'1h'}));
app.use((req,res,next)=>initDb().then(()=>next(),next));
app.use(session({
 store:new PgSession({pool,tableName:'session',createTableIfMissing:true}),
 secret:process.env.SESSION_SECRET||'garuda-dev-secret',
 resave:false,
 saveUninitialized:false,
 cookie:{maxAge:86400000,httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production'}
}));
app.use((req,res,next)=>{res.locals.user=req.session.user||null; next();});
app.use('/',require('./routes/publicRoutes'));
app.use('/admin',require('./routes/adminRoutes'));
app.use((req,res)=>res.status(404).render('404',{title:'Halaman Tidak Ditemukan'}));
app.use((err,req,res,next)=>{
 console.error(err);
 if(res.headersSent) return next(err);
 res.status(500).send('Terjadi kesalahan pada server.');
});

module.exports=app;
