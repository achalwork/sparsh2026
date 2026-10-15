// Download + save-to-database helpers. Work in Claude artifact preview AND in a normal deployment.
export async function saveFile(blob,filename){
 try{const d=window.claude&&await window.claude.use('downloads');
  if(d){await d.save({filename,data:blob});return}}catch(e){if(e&&e.code==='declined')return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
async function firebaseSave(rec){
 const e=import.meta.env;if(!e.VITE_FIREBASE_PROJECT_ID)return false;
 const{initializeApp,getApps}=await import('firebase/app');
 const{getFirestore,collection,addDoc,serverTimestamp}=await import('firebase/firestore');
 const app=getApps()[0]||initializeApp({apiKey:e.VITE_FIREBASE_API_KEY,authDomain:e.VITE_FIREBASE_PROJECT_ID+'.firebaseapp.com',projectId:e.VITE_FIREBASE_PROJECT_ID,appId:e.VITE_FIREBASE_APP_ID});
 await addDoc(collection(getFirestore(app),'submissions'),{...rec,createdAt:serverTimestamp()});return true}
// Stores {name, photo(JPEG dataURL), crop}. Preview: artifact db. Deployed: POST to VITE_SUBMIT_URL (your backend), if set.
export async function saveSubmission(rec){
 try{const db=window.claude&&await window.claude.use('db');
  if(db){await db.collection('submissions').add({...rec,createdAt:Date.now()});return true}}catch(e){console.warn(e)}
 try{if(await firebaseSave(rec))return true}catch(e){console.warn('Firebase save failed',e)}
 const u=import.meta.env.VITE_SUBMIT_URL||'/api/submissions';
 if(u){try{await fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...rec,createdAt:Date.now()})});return true}catch(e){console.warn(e)}}
 return false}
