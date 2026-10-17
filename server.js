const app=require('./src/app');
const {initDb}=require('./src/config/db');
const port=process.env.PORT||3000;

initDb().then(()=>app.listen(port,()=>console.log(`PROYEK GARUDA berjalan di http://localhost:${port}`))).catch(error=>{
 console.error(error);
 process.exit(1);
});
