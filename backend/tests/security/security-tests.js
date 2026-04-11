#!/usr/bin/env node

/**
 * Security Vulnerability Testing for IELTS Web API
 * Tests for common security vulnerabilities and misconfigurations
 */

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configuration
const config = {
  baseUrl: process.env.API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000,
  maxRetries: 3,
};

// Security test results
const securityResults = {
  summary: {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    vulnerabilities: [],
    riskScore: 0,
  },
  categories: {
    authentication: { tests: 0, vulnerabilities: 0 },
    authorization: { tests: 0, vulnerabilities: 0 },
    inputValidation: { tests: 0, vulnerabilities: 0 },
    sessionManagement: { tests: 0, vulnerabilities: 0 },
    cryptography: { tests: 0, vulnerabilities: 0 },
    errorHandling: { tests: 0, vulnerabilities: 0 },
    logging: { tests: 0, vulnerabilities: 0 },
    dataProtection: { tests: 0, vulnerabilities: 0 },
  },
  details: [],
};

// Utility functions
function log(message, type = "info") {
  const timestamp = new Date().toISOString();
  const icon =
    type === "vulnerability"
      ? "🚨"
      : type === "error"
      ? "❌"
      : type === "success"
      ? "✅"
      : type === "warning"
      ? "⚠️"
      : "ℹ️";
  console.log(`${icon} [${timestamp}] ${message}`);
}

async function makeRequest(method, endpoint, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${config.baseUrl}${endpoint}`,
      timeout: config.timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Security-Test-Scanner/1.0",
        ...headers,
      },
      validateStatus: () => true, // Don't throw on any status code
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return {
      success: true,
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response ? error.response.status : null,
      error: error.response ? error.response.data : error.message,
    };
  }
}

function addVulnerability(
  category,
  severity,
  title,
  description,
  endpoint,
  evidence
) {
  const vulnerability = {
    category,
    severity, // CRITICAL, HIGH, MEDIUM, LOW
    title,
    description,
    endpoint,
    evidence,
    timestamp: new Date().toISOString(),
    cwe: getCWEForCategory(category),
    owasp: getOWASPForCategory(category),
  };

  securityResults.summary.vulnerabilities.push(vulnerability);
  securityResults.categories[category].vulnerabilities++;

  log(`🚨 VULNERABILITY FOUND: ${title} (${severity})`, "vulnerability");
  log(`   Description: ${description}`);
  log(`   Endpoint: ${endpoint}`);
  log(`   Evidence: ${evidence}`);
}

function getCWEForCategory(category) {
  const cweMap = {
    authentication: "CWE-287",
    authorization: "CWE-285",
    inputValidation: "CWE-20",
    sessionManagement: "CWE-384",
    cryptography: "CWE-327",
    errorHandling: "CWE-209",
    logging: "CWE-532",
    dataProtection: "CWE-200",
  };
  return cweMap[category] || "CWE-16";
}

function getOWASPForCategory(category) {
  const owaspMap = {
    authentication: "A07:2021 - Identification and Authentication Failures",
    authorization: "A01:2021 - Broken Access Control",
    inputValidation: "A03:2021 - Injection",
    sessionManagement: "A05:2021 - Security Misconfiguration",
    cryptography: "A02:2021 - Cryptographic Failures",
    errorHandling: "A09:2021 - Security Logging and Monitoring Failures",
    logging: "A09:2021 - Security Logging and Monitoring Failures",
    dataProtection: "A04:2021 - Insecure Design",
  };
  return owaspMap[category] || "A00:2021 - Unknown";
}

// Security Test Functions
async function testAuthenticationSecurity() {
  log("\n🔐 Testing Authentication Security");

  // Test 1: Password in plain text
  log("Testing password storage security...");

  // Register a test user
  const testUser = {
    email: `securitytest${Date.now()}@example.com`,
    password: "TestPassword123!",
    fullName: "Security Test User",
  };

  const registerResult = await makeRequest("POST", "/auth/register", testUser);

  if (registerResult.success) {
    // Try to login with the same password
    const loginResult = await makeRequest("POST", "/auth/login", {
      email: testUser.email,
      password: testUser.password,
    });

    if (loginResult.success) {
      addVulnerability(
        "authentication",
        "CRITICAL",
        "Plain Text Password Storage",
        "Passwords may be stored in plain text without proper hashing",
        "/auth/register, /auth/login",
        "User registration and login succeeded without evidence of password hashing"
      );
    }
  }

  // Test 2: Weak password policy
  log("Testing password policy enforcement...");

  const weakPasswords = ["123456", "password", "admin", "123", "qwerty"];

  for (const weakPassword of weakPasswords) {
    const weakUser = {
      email: `weaktest${Date.now()}@example.com`,
      password: weakPassword,
      fullName: "Weak Password Test",
    };

    const weakResult = await makeRequest("POST", "/auth/register", weakUser);

    if (weakResult.success && weakResult.status === 201) {
      addVulnerability(
        "authentication",
        "HIGH",
        "Weak Password Policy",
        "System accepts weak passwords without proper validation",
        "/auth/register",
        `Successfully registered with weak password: ${weakPassword}`
      );
      break;
    }
  }

  // Test 3: Account enumeration
  log("Testing account enumeration...");

  const testEmails = [
    "existing@example.com",
    "nonexistent@example.com",
    "admin@example.com",
    "user@example.com",
  ];

  for (const email of testEmails) {
    const enumResult = await makeRequest("POST", "/auth/login", {
      email: email,
      password: "wrongpassword",
    });

    // Check if error messages differ between existing and non-existing accounts
    if (enumResult.success === false) {
      const errorMessages = [];

      // Try another non-existent email to compare
      const enumResult2 = await makeRequest("POST", "/auth/login", {
        email: "different@example.com",
        password: "wrongpassword",
      });

      if (enumResult.error && enumResult2.error) {
        const msg1 = JSON.stringify(enumResult.error);
        const msg2 = JSON.stringify(enumResult2.error);

        if (msg1 === msg2) {
          log("✅ Account enumeration protection detected", "success");
        } else {
          addVulnerability(
            "authentication",
            "MEDIUM",
            "Account Enumeration",
            "Different error messages reveal account existence",
            "/auth/login",
            "Error messages differ between existing and non-existing accounts"
          );
        }
      }
    }
  }

  securityResults.categories.authentication.tests = 3;
}

async function testInputValidation() {
  log("\n🛡️ Testing Input Validation");

  // Test 1: SQL Injection
  log("Testing SQL injection vulnerabilities...");

  const sqlInjectionPayloads = [
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "admin'--",
    "' UNION SELECT * FROM users --",
    "'; INSERT INTO users (email, password) VALUES ('hacker@evil.com', 'password'); --",
  ];

  for (const payload of sqlInjectionPayloads) {
    const sqlResult = await makeRequest("POST", "/auth/login", {
      email: payload,
      password: "test",
    });

    // Check for SQL error messages or unexpected behavior
    if (sqlResult.error) {
      const errorStr = JSON.stringify(sqlResult.error).toLowerCase();
      if (
        errorStr.includes("sql") ||
        errorStr.includes("mysql") ||
        errorStr.includes("syntax")
      ) {
        addVulnerability(
          "inputValidation",
          "CRITICAL",
          "SQL Injection Vulnerability",
          "SQL injection payload executed successfully",
          "/auth/login",
          `SQL error returned for payload: ${payload}`
        );
      }
    }
  }

  // Test 2: XSS Protection
  log("Testing XSS protection...");

  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '"><script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    'javascript:alert("XSS")',
    '<svg onload=alert("XSS")>',
  ];

  for (const payload of xssPayloads) {
    const xssResult = await makeRequest("POST", "/auth/register", {
      email: `xsstest${Date.now()}@example.com`,
      password: "TestPassword123!",
      fullName: payload,
    });

    if (xssResult.success) {
      // Check if XSS payload is stored and returned without sanitization
      const profileResult = await makeRequest("GET", "/auth/me", null, {
        Authorization: `Bearer ${xssResult.data.data?.token || ""}`,
      });

      if (profileResult.success && profileResult.data.data) {
        const profileStr = JSON.stringify(profileResult.data.data);
        if (profileStr.includes(payload)) {
          addVulnerability(
            "inputValidation",
            "HIGH",
            "Cross-Site Scripting (XSS)",
            "XSS payload stored and returned without sanitization",
            "/auth/register",
            `XSS payload found in response: ${payload}`
          );
        }
      }
    }
  }

  // Test 3: NoSQL Injection
  log("Testing NoSQL injection...");

  const nosqlPayloads = [
    { $ne: null },
    { $gt: "" },
    { $regex: ".*" },
    { $where: "return true" },
  ];

  for (const payload of nosqlPayloads) {
    const nosqlResult = await makeRequest("POST", "/auth/login", {
      email: payload,
      password: "test",
    });

    if (nosqlResult.success) {
      addVulnerability(
        "inputValidation",
        "HIGH",
        "NoSQL Injection",
        "NoSQL injection payload bypassed authentication",
        "/auth/login",
        `NoSQL payload succeeded: ${JSON.stringify(payload)}`
      );
    }
  }

  // Test 4: Buffer Overflow
  log("Testing buffer overflow protection...");

  const longString = "A".repeat(10000);
  const bufferResult = await makeRequest("POST", "/auth/register", {
    email: `buffertest${Date.now()}@example.com`,
    password: "TestPassword123!",
    fullName: longString,
  });

  // Check if server handles long input gracefully
  if (bufferResult.status >= 500) {
    addVulnerability(
      "inputValidation",
      "MEDIUM",
      "Buffer Overflow",
      "Server crashes with long input",
      "/auth/register",
      `Server error with input length: ${longString.length}`
    );
  }

  securityResults.categories.inputValidation.tests = 4;
}

async function testAuthorization() {
  log("\n🔒 Testing Authorization Controls");

  // Test 1: Direct Object Reference
  log("Testing insecure direct object references...");

  // Try to access other users' data
  const userIds = [1, 2, 999, 1000];

  for (const userId of userIds) {
    const directAccessResult = await makeRequest(
      "GET",
      `/users/${userId}/profile`
    );

    if (directAccessResult.success && directAccessResult.status === 200) {
      addVulnerability(
        "authorization",
        "HIGH",
        "Insecure Direct Object Reference",
        "Can access other users' data without proper authorization",
        `/users/${userId}/profile`,
        `Successfully accessed user ${userId} data`
      );
    }
  }

  // Test 2: Privilege Escalation
  log("Testing privilege escalation...");

  // Try to access admin endpoints as regular user
  const adminEndpoints = [
    "/admin/tests",
    "/admin/users",
    "/admin/questions",
    "/admin/pdf/debug",
  ];

  // First, register and login as regular user
  const regularUser = {
    email: `regular${Date.now()}@example.com`,
    password: "TestPassword123!",
    fullName: "Regular User",
  };

  const registerResult = await makeRequest(
    "POST",
    "/auth/register",
    regularUser
  );
  let userToken = null;

  if (registerResult.success) {
    const loginResult = await makeRequest("POST", "/auth/login", {
      email: regularUser.email,
      password: regularUser.password,
    });

    if (loginResult.success) {
      userToken = loginResult.data.data.token;
    }
  }

  if (userToken) {
    for (const endpoint of adminEndpoints) {
      const privEscalationResult = await makeRequest("GET", endpoint, null, {
        Authorization: `Bearer ${userToken}`,
      });

      if (privEscalationResult.success && privEscalationResult.status === 200) {
        addVulnerability(
          "authorization",
          "CRITICAL",
          "Privilege Escalation",
          "Regular user can access admin endpoints",
          endpoint,
          "Admin endpoint accessible with regular user token"
        );
      }
    }
  }

  // Test 3: Bypass Authorization
  log("Testing authorization bypass techniques...");

  const bypassTechniques = [
    { header: "X-Original-URL", value: "/admin/users" },
    { header: "X-Rewrite-URL", value: "/admin/users" },
    { header: "X-Forwarded-For", value: "127.0.0.1" },
    { method: "OPTIONS", endpoint: "/admin/users" },
  ];

  for (const technique of bypassTechniques) {
    let bypassResult;

    if (technique.method) {
      bypassResult = await makeRequest(technique.method, technique.endpoint);
    } else {
      bypassResult = await makeRequest(
        "GET",
        "/users/profile",
        null,
        technique.headers
      );
    }

    if (bypassResult.success && bypassResult.status === 200) {
      addVulnerability(
        "authorization",
        "HIGH",
        "Authorization Bypass",
        "Authorization controls can be bypassed",
        technique.endpoint || technique.header,
        `Bypass technique: ${JSON.stringify(technique)}`
      );
    }
  }

  securityResults.categories.authorization.tests = 3;
}

async function testSessionManagement() {
  log("\n🔑 Testing Session Management");

  // Test 1: Session Token Security
  log("Testing session token security...");

  const loginUser = {
    email: `sessiontest${Date.now()}@example.com`,
    password: "TestPassword123!",
    fullName: "Session Test User",
  };

  const registerResult = await makeRequest("POST", "/auth/register", loginUser);
  let sessionToken = null;

  if (registerResult.success) {
    const loginResult = await makeRequest("POST", "/auth/login", {
      email: loginUser.email,
      password: loginUser.password,
    });

    if (loginResult.success) {
      sessionToken = loginResult.data.data.token;

      // Check token characteristics
      if (sessionToken) {
        // Check if token is JWT
        const jwtParts = sessionToken.split(".");
        if (jwtParts.length !== 3) {
          addVulnerability(
            "sessionManagement",
            "MEDIUM",
            "Weak Session Token Format",
            "Session token is not using proper JWT format",
            "/auth/login",
            `Token format: ${sessionToken.substring(0, 20)}...`
          );
        }

        // Check token length
        if (sessionToken.length < 32) {
          addVulnerability(
            "sessionManagement",
            "MEDIUM",
            "Weak Session Token Length",
            "Session token is too short",
            "/auth/login",
            `Token length: ${sessionToken.length}`
          );
        }
      }
    }
  }

  // Test 2: Session Fixation
  log("Testing session fixation...");

  if (sessionToken) {
    // Try to use session token with different user
    const fixationResult = await makeRequest("GET", "/auth/me", null, {
      Authorization: `Bearer ${sessionToken}`,
    });

    if (fixationResult.success) {
      log("✅ Session fixation protection detected", "success");
    } else {
      addVulnerability(
        "sessionManagement",
        "MEDIUM",
        "Session Fixation Vulnerability",
        "Session tokens may be vulnerable to fixation attacks",
        "/auth/me",
        "Session token validation issues detected"
      );
    }
  }

  // Test 3: Session Timeout
  log("Testing session timeout...");

  // This would require time-based testing, checking if sessions expire properly
  log("ℹ️ Session timeout testing requires manual verification");

  securityResults.categories.sessionManagement.tests = 3;
}

async function testErrorHandling() {
  log("\n⚠️ Testing Error Handling");

  // Test 1: Information Disclosure in Error Messages
  log("Testing information disclosure in errors...");

  const errorTriggers = [
    { endpoint: "/tests/99999", method: "GET" },
    { endpoint: "/users/99999/profile", method: "GET" },
    {
      endpoint: "/auth/me",
      method: "GET",
      headers: { Authorization: "Bearer invalid" },
    },
    { endpoint: "/auth/login", method: "POST", data: { invalid: "data" } },
  ];

  for (const trigger of errorTriggers) {
    const errorResult = await makeRequest(
      trigger.method,
      trigger.endpoint,
      trigger.data,
      trigger.headers
    );

    if (errorResult.error) {
      const errorStr = JSON.stringify(errorResult.error).toLowerCase();

      // Check for sensitive information in error messages
      const sensitivePatterns = [
        "password",
        "secret",
        "token",
        "key",
        "database",
        "internal",
        "stack trace",
        "file path",
        "sql",
      ];

      for (const pattern of sensitivePatterns) {
        if (errorStr.includes(pattern)) {
          addVulnerability(
            "errorHandling",
            "MEDIUM",
            "Information Disclosure",
            "Error messages contain sensitive information",
            trigger.endpoint,
            `Sensitive pattern found: ${pattern}`
          );
          break;
        }
      }
    }
  }

  // Test 2: Stack Trace Exposure
  log("Testing stack trace exposure...");

  const stackTraceTriggers = [
    { endpoint: "/tests/undefined", method: "GET" },
    {
      endpoint: "/auth/login",
      method: "POST",
      data: { email: null, password: null },
    },
  ];

  for (const trigger of stackTraceTriggers) {
    const stackResult = await makeRequest(
      trigger.method,
      trigger.endpoint,
      trigger.data
    );

    if (stackResult.error) {
      const errorStr = JSON.stringify(stackResult.error);

      // Check for stack trace patterns
      const stackPatterns = [
        "at ",
        ".js:",
        "line ",
        "column ",
        "function ",
        "error: ",
        "trace",
      ];

      for (const pattern of stackPatterns) {
        if (errorStr.includes(pattern)) {
          addVulnerability(
            "errorHandling",
            "HIGH",
            "Stack Trace Exposure",
            "Error responses contain stack traces",
            trigger.endpoint,
            `Stack trace pattern: ${pattern}`
          );
          break;
        }
      }
    }
  }

  securityResults.categories.errorHandling.tests = 2;
}

async function testCryptography() {
  log("\n🔐 Testing Cryptography Implementation");

  // Test 1: HTTPS Enforcement
  log("Testing HTTPS enforcement...");

  const httpResult = await makeRequest("GET", "/tests", null, {}, false);

  // Check if HTTP redirects to HTTPS
  if (httpResult.status !== 301 && httpResult.status !== 302) {
    addVulnerability(
      "cryptography",
      "MEDIUM",
      "No HTTPS Enforcement",
      "API does not enforce HTTPS connections",
      "/tests",
      "HTTP requests not redirected to HTTPS"
    );
  }

  // Test 2: Security Headers
  log("Testing security headers...");

  const headerResult = await makeRequest("GET", "/tests");

  if (headerResult.success && headerResult.headers) {
    const requiredHeaders = [
      "x-content-type-options",
      "x-frame-options",
      "x-xss-protection",
      "strict-transport-security",
      "content-security-policy",
    ];

    const missingHeaders = [];

    for (const header of requiredHeaders) {
      if (!headerResult.headers[header]) {
        missingHeaders.push(header);
      }
    }

    if (missingHeaders.length > 0) {
      addVulnerability(
        "cryptography",
        "MEDIUM",
        "Missing Security Headers",
        "Required security headers are missing",
        "/tests",
        `Missing headers: ${missingHeaders.join(", ")}`
      );
    }
  }

  securityResults.categories.cryptography.tests = 2;
}

async function testRateLimiting() {
  log("\n🚦 Testing Rate Limiting");

  // Test 1: Brute Force Protection
  log("Testing brute force protection...");

  const rapidRequests = [];
  const requestCount = 20;

  for (let i = 0; i < requestCount; i++) {
    rapidRequests.push(
      makeRequest("POST", "/auth/login", {
        email: "bruteforce@example.com",
        password: `password${i}`,
      })
    );
  }

  const rapidResults = await Promise.all(rapidRequests);
  const successCount = rapidResults.filter((r) => r.success).length;
  const rateLimitTriggered = rapidResults.some((r) => r.status === 429);

  if (!rateLimitTriggered && successCount > 5) {
    addVulnerability(
      "authentication",
      "HIGH",
      "No Rate Limiting",
      "API does not limit rapid authentication attempts",
      "/auth/login",
      `${successCount}/${requestCount} requests succeeded`
    );
  } else {
    log("✅ Rate limiting protection detected", "success");
  }

  securityResults.categories.authentication.tests += 1;
}

async function testDataProtection() {
  log("\n🔒 Testing Data Protection");

  // Test 1: Sensitive Data Exposure
  log("Testing sensitive data exposure...");

  const sensitiveEndpoints = ["/auth/me", "/users/profile", "/admin/users"];

  for (const endpoint of sensitiveEndpoints) {
    const dataResult = await makeRequest("GET", endpoint, null, {
      Authorization: "Bearer test-token",
    });

    if (dataResult.success && dataResult.data) {
      const dataStr = JSON.stringify(dataResult.data);

      // Check for sensitive data patterns
      const sensitivePatterns = [
        "password",
        "secret",
        "token",
        "key",
        "hash",
        "salt",
        "ssn",
        "credit",
      ];

      for (const pattern of sensitivePatterns) {
        if (dataStr.toLowerCase().includes(pattern)) {
          addVulnerability(
            "dataProtection",
            "MEDIUM",
            "Sensitive Data Exposure",
            "API responses contain sensitive information",
            endpoint,
            `Sensitive pattern: ${pattern}`
          );
        }
      }
    }
  }

  // Test 2: Data Validation
  log("Testing data validation...");

  const invalidDataTests = [
    {
      endpoint: "/auth/register",
      data: { email: "invalid-email", password: "123" },
    },
    { endpoint: "/tests", data: { invalidField: "test" } },
    { endpoint: "/users/profile", data: { targetBand: "invalid" } },
  ];

  for (const test of invalidDataTests) {
    const validationResult = await makeRequest(
      "POST",
      test.endpoint,
      test.data
    );

    // Should return 400 for invalid data
    if (validationResult.status !== 400 && validationResult.status !== 422) {
      addVulnerability(
        "inputValidation",
        "MEDIUM",
        "Insufficient Data Validation",
        "API accepts invalid data without proper validation",
        test.endpoint,
        `Expected 400/422, got ${validationResult.status}`
      );
    }
  }

  securityResults.categories.dataProtection.tests = 2;
}

// Calculate Risk Score
function calculateRiskScore() {
  const severityWeights = {
    CRITICAL: 10,
    HIGH: 7,
    MEDIUM: 4,
    LOW: 1,
  };

  let totalScore = 0;

  for (const vuln of securityResults.summary.vulnerabilities) {
    totalScore += severityWeights[vuln.severity] || 1;
  }

  // Normalize to 0-100 scale
  securityResults.summary.riskScore = Math.min(100, totalScore);

  return securityResults.summary.riskScore;
}

// Generate Security Report
function generateSecurityReport() {
  securityResults.summary.totalTests = Object.values(
    securityResults.categories
  ).reduce((total, cat) => total + cat.tests, 0);

  securityResults.summary.failedTests =
    securityResults.summary.vulnerabilities.length;
  securityResults.summary.passedTests =
    securityResults.summary.totalTests - securityResults.summary.failedTests;

  const riskScore = calculateRiskScore();

  const report = {
    ...securityResults,
    riskLevel: getRiskLevel(riskScore),
    recommendations: generateSecurityRecommendations(),
    timestamp: new Date().toISOString(),
    environment: {
      baseUrl: config.baseUrl,
      scanner: "IELTS API Security Scanner v1.0",
    },
  };

  // Save report
  const reportPath = "tests/reports/security-report.json";
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Generate HTML report
  const htmlReport = generateSecurityHTMLReport(report);
  fs.writeFileSync("tests/reports/security-report.html", htmlReport);

  return report;
}

function getRiskLevel(score) {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MEDIUM";
  if (score >= 20) return "LOW";
  return "MINIMAL";
}

function generateSecurityRecommendations() {
  const recommendations = [];

  const criticalVulns = securityResults.summary.vulnerabilities.filter(
    (v) => v.severity === "CRITICAL"
  );
  const highVulns = securityResults.summary.vulnerabilities.filter(
    (v) => v.severity === "HIGH"
  );

  if (criticalVulns.length > 0) {
    recommendations.push({
      priority: "CRITICAL",
      title: "Fix Critical Security Vulnerabilities",
      description: `Found ${criticalVulns.length} critical vulnerabilities that require immediate attention`,
      actions: [
        "Implement proper password hashing with bcrypt",
        "Fix SQL injection vulnerabilities",
        "Address privilege escalation issues",
        "Implement proper input validation",
      ],
    });
  }

  if (highVulns.length > 0) {
    recommendations.push({
      priority: "HIGH",
      title: "Address High-Risk Vulnerabilities",
      description: `Found ${highVulns.length} high-risk vulnerabilities`,
      actions: [
        "Add comprehensive input sanitization",
        "Implement proper authorization checks",
        "Add security headers",
        "Fix XSS vulnerabilities",
      ],
    });
  }

  // General recommendations
  recommendations.push({
    priority: "MEDIUM",
    title: "Implement Security Best Practices",
    description: "General security improvements for the API",
    actions: [
      "Implement rate limiting on all endpoints",
      "Add comprehensive logging and monitoring",
      "Use HTTPS for all communications",
      "Regular security audits and penetration testing",
      "Implement content security policy (CSP)",
      "Add proper error handling without information disclosure",
    ],
  });

  return recommendations;
}

function generateSecurityHTMLReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>IELTS API Security Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
        .risk-score { font-size: 48px; font-weight: bold; margin: 20px 0; }
        .critical { color: #dc3545; }
        .high { color: #fd7e14; }
        .medium { color: #ffc107; }
        .low { color: #28a745; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #fff; padding: 20px; border-radius: 5px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .vulnerability { background: #fff; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #dc3545; padding: 15px; }
        .high { border-left-color: #fd7e14; }
        .medium { border-left-color: #ffc107; }
        .low { border-left-color: #28a745; }
        .severity { font-weight: bold; text-transform: uppercase; padding: 2px 8px; border-radius: 3px; color: white; font-size: 12px; }
        .critical { background: #dc3545; }
        .high { background: #fd7e14; }
        .medium { background: #ffc107; }
        .low { background: #28a745; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: bold; }
        .recommendation { background: #e7f3ff; padding: 15px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #007bff; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 IELTS API Security Report</h1>
            <p>Generated: ${report.timestamp}</p>
            <div class="risk-score ${report.riskLevel.toLowerCase()}">
                Risk Score: ${report.summary.riskScore}/100 (${
    report.riskLevel
  })
            </div>
        </div>
        
        <div class="summary">
            <div class="metric">
                <h3>Total Tests</h3>
                <div style="font-size: 24px; font-weight: bold;">${
                  report.summary.totalTests
                }</div>
            </div>
            <div class="metric">
                <h3>Vulnerabilities Found</h3>
                <div style="font-size: 24px; font-weight: bold; color: #dc3545;">${
                  report.summary.failedTests
                }</div>
            </div>
            <div class="metric">
                <h3>Tests Passed</h3>
                <div style="font-size: 24px; font-weight: bold; color: #28a745;">${
                  report.summary.passedTests
                }</div>
            </div>
            <div class="metric">
                <h3>Success Rate</h3>
                <div style="font-size: 24px; font-weight: bold;">${(
                  (report.summary.passedTests / report.summary.totalTests) *
                  100
                ).toFixed(1)}%</div>
            </div>
        </div>
        
        <h2>🚨 Vulnerabilities Found</h2>
        ${report.summary.vulnerabilities
          .map(
            (vuln) => `
            <div class="vulnerability ${vuln.severity.toLowerCase()}">
                <h3>${
                  vuln.title
                } <span class="severity ${vuln.severity.toLowerCase()}">${
              vuln.severity
            }</span></h3>
                <p><strong>Category:</strong> ${vuln.category}</p>
                <p><strong>Description:</strong> ${vuln.description}</p>
                <p><strong>Endpoint:</strong> ${vuln.endpoint}</p>
                <p><strong>Evidence:</strong> ${vuln.evidence}</p>
                <p><strong>CWE:</strong> ${vuln.cwe}</p>
                <p><strong>OWASP:</strong> ${vuln.owasp}</p>
            </div>
        `
          )
          .join("")}
        
        <h2>📊 Category Breakdown</h2>
        <table>
            <tr><th>Category</th><th>Tests Run</th><th>Vulnerabilities</th><th>Risk Level</th></tr>
            ${Object.entries(report.categories)
              .map(
                ([category, stats]) => `
                <tr>
                    <td>${category}</td>
                    <td>${stats.tests}</td>
                    <td>${stats.vulnerabilities}</td>
                    <td>${
                      stats.vulnerabilities > 0
                        ? "⚠️ Needs Attention"
                        : "✅ Secure"
                    }</td>
                </tr>
            `
              )
              .join("")}
        </table>
        
        <h2>💡 Recommendations</h2>
        ${report.recommendations
          .map(
            (rec) => `
            <div class="recommendation">
                <h4>${rec.title} (${rec.priority})</h4>
                <p>${rec.description}</p>
                <ul>
                    ${rec.actions
                      .map((action) => `<li>${action}</li>`)
                      .join("")}
                </ul>
            </div>
        `
          )
          .join("")}
    </div>
</body>
</html>`;
}

// Main execution
async function main() {
  console.log("🔒 Starting IELTS API Security Testing...\n");

  try {
    // Create reports directory
    if (!fs.existsSync("tests/reports")) {
      fs.mkdirSync("tests/reports", { recursive: true });
    }

    // Run all security tests
    await testAuthenticationSecurity();
    await testInputValidation();
    await testAuthorization();
    await testSessionManagement();
    await testErrorHandling();
    await testCryptography();
    await testRateLimiting();
    await testDataProtection();

    // Generate report
    const report = generateSecurityReport();

    // Display summary
    log("\n📊 Security Test Summary:", "success");
    log(`Total Tests: ${report.summary.totalTests}`);
    log(`Vulnerabilities Found: ${report.summary.failedTests}`, "error");
    log(`Tests Passed: ${report.summary.passedTests}`, "success");
    log(`Risk Score: ${report.summary.riskScore}/100 (${report.riskLevel})`);

    if (report.summary.failedTests > 0) {
      log("\n🚨 Critical Issues Requiring Immediate Attention:");
      const criticalVulns = report.summary.vulnerabilities.filter(
        (v) => v.severity === "CRITICAL"
      );
      criticalVulns.forEach((vuln) => {
        log(`- ${vuln.title}: ${vuln.description}`, "error");
      });
    }

    log("\n📁 Security reports generated:");
    log("tests/reports/security-report.json");
    log("tests/reports/security-report.html");

    // Exit with appropriate code
    process.exit(report.summary.failedTests > 0 ? 1 : 0);
  } catch (error) {
    log(`Security testing failed: ${error.message}`, "error");
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, generateSecurityReport };
