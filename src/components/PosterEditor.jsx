import {useEffect,useRef,useState} from 'react';
import {Upload,ZoomIn,ZoomOut,RotateCcw,Trash2,Eye,Download,X} from 'lucide-react';
import {saveFile,saveSubmission} from '../utils/platform';
import {W,PH,draw,loadAssets,cover} from '../utils/posterRenderer';
const D={zoom:1,ox:0,oy:-.3},cl=(v,a,b)=>Math.min(b,Math.max(a,v));
export default function PosterEditor(){
 const cv=useRef(),sent=useRef(),fi=useRef(),dr=useRef();
 const[name,setName]=useState(''),[img,setImg]=useState(null),[v,setV]=useState(D),[ok,setOk]=useState(false),[pv,setPv]=useState(null),[err,setErr]=useState('');
 useEffect(()=>{loadAssets().then(()=>setOk(true))},[]);
 useEffect(()=>{ok&&draw(cv.current,{name,img,...v},1.5)},[ok,name,img,v]);
 const file=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
  if(!/^image\/(jpe?g|png|webp)$/.test(f.type)){setErr('Please choose a JPG, PNG or WEBP image.');return}
  setErr('');const i=new Image();i.onload=()=>{setImg(i);setV(D)};i.src=URL.createObjectURL(f)};
 const down=e=>{if(img)dr.current={x:e.clientX,y:e.clientY,v};e.currentTarget.setPointerCapture?.(e.pointerId)};
 const move=e=>{const d=dr.current;if(!d||!img)return;const u=W/cv.current.getBoundingClientRect().width,k=cover(img.width,img.height,PH.w,PH.h,d.v.zoom,0,0);
  setV({...d.v,ox:k.rx?cl(d.v.ox+(e.clientX-d.x)*u/k.rx,-1,1):0,oy:k.ry?cl(d.v.oy+(e.clientY-d.y)*u/k.ry,-1,1):0})};
 const pick=e=>{if(img)return;const r=cv.current.getBoundingClientRect(),k=W/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;if(x>303&&x<597&&y>552&&y<906)fi.current.click()};
 const rec=()=>{if(!img||!name.trim())return;const k=name.trim()+img.src;if(sent.current===k)return;sent.current=k;
  const t=document.createElement('canvas'),r=Math.min(1,640/Math.max(img.width,img.height));t.width=Math.round(img.width*r);t.height=Math.round(img.height*r);
  t.getContext('2d').drawImage(img,0,0,t.width,t.height);saveSubmission({name:name.trim(),photo:t.toDataURL('image/jpeg',.8),crop:v})};
 const save=async(ext)=>{await loadAssets();const c=document.createElement('canvas');draw(c,{name,img,...v},2);
  const safe=name.trim().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'')||'Student';
  c.toBlob(async b=>{await saveFile(b,`SPARSH-2026-${safe}.${ext}`);rec()},ext==='png'?'image/png':'image/jpeg',.95)};
 const show=async()=>{await loadAssets();const c=document.createElement('canvas');draw(c,{name,img,...v},1);setPv(c.toDataURL('image/jpeg',.9))};
 return(<section id="poster" className="editor"><h2>Create Your Personalized Invitation</h2>
 <p className="sub">Add your photo and name, and download your own SPARSH 2026 invitation</p>
 <input ref={fi} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={file}/>
 <div className="grid2"><div className="left">
  <p className="hint tap">{img?'Drag the photo to reposition it':'👆 Tap the photo frame to upload, then tap the dotted line to type your name'}</p>
  {err&&<p className="err">{err}</p>}
  <div className="wrap">
   <canvas ref={cv} className={img?'poster grab':'poster pick'} onClick={pick} onPointerDown={down} onPointerMove={move} onPointerUp={()=>dr.current=null} onPointerCancel={()=>dr.current=null}/>
   <input className="nameinp" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Tap here to type your name" aria-label="Student name"/>
  </div>
  {img&&<div className="tools">
   <button className="btn" onClick={()=>setV({...v,zoom:cl(v.zoom-.1,1,4)})}><ZoomOut size={16}/></button>
   <input type="range" min="1" max="4" step=".01" value={v.zoom} onChange={e=>setV({...v,zoom:+e.target.value})}/>
   <button className="btn" onClick={()=>setV({...v,zoom:cl(v.zoom+.1,1,4)})}><ZoomIn size={16}/></button>
   <button className="btn" onClick={()=>fi.current.click()}><Upload size={16}/>Change</button>
   <button className="btn" onClick={()=>setV(D)}><RotateCcw size={16}/>Reset</button>
   <button className="btn" onClick={()=>{setImg(null);setV(D)}}><Trash2 size={16}/>Remove</button></div>}
 </div>
 <aside className="side">
  <div className="card"><h3>How it works</h3><ol className="steps">
   <li><span><b>Upload your photo</b><br/>Tap the photo frame on the poster. Drag and zoom to fit your face.</span></li>
   <li><span><b>Type your name</b><br/>Tap the dotted line below the photo.</span></li>
   <li><span><b>Download</b><br/>Save your invitation as PNG or JPG and share it.</span></li></ol></div>
  <div className="card"><h3>Your invitation</h3>
   <button className="btn solid" onClick={()=>save('png')}><Download size={18}/>Download My Poster</button>
   <p className="hint" style={{marginTop:12}}>High resolution 1800 × 3200 px, ready for WhatsApp and social media.</p></div>
 </aside></div>
 {pv&&<div className="modal" onClick={()=>setPv(null)}><button className="x"><X/></button><img src={pv} alt="Poster preview"/></div>}</section>)}
