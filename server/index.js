import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import path from 'path';
import {fileURLToPath} from 'url';
const dist=path.join(path.dirname(fileURLToPath(import.meta.url)),'..','dist');

const pool = mysql.createPool({
  host:process.env.DB_HOST||process.env.MYSQLHOST||'localhost',
  port:Number(process.env.DB_PORT||process.env.MYSQLPORT||3306),
  user:process.env.DB_USER||process.env.MYSQLUSER,
  password:process.env.DB_PASSWORD||process.env.MYSQLPASSWORD,
  database:process.env.DB_NAME||process.env.MYSQLDATABASE,
  charset:'utf8mb4',connectionLimit:10});
// create the table automatically on first start
try{await pool.query(`CREATE TABLE IF NOT EXISTS submissions (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200) NOT NULL, photo MEDIUMBLOB NOT NULL, crop_json VARCHAR(200), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) CHARACTER SET utf8mb4`)}catch(e){console.error('DB init failed:',e.message)}
const app = express();
app.use(cors({origin:process.env.ALLOWED_ORIGIN||'*'}));
app.use(express.json({limit:'3mb'}));

// Students' poster page calls this after download
app.post('/api/submissions', async (req,res)=>{
  try{
    const name=String(req.body.name||'').trim().slice(0,200);
    const m=/^data:image\/jpeg;base64,(.+)$/.exec(req.body.photo||'');
    if(!name||!m) return res.status(400).json({error:'name and JPEG photo required'});
    const [r]=await pool.execute('INSERT INTO submissions (name,photo,crop_json) VALUES (?,?,?)',[name,Buffer.from(m[1],'base64'),JSON.stringify(req.body.crop||{})]);
    res.json({ok:true,id:r.insertId});
  }catch(e){console.error(e);res.status(500).json({error:'server error'})}
});

// Admin only: ?key=ADMIN_KEY
const admin=(req,res,next)=>req.query.key===process.env.ADMIN_KEY?next():res.status(401).send('Unauthorized');
app.get('/api/submissions/:id/photo',admin,async(req,res)=>{
  const [[row]]=await pool.query('SELECT photo FROM submissions WHERE id=?',[req.params.id]);
  if(!row) return res.sendStatus(404);res.type('jpeg').send(row.photo)});
app.get('/admin',admin,async(req,res)=>{
  const [rows]=await pool.query('SELECT id,name,created_at FROM submissions ORDER BY id DESC');
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  res.send(`<meta charset=utf8><title>Submissions</title><body style="font-family:sans-serif"><h2>SPARSH 2026 – ${rows.length} students</h2>`+
   rows.map(r=>`<div style="display:inline-block;margin:8px;text-align:center;width:180px"><img src="/api/submissions/${r.id}/photo?key=${encodeURIComponent(req.query.key)}" style="width:180px;height:220px;object-fit:cover;border-radius:8px"><br><b>${esc(r.name)}</b><br><small>${r.created_at.toLocaleString()}</small></div>`).join(''));
});

// Serves the built website too, so ONE server runs everything (site + MySQL API)
app.use(express.static(dist));
app.get('*',(req,res)=>res.sendFile(path.join(dist,'index.html')));
app.listen(process.env.PORT||3001,()=>console.log('API running on port '+(process.env.PORT||3001)));
