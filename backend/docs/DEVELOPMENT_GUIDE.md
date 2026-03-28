# IELTS Web API - Development Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [API Architecture](#api-architecture)
4. [Authentication](#authentication)
5. [Database Schema](#database-schema)
6. [Error Handling](#error-handling)
7. [Security](#security)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Monitoring](#monitoring)

## 🎯 Overview

IELTS Web API is a comprehensive RESTful API built with Node.js, Express, TypeScript, and Prisma ORM. It provides complete functionality for IELTS test management, user authentication, progress tracking, and skill-specific practice modules.

### Technology Stack

- **Backend**: Node.js + Express.js + TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (to be implemented)
- **File Storage**: Local filesystem with Multer
- **Validation**: Joi (to be implemented)
- **Documentation**: OpenAPI 3.0.3

### Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # API controllers
├── middlewares/      # Express middlewares
├── routes/          # API routes
├── services/        # Business logic services
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
└── validators/      # Input validation schemas

prisma/
├── schema.prisma    # Database schema
└── migrations/      # Database migrations

tests/
├── integration/     # Integration tests
├── security/        # Security tests
└── performance/     # Performance tests

docs/
├── api/            # API documentation
├── security/        # Security reports
└── deployment/      # Deployment guides
```

## 🚀 Setup

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ielts-web-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment configuration**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database setup**

```bash
# Create database
mysql -u root -p
CREATE DATABASE ielts_db;

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

5. **Start development server**

```bash
npm run dev
```

### Environment Variables

```bash
# Server Configuration
NODE_ENV=development
PORT=5000
API_PREFIX=/api

# Database
DATABASE_URL=mysql://username:password@localhost:3306/ielts_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# File Upload Configuration
UPLOAD_DIR=public/uploads
MAX_FILE_SIZE=10485760  # 10MB

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Redis Configuration (for caching)
REDIS_URL=redis://localhost:6379
```

## 🏗️ API Architecture

### Route Organization

API routes are organized by functionality:

| Module         | Prefix                | Description                                |
| -------------- | --------------------- | ------------------------------------------ |
| Authentication | `/api/auth`           | User authentication and session management |
| Users          | `/api/users`          | User profile and progress management       |
| Tests          | `/api/tests`          | Test management and execution              |
| Reading        | `/api/reading`        | Reading skill practice                     |
| Listening      | `/api/listening`      | Listening skill practice                   |
| Writing        | `/api/writing`        | Writing skill practice                     |
| Speaking       | `/api/speaking`       | Speaking skill practice                    |
| Progress       | `/api/progress`       | Progress tracking and analytics            |
| Bookmarks      | `/api/bookmarks`      | Bookmark management                        |
| Badges         | `/api/badges`         | Gamification and achievements              |
| Admin          | `/api/admin`          | Administrative functions                   |
| System         | `/health`, `/metrics` | System health and monitoring               |

### Request/Response Format

**Standard Response Format**:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

**Error Response Format**:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

**Paginated Response Format**:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### HTTP Status Codes

| Code | Meaning               | Usage                          |
| ---- | --------------------- | ------------------------------ |
| 200  | OK                    | Successful request             |
| 201  | Created               | Resource created successfully  |
| 400  | Bad Request           | Invalid request data           |
| 401  | Unauthorized          | Authentication required/failed |
| 403  | Forbidden             | Insufficient permissions       |
| 404  | Not Found             | Resource not found             |
| 409  | Conflict              | Resource conflict              |
| 422  | Unprocessable Entity  | Validation failed              |
| 429  | Too Many Requests     | Rate limit exceeded            |
| 500  | Internal Server Error | Server error                   |

## 🔐 Authentication

### Current Implementation

**Status**: ⚠️ **CRITICAL SECURITY ISSUE** - Authentication is currently mocked

```typescript
// src/middlewares/auth.middleware.ts
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Verify JWT token from Authorization header
  // For now, just pass through with mock user
  (req as any).user = { id: 1, email: "test@example.com", role: "student" };
  next();
};
```

### Required Implementation

**1. Install JWT dependencies**

```bash
npm install jsonwebtoken @types/jsonwebtoken bcrypt @types/bcrypt
```

**2. Implement proper JWT middleware**

```typescript
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { code: "NO_TOKEN", message: "Access token required" },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { code: "INVALID_TOKEN", message: "Invalid or expired token" },
    });
  }
};
```

**3. Implement password hashing**

```typescript
import bcrypt from "bcrypt";

// In registration controller
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// In login controller
const isValidPassword = await bcrypt.compare(password, user.passwordHash);
```

### Authentication Flow

1. **User Registration**

   - POST `/api/auth/register`
   - Validate input data
   - Hash password with bcrypt
   - Create user in database
   - Generate JWT token
   - Return user data and token

2. **User Login**

   - POST `/api/auth/login`
   - Validate credentials
   - Compare hashed password
   - Generate JWT token
   - Return user data and token

3. **Protected Routes**
   - Include `Authorization: Bearer <token>` header
   - JWT middleware validates token
   - User data attached to request object

## 🗄️ Database Schema

### Core Entities

**Users**:

```typescript
interface User {
  id: BigInt;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Tests**:

```typescript
interface Test {
  id: BigInt;
  title: string;
  description: string;
  level: string;
  source: string;
  publishedAt: Date;
  isActive: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**TestAttempts**:

```typescript
interface TestAttempt {
  id: BigInt;
  userId: BigInt;
  testId: BigInt;
  skillId: number;
  mode: string;
  startedAt: DateTime;
  completedAt: DateTime;
  totalScore: Decimal;
  bandScore: Decimal;
  status: string;
}
```

### Relationships

- User → TestAttempts (1:N)
- User → UserProfile (1:1)
- User → UserBadges (1:N)
- Test → TestSections (1:N)
- TestSection → Questions (1:N)
- TestAttempt → QuestionAttempts (1:N)

### Database Operations

**Using Prisma Client**:

```typescript
import prisma from "../config/database.config";

// Create user
const user = await prisma.user.create({
  data: {
    email,
    passwordHash: hashedPassword,
    profile: {
      create: { fullName },
    },
  },
  include: { profile: true },
});

// Get user with relations
const userWithAttempts = await prisma.user.findUnique({
  where: { id: BigInt(userId) },
  include: {
    profile: true,
    testAttempts: {
      include: { test: true },
      orderBy: { startedAt: "desc" },
      take: 10,
    },
  },
});
```

## ⚠️ Error Handling

### Global Error Handler

```typescript
// src/middlewares/error.middleware.ts
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : error.message;

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message,
    },
  });
};
```

### Custom Error Classes

```typescript
// src/utils/errors.ts
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}
```

### Error Response Standards

**Validation Errors** (400):

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

**Authentication Errors** (401):

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password is incorrect"
  }
}
```

**Authorization Errors** (403):

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to perform this action"
  }
}
```

## 🔒 Security

### Current Security Issues

1. **CRITICAL**: Passwords stored in plain text
2. **CRITICAL**: JWT authentication mocked
3. **HIGH**: No input validation
4. **HIGH**: No rate limiting
5. **MEDIUM**: CORS configuration too permissive

### Security Implementation Checklist

#### ✅ Required Before Production

- [ ] Implement bcrypt password hashing
- [ ] Implement real JWT authentication
- [ ] Add comprehensive input validation
- [ ] Implement rate limiting
- [ ] Add security headers
- [ ] Implement HTTPS enforcement
- [ ] Add account lockout mechanism

#### 🔧 Recommended Security Measures

- [ ] Implement content security policy (CSP)
- [ ] Add request logging and monitoring
- [ ] Implement API key authentication for admin functions
- [ ] Add IP whitelisting for admin endpoints
- [ ] Implement session timeout
- [ ] Add CSRF protection

### Security Headers

```typescript
// src/middlewares/security.middleware.ts
import helmet from "helmet";

export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});
```

## 🧪 Testing

### Test Structure

```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── security/         # Security tests
├── performance/      # Performance tests
└── e2e/            # End-to-end tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:security
npm run test:performance

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Test Examples

**Unit Test Example**:

```typescript
// tests/unit/auth.service.test.ts
import { AuthService } from "../../src/services/auth/auth.service";

describe("AuthService", () => {
  describe("register", () => {
    it("should create a new user with valid data", async () => {
      const userData = {
        email: "test@example.com",
        password: "ValidPassword123!",
        fullName: "Test User",
      };

      const result = await AuthService.register(userData);

      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe(userData.email);
      expect(result.data.token).toBeDefined();
    });
  });
});
```

**Integration Test Example**:

```typescript
// tests/integration/auth.test.ts
import request from "supertest";
import app from "../../src/app";

describe("Authentication API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const userData = {
        email: "test@example.com",
        password: "ValidPassword123!",
        fullName: "Test User",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
    });
  });
});
```

### Test Coverage

Target: >90% code coverage

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## 🚀 Deployment

### Environment Setup

#### Development

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mysql://localhost:3306/ielts_db
```

#### Staging

```bash
NODE_ENV=staging
PORT=5000
DATABASE_URL=mysql://staging-db-host:3306/ielts_staging
JWT_SECRET=staging-jwt-secret
```

#### Production

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=mysql://prod-db-host:3306/ielts_prod
JWT_SECRET=super-secure-production-jwt-secret
```

### Docker Deployment

**Dockerfile**:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
```

**docker-compose.yml**:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://db:3306/ielts_prod
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      - MYSQL_DATABASE=ielts_prod
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mysql_data:
```

### Deployment Steps

1. **Prepare environment**

```bash
# Set environment variables
export NODE_ENV=production
export DATABASE_URL=mysql://prod-host:3306/ielts_prod
export JWT_SECRET=your-production-jwt-secret
```

2. **Build and deploy**

```bash
# Install dependencies
npm ci --only=production

# Build application
npm run build

# Run database migrations
npx prisma migrate deploy

# Start application
npm start
```

3. **Health Check**

```bash
# Verify application is running
curl https://your-api-domain.com/health

# Check API endpoints
curl https://your-api-domain.com/api/tests
```

### Monitoring Setup

**Health Check Endpoint**:

```typescript
// Health check response
{
  "status": "ok",
  "timestamp": "2023-12-17T08:46:00.000Z",
  "database": {
    "connected": true,
    "performance": {
      "responseTime": 15,
      "connections": 5
    }
  },
  "memory": {
    "used": "256MB",
    "total": "512MB"
  }
}
```

## 📊 Monitoring

### Application Monitoring

**Metrics to Track**:

- Response times
- Error rates
- Request counts
- Database performance
- Memory usage
- CPU usage

**Monitoring Tools**:

- **APM**: New Relic, DataDog, or AppDynamics
- **Logging**: Winston + ELK Stack
- **Metrics**: Prometheus + Grafana
- **Error Tracking**: Sentry

### Log Structure

```typescript
// Structured logging format
{
  "timestamp": "2023-12-17T08:46:00.000Z",
  "level": "info",
  "service": "ielts-api",
  "version": "1.0.0",
  "request": {
    "method": "GET",
    "url": "/api/tests",
    "headers": {
      "user-agent": "Mozilla/5.0...",
      "x-request-id": "req-123456"
    }
  },
  "response": {
    "status": 200,
    "duration": 150
  },
  "user": {
    "id": "12345",
    "role": "student"
  }
}
```

### Performance Monitoring

**Key Performance Indicators**:

- **Response Time**: <200ms (95th percentile)
- **Error Rate**: <1%
- **Throughput**: >1000 requests/minute
- **Availability**: >99.9%

**Alerting Thresholds**:

- Response time >500ms
- Error rate >5%
- Database connections >80%
- Memory usage >80%

## 🔧 Development Tools

### Code Quality

**ESLint Configuration**:

```json
{
  "extends": ["@typescript-eslint/recommended", "prettier"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

**Prettier Configuration**:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Git Hooks

**Pre-commit hooks**:

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run linting
npm run lint

# Run tests
npm run test:unit

# Check for security issues
npm audit
```

### Development Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts",
    "migrate": "prisma migrate dev",
    "db:seed": "ts-node scripts/seed-database.ts",
    "db:reset": "prisma migrate reset"
  }
}
```

## 📚 API Documentation

### OpenAPI Specification

Complete API documentation is available in:

- `openapi-specification.yaml` - OpenAPI 3.0.3 specification
- Interactive documentation at `/docs` endpoint (when configured)

### Postman Collection

Import the Postman collection:

1. Open Postman
2. Click Import
3. Select `IELTS_Web_API_Postman_Collection.json`
4. Set environment variables in Postman

### API Examples

**Authentication Example**:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "fullName": "Test User"
  }'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

**Protected Endpoint Example**:

```bash
# Get user profile
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚨 Troubleshooting

### Common Issues

**1. Database Connection Failed**

```bash
# Check database URL format
mysql://username:password@host:port/database

# Verify database is running
mysql -u username -p -h host

# Check network connectivity
telnet db-host 3306
```

**2. JWT Token Issues**

```bash
# Verify JWT secret is set
echo $JWT_SECRET

# Check token format
echo "Bearer TOKEN" | cut -d' ' -f2

# Decode JWT (for debugging)
node -e "console.log(JSON.stringify(require('jsonwebtoken').decode('TOKEN'), null, 2))"
```

**3. File Upload Issues**

```bash
# Check upload directory permissions
ls -la public/uploads/

# Verify file size limits
grep MAX_FILE_SIZE .env

# Check disk space
df -h
```

### Debug Mode

Enable debug logging:

```bash
export DEBUG=ielts-api:*
npm run dev
```

### Performance Issues

**Slow Database Queries**:

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Check running queries
SHOW PROCESSLIST;

-- Analyze query performance
EXPLAIN SELECT * FROM tests WHERE level = 'Academic';
```

**Memory Leaks**:

```bash
# Monitor memory usage
node --inspect src/server.ts

# Generate heap dump
kill -USR2 <node-pid>
```

## 📞 Support

### Getting Help

1. **Documentation**: Check this guide and API docs
2. **Issues**: Create GitHub issue with detailed description
3. **Security**: Report security issues privately
4. **Community**: Join our Discord/Slack channel

### Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review and merge

### Version Management

- **Semantic Versioning**: MAJOR.MINOR.PATCH
- **Release Process**: Automated via GitHub Actions
- **Changelog**: Maintained in CHANGELOG.md
- **Tags**: Created for each release

---

This development guide provides comprehensive information for working with the IELTS Web API. For specific questions or issues, please refer to the API documentation or create an issue in the repository.
