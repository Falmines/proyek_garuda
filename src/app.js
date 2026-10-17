const path=require('path');
if(!process.env.VERCEL){
 const envPath=path.join(__dirname,'..','.env');
 const localEnv=require('dotenv').parse(require('node:fs').readFileSync(envPath));
 if(localEnv.DATABASE_URL) process.env.DATABASE_URL=localEnv.DATABASE_URL;
 require('dotenv').config({path:envPath});
}
const crypto=require('node:crypto');
const express=require('express'), session=require('express-session');
const connectPgSimple=require('connect-pg-simple');
const {pool,initDb}=require('./config/db');
const {createCsrfToken,csrfProtection,securityHeaders}=require('./middleware/security');
const app=express();
const PgSession=connectPgSimple(session);

app.set('trust proxy',1);
app.disable('x-powered-by');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(securityHeaders);
app.use(express.urlencoded({extended:false,limit:'32kb',parameterLimit:30}));
app.use(express.json({limit:'32kb'}));
app.use(express.static(path.join(__dirname,'..','public'),{maxAge:'1h'}));
app.use((req,res,next)=>initDb().then(()=>next(),error=>{
 console.error('Database initialization failed:',error.code||error.name||'unknown error');
 if(res.headersSent) return next(error);
 if(req.originalUrl.startsWith('/api/')) return res.status(503).json({error:{code:'DATABASE_UNAVAILABLE',message:'Layanan database sementara tidak tersedia.'}});
 res.status(503).send('Konfigurasi layanan belum lengkap atau database tidak dapat dijangkau. Periksa DATABASE_URL, SESSION_SECRET, ADMIN_USERNAME, dan ADMIN_PASSWORD di Vercel, lalu deploy ulang.');
}));
app.use(session({
 name:process.env.NODE_ENV==='production'?'__Host-garuda.sid':'garuda.sid',
 store:new PgSession({pool,tableName:'session',createTableIfMissing:true}),
 secret:process.env.SESSION_SECRET||crypto.randomBytes(32).toString('hex'),
 resave:false,
 saveUninitialized:false,
 cookie:{maxAge:86400000,httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/'}
}));
app.use((req,res,next)=>{res.locals.user=req.session.user||null; next();});
app.use(createCsrfToken);
app.use(csrfProtection);
app.use('/',require('./routes/publicRoutes'));
app.use('/admin',require('./routes/adminRoutes'));
app.use('/api/v1',require('./routes/apiRoutes'));
app.use((req,res)=>{
 if(req.originalUrl.startsWith('/api/')) return res.status(404).json({error:{code:'NOT_FOUND',message:'Endpoint tidak ditemukan.'}});
 return res.status(404).render('404',{title:'Halaman Tidak Ditemukan'});
});
app.use((err,req,res,next)=>{
 console.error('Request failed:',err.code||err.name||'unknown error');
 if(res.headersSent) return next(err);
 if(req.originalUrl.startsWith('/api/')) return res.status(500).json({error:{code:'INTERNAL_ERROR',message:'Terjadi kesalahan pada server.'}});
 res.status(500).send('Terjadi kesalahan pada server.');
});

module.exports=app;
