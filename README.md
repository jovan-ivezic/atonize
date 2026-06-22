# Portfolio React - Jovan Ivezić

Modern portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Development

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Server će biti dostupan na `http://localhost:5173` (ili drugom portu ako je 5173 zauzet).

## 📦 Production Build

### Build production verzije
```bash
npm run build
```

Build fajlovi će biti u `dist/` folderu.

### Preview production build-a lokalno
```bash
npx serve dist -p 3000
```

Otvori `http://localhost:3000` da vidiš production verziju.

## 🗜️ Zipovanje za cPanel upload

### Kreiranje ZIP arhive za deployment
```bash
cd dist
zip -r ../portfolio-production.zip .
cd ..
```

Ili u jednoj komandi:
```bash
cd dist && zip -r ../portfolio-production.zip . && cd ..
```

Dobićeš `portfolio-production.zip` fajl spreman za upload na cPanel.

## 📤 Deployment

### Brzi deployment sa rsync (PREPORUČENO) ⚡

Ovaj način prenosi samo izmenjene fajlove i je mnogo brži od prenosa celog foldera.

**Prvi put - Setup:**

1. **Kreiraj konfiguraciju:**
   ```bash
   cp deploy.config.sh.example deploy.config.sh
   ```

2. **Uredi `deploy.config.sh` sa svojim podacima:**
   ```bash
   # Otvori deploy.config.sh i popuni:
   # - DEPLOY_HOST (npr. "atonize.com")
   # - DEPLOY_USER (tvoj SSH username)
   # - DEPLOY_PATH (putanja do public_html, npr. "/home/username/public_html")
   ```

3. **Postavi SSH ključeve (PREPORUČENO - bez passworda):**
   ```bash
   ./setup-ssh.sh
   ```
   
   Ova skripta će:
   - Generisati SSH key par
   - Prikazati PUBLIC KEY koji treba da dodaš na cPanel
   - Automatski ažurirati `deploy.config.sh`
   
   **Kako dodati key na cPanel:**
   - Uloguj se na cPanel → SSH Access → Manage SSH Keys
   - Klikni "Import Key" ili "Authorize"
   - Nalepi PUBLIC KEY koji je skripta prikazala
   - Klikni "Import" ili "Authorize"
   
   **Alternativno** - ako već imaš SSH key:
   ```bash
   # Prikaži svoj postojeći public key
   cat ~/.ssh/id_rsa.pub
   # Kopiraj output i dodaj na cPanel
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```
   
   Ili direktno:
   ```bash
   ./deploy.sh
   ```

**Šta radi skripta:**
- ✅ Build-uje projekat (`npm run build`)
- ✅ Sinhronizuje samo `dist/` folder na server
- ✅ Prenosi samo izmenjene fajlove (brzo!)
- ✅ Briše fajlove sa servera koji više ne postoje lokalno
- ✅ Ne prenosi `node_modules` ili source fajlove
- ✅ **Ne prenosi `portfolio/` folder po defaultu** (ogroman, retko se menja)

**Prednosti:**
- 🚀 Brže - prenosi samo izmenjene fajlove
- 💾 Manje podataka - samo `dist/` folder bez portfolio (obično < 10MB)
- 🔄 Automatski - jedna komanda za sve

**Portfolio folder:**
- Po defaultu se **ne prenosi** jer je ogroman i retko se menja
- Ako treba da ažuriraš portfolio folder:
  ```bash
  npm run deploy:portfolio
  ```
- Ili uključi ga u normalnom deploy-u:
  ```bash
  # U deploy.config.sh promeni:
  export DEPLOY_INCLUDE_PORTFOLIO="true"
  ```

### Alternativni način - ZIP upload na cPanel

Ako nemaš SSH pristup ili preferiraš cPanel:

1. **Build produkciju:**
   ```bash
   npm run build
   ```

2. **Kreiraj ZIP:**
   ```bash
   cd dist && zip -r ../portfolio-production.zip . && cd ..
   ```

3. **Upload na cPanel:**
   - Uloguj se na cPanel
   - Idi na File Manager
   - Navigiraj do `public_html/` (ili `www/`)
   - Upload `portfolio-production.zip`
   - Ekstraktuj ZIP fajl
   - Obriši ZIP nakon ekstrakcije

4. **Otvori sajt:**
   - `https://atonize.com`

## 🛠️ Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation (if needed)

## 📁 Project Structure

```
portfolio-react/
├── public/              # Static assets
│   ├── portfolio/       # Portfolio project files
│   └── images/          # Images
├── src/
│   ├── components/      # React components
│   ├── data/           # Project data (JSON)
│   ├── App.jsx         # Main app component
│   └── index.css       # Global styles
├── dist/               # Production build (generated)
└── package.json
```

## 📝 Notes

- `.htaccess` fajl za client-side routing se automatski kreira tokom build-a
- Sve statične portfolio projekti se nalaze u `public/portfolio/`
- Portfolio data se čuva u `src/data/projects.json`

## 🔧 Quick Commands Reference

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npx serve dist -p 3000

# Postavi SSH ključeve (prvi put)
./setup-ssh.sh

# Deploy na produkciju (brzo sa rsync, bez portfolio foldera)
npm run deploy

# Deploy samo portfolio foldera (kada treba da se ažurira)
npm run deploy:portfolio

# Create ZIP for upload (alternativni način)
cd dist && zip -r ../portfolio-production.zip . && cd ..

# All in one (build + zip)
npm run build && cd dist && zip -r ../portfolio-production.zip . && cd ..
```

---

**Autor:** Jovan Ivezić  
**Website:** https://atonize.com  
**GitHub:** https://github.com/jovan-ivezic
