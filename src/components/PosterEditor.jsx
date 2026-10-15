import {useEffect,useRef,useState} from 'react';
import {Upload,ZoomIn,ZoomOut,RotateCcw,Trash2,Check,Pencil,Download} from 'lucide-react';
import {saveFile,saveSubmission} from '../utils/platform';
import {W,PH,draw,loadAssets,cover} from '../utils/posterRenderer';
const D={zoom:1,ox:0,oy:-.3},cl=(v,a,b)=>Math.min(b,Math.max(a,v));
export default function PosterEditor(){
 const cv=useRef(),fi=useRef(),dr=useRef(),sent=useRef();
 const[name,setName]=useState(''),[img,setImg]=useState(null),[v,setV]=useState(D),[ok,setOk]=useState(false),[err,setErr]=useState(''),[locked,setLocked]=useState(false);
 useEffect(()=>{loadAssets().then(()=>setOk(true))},[]);
 useEffect(()=>{ok&&draw(cv.current,{name,img,...v},1.5)},[ok,name,img,v]);
 const file=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
  if(!/^image\/(jpe?g|png|webp)$/.test(f.type)){setErr('Please choose a JPG, PNG or WEBP image.');return}
  setErr('');const i=new Image();i.onload=()=>{setImg(i);setV(D);setLocked(false)};i.src=URL.createObjectURL(f)};
 const editing=img&&!locked;
 const down=e=>{if(editing){dr.current={x:e.clientX,y:e.clientY,v};e.currentTarget.setPointerCapture?.(e.pointerId)}};
 const move=e=>{const d=dr.current;if(!d||!editing)return;const u=W/cv.current.getBoundingClientRect().width,k=cover(img.width,img.height,PH.w,PH.h,d.v.zoom,0,0);
  setV({...d.v,ox:k.rx?cl(d.v.ox+(e.clientX-d.x)*u/k.rx,-1,1):0,oy:k.ry?cl(d.v.oy+(e.clientY-d.y)*u/k.ry,-1,1):0})};
 const pick=e=>{if(img)return;const r=cv.current.getBoundingClientRect(),k=W/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;if(x>303&&x<597&&y>552&&y<906)fi.current.click()};
 const remove=()=>{setImg(null);setV(D);setLocked(false)};
 const rec=()=>{if(!img||!name.trim())return;const k=name.trim()+img.src;if(sent.current===k)return;sent.current=k;
  const t=document.createElement('canvas'),r=Math.min(1,640/Math.max(img.width,img.height));t.width=Math.round(img.width*r);t.height=Math.round(img.height*r);
  t.getContext('2d').drawImage(img,0,0,t.width,t.height);saveSubmission({name:name.trim(),photo:t.toDataURL('image/jpeg',.8),crop:v})};
 const save=async()=>{await loadAssets();const c=document.createElement('canvas');draw(c,{name,img,...v},2);
  const safe=name.trim().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'')||'Student';
  c.toBlob(async b=>{await saveFile(b,`SPARSH-2026-${safe}.png`);rec()},'image/png')};
 return(<section id="poster" className="editor"><h2>Create Your Personalized Invitation</h2>
 <p className="sub">Add your photo and name, and download your own SPARSH 2026 invitation</p>
 <input ref={fi} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={file}/>
 <div className="grid2"><div className="left">
  <p className="hint tap">{!img?'👆 Tap the photo frame to upload, then tap the dotted line to type your name':editing?'Drag the photo to adjust it, then tap Done':'✓ Photo is set'}</p>
  {err&&<p className="err">{err}</p>}
  <div className="wrap">
   <canvas ref={cv} className={editing?'poster grab':img?'poster':'poster pick'} onClick={pick} onPointerDown={down} onPointerMove={move} onPointerUp={()=>dr.current=null} onPointerCancel={()=>dr.current=null}/>
   <input className="nameinp" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Tap here to type your name" aria-label="Student name"/>
  </div>
 </div>
 <aside className="side">
   {editing&&<div className="tools">
    <b className="tt">Adjust your photo</b>
    <div className="zoomrow"><button className="btn" onClick={()=>setV({...v,zoom:cl(v.zoom-.1,1,4)})} aria-label="Zoom out"><ZoomOut size={16}/></button>
    <input type="range" min="1" max="4" step=".01" value={v.zoom} onChange={e=>setV({...v,zoom:+e.target.value})}/>
    <button className="btn" onClick={()=>setV({...v,zoom:cl(v.zoom+.1,1,4)})} aria-label="Zoom in"><ZoomIn size={16}/></button></div>
    <div className="tg3">
     <button className="btn" onClick={()=>fi.current.click()}><Upload size={16}/>Change</button>
     <button className="btn" onClick={()=>setV(D)}><RotateCcw size={16}/>Reset</button>
     <button className="btn" onClick={remove}><Trash2 size={16}/>Remove</button></div>
    <button className="btn solid done" onClick={()=>setLocked(true)}><Check size={18}/>Done</button></div>}
   {img&&locked&&<div className="tools">
    <div className="okmsg"><span className="okdot"><Check size={15}/></span>Photo set</div>
    <div className="tg2">
     <button className="btn" onClick={()=>setLocked(false)}><Pencil size={16}/>Edit Photo</button>
     <button className="btn" onClick={remove}><Trash2 size={16}/>Remove</button></div></div>}
   <button className="btn solid dl" onClick={save}><Download size={18}/>Download My Poster</button>
  </aside></div></section>)}