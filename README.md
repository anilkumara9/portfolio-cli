# Portfolio CLI

Developer portfolio built with React + TypeScript and Vite. Clean, fast, responsive, with dark mode, search, resume export, and charts. This README covers how to run, build, and deploy, plus what’s inside.

## ✨ Overview
- __Purpose__: Showcase developer profile, projects, skills, and resume with a clean, modern UI.
- __Framework__: React + TypeScript using Vite.
- __UI__: Tailwind CSS v4 + custom UI components (Radix primitives).
- __Extras__: PDF resume generation, keyboard shortcuts, quick search, particles, charts, dark mode.

## 🚀 Features
- __Sectioned UI__: Home, About, Skills, Projects, Contact.
- __Dark/Light Mode__: Toggle with persistent theme.
- __PDF Resume__: One-click export (`src/utils/pdfGenerator.ts`).
- __Keyboard Shortcuts__: See `src/components/KeyboardShortcuts.tsx`.
- __Quick Search__: Spotlight-style search (`src/components/QuickSearch.tsx`).
- __Charts & Stats__: `chart.js` + `recharts` integrations.
- __Contact Form__: EmailJS integration (`src/components/ContactForm.tsx`).

## 🧱 Tech Stack
- React 19, TypeScript, Vite 6
- Tailwind CSS 4, Radix UI primitives
- Chart.js, Recharts, Framer Motion, tsParticles
- React Hook Form + Zod

See `package.json` for full dependencies.

## 🛠️ Getting Started
Prerequisites: Node.js 18+ and npm (or pnpm/bun if you prefer).

Install dependencies:
```bash
npm install
```

Start dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Lint:
```bash
npm run lint
```

## 📁 Project Structure
```
src/
├─ components/
│  ├─ ui/                      # Radix-based UI primitives
│  ├─ ContactForm.tsx          # EmailJS form
│  ├─ DarkModeToggle.tsx       # Theme switcher
│  ├─ QuickSearch.tsx          # Spotlight search
│  ├─ KeyboardShortcuts.tsx    # Shortcut help modal
│  ├─ GitHubStats.tsx          # Stats/visualizations
│  └─ ...
├─ utils/
│  ├─ pdfGenerator.ts          # PDF export
│  └─ analytics.ts             # Performance tracking
├─ backend/
│  └─ api.ts                   # API helpers (optional hosting)
├─ index.css                   # Global styles
└─ App.tsx / main.tsx          # App entry
```

## 🔐 Environment Variables (if using EmailJS or S3)
Create a `.env` (or use your hosting provider’s secrets):
```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...

# Optional if you wire S3 uploads
VITE_AWS_REGION=...
VITE_AWS_S3_BUCKET=...
```

Ensure you never commit real secrets.

## 🌐 Deployment
- __Static hosting__: Output is in `dist/` (Vercel, Netlify, GitHub Pages).
- Build with `npm run build`, then deploy `dist/`.
- Service worker in `public/sw.js` is included for PWA behavior if enabled by host settings.

## 🔗 Links
- Repo: https://github.com/anilkumara9/portfolio-cli
- Live (add later): your-deployment-url

## 🧭 Roadmap
- Add project screenshots/GIFs to README
- Add CI/CD badge and deployment link
- Optional: Hook up analytics and error tracking

## 🤝 Contributing
PRs and issues are welcome. For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License
MIT