#!/usr/bin/env node

/**
 * Documentation Generator Script
 * Generates comprehensive API documentation from OpenAPI spec
 */

const fs = require("fs");
const path = require("path");

// Load OpenAPI specification
const yaml = require("js-yaml");
const openApiSpec = yaml.load(
  fs.readFileSync("openapi-specification.yaml", "utf8")
);

// Generate HTML documentation
function generateHTMLDocs() {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IELTS Web API Documentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .nav {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav h2 {
            color: #4a5568;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .nav-item {
            padding: 15px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .nav-item:hover {
            border-color: #667eea;
            background: #f7fafc;
            transform: translateY(-2px);
        }
        
        .nav-item h3 {
            color: #2d3748;
            margin-bottom: 5px;
            font-size: 1.1rem;
        }
        
        .nav-item p {
            color: #718096;
            font-size: 0.9rem;
        }
        
        .content {
            background: white;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .endpoint {
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-bottom: 20px;
            background: #f7fafc;
            border-radius: 0 8px 8px 0;
        }
        
        .endpoint h3 {
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.8rem;
            margin-right: 10px;
        }
        
        .get { background: #48bb78; color: white; }
        .post { background: #4299e1; color: white; }
        .put { background: #ed8936; color: white; }
        .delete { background: #f56565; color: white; }
        .patch { background: #9f7aea; color: white; }
        
        .code {
            background: #2d3748;
            color: #48bb78;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
        }
        
        .parameter-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .parameter-table th,
        .parameter-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .parameter-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #4a5568;
        }
        
        .required {
            color: #f56565;
            font-weight: 600;
        }
        
        .optional {
            color: #48bb78;
            font-weight: 600;
        }
        
        .example {
            background: #2d3748;
            color: #48bb78;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
        }
        
        .status-codes {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .status-code {
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .success { background: #c6f6d5; border-left: 4px solid #48bb78; }
        .error { background: #fed7d7; border-left: 4px solid #f56565; }
        .warning { background: #feebc8; border-left: 4px solid #ed8936; }
        
        .footer {
            text-align: center;
            padding: 40px 20px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
            margin-top: 40px;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .nav-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 IELTS Web API</h1>
            <p>Comprehensive RESTful API for IELTS Test Management and Practice</p>
            <p>Version: ${openApiSpec.info.version} | Base URL: http://localhost:5000/api</p>
        </div>
        
        <div class="nav">
            <h2>📚 API Modules</h2>
            <div class="nav-grid">
                <div class="nav-item" onclick="scrollToSection('authentication')">
                    <h3>🔐 Authentication</h3>
                    <p>User login, registration, and session management</p>
                </div>
                <div class="nav-item" onclick="scrollToSection('users')">
                    <h3>👤 Users</h3>
                    <p>User profile and progress management</p>
                </div>
                <div class="nav-item" onclick="scrollToSection('tests')">
                    <h3>📝 Tests</h3>
                    <p>Test management and execution</p>
                </div>
                <div class="nav-item" onclick="scrollToSection('skills')">
                    <h3>🎯 Skills</h3>
                    <p>Reading, Listening, Writing, Speaking practice</p>
                </div>
                <div class="nav-item" onclick="scrollToSection('progress')">
                    <h3>📊 Progress</h3>
                    <p>Progress tracking and analytics</p>
                </div>
                <div class="nav-item" onclick="scrollToSection('admin')">
                    <h3>🔧 Admin</h3>
                    <p>Administrative functions</p>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div id="authentication" class="section">
                <div class="endpoint">
                    <h3><span class="method post">POST</span> /auth/register</h3>
                    <p>Register a new user account with email and password</p>
                    
                    <h4>Request Body</h4>
                    <table class="parameter-table">
                        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
                        <tr>
                            <td>email</td>
                            <td><code>string</code></td>
                            <td class="required">Yes</td>
                            <td>User email address</td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td><code>string</code></td>
                            <td class="required">Yes</td>
                            <td>User password (min 6 characters)</td>
                        </tr>
                        <tr>
                            <td>fullName</td>
                            <td><code>string</code></td>
                            <td class="optional">No</td>
                            <td>User full name</td>
                        </tr>
                    </table>
                    
                    <h4>Response Example</h4>
                    <div class="example">
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "fullName": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
                    </div>
                    
                    <h4>Status Codes</h4>
                    <div class="status-codes">
                        <div class="status-code success">
                            <strong>201</strong><br>Created
                        </div>
                        <div class="status-code error">
                            <strong>400</strong><br>Bad Request - Invalid input data
                        </div>
                        <div class="status-code error">
                            <strong>409</strong><br>Conflict - User already exists
                        </div>
                    </div>
                </div>
                
                <div class="endpoint">
                    <h3><span class="method post">POST</span> /auth/login</h3>
                    <p>Authenticate user with email and password</p>
                    
                    <h4>Request Body</h4>
                    <table class="parameter-table">
                        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
                        <tr>
                            <td>email</td>
                            <td><code>string</code></td>
                            <td class="required">Yes</td>
                            <td>User email address</td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td><code>string</code></td>
                            <td class="required">Yes</td>
                            <td>User password</td>
                        </tr>
                    </table>
                    
                    <h4>Response Example</h4>
                    <div class="example">
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
                    </div>
                    
                    <h4>Status Codes</h4>
                    <div class="status-codes">
                        <div class="status-code success">
                            <strong>200</strong><br>OK - Login successful
                        </div>
                        <div class="status-code error">
                            <strong>401</strong><br>Unauthorized - Invalid credentials
                        </div>
                        <div class="status-code error">
                            <strong>404</strong><br>Not Found - User not found
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="users" class="section">
                <div class="endpoint">
                    <h3><span class="method get">GET</span> /users/profile</h3>
                    <p>Get current user's profile information</p>
                    
                    <h4>Headers</h4>
                    <table class="parameter-table">
                        <tr><th>Header</th><th>Value</th><th>Description</th></tr>
                        <tr>
                            <td>Authorization</td>
                            <td><code>Bearer <token></code></td>
                            <td>JWT authentication token</td>
                        </tr>
                    </table>
                    
                    <h4>Response Example</h4>
                    <div class="example">
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "country": "Vietnam",
    "targetBand": 7.5,
    "bio": "IELTS student preparing for academic test",
    "createdAt": "2023-12-17T08:51:51.147Z"
  }
}
                    </div>
                </div>
            </div>
            
            <div id="tests" class="section">
                <div class="endpoint">
                    <h3><span class="method get">GET</span> /tests</h3>
                    <p>Get list of all available tests with optional filtering</p>
                    
                    <h4>Query Parameters</h4>
                    <table class="parameter-table">
                        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
                        <tr>
                            <td>page</td>
                            <td><code>integer</code></td>
                            <td class="optional">No</td>
                            <td>Page number (default: 1)</td>
                        </tr>
                        <tr>
                            <td>limit</td>
                            <td><code>integer</code></td>
                            <td class="optional">No</td>
                            <td>Items per page (default: 10)</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td><code>string</code></td>
                            <td class="optional">No</td>
                            <td>Test type filter</td>
                        </tr>
                        <tr>
                            <td>difficulty</td>
                            <td><code>string</code></td>
                            <td class="optional">No</td>
                            <td>Difficulty level filter</td>
                        </tr>
                    </table>
                    
                    <h4>Response Example</h4>
                    <div class="example">
{
  "success": true,
  "data": {
    "tests": [
      {
        "id": 1,
        "title": "IELTS Reading Test 1",
        "description": "Academic reading practice test",
        "level": "Academic",
        "source": "Cambridge IELTS 15",
        "publishedAt": "2023-01-01",
        "isActive": true,
        "createdAt": "2023-12-17T08:51:51.147Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2023 IELTS Web API. Generated documentation version ${openApiSpec.info.version}</p>
            <p>For more information, check the OpenAPI specification or contact the development team.</p>
        </div>
    </div>
    
    <script>
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Highlight current section
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= 200) {
                    section.style.background = '#f0fff4';
                    section.style.borderLeft = '4px solid #48bb78';
                } else {
                    section.style.background = 'white';
                    section.style.borderLeft = 'none';
                }
            });
        });
    </script>
</body>
</html>`;

  fs.writeFileSync("docs/api/index.html", html);
  console.log("✅ HTML documentation generated: docs/api/index.html");
}

// Generate Markdown documentation
function generateMarkdownDocs() {
  const markdown = `# IELTS Web API Documentation

## Overview

The IELTS Web API provides comprehensive functionality for IELTS test management, user authentication, progress tracking, and skill-specific practice modules.

**Base URL**: \`http://localhost:5000/api\`
**Version**: ${openApiSpec.info.version}
**Authentication**: JWT Bearer Token

## Authentication

### Register User
\`\`\`http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "fullName": "John Doe"
}
\`\`\`

### Login User
\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
\`\`\`

## User Management

### Get User Profile
\`\`\`http
GET /users/profile
Authorization: Bearer <token>
\`\`\`

### Update User Profile
\`\`\`http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Updated Name",
  "country": "Vietnam",
  "targetBand": 7.5
}
\`\`\`

## Test Management

### Get All Tests
\`\`\`http
GET /tests?page=1&limit=10&type=Academic
\`\`\`

### Start Test
\`\`\`http
POST /tests/1/start
Authorization: Bearer <token>
\`\`\`

## Error Handling

All API responses follow a consistent format:

### Success Response
\`\`\`json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
\`\`\`

## Status Codes

| Code | Description |
|-------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Window**: 15 minutes
- **Max Requests**: 100 per window
- **Headers**: \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, \`X-RateLimit-Reset\`

## Security

### Authentication
- JWT tokens are used for authentication
- Tokens expire after 7 days
- Include \`Authorization: Bearer <token>\` header

### Security Headers
- \`X-Content-Type-Options: nosniff\`
- \`X-Frame-Options: DENY\`
- \`X-XSS-Protection: 1; mode=block\`
- \`Strict-Transport-Security: max-age=31536000; includeSubDomains\`

## Testing

Use the provided Postman collection or automated test scripts:
- \`IELTS_Web_API_Postman_Collection.json\`
- \`tests/api-test-runner.js\`

## Support

For API support and questions:
- Check the comprehensive documentation
- Review the security analysis report
- Use the development guide
- Run the automated tests

---

*Generated on ${new Date().toISOString()}*
`;

  fs.writeFileSync("docs/api/README.md", markdown);
  console.log("✅ Markdown documentation generated: docs/api/README.md");
}

// Generate API client examples
function generateClientExamples() {
  const examples = {
    javascript: `
// JavaScript/Node.js Example
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login
async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.data.token;
    
    // Set token for future requests
    api.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
    throw error;
  }
}

// Get user profile
async function getUserProfile() {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Get profile failed:', error.response.data);
    throw error;
  }
}

// Usage example
(async () => {
  try {
    await login('user@example.com', 'password123');
    const profile = await getUserProfile();
    console.log('User profile:', profile);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
        `,
    python: `
# Python Example
import requests
import json

class IELTSAPI:
    def __init__(self, base_url='http://localhost:5000/api'):
        self.base_url = base_url
        self.token = None
        self.headers = {'Content-Type': 'application/json'}
    
    def login(self, email, password):
        """Login and get authentication token"""
        data = {'email': email, 'password': password}
        response = requests.post(
            f'{self.base_url}/auth/login',
            json=data,
            headers=self.headers
        )
        
        if response.status_code == 200:
            result = response.json()
            self.token = result['data']['token']
            self.headers['Authorization'] = f'Bearer {self.token}'
            return result
        else:
            raise Exception(f'Login failed: {response.json()}')
    
    def get_user_profile(self):
        """Get user profile"""
        if not self.token:
            raise Exception('Authentication required')
        
        response = requests.get(
            f'{self.base_url}/users/profile',
            headers=self.headers
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f'Get profile failed: {response.json()}')

# Usage example
try:
    api = IELTSAPI()
    api.login('user@example.com', 'password123')
    profile = api.get_user_profile()
    print('User profile:', profile)
except Exception as e:
    print(f'Error: {e}')
        `,
    curl: `
# cURL Examples

# Login
curl -X POST http://localhost:5000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get user profile
curl -X GET http://localhost:5000/api/users/profile \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get all tests
curl -X GET "http://localhost:5000/api/tests?page=1&limit=10" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Start test
curl -X POST http://localhost:5000/api/tests/1/start \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
        `,
  };

  // Create examples directory
  if (!fs.existsSync("docs/api/examples")) {
    fs.mkdirSync("docs/api/examples", { recursive: true });
  }

  // Write example files
  fs.writeFileSync("docs/api/examples/javascript.js", examples.javascript);
  fs.writeFileSync("docs/api/examples/python.py", examples.python);
  fs.writeFileSync("docs/api/examples/curl.sh", examples.curl);

  console.log("✅ Client examples generated:");
  console.log("  - docs/api/examples/javascript.js");
  console.log("  - docs/api/examples/python.py");
  console.log("  - docs/api/examples/curl.sh");
}

// Main function
function main() {
  console.log("📚 Generating API Documentation...\n");

  try {
    // Create docs/api directory
    if (!fs.existsSync("docs/api")) {
      fs.mkdirSync("docs/api", { recursive: true });
    }

    // Generate all documentation formats
    generateHTMLDocs();
    generateMarkdownDocs();
    generateClientExamples();

    console.log("\n🎉 Documentation generation complete!");
    console.log("\n📁 Generated files:");
    console.log("  - docs/api/index.html (Interactive HTML documentation)");
    console.log("  - docs/api/README.md (Markdown documentation)");
    console.log("  - docs/api/examples/ (Client code examples)");
    console.log("\n🌐 To view documentation:");
    console.log("  1. Run: npm run docs:serve");
    console.log("  2. Open: http://localhost:8080");
  } catch (error) {
    console.error("❌ Documentation generation failed:", error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  main,
  generateHTMLDocs,
  generateMarkdownDocs,
  generateClientExamples,
};
