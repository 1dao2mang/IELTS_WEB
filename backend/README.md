# IELTS Web - Backend API

Backend API for IELTS practice web application built with Node.js, Express, TypeScript, Prisma, and MySQL.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: MySQL 8
- **Authentication**: JWT
- **Validation**: Zod

## 📁 Project Structure

```
BE_IELTS/
├── src/
│   ├── routes/           # API route definitions
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── middlewares/      # Custom middlewares
│   ├── utils/            # Utilities, helpers, types
│   ├── config/           # Configuration files
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── tests/                # Test files
├── .env.example          # Environment variables template
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following variables:

- `DATABASE_URL`: Your MySQL connection string
- `JWT_ACCESS_SECRET`: Secret key for access tokens
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens

### 3. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Or run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio

# Seed initial data (skills and roles)
# You can manually insert data or create your own seed script
```

### 4. Run Development Server

```bash
npm run dev
```

Server will start at `http://localhost:5000`

### 5. Build for Production

```bash
npm run build
npm start
```

## 📚 API Documentation

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token

### Tests

- `GET /api/tests` - Get all tests
- `GET /api/tests/:testId` - Get test details
- `GET /api/tests/:testId/sections` - Get test sections

### Listening

- `GET /api/listening/sections/:sectionId` - Get listening section
- `POST /api/listening/attempts/start` - Start listening attempt
- `POST /api/listening/attempts/:attemptId/submit` - Submit answers

### Reading

- `GET /api/reading/sections/:sectionId` - Get reading section
- `POST /api/reading/attempts/start` - Start reading attempt
- `POST /api/reading/attempts/:attemptId/submit` - Submit answers

### Writing

- `GET /api/writing/tasks/:taskId` - Get writing task
- `POST /api/writing/submissions/submit` - Submit writing
- `GET /api/writing/submissions/:submissionId/feedback` - Get feedback

### Speaking

- `GET /api/speaking/topics` - Get speaking topics
- `POST /api/speaking/recordings/upload` - Upload recording
- `GET /api/speaking/recordings/:recordingId/feedback` - Get feedback

### Progress

- `GET /api/progress/overview` - Get overall progress
- `GET /api/progress/skills/:skillId` - Get skill-specific progress
- `GET /api/progress/history` - Get attempt history

### Bookmarks

- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks` - Create bookmark
- `DELETE /api/bookmarks/:bookmarkId` - Delete bookmark

### Badges

- `GET /api/badges` - Get all badges
- `GET /api/badges/user` - Get user badges

## 🔑 Features

- ✅ JWT-based authentication
- ✅ Role-based access control (Student/Admin)
- ✅ Complete IELTS practice system (L/R/W/S)
- ✅ Progress tracking and analytics
- ✅ Bookmark system
- ✅ Badge/Achievement system
- ✅ File upload support
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ Activity logging

## 📝 Development

### Naming Conventions

All files use clear, descriptive names to avoid conflicts:

- Controllers: `{feature}-{action}.controller.ts`
- Services: `{feature}-{action}.service.ts`
- Routes: `{feature}.routes.ts`

### Database Models

All Prisma models use PascalCase and map to snake_case database tables:

- `User` → `users`
- `TestAttempt` → `test_attempts`
- `QuestionGroup` → `question_groups`

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 📄 License

ISC
