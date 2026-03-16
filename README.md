# IELTS Web — Practice Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A client-side IELTS practice demo built with React, TypeScript, and TailwindCSS. Practice all four IELTS skills — Listening, Reading, Writing, and Speaking — in one interface.

> **⚠️ This is a static frontend demo.** There is no backend, no database, no server-side auth, and no AI evaluation. All exercises are served from bundled mock data. See [Status & Limitations](#-status--limitations) below.

## ✨ What It Actually Does

| Feature | What's Implemented | What's Not |
|---------|-------------------|------------|
| 🎧 **Listening** | Audio playback UI, MCQ & fill-in-the-blank forms, client-side scoring | No real audio files, no server-stored results |
| 📖 **Reading** | Passage display, timed practice, client-side scoring | Exercises are static mock data, not from a database |
| ✍️ **Writing** | Task prompts, text input with word counter, timer | **No AI evaluation**, no band score feedback, no server submission |
| 🎤 **Speaking** | Cue card display, timer | **No audio recording**, no pronunciation feedback, no fluency analysis |
| 📊 **Progress** | Local-only progress saved in `localStorage` | No cross-device sync, no analytics, data lost on browser clear |
| 🔐 **Auth** | Demo login flow (mock tokens in `localStorage`) | **Not production auth** — no server verification, no httpOnly cookies |
| 📬 **Contact** | Form UI with validation | **Does not send messages** — no backend endpoint connected |

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

## ⚠️ Status & Limitations

This is a **Vite client-only SPA** deployed as a static build (Vercel/Netlify/Docker+Nginx). It is **not** a Next.js application, and has:

- **No backend server** — all data is bundled mock JSON
- **No database** — progress is stored in `localStorage` only
- **No real authentication** — tokens are mock strings in `localStorage`
- **No AI/ML features** — writing evaluation and speaking analysis are not implemented
- **No server-side rendering** — pure client-side React SPA
- **Minimal test coverage** — one utility test file; no integration/e2e tests

### What's Needed to Make This Production-Ready

| Capability | Requirement |
|-----------|-------------|
| Real auth | Server-issued httpOnly cookies, session rotation, CSRF protection |
| Exercise data | PostgreSQL + API server replacing static mock imports |
| AI evaluation | Backend integration with OpenAI/Claude for writing scoring |
| Speaking practice | MediaRecorder API + audio processing service |
| Progress sync | Database-backed user progress with API endpoints |
| Abuse prevention | Rate limiting, CAPTCHA (e.g., Cloudflare Turnstile), honeypots |
| Observability | Sentry or equivalent error tracking with release tags |
| Test coverage | Integration, component, and e2e tests across all flows |

## 📁 Project Structure

```
src/
├── assets/          # Images, SVGs, static files
├── components/      # Reusable UI components (Button, Card, Navbar…)
├── data/            # Static mock exercise data (bundled into client)
├── hooks/           # Custom React hooks (useTimer, useAudio…)
├── layouts/         # Page layouts (MainLayout)
├── pages/           # Route-level page components
├── services/        # API service layer (scaffolding — no real backend)
├── store/           # Zustand stores (progress, auth — localStorage only)
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

This is a static SPA — deploy the `dist/` output to any static host.

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
| `VITE_API_URL` | Backend API URL (no backend exists yet) | `https://api.ieltsweb.com` |

> All client-side env vars must be prefixed with `VITE_`. The default value is a placeholder — no API server exists at that URL.

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
