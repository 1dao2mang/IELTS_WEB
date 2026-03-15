# IELTS Web — Practice Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern, open-source IELTS practice platform built with React, TypeScript, and TailwindCSS. Practice all four IELTS skills — Listening, Reading, Writing, and Speaking — in one beautiful interface.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎧 **Listening** | Full tests with audio playback, MCQ, fill-in-the-blank, matching |
| 📖 **Reading** | Academic & General Training passages with real-time scoring |
| ✍️ **Writing** | Task 1 & 2 with AI evaluation and band score feedback |
| 🎤 **Speaking** | Audio recording with pronunciation and fluency feedback |
| 📊 **Progress** | Dashboard with stats, history, and skill-level analytics |
| 🛡️ **Error Handling** | ErrorBoundary, 404 page, loading states |

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 5](https://vitejs.dev/) | Build tool & dev server |
| [TailwindCSS 3](https://tailwindcss.com/) | Utility-first CSS |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [React Router 6](https://reactrouter.com/) | Client-side routing |
| [Lucide React](https://lucide.dev/) | Icons |

## 📁 Project Structure

```
src/
├── assets/          # Images, SVGs, static files
├── components/      # Reusable UI components (Button, Card, Navbar…)
├── data/            # Static test data and question banks
├── hooks/           # Custom React hooks (useTimer, useAudio…)
├── layouts/         # Page layouts (MainLayout)
├── pages/           # Route-level page components
├── services/        # API service layer (native fetch)
├── store/           # Zustand stores (progress, auth)
├── styles/          # Global CSS and Tailwind config
├── types/           # TypeScript type definitions
└── utils/           # Helper functions and utilities
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) 9+ (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/khoazanay/ielts-web.git
cd ielts-web

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values

# 4. Start development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm test` | Run unit tests with Vitest |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run type-check` | TypeScript type checking only |

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/khoazanay/ielts-web)

Configuration is included in `vercel.json`.

### Netlify

Configuration is included in `netlify.toml`. Just connect your repo.

### Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build manually
docker build -t ielts-web .
docker run -p 8080:80 ielts-web
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.ieltsweb.com` |

> All client-side env vars must be prefixed with `VITE_`.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for IELTS learners worldwide
