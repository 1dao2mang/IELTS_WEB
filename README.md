# IELTS Web — Practice Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern, client-side IELTS practice application built with **React 18**, **TypeScript**, and **Tailwind CSS**. Practice all four IELTS skills — **Listening**, **Reading**, **Writing**, and **Speaking** — in a single, fast, responsive interface.

> **Note:** This is a static frontend demo. All exercises are served from bundled mock data — there is no backend server, database, or AI evaluation. See [Limitations](#-limitations) for details.

---

## ✨ Features

- **Four IELTS Skills** — Dedicated practice pages for Listening, Reading, Writing, and Speaking
- **Interactive Exercises** — Multiple-choice, fill-in-the-blank, and free-form writing with client-side scoring
- **Timed Practice** — Configurable countdown timer with auto-submission on expiry
- **Progress Tracking** — Completed exercises and scores saved in `localStorage` via Zustand
- **Lazy-Loaded Routes** — Every page is code-split with `React.lazy` for fast initial loads
- **Responsive Design** — Mobile-first layout that works across phone, tablet, and desktop
- **Error Boundary** — Global error boundary catches rendering failures gracefully
- **Keyboard Accessible** — Exercise overlay supports `Escape` to close; scroll lock while active
- **Multi-Platform Deploy** — Ready-made configs for Vercel, Netlify, and Docker (nginx)

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.2 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.2 | Static type checking |
| [Vite](https://vitejs.dev/) | 5.0 | Dev server & build tooling |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3 | Utility-first styling |
| [React Router](https://reactrouter.com/) | 6.20 | Client-side routing |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4.4 | Lightweight state management |
| [Lucide React](https://lucide.dev/) | 0.294 | Icon library |
| [Vitest](https://vitest.dev/) | 1.1 | Unit testing framework |

## 📁 Project Structure

```
ielts-web/
├── public/                  # Static assets served as-is
├── src/
│   ├── components/          # Shared UI components
│   │   ├── ErrorBoundary    #   Global error boundary
│   │   ├── ExerciseView     #   Full exercise overlay (timer, scoring, answers)
│   │   ├── Footer           #   Site-wide footer
│   │   ├── Input            #   Reusable form input
│   │   ├── LoadingSpinner   #   Suspense fallback spinner
│   │   ├── Navbar           #   Top navigation bar
│   │   └── ScrollToTop      #   Scroll reset on route change
│   ├── data/
│   │   └── mockData.ts      # All exercise content (listening, reading, writing, speaking)
│   ├── hooks/               # Custom React hooks (placeholder for future use)
│   ├── layouts/
│   │   └── MainLayout.tsx   # Navbar + <Outlet> + Footer wrapper
│   ├── pages/               # Route-level page components
│   │   ├── HomePage         #   Landing page with skill overview cards
│   │   ├── ListeningPage    #   Listening exercises
│   │   ├── ReadingPage      #   Reading passages & questions
│   │   ├── WritingPage      #   Writing task prompts
│   │   ├── SpeakingPage     #   Speaking cue cards
│   │   ├── PracticePage     #   Combined practice hub
│   │   ├── AboutPage        #   About the platform
│   │   ├── ContactPage      #   Contact form (UI only)
│   │   └── NotFoundPage     #   404 fallback
│   ├── services/            # API service layer (placeholder for future backend)
│   ├── store/
│   │   └── progressStore.ts # Zustand store — exercise progress in localStorage
│   ├── styles/              # Global CSS, Tailwind base styles
│   ├── types/
│   │   └── index.ts         # Shared TypeScript interfaces & types
│   ├── utils/
│   │   ├── helpers.ts       # formatDate, formatTime, calculateScore, debounce, etc.
│   │   └── __tests__/       # Unit tests for helpers
│   ├── App.tsx              # Route definitions with lazy-loaded pages
│   └── main.tsx             # React DOM entry point
├── .env.example             # Environment variable template
├── Dockerfile               # Multi-stage build (Node → nginx)
├── docker-compose.yml       # One-command Docker deployment
├── nginx.conf               # nginx config with SPA fallback & CSP headers
├── netlify.toml             # Netlify build & redirect config
├── vercel.json              # Vercel SPA rewrite rules
├── tailwind.config.js       # Tailwind theme & customizations
├── vite.config.ts           # Vite plugins, path aliases, chunk splitting
├── vitest.config.ts         # Test runner configuration
└── tsconfig.json            # TypeScript compiler options
```

## 📋 Prerequisites

- **Node.js** 18 or later
- **npm** 9+ (included with Node.js)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/khoazanay/ielts-web.git
cd ielts-web

# Install dependencies
npm install

# Copy the environment template
cp .env.example .env

# Start the dev server
npm run dev
```

The app opens automatically at **http://localhost:3000**.

## ⚙️ Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL (placeholder — no backend exists) | `https://api.ieltsweb.com` |

All client-side variables must be prefixed with `VITE_`. See the [Vite env docs](https://vitejs.dev/guide/env-and-mode) for details.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Type-check with `tsc` then produce a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on all `.ts` / `.tsx` files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format all source files with Prettier |
| `npm run format:check` | Check formatting without writing changes |
| `npm run type-check` | Run TypeScript type checking only (no emit) |
| `npm test` | Run unit tests once with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with V8 coverage report |

## 🌐 Deployment

The build output is a static `dist/` folder. Deploy it to any static hosting provider.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/khoazanay/ielts-web)

SPA rewrites are configured in `vercel.json`.

### Netlify

Connect your repository — build settings are in `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

### Docker

```bash
# Option 1 — Docker Compose (recommended)
docker compose up --build
# → Runs on http://localhost:8080

# Option 2 — Manual build
docker build -t ielts-web .
docker run -p 8080:80 ielts-web
```

The Dockerfile uses a multi-stage build: **Node 20 Alpine** compiles the app, then the `dist/` output is served by **nginx Alpine** with the custom `nginx.conf`.

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

Tests are written with [Vitest](https://vitest.dev/) and located in `src/utils/__tests__/`. The test environment is `jsdom` with `@testing-library/react` available for component tests.

## ⚠️ Limitations

This project is a **client-only static demo**. It does not include:

- **No backend server** — all exercise content is bundled mock data in `src/data/mockData.ts`
- **No database** — progress is stored in `localStorage` and lost when browser data is cleared
- **No AI evaluation** — Writing and Speaking exercises display prompts but do not score responses
- **No audio** — Listening exercises show the UI but do not play real audio files
- **No server-side rendering** — pure client-side SPA
- **No production authentication** — no auth system is implemented
- **Minimal test coverage** — unit tests cover utility helpers only; no component or e2e tests

### Roadmap to Production

| Capability | What's Needed |
|---|---|
| Real authentication | Backend with session management, httpOnly cookies, CSRF protection |
| Exercise database | PostgreSQL + REST API replacing static mock imports |
| AI writing evaluation | Backend integration with an LLM API for band score feedback |
| Speaking practice | MediaRecorder API, audio upload, and pronunciation analysis service |
| Progress sync | Database-backed user progress with API endpoints |
| Full test suite | Component tests, integration tests, and Playwright e2e tests |
| Observability | Error tracking (Sentry), logging, and performance monitoring |

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/my-feature`
3. Commit with [conventional commits](https://www.conventionalcommits.org/) — `git commit -m 'feat: add my feature'`
4. Push — `git push origin feature/my-feature`
5. Open a Pull Request

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

MIT — see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for IELTS learners worldwide
