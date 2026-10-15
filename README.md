# SPARSH 2026 – Student Invitation Poster Generator
React + Vite. Students upload a photo, enter their name, and download a 1800×3200 PNG/JPG poster.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in dist/

## Notes
- `src/utils/posterRenderer.js` draws the poster on a Canvas; the live preview and the export use the same function, so they match.
- Replace `src/assets/professor.jpg` and `src/assets/logo.png` with authorized originals if needed.
- Fonts (Playfair Display, Lora, Dancing Script) load from Google Fonts; self-host in `public/fonts` for offline use.

## Saving student submissions (Firebase Firestore – free)
Every time a student downloads their poster with a photo + name, the app saves `{name, photo (compressed JPEG), crop, createdAt}` to Firestore collection `submissions`.

1. Go to https://console.firebase.google.com → Add project.
2. Build → Firestore Database → Create database (production mode).
3. Firestore → Rules → paste the contents of `firestore.rules` → Publish.
4. Project settings → Your apps → add a Web app (</>) → copy `apiKey`, `projectId`, `appId`.
5. Copy `.env.example` to `.env`, paste the 3 values, then run `npm run build` and deploy `dist/` (Firebase Hosting, Netlify or Vercel; add the same 3 variables there).
6. View entries: Firebase console → Firestore → `submissions`. The `photo` field is a data-URL; paste it in a browser address bar to see the image.

Not using Firebase? Set `VITE_SUBMIT_URL` to your own API and the app will POST the same JSON there.

## MySQL – one server runs website + database API
1. In MySQL run `server/schema.sql` (creates database `sparsh`, table `submissions`).
2. `npm install && npm run build` (project root) → builds `dist/` (already set to call `/api/submissions`).
3. `cd server && cp .env.example .env` → fill DB_HOST, DB_USER, DB_PASSWORD, ADMIN_KEY. Then `npm install && npm start`.
4. Open http://localhost:3001 → website. Students' data: http://localhost:3001/admin?key=YOUR_ADMIN_KEY
5. Deploy the whole project (website + server) on any Node host (company server, Render, Railway). Start command: `cd server && npm install && npm start`. Set the same env vars there.

## Deploy (easiest: Netlify)
1. `npm install` then `npm run build` → creates the `dist/` folder.
2. Go to https://app.netlify.com/drop and drag the `dist/` folder in. You get a public link instantly.
3. To save students' data, set the env vars BEFORE building (`.env`: Firebase values or `VITE_SUBMIT_URL`), then build again and re-upload `dist/`.
4. MySQL server (`server/`) must be hosted separately (Render, Railway, or your company server). Put its public URL in `VITE_SUBMIT_URL`.

## MySQL – one-server setup (site + database together)
1. Run `server/schema.sql` in MySQL.
2. `npm install && npm run build` (project root) → creates `dist/`.
3. `cd server && cp .env.example .env` (fill MySQL details + ADMIN_KEY) → `npm install && npm start`.
4. Open http://localhost:3001 – the website. Students' data goes to MySQL automatically.
5. Admin list: http://localhost:3001/admin?key=YOUR_ADMIN_KEY
Deploy the whole project folder on any server with Node.js + MySQL (company server, VPS, Render/Railway).

## Railway deploy
Push this folder to GitHub → Railway "Deploy from GitHub" → add a MySQL service → set variables (see chat/README). Railway runs `npm install`, `npm run build`, `npm start` automatically.
