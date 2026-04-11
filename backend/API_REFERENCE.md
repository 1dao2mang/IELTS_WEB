# IELTS Web Application - API Reference

**Base URL**: `http://localhost:5000/api`  
**Version**: 1.0.0  
**Last Updated**: 2025-12-19

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Tests](#tests)
- [Speaking Practice](#speaking-practice)
- [Reading Practice](#reading-practice)
- [Listening Practice](#listening-practice)
- [Writing Practice](#writing-practice)
- [User Management](#user-management)
- [Progress Tracking](#progress-tracking)
- [Bookmarks](#bookmarks)
- [Badges](#badges)
- [Admin](#admin)

---

## 🔐 Authentication

All authenticated endpoints require `Authorization: Bearer <token>` header.

### POST `/api/auth/register`
**Description**: Register a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### POST `/api/auth/login`
**Description**: Login to existing account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### POST `/api/auth/forgot-password`
**Description**: Request password reset email.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### POST `/api/auth/reset-password`
**Description**: Reset password with token from email.

**Request Body**:
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### POST `/api/auth/logout` 🔒
**Description**: Logout current session.

**Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### GET `/api/auth/me` 🔒
**Description**: Get current authenticated user info.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "avatar": "https://..."
  }
}
```

---

## 📝 Tests

### GET `/api/tests`
**Description**: Get all available tests.

**Query Parameters**:
- `level` (optional): Filter by difficulty (beginner, intermediate, advanced)
- `source` (optional): Filter by source

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "IELTS Practice Test 1",
      "description": "Full IELTS practice test",
      "level": "intermediate",
      "source": "Cambridge",
      "isActive": true
    }
  ]
}
```

---

### GET `/api/tests/:testId`
**Description**: Get test details by ID.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "IELTS Practice Test 1",
    "description": "Full IELTS practice test",
    "level": "intermediate",
    "sections": [
      {
        "id": 1,
        "skillId": 1,
        "skillName": "Listening",
        "questionCount": 40
      }
    ]
  }
}
```

---

### GET `/api/tests/:testId/sections`
**Description**: Get all sections for a test.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "skillId": 1,
      "skillName": "Listening",
      "sectionNumber": 1,
      "title": "Section 1",
      "instructions": "You will hear...",
      "questionCount": 10
    }
  ]
}
```

---

### GET `/api/tests/sections/:sectionId/questions`
**Description**: Get all questions for a section.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "questionNumber": 1,
      "questionType": "multiple-choice",
      "questionText": "What is...",
      "options": ["A", "B", "C", "D"],
      "points": 1
    }
  ]
}
```

---

### POST `/api/tests/:testId/start` 🔒
**Description**: Start a new test attempt.

**Response** (201):
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "testId": 1,
    "startedAt": "2025-12-19T00:00:00Z",
    "status": "in_progress"
  }
}
```

---

### POST `/api/tests/attempts/:attemptId/answers` 🔒
**Description**: Submit an answer for a question.

**Request Body**:
```json
{
  "questionId": 1,
  "answer": "A"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Answer saved"
}
```

---

### POST `/api/tests/attempts/:attemptId/submit` 🔒
**Description**: Submit test attempt for grading.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "score": 35,
    "totalQuestions": 40,
    "bandScore": 7.0,
    "completedAt": "2025-12-19T00:30:00Z"
  }
}
```

---

### GET `/api/tests/attempts/:attemptId` 🔒
**Description**: Get attempt results.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "testId": 1,
    "score": 35,
    "totalQuestions": 40,
    "bandScore": 7.0,
    "answers": [
      {
        "questionId": 1,
        "userAnswer": "A",
        "correctAnswer": "A",
        "isCorrect": true
      }
    ]
  }
}
```

---

## 🎤 Speaking Practice

### GET `/api/speaking/topics`
**Description**: Get all speaking topics.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "part": 1,
      "topicTitle": "Hometown",
      "description": "Questions about your hometown",
      "promptCount": 5
    }
  ]
}
```

---

### GET `/api/speaking/topics/:topicId/prompts`
**Description**: Get prompts for a topic.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "questionIndex": 1,
      "questionText": "Where do you come from?",
      "suggestedTimeSec": 60
    }
  ]
}
```

---

### POST `/api/speaking/attempts` 🔒
**Description**: Create a speaking attempt.

**Request Body**:
```json
{
  "testAttemptId": 123,
  "speakingPromptId": 1
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "attemptId": 456
  }
}
```

---

### POST `/api/speaking/attempts/:id/upload` 🔒
**Description**: Upload audio recording for AI evaluation.

**Content-Type**: `multipart/form-data`

**Form Data**:
- `audio`: Audio file (WebM, MP3, WAV)

**Response** (200):
```json
{
  "success": true,
  "message": "Processing audio..."
}
```

**Note**: Poll `/api/speaking/attempts/:id` for results.

---

### GET `/api/speaking/attempts/:id` 🔒
**Description**: Get speaking attempt results.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 456,
    "audioUrl": "https://r2.cloudflare.com/...",
    "transcript": "I come from a small town...",
    "status": "completed",
    "bandScore": 6.5,
    "scores": {
      "overall": 6.5,
      "fluency": 6.0,
      "lexical": 6.5,
      "grammar": 6.0,
      "pronunciation": 7.0
    },
    "feedback": {
      "strengths": ["Good pronunciation", "Clear speech"],
      "improvements": ["Use more linking words", "Expand answers"],
      "suggestions": ["Practice common topics", "Learn collocations"]
    },
    "processedAt": "2025-12-19T00:05:00Z"
  }
}
```

**Status values**:
- `pending`: Created, no audio yet
- `transcribing`: Audio uploaded, transcribing
- `scoring`: Transcription done, scoring in progress
- `completed`: All done, results available
- `failed`: Error occurred, check `errorMessage`

---

## 📖 Reading Practice

### GET `/api/reading/sections/:sectionId`
**Description**: Get reading section with passage.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Reading Passage 1",
    "passageText": "Full text here...",
    "questions": [...]
  }
}
```

---

### POST `/api/reading/attempts/start` 🔒
**Description**: Start reading attempt.

**Request Body**:
```json
{
  "sectionId": 1
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "attemptId": 789
  }
}
```

---

### POST `/api/reading/attempts/:attemptId/submit` 🔒
**Description**: Submit reading answers.

**Request Body**:
```json
{
  "answers": [
    {"questionId": 1, "answer": "TRUE"},
    {"questionId": 2, "answer": "FALSE"}
  ]
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "score": 8,
    "totalQuestions": 10,
    "bandScore": 6.0
  }
}
```

---

### GET `/api/reading/attempts/:attemptId/result` 🔒
**Description**: Get reading results.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "score": 8,
    "totalQuestions": 10,
    "bandScore": 6.0,
    "answers": [...]
  }
}
```

---

## 🎧 Listening Practice

### GET `/api/listening/sections/:sectionId`
**Description**: Get listening section with audio.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Listening Section 1",
    "audioUrl": "https://...",
    "questions": [...]
  }
}
```

---

### POST `/api/listening/attempts/start` 🔒
**Description**: Start listening attempt.

**Request Body**:
```json
{
  "sectionId": 1
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "attemptId": 999
  }
}
```

---

### POST `/api/listening/attempts/:attemptId/submit` 🔒
**Description**: Submit listening answers.

**Request Body**:
```json
{
  "answers": [
    {"questionId": 1, "answer": "library"},
    {"questionId": 2, "answer": "Monday"}
  ]
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "score": 9,
    "totalQuestions": 10,
    "bandScore": 6.5
  }
}
```

---

### GET `/api/listening/attempts/:attemptId/result` 🔒
**Description**: Get listening results.

---

## ✍️ Writing Practice

### GET `/api/writing/tasks`
**Description**: Get all writing tasks.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "taskType": 1,
      "title": "Graph Description",
      "prompt": "The graph shows...",
      "minimumWords": 150
    }
  ]
}
```

---

### GET `/api/writing/tasks/:taskId`
**Description**: Get task details.

---

### POST `/api/writing/submissions` 🔒
**Description**: Submit writing for AI evaluation.

**Request Body**:
```json
{
  "taskId": 1,
  "essayText": "Your essay here..."
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "submissionId": 111,
    "status": "processing"
  }
}
```

---

### GET `/api/writing/submissions/:submissionId` 🔒
**Description**: Get writing evaluation results.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "submissionId": 111,
    "bandScore": 6.5,
    "taskAchievement": 6.5,
    "coherenceCohesion": 6.0,
    "lexicalResource": 6.5,
    "grammaticalRange": 6.0,
    "feedback": "..."
  }
}
```

---

### GET `/api/writing/submissions/history` 🔒
**Description**: Get user's writing submission history.

---

## 👤 User Management

### GET `/api/user/profile` 🔒
**Description**: Get user profile.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatar": "https://...",
    "targetBand": 7.0,
    "studyGoal": "Academic"
  }
}
```

---

### PUT `/api/user/profile` 🔒
**Description**: Update user profile.

**Request Body**:
```json
{
  "fullName": "John Smith",
  "targetBand": 7.5,
  "studyGoal": "General"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": { ... }
}
```

---

### POST `/api/user/avatar` 🔒
**Description**: Upload profile avatar.

**Content-Type**: `multipart/form-data`

**Form Data**:
- `avatar`: Image file

**Response** (200):
```json
{
  "success": true,
  "data": {
    "avatarUrl": "https://..."
  }
}
```

---

### GET `/api/user/progress` 🔒
**Description**: Get overall progress summary.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "overallBand": 6.5,
    "skills": [
      {"skill": "Listening", "band": 7.0, "testsCompleted": 5},
      {"skill": "Reading", "band": 6.5, "testsCompleted": 3},
      {"skill": "Writing", "band": 6.0, "testsCompleted": 2},
      {"skill": "Speaking", "band": 6.5, "testsCompleted": 4}
    ]
  }
}
```

---

### GET `/api/user/progress/skills/:skillId` 🔒
**Description**: Get detailed progress for a skill.

---

### GET `/api/user/attempts` 🔒
**Description**: Get all test attempts.

**Query Parameters**:
- `limit` (default: 10)
- `offset` (default: 0)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "attempts": [...],
    "total": 25
  }
}
```

---

### GET `/api/user/attempts/recent` 🔒
**Description**: Get recent test attempts (last 10).

---

## 📊 Progress Tracking

### GET `/api/progress/overview` 🔒
**Description**: Get progress overview.

---

### GET `/api/progress/skills/:skillId` 🔒
**Description**: Get skill-specific progress.

---

### GET `/api/progress/history` 🔒
**Description**: Get attempt history with trends.

---

### GET `/api/progress/statistics` 🔒
**Description**: Get detailed statistics.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "totalAttempts": 25,
    "averageBand": 6.5,
    "strongestSkill": "Listening",
    "weakestSkill": "Writing",
    "improvementTrend": "increasing"
  }
}
```

---

## 🔖 Bookmarks

### GET `/api/bookmarks` 🔒
**Description**: Get all bookmarks.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "questionId": 123,
      "note": "Review this question",
      "createdAt": "2025-12-19T00:00:00Z"
    }
  ]
}
```

---

### POST `/api/bookmarks` 🔒
**Description**: Create bookmark.

**Request Body**:
```json
{
  "questionId": 123,
  "note": "Difficult question"
}
```

---

### DELETE `/api/bookmarks/:bookmarkId` 🔒
**Description**: Delete bookmark.

---

### PATCH `/api/bookmarks/:bookmarkId` 🔒
**Description**: Update bookmark note.

---

## 🏆 Badges

### GET `/api/badges`
**Description**: Get all available badges.

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "First Test",
      "description": "Complete your first test",
      "icon": "🎯",
      "criteria": "complete_test"
    }
  ]
}
```

---

### GET `/api/badges/user` 🔒
**Description**: Get user's earned badges.

---

## ⚙️ Admin

### GET `/api/admin/users` 🔒 (Admin only)
**Description**: Get all users.

---

### POST `/api/admin/tests` 🔒 (Admin only)
**Description**: Create new test.

---

### PUT `/api/admin/tests/:testId` 🔒 (Admin only)
**Description**: Update test.

---

### DELETE `/api/admin/tests/:testId` 🔒 (Admin only)
**Description**: Delete test.

---

## 📌 Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": [...]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Missing or invalid token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `INTERNAL_ERROR` (500): Server error

---

## 🔑 Environment Variables

Required in `.env`:

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="mysql://user:pass@localhost:3306/ielts_web"

# JWT
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-key

# Gemini AI (for Speaking/Writing evaluation)
GEMINI_API_KEY=your-gemini-key
GEMINI_API_KEY_2=your-gemini-key-2
GEMINI_API_KEY_3=your-gemini-key-3

# Cloudflare R2 (for audio storage)
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

---

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Run server**:
   ```bash
   npm run dev
   ```

4. **Test endpoints**:
   - Use Postman or any HTTP client
   - Base URL: `http://localhost:5000/api`
   - Start with `/api/auth/register` or `/api/auth/login`

---

## 📝 Notes

- 🔒 = Requires authentication
- All timestamps are in ISO 8601 format (UTC)
- Audio files: Max 10MB, formats: WebM, MP3, WAV
- Image files: Max 5MB, formats: JPG, PNG
- Token expiry: Access (24h), Refresh (30d)

---

**For issues or questions, check server logs or contact the development team.**
