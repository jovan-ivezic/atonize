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

## 📤 Deployment na cPanel

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

# Create ZIP for upload
cd dist && zip -r ../portfolio-production.zip . && cd ..

# All in one (build + zip)
npm run build && cd dist && zip -r ../portfolio-production.zip . && cd ..
```

---

**Autor:** Jovan Ivezić  
**Website:** https://atonize.com  
**GitHub:** https://github.com/jovan-ivezic
