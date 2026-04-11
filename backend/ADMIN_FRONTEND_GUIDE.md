# Admin Frontend Integration Guide

**Base URL**: `http://localhost:5000/api/admin`  
**Authentication**: Required - Admin/Instructor role only

---

## 🔐 Authentication Setup

### 1. Login & Get Admin Token

**Endpoint**: `POST /api/auth/login`

```typescript
// Request
interface LoginRequest {
  email: string;
  password: string;
}

// Response
interface LoginResponse {
  success: true;
  data: {
    user: {
      id: number;
      email: string;
      role: "admin" | "instructor" | "student";
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

// Example
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  
  // Store token
  if (data.success) {
    localStorage.setItem('accessToken', data.data.tokens.accessToken);
    localStorage.setItem('userRole', data.data.user.role);
  }
  
  return data;
};
```

### 2. Check Admin Access

```typescript
const isAdmin = () => {
  const role = localStorage.getItem('userRole');
  return role === 'admin' || role === 'instructor';
};

// Redirect if not admin
if (!isAdmin()) {
  window.location.href = '/forbidden';
}
```

### 3. Add Token to All Admin Requests

```typescript
const adminApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`http://localhost:5000/api/admin${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });
  
  if (response.status === 403) {
    alert('Admin access required');
    window.location.href = '/login';
  }
  
  return response.json();
};
```

---

## 📊 1. Dashboard

### Get Platform Statistics

**GET** `/dashboard/stats`

```typescript
interface DashboardStats {
  users: {
    total: number;
    active: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
  };
  tests: {
    total: number;
    totalAttempts: number;
    completedAttempts: number;
    completionRate: number;
  };
  skills: Array<{
    skill: string;
    averageScore: number;
    attempts: number;
  }>;
  speaking: {
    totalAttempts: number;
    completed: number;
    failed: number;
    successRate: number;
  };
}

// Usage
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await adminApi('/dashboard/stats');
  return response.data;
};
```

**UI Suggestions**:
- Cards for user stats (Total, Active, New)
- Test completion progress bar
- Skills chart (bar/radar chart)
- Speaking AI success rate gauge

---

### Get Chart Data

**GET** `/dashboard/charts`

```typescript
interface ChartData {
  userRegistrations: Array<{ date: string; count: number }>;
  testCompletions: Array<{ date: string; count: number }>;
  scoreDistribution: Array<{ range: string; count: number }>;
  peakHours: Array<{ hour: number; count: number }>;
}

// Usage with Chart.js
const fetchCharts = async () => {
  const response = await adminApi('/dashboard/charts');
  const data: ChartData = response.data;
  
  // Line chart: User registrations
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.userRegistrations.map(d => d.date),
      datasets: [{
        label: 'New Users',
        data: data.userRegistrations.map(d => d.count)
      }]
    }
  });
};
```

---

## 👥 2. User Management

### List All Users

**GET** `/users?search=&role=&status=&page=1&limit=20`

```typescript
interface User {
  id: number;
  email: string;
  role: string;
  fullName?: string;
  isActive: boolean;
  createdAt: string;
}

interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const fetchUsers = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await adminApi(`/users?${params}`);
  return response.data; // Returns { users: [], pagination: {} }
};
```

**UI Components**:
```tsx
// React Table Example
const UserTable = () => {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    fetchUsers({ page, limit: 10 }).then(setData);
  }, [page]);
  
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td><Badge>{user.role}</Badge></td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => viewUser(user.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {data.pagination.page} of {data.pagination.totalPages}</span>
        <button disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};
```

---

### Get User Detail

**GET** `/users/:userId`

```typescript
interface UserDetail extends User {
  isActive: boolean;
  avatar?: string;
  testAttempts: number;
  badges: number;
}

const fetchUserDetail = async (userId: number) => {
  const response = await adminApi(`/users/${userId}`);
  return response.data as UserDetail;
};
```

---

### Create New User

**POST** `/users`

```typescript
interface CreateUserRequest {
  email: string;
  password: string;
  role: "admin" | "instructor" | "student";
  fullName?: string;
}

const createUser = async (userData: CreateUserRequest) => {
  const response = await adminApi('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  return response;
};
```

**Form Example**:
```tsx
const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    fullName: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    alert('User created!');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <select name="role">
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="admin">Admin</option>
      </select>
      <input name="fullName" type="text" />
      <button type="submit">Create User</button>
    </form>
  );
};
```

---

### Update User Role

**PATCH** `/users/:userId`

```typescript
const updateUserRole = async (userId: number, role: string) => {
  const response = await adminApi(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ role })
  });
  return response;
};
```

---

### Activate/Deactivate User

**PATCH** `/users/:userId/status`

```typescript
const toggleUserStatus = async (userId: number, isActive: boolean) => {
  const response = await adminApi(`/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive })
  });
  return response;
};
```

---

### Delete User

**DELETE** `/users/:userId`

```typescript
const deleteUser = async (userId: number) => {
  if (!confirm('Are you sure?')) return;
  
  const response = await adminApi(`/users/${userId}`, {
    method: 'DELETE'
  });
  return response;
};
```

---

### View User Activity

**GET** `/users/:userId/activity`

```typescript
interface Activity {
  id: number;
  action: string;
  metadata: any;
  createdAt: string;
}

const fetchUserActivity = async (userId: number) => {
  const response = await adminApi(`/users/${userId}/activity`);
  return response.data as Activity[];
};
```

---

## 📝 3. Test Management

### List Tests

**GET** `/tests`

```typescript
interface Test {
  id: number;
  title: string;
  level: string;
  description: string;
  sectionsCount: number;
  createdAt: string;
}

interface TestsResponse {
  tests: Test[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Usage: pass limit=0 to get ALL tests
const fetchTests = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await adminApi(`/tests?${params}`);
  return response.data; // Returns { tests: [], pagination: {} }
};
```

---

### Create Test

**POST** `/tests`

```typescript
interface CreateTestRequest {
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  source?: string;
}

const createTest = async (testData: CreateTestRequest) => {
  const response = await adminApi('/tests', {
    method: 'POST',
    body: JSON.stringify(testData)
  });
  return response;
};
```

---

### Update Test

**PUT** `/tests/:testId`

```typescript
const updateTest = async (testId: number, testData: Partial<CreateTestRequest>) => {
  const response = await adminApi(`/tests/${testId}`, {
    method: 'PUT',
    body: JSON.stringify(testData)
  });
  return response;
};
```

---

### Delete Test

**DELETE** `/tests/:testId`

```typescript
const deleteTest = async (testId: number) => {
  const response = await adminApi(`/tests/${testId}`, {
    method: 'DELETE'
  });
  return response;
};
```

---

## 🎤 4. Speaking Content Management

### List Topics

**GET** `/speaking/topics?part=1`

```typescript
interface Topic {
  id: number;
  part: 1 | 2 | 3;
  title: string;
  description: string;
  promptCount: number;
  createdAt: string;
}

const fetchTopics = async (part?: number) => {
  const url = part ? `/speaking/topics?part=${part}` : '/speaking/topics';
  const response = await adminApi(url);
  return response.data as Topic[];
};
```

---

### Create Topic

**POST** `/speaking/topics`

```typescript
interface CreateTopicRequest {
  part: 1 | 2 | 3;
  topicTitle: string;
  description: string;
  skillId?: number;
}

const createTopic = async (topicData: CreateTopicRequest) => {
  const response = await adminApi('/speaking/topics', {
    method: 'POST',
    body: JSON.stringify(topicData)
  });
  return response;
};
```

---

### List Prompts

**GET** `/speaking/prompts?topicId=1`

```typescript
interface Prompt {
  id: number;
  topicId: number;
  topicTitle: string;
  part: number;
  questionIndex: number;
  questionText: string;
  suggestedTimeSec: number;
  createdAt: string;
}

const fetchPrompts = async (topicId?: number) => {
  const url = topicId ? `/speaking/prompts?topicId=${topicId}` : '/speaking/prompts';
  const response = await adminApi(url);
  return response.data as Prompt[];
};
```

---

### Create Prompt

**POST** `/speaking/prompts`

```typescript
interface CreatePromptRequest {
  topicId: number;
  questionIndex: number;
  questionText: string;
  suggestedTimeSec: number;
}

const createPrompt = async (promptData: CreatePromptRequest) => {
  const response = await adminApi('/speaking/prompts', {
    method: 'POST',
    body: JSON.stringify(promptData)
  });
  return response;
};
```

---

## 🤖 5. AI Evaluation Monitoring

### Get API Usage

**GET** `/ai/usage`

```typescript
interface AIUsage {
  keys: Array<{
    keyNumber: number;
    requestsToday: number;
    quotaLimit: number;
    remaining: number;
    usagePercentage: number;
  }>;
  totalRequests: number;
  totalQuota: number;
  models: {
    transcription: string;
    scoring: string;
  };
}

const fetchAIUsage = async () => {
  const response = await adminApi('/ai/usage');
  return response.data as AIUsage;
};
```

**UI Example**:
```tsx
const AIUsageMonitor = () => {
  const [usage, setUsage] = useState<AIUsage | null>(null);
  
  useEffect(() => {
    fetchAIUsage().then(setUsage);
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchAIUsage().then(setUsage);
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <h3>Gemini API Usage</h3>
      {usage?.keys.map(key => (
        <div key={key.keyNumber}>
          <p>Key {key.keyNumber}: {key.requestsToday}/{key.quotaLimit}</p>
          <progress value={key.usagePercentage} max="100"></progress>
          <span>{key.remaining} remaining</span>
        </div>
      ))}
    </div>
  );
};
```

---

### Get AI Evaluations

**GET** `/ai/evaluations?status=failed&page=1&limit=20`

```typescript
interface AIEvaluation {
  id: number;
  userEmail: string;
  question: string;
  status: "pending" | "completed" | "failed";
  bandScore?: number;
  transcript?: string;
  recordedAt: string;
  processedAt?: string;
  errorMessage?: string;
}

const fetchAIEvaluations = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await adminApi(`/ai/evaluations?${params}`);
  return response.data.evaluations as AIEvaluation[];
};
```

---

### Reprocess Failed Evaluation

**POST** `/ai/reprocess/:attemptId`

```typescript
const reprocessEvaluation = async (attemptId: number) => {
  const response = await adminApi(`/ai/reprocess/${attemptId}`, {
    method: 'POST'
  });
  alert(response.message);
  return response;
};
```

---

### Get AI Config

**GET** `/ai/config`

```typescript
interface AIConfig {
  transcriptionModel: string;
  scoringModel: string;
  temperature: number;
  maxOutputTokens: number;
}

const fetchAIConfig = async () => {
  const response = await adminApi('/ai/config');
  return response.data as AIConfig;
};
```

---

## 🏆 6. Badge Management

### List Badges

**GET** `/badges`

```typescript
interface Badge {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  code: string;
  awardedCount: number;
  createdAt: string;
}

const fetchBadges = async () => {
  const response = await adminApi('/badges');
  return response.data as Badge[];
};
```

---

### Create Badge

**POST** `/badges`

```typescript
interface CreateBadgeRequest {
  name: string;
  description: string;
  iconUrl: string;
  code: string;
}

const createBadge = async (badgeData: CreateBadgeRequest) => {
  const response = await adminApi('/badges', {
    method: 'POST',
    body: JSON.stringify(badgeData)
  });
  return response;
};
```

---

### Award Badge to User

**POST** `/badges/award`

```typescript
const awardBadge = async (userId: number, badgeId: number) => {
  const response = await adminApi('/badges/award', {
    method: 'POST',
    body: JSON.stringify({ userId, badgeId })
  });
  return response;
};
```

---

## 🛡️ Error Handling

```typescript
const adminApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    const response = await fetch(`http://localhost:5000/api/admin${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
    
    const data = await response.json();
    
    // Handle errors
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error('Session expired');
      } else if (response.status === 403) {
        // Not admin
        alert('Admin access required');
        window.location.href = '/';
        throw new Error('Forbidden');
      } else {
        // Other errors
        throw new Error(data.error?.message || 'An error occurred');
      }
    }
    
    return data;
  } catch (error) {
    console.error('Admin API Error:', error);
    throw error;
  }
};
```

---

## 📦 Complete Admin API Client

```typescript
// adminApi.ts
class AdminAPIClient {
  private baseURL = 'http://localhost:5000/api/admin';
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('accessToken');
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message);
    return data;
  }
  
  // Dashboard
  getDashboardStats = () => this.request('/dashboard/stats');
  getDashboardCharts = () => this.request('/dashboard/charts');
  
  // Users
  getUsers = (filters = {}) => this.request(`/users?${new URLSearchParams(filters)}`);
  getUserDetail = (id: number) => this.request(`/users/${id}`);
  createUser = (data: any) => this.request('/users', { method: 'POST', body: JSON.stringify(data) });
  updateUser = (id: number, data: any) => this.request(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  deleteUser = (id: number) => this.request(`/users/${id}`, { method: 'DELETE' });
  
  // Tests
  getTests = () => this.request('/tests');
  createTest = (data: any) => this.request('/tests', { method: 'POST', body: JSON.stringify(data) });
  updateTest = (id: number, data: any) => this.request(`/tests/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  deleteTest = (id: number) => this.request(`/tests/${id}`, { method: 'DELETE' });
  
  // Speaking Content
  getTopics = (part?: number) => this.request(`/speaking/topics${part ? `?part=${part}` : ''}`);
  createTopic = (data: any) => this.request('/speaking/topics', { method: 'POST', body: JSON.stringify(data) });
  getPrompts = (topicId?: number) => this.request(`/speaking/prompts${topicId ? `?topicId=${topicId}` : ''}`);
  createPrompt = (data: any) => this.request('/speaking/prompts', { method: 'POST', body: JSON.stringify(data) });
  
  // AI Monitoring
  getAIUsage = () => this.request('/ai/usage');
  getAIEvaluations = (filters = {}) => this.request(`/ai/evaluations?${new URLSearchParams(filters)}`);
  reprocessEvaluation = (id: number) => this.request(`/ai/reprocess/${id}`, { method: 'POST' });
  
  // Badges
  getBadges = () => this.request('/badges');
  createBadge = (data: any) => this.request('/badges', { method: 'POST', body: JSON.stringify(data) });
  awardBadge = (userId: number, badgeId: number) => 
    this.request('/badges/award', { method: 'POST', body: JSON.stringify({ userId, badgeId }) });
}

export const adminAPI = new AdminAPIClient();
```

---

## 🎨 Recommended Frontend Structure

```
src/
├── pages/
│   └── admin/
│       ├── Dashboard.tsx        # Stats & charts
│       ├── Users.tsx           # User management table
│       ├── UserDetail.tsx      # Single user view
│       ├── Tests.tsx           # Test CRUD
│       ├── SpeakingContent.tsx # Topics & prompts
│       ├── AIMonitoring.tsx    # AI usage & evaluations
│       └── Badges.tsx          # Badge management
├── components/
│   └── admin/
│       ├── StatCard.tsx
│       ├── UserTable.tsx
│       ├── CreateUserForm.tsx
│       └── ConfirmDialog.tsx
├── services/
│   └── adminApi.ts            # API client (above)
└── types/
    └── admin.ts               # TypeScript interfaces
```

---

## ✅ Quick Start Checklist

1. ✅ Login as admin user
2. ✅ Store accessToken in localStorage
3. ✅ Add Authorization header to all requests
4. ✅ Check role before accessing admin pages
5. ✅ Handle 401 (expired) and 403 (forbidden) errors
6. ✅ Use TypeScript interfaces for type safety
7. ✅ Test each endpoint before building UI

---

**Need help?** Check `API_REFERENCE.md` for complete API documentation.

---

## 📄 Reference: JSON Response Examples

### 1. Dashboard Stats Response
`json
{
  "success": true,
  "data": {
    "users": {
        "total": 150,
        "active": 142,
        "newToday": 5,
        "newThisWeek": 23,
        "newThisMonth": 67
    },
    "tests": {
        "total": 12,
        "totalAttempts": 450,
        "completedAttempts": 380,
        "completionRate": 84.4
    },
    "skills": [
        { "skill": "Reading", "averageScore": 6.5, "attempts": 120 },
        { "skill": "Listening", "averageScore": 7.0, "attempts": 130 },
        { "skill": "Writing", "averageScore": 6.0, "attempts": 100 },
        { "skill": "Speaking", "averageScore": 6.2, "attempts": 100 }
    ],
    "speaking": {
        "totalAttempts": 100,
        "completed": 95,
        "failed": 5,
        "successRate": 95
    }
  }
}
`

### 2. User List Response (With Pagination)
`json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 101,
        "email": "student@example.com",
        "role": "student",
        "isActive": true,
        "fullName": "Nguyen Van A",
        "createdAt": "2024-12-15T08:30:00.000Z"
      },
      {
        "id": 102,
        "email": "teacher@example.com",
        "role": "instructor",
        "isActive": true,
        "fullName": "Ms. Lan",
        "createdAt": "2024-12-10T14:20:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 52,
      "totalPages": 3
    }
  }
}
`

### 3. Test List Response
```json
{
  "success": true,
  "data": {
    "tests": [
      {
        "id": 1,
        "title": "Cambridge IELTS 18 - Test 1",
        "description": "Full practice test from Cambridge 18",
        "level": "intermediate",
        "skill": "Reading", 
        "sectionsCount": 4,
        "createdAt": "2024-11-20T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

