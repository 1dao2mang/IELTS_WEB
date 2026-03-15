# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-03-15

### Fixed
- Memory leak in `useAudioPlayer` — `canplaythrough` listener was never removed on cleanup
- ESLint `lint`/`lint:fix` scripts failed silently on Windows due to `.ext` glob syntax
- Dead favicon link (`vite.svg`) replaced with custom IELTS favicon

### Changed
- Upgraded `@typescript-eslint/*` to v8 (fixes 12 known vulnerabilities)
- Replaced `import path`/`__dirname` with `fileURLToPath` + `import.meta.url` in Vite configs
- Modernized React imports from namespace style to named imports across 9 files
- Removed 10 redundant sub-path aliases from `vite.config.ts` and `tsconfig.json`

### Added
- `.prettierignore` to skip `dist/`, `node_modules/`, and coverage output
- `@types/node` dev dependency for Node.js type declarations
- `keywords`, `bugs`, and `homepage` fields in `package.json`

## [1.0.0] - 2025-03-15

### Added
- Listening practice with audio playback, MCQ, fill-in-the-blank, and matching
- Reading practice with Academic and General Training passages
- Writing practice with Task 1 & Task 2 AI evaluation
- Speaking practice with audio recording and feedback
- Progress tracking dashboard with statistics
- React ErrorBoundary with user-friendly fallback
- 404 Not Found page
- Lazy loading for all page routes
- Scroll-to-top on route navigation
- Loading spinner for Suspense fallback
- Contributing guide and Code of Conduct
- GitHub issue and PR templates
- CI/CD workflow with GitHub Actions
- Docker support with multi-stage build
- Vitest unit testing setup with sample tests
