# IELTS Web - Comprehensive IELTS Learning Platform

A modern, full-featured web application for IELTS test preparation, built with React, TypeScript, and Vite. This platform provides comprehensive practice materials for all four IELTS skills: Listening, Reading, Writing, and Speaking.

![IELTS Web](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)

## ✨ Features

### Core Functionality
- 🎧 **Listening Practice** - Audio exercises with various accents and topics
- 📖 **Reading Practice** - Academic and general training passages with comprehensive questions
- ✍️ **Writing Practice** - Task 1 and Task 2 exercises with writing interface
- 🗣️ **Speaking Practice** - Sample questions and mock interview preparation
- 📊 **Progress Tracking** - Monitor your performance across all skills
- 🎯 **Difficulty Levels** - Beginner, Intermediate, and Advanced exercises

### Technical Features
- ⚡ Fast and responsive UI with Vite
- 🎨 Beautiful design with TailwindCSS
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔄 State management with Zustand
- 🛣️ Client-side routing with React Router v6
- 🎣 Custom hooks for common functionality
- 🔧 Type-safe development with TypeScript
- 📦 Modular architecture with clean separation of concerns

## 📁 Project Structure

```
IELTS_WEB/
├── public/                  # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ListeningPage.tsx
│   │   ├── ReadingPage.tsx
│   │   ├── WritingPage.tsx
│   │   ├── SpeakingPage.tsx
│   │   ├── PracticePage.tsx
│   │   ├── ContactPage.tsx
│   │   └── index.ts
│   ├── layouts/            # Layout components
│   │   ├── MainLayout.tsx
│   │   └── index.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useFetch.ts
│   │   ├── useAudioPlayer.ts
│   │   ├── useTimer.ts
│   │   └── index.ts
│   ├── services/           # API and business logic
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── exerciseService.ts
│   │   └── index.ts
│   ├── store/              # Zustand state management
│   │   ├── userStore.ts
│   │   ├── progressStore.ts
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── data/               # Mock/dummy data
│   │   ├── exercises.json
│   │   └── ieltsInfo.json
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Type definitions
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── tailwind.config.js      # TailwindCSS config
├── postcss.config.js       # PostCSS config
├── .eslintrc.cjs           # ESLint config
├── .prettierrc             # Prettier config
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd IELTS_WEB
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and configure your environment variables.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🧪 Code Quality

### Linting

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

### Formatting

Format code with Prettier:

```bash
npm run format
```

## 📦 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

Or use the [Vercel Dashboard](https://vercel.com) to import your repository.

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

Or use the [Netlify Dashboard](https://netlify.com) to import your repository.

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

- `VITE_API_URL` - Your API endpoint URL

## 🎯 Available Pages

- **Home** (`/`) - Landing page with skill overview
- **About** (`/about`) - Information about the platform
- **Listening** (`/listening`) - Listening practice exercises
- **Reading** (`/reading`) - Reading comprehension practice
- **Writing** (`/writing`) - Writing task exercises
- **Speaking** (`/speaking`) - Speaking practice and tips
- **Practice** (`/practice`) - Comprehensive practice dashboard
- **Contact** (`/contact`) - Contact form and information

## 🔧 Technology Stack

- **Frontend Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Language:** TypeScript 5.2
- **Styling:** TailwindCSS 3.3
- **Routing:** React Router v6
- **State Management:** Zustand 4.4
- **Icons:** Lucide React
- **Code Quality:** ESLint + Prettier

## 🎨 UI Components

The project includes reusable, accessible components:

- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Input** - Form input with label, error, and helper text
- **Card** - Flexible card component with optional header and footer
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Site footer with links and contact info

## 📚 Custom Hooks

- **useFetch** - Data fetching with loading and error states
- **useAudioPlayer** - Audio playback control for listening exercises
- **useTimer** - Countdown timer for timed exercises

## 🔐 Services

- **API Service** - Generic HTTP client for API calls
- **Auth Service** - Authentication and user management
- **Exercise Service** - IELTS exercise data and submission

## 🌟 Future Enhancements

### Planned Features
1. **User Authentication**
   - User registration and login
   - Profile management
   - Progress persistence across devices

2. **Advanced Practice Features**
   - Real-time scoring for reading/listening
   - AI-powered writing feedback
   - Speaking voice recording and analysis
   - Adaptive difficulty based on performance

3. **Content Expansion**
   - More practice exercises for each skill
   - Full-length mock tests
   - Video tutorials and explanations
   - Vocabulary and grammar sections

4. **Backend Integration**
   - REST API for exercise management
   - Database for user progress
   - Real-time collaboration features
   - Admin dashboard for content management

5. **Social Features**
   - Study groups and forums
   - Leaderboards and achievements
   - Peer review for writing tasks
   - Live speaking practice partners

6. **Mobile App**
   - React Native mobile application
   - Offline practice mode
   - Push notifications for study reminders

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- IELTS content guidelines from Cambridge Assessment English
- Design inspiration from modern learning platforms
- Community feedback and suggestions

## 📞 Support

For support, email support@ieltsweb.com or open an issue in the repository.

---

**Happy Learning! 🎓**
IELTS_WEB is a modern IELTS practice platform focusing on all four core skills: Listening, Reading, Writing, and Speaking. Built with React + Vite + TypeScript, the project provides a fast, scalable, and interactive learning experience for IELTS learners.
