import logoUrl from '../assets/logo.png';
export const W=900,H=1600,PH={x:318,y:567,w:264,h:324};
const G='#14452c',GOLD='#c49a3c',L1='#5f9a4f',L2='#7fb069';
const FONTS=['800 40px "Playfair Display"','900 40px "Playfair Display"','700 40px "Playfair Display"','600 40px "Playfair Display"','italic 500 30px "Lora"','500 20px "Lora"','600 30px "Lora"','700 30px "Lora"','600 40px "Dancing Script"','700 40px "Dancing Script"'];
let logo=null;
export async function loadAssets(){
 try{await Promise.all(FONTS.map(f=>document.fonts.load(f,'Aa 2026 Join')))}catch(e){}
 if(!logo)logo=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=logoUrl});
}
export function cover(iw,ih,w,h,zoom,ox,oy){const s=Math.max(w/iw,h/ih)*zoom,rx=(iw*s-w)/2,ry=(ih*s-h)/2;
 return{s,rx,ry,dx:(w-iw*s)/2+ox*rx,dy:(h-ih*s)/2+oy*ry}}
const rr=(c,x,y,w,h,r)=>{c.beginPath();c.roundRect(x,y,w,h,r)};
const T=(c,s,x,y,f,col,a='center')=>{c.font=f;c.fillStyle=col;c.textAlign=a;c.textBaseline='alphabetic';c.fillText(s,x,y)};
function leaf(c,x,y,len,ang,col){c.save();c.translate(x,y);c.rotate(ang);c.fillStyle=col;c.beginPath();c.moveTo(0,0);
 c.bezierCurveTo(len*.3,-len*.3,len*.8,-len*.24,len,0);c.bezierCurveTo(len*.8,len*.24,len*.3,len*.3,0,0);c.fill();
 c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1.2;c.beginPath();c.moveTo(0,0);c.lineTo(len*.9,0);c.stroke();c.restore()}
function sprig(c,x,y,ang,len,n=5,sz=1){c.save();c.translate(x,y);c.rotate(ang);c.strokeStyle='#4d7c3f';c.lineWidth=2.5;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(len*.5,-len*.06,len,0);c.stroke();
 for(let i=1;i<=n;i++){const p=len*i/(n+1),l=(34+8*Math.sin(i))*sz;leaf(c,p,0,l,-.75,i%2?L1:L2);leaf(c,p,0,l,.75,i%2?L2:L1)}leaf(c,len,0,40*sz,0,L1);c.restore()}
const orn=(c,cx,y,hw)=>{c.strokeStyle=GOLD;c.lineWidth=1.6;c.beginPath();c.moveTo(cx-hw,y);c.lineTo(cx-18,y);c.moveTo(cx+18,y);c.lineTo(cx+hw,y);c.stroke();
 leaf(c,cx,y+8,18,-Math.PI/2-.5,G);leaf(c,cx,y+8,18,-Math.PI/2+.5,L1)};
export function draw(cv,st,scale=1){
 const{name='',img=null,zoom=1,ox=0,oy=-.3}=st;cv.width=W*scale;cv.height=H*scale;const c=cv.getContext('2d');
 c.scale(scale,scale);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
 const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#fdf9e9');g.addColorStop(1,'#f6efd4');c.fillStyle=g;c.fillRect(0,0,W,H);
 sprig(c,-6,20,.9,95,3,.9);sprig(c,W+6,40,Math.PI-.9,90,3,.9);sprig(c,-10,1420,-.6,150,4,1.2);sprig(c,W+10,1440,Math.PI+.6,130,4,1.1);
 if(logo)c.drawImage(logo,70,25,158,137);
 T(c,'Government Yoga & Naturopathy',448,56,'700 28px "Playfair Display"',G);T(c,'College and Hospital',448,86,'700 28px "Playfair Display"',G);
 T(c,'Uttur/Bahirewadi, Tal. Ajara, Dist. Kolhapur, Maharashtra',448,115,'500 15px "Lora"',G);
 leaf(c,708,62,30,-1.9,GOLD);leaf(c,708,62,30,-1.2,'#d8b45a');
 T(c,'9',770,78,'800 54px "Playfair Display"',G,'right');T(c,'th',796,52,'700 22px "Playfair Display"',G,'right');
 T(c,'NATIONAL',768,113,'700 18px "Lora"',G);T(c,'NATUROPATHY DAY',768,134,'700 18px "Lora"',G);T(c,'2026',768,162,'700 26px "Playfair Display"',GOLD);
 orn(c,448,157,205);
 T(c,'Join Me',448,262,'700 100px "Dancing Script"',G);T(c,'at',448,298,'italic 500 30px "Lora"',G);
 c.font='900 118px "Playfair Display"';const a=c.measureText('SPARSH').width;c.font='800 98px "Playfair Display"';const b=c.measureText('2026').width,x0=(W-(a+b+14))/2;
 T(c,'SPARSH',x0,405,'900 118px "Playfair Display"',G,'left');T(c,'2026',x0+a+14,405,'800 98px "Playfair Display"',G,'left');
 T(c,'National Hands-on Training Workshop',448,452,'700 35px "Playfair Display"',G);T(c,'on',448,474,'600 18px "Lora"',G);
 c.fillStyle=GOLD;c.beginPath();c.moveTo(72,482);c.lineTo(108,482);c.lineTo(96,509);c.lineTo(108,536);c.lineTo(72,536);c.lineTo(84,509);c.fill();
 c.beginPath();c.moveTo(828,482);c.lineTo(792,482);c.lineTo(804,509);c.lineTo(792,536);c.lineTo(828,536);c.lineTo(816,509);c.fill();
 c.fillStyle=G;c.fillRect(92,482,716,54);T(c,'Integrative & Multimodal Pain Management',448,520,'700 31px "Playfair Display"','#fff');
 sprig(c,150,905,-Math.PI/2-.2,170,4,.9);sprig(c,750,905,-Math.PI/2+.2,170,4,.9);
 c.fillStyle='#fffdf3';rr(c,303,552,294,354,24);c.fill();c.strokeStyle=GOLD;c.lineWidth=3;c.stroke();
 c.fillStyle='#e3e8da';rr(c,PH.x,PH.y,PH.w,PH.h,18);c.fill();
 if(img){c.save();rr(c,PH.x,PH.y,PH.w,PH.h,18);c.clip();const k=cover(img.width,img.height,PH.w,PH.h,zoom,ox,oy);
  c.drawImage(img,PH.x+k.dx,PH.y+k.dy,img.width*k.s,img.height*k.s);c.restore()}
 else{c.strokeStyle='#2f7a55';c.lineWidth=5;c.lineCap='round';c.beginPath();c.arc(450,690,19,0,7);c.stroke();c.beginPath();c.arc(450,748,31,Math.PI,0);c.stroke();
  T(c,'UPLOAD YOUR',450,805,'600 24px "Lora"','#3d8a63');T(c,'PHOTO',450,835,'600 24px "Lora"','#3d8a63');c.lineCap='butt'}
 if(name.trim()){let n=name.trim(),fs=36;const F=s=>`700 ${s}px "Playfair Display"`;c.font=F(fs);while(c.measureText(n).width>600&&fs>18){fs--;c.font=F(fs)}
  if(c.measureText(n).width>600){while(c.measureText(n+'…').width>600)n=n.slice(0,-1);n+='…'}T(c,n,449,942,F(fs),G)}
 T(c,'I Invite You to Attend',449,1010,'700 66px "Dancing Script"',G);
 T(c,'SPARSH 2026',449,1100,'900 82px "Playfair Display"',G);
 T(c,'Let’s Learn  •  Experience  •  Practise  •  Integrate',449,1142,'italic 500 31px "Lora"',G);
 orn(c,449,1168,300);
 c.strokeStyle=G;c.lineWidth=3;rr(c,206,1190,44,40,6);c.stroke();c.fillStyle=G;c.fillRect(206,1190,44,12);
 for(let i=0;i<9;i++)c.fillRect(214+(i%3)*12,1208+Math.floor(i/3)*7,7,4);
 T(c,'18–20 NOVEMBER 2026',478,1222,'700 36px "Lora"',G);
 orn(c,449,1250,250);T(c,'9th National Naturopathy Day Celebration',449,1282,'600 26px "Lora"','#6b4f1d');
 c.fillStyle=G;c.beginPath();c.arc(176,1330,15,Math.PI,0);c.lineTo(176,1365);c.closePath();c.fill();c.fillStyle='#fdf9e9';c.beginPath();c.arc(176,1330,6,0,7);c.fill();
 T(c,'Government Yoga & Naturopathy College and Hospital',206,1342,'700 22px "Lora"',G,'left');
 T(c,'Uttur/Bahirewadi, Tal. Ajara, Dist. Kolhapur, Maharashtra',206,1366,'500 20px "Lora"',G,'left');
 c.strokeStyle=GOLD;c.lineWidth=1.5;c.beginPath();c.moveTo(225,1390);c.lineTo(673,1390);c.stroke();
 T(c,'Be a Part of the Learning.',449,1440,'600 38px "Dancing Script"',G);T(c,'Be a Part of the Change.',449,1482,'600 38px "Dancing Script"',G);
 c.fillStyle=G;c.beginPath();c.moveTo(0,1548);c.bezierCurveTo(250,1503,450,1573,900,1533);c.lineTo(900,1600);c.lineTo(0,1600);c.fill();
 c.strokeStyle=GOLD;c.lineWidth=3;c.beginPath();c.moveTo(0,1548);c.bezierCurveTo(250,1503,450,1573,900,1533);c.stroke();
}
