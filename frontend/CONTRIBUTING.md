# Contributing to IELTS Web

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ielts-web.git
   cd ielts-web
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make** your changes
6. **Test** your changes:
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```
7. **Commit** using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   ```
8. **Push** and open a PR

## 📝 Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Code style (formatting, semicolons) |
| `refactor:` | Code refactor (no feature/fix) |
| `test:` | Adding or updating tests |
| `chore:` | Build process, dependencies |
| `perf:` | Performance improvement |

**Examples:**
```
feat: add speaking practice timer
fix: resolve audio playback issue on Safari
docs: update setup instructions in README
```

## 🎨 Code Style

- **TypeScript** — strict mode enabled, no `any` unless necessary
- **React** — functional components with hooks
- **TailwindCSS** — utility-first, use design tokens from `tailwind.config.js`
- **Prettier** — auto-formatting (run `npm run format`)
- **ESLint** — linting (run `npm run lint`)

### File naming
- Components: `PascalCase.tsx` (e.g., `WritingPage.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useTimer.ts`)
- Utils: `camelCase.ts` (e.g., `helpers.ts`)
- Types: `camelCase.ts` (e.g., `index.ts` in `/types`)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npx vitest
```

- Place test files next to the code: `__tests__/filename.test.ts`
- Use `describe` / `it` blocks
- Aim for edge cases, not just happy paths

## 🔀 Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Ensure lint and type-check pass
4. Fill out the PR template
5. Request a review

## 🐛 Reporting Bugs

Use the [Bug Report template](https://github.com/khoazanay/ielts-web/issues/new?template=bug_report.md) and include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS info
- Screenshots if applicable

## 💡 Suggesting Features

Use the [Feature Request template](https://github.com/khoazanay/ielts-web/issues/new?template=feature_request.md).

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
