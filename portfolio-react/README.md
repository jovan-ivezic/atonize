# Portfolio Website - Jovan Ivezic

Modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Design** - Clean, professional UI with smooth animations
- **Responsive** - Works perfectly on all devices (mobile, tablet, desktop)
- **Fast** - Built with Vite for lightning-fast development and builds
- **Interactive** - Smooth animations with Framer Motion
- **Portfolio Filtering** - Filter projects by category (WordPress, RTL, Animations, etc.)
- **Contact Section** - Easy way for potential clients to get in touch

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Navigation bar
│   ├── Hero.jsx         # Hero section with intro
│   ├── About.jsx        # About me section
│   ├── Portfolio.jsx    # Portfolio with filtering
│   ├── Skills.jsx       # Skills and technologies
│   ├── Contact.jsx      # Contact information
│   └── Footer.jsx       # Footer
├── data/
│   └── projects.json    # Portfolio projects data
├── App.jsx              # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind

public/
├── images/             # Images for portfolio
├── portfolio/          # Static portfolio projects
└── ...
```

## 🎯 Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.jsx`)
   - Update name, title, and description
   - Change avatar image path
   - Update social media links

2. **About Section** (`src/components/About.jsx`)
   - Update bio text
   - Modify stats (projects, experience, etc.)

3. **Projects** (`src/data/projects.json`)
   - Add/edit/remove projects
   - Update categories, descriptions, and links

4. **Skills** (`src/components/Skills.jsx`)
   - Add/remove skills
   - Update proficiency levels

5. **Contact** (`src/components/Contact.jsx`)
   - Update email, phone, location
   - Change social media links

### Color Scheme

Colors are defined in `tailwind.config.js`. To change the primary color:

```js
colors: {
  primary: {
    // Update these values
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  }
}
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder will contain your production-ready files.

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 📝 License

This project is open source and available for personal use.

## 👤 Author

**Jovan Ivezic**
- GitHub: [@jovan-ivezic](https://github.com/jovan-ivezic)
- Website: [atonize.com](https://www.atonize.com)

---

Made with ❤️ and React
