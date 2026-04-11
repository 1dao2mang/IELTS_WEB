#!/usr/bin/env node

/**
 * Comprehensive API Test Runner for IELTS Web API
 * Automatically tests all 65+ endpoints with detailed reporting
 */

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configuration
const config = {
  baseUrl: process.env.API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000,
  retries: 3,
  concurrentRequests: 5,
};

// Test data
const testData = {
  user: {
    email: `testuser${Date.now()}@example.com`,
    password: "TestPassword123!",
    fullName: "Test User",
  },
  admin: {
    email: `admin${Date.now()}@example.com`,
    password: "AdminPassword123!",
    fullName: "Admin User",
  },
  test: {
    title: "API Test IELTS",
    description: "Test created via automated API testing",
    level: "Academic",
    source: "Automated Test Suite",
    isActive: true,
  },
  question: {
    questionGroupId: 1,
    questionIndex: 1,
    questionType: "multiple_choice",
    prompt: "What is the main topic of this passage?",
    score: 1.0,
  },
};

let tokens = {
  user: null,
  admin: null,
};

let testIds = {
  user: null,
  test: null,
  attempt: null,
  question: null,
  bookmark: null,
  submission: null,
  section: null,
};

// Test results
const results = {
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    startTime: new Date().toISOString(),
    endTime: null,
    duration: null,
  },
  categories: {
    authentication: { passed: 0, failed: 0, total: 0 },
    userManagement: { passed: 0, failed: 0, total: 0 },
    tests: { passed: 0, failed: 0, total: 0 },
    skills: { passed: 0, failed: 0, total: 0 },
    progress: { passed: 0, failed: 0, total: 0 },
    bookmarks: { passed: 0, failed: 0, total: 0 },
    badges: { passed: 0, failed: 0, total: 0 },
    admin: { passed: 0, failed: 0, total: 0 },
    system: { passed: 0, failed: 0, total: 0 },
  },
  details: [],
  performance: {
    averageResponseTime: 0,
    slowestEndpoint: null,
    fastestEndpoint: null,
    totalRequests: 0,
  },
};

// Utility functions
function log(message, type = "info") {
  const timestamp = new Date().toISOString();
  const icon =
    type === "error"
      ? "❌"
      : type === "success"
      ? "✅"
      : type === "warning"
      ? "⚠️"
      : "ℹ️";
  console.log(`${icon} [${timestamp}] ${message}`);
}

async function makeRequest(
  method,
  endpoint,
  data = null,
  headers = {},
  token = null,
  expectedStatus = 200
) {
  const startTime = Date.now();

  try {
    const config = {
      method,
      url: `${config.baseUrl}${endpoint}`,
      timeout: config.timeout,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      success: true,
      status: response.status,
      data: response.data,
      responseTime,
      headers: response.headers,
    };
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      success: false,
      status: error.response ? error.response.status : null,
      error: error.response ? error.response.data : error.message,
      responseTime,
    };
  }
}

function updateCategory(category, passed) {
  results.categories[category].total++;
  if (passed) {
    results.categories[category].passed++;
  } else {
    results.categories[category].failed++;
  }
}

function updatePerformance(endpoint, responseTime) {
  results.performance.totalRequests++;
  results.performance.averageResponseTime =
    (results.performance.averageResponseTime *
      (results.performance.totalRequests - 1) +
      responseTime) /
    results.performance.totalRequests;

  if (
    !results.performance.slowestEndpoint ||
    responseTime > results.performance.slowestEndpoint.time
  ) {
    results.performance.slowestEndpoint = { endpoint, time: responseTime };
  }

  if (
    !results.performance.fastestEndpoint ||
    responseTime < results.performance.fastestEndpoint.time
  ) {
    results.performance.fastestEndpoint = { endpoint, time: responseTime };
  }
}

async function runTest(
  name,
  category,
  method,
  endpoint,
  data = null,
  headers = {},
  token = null,
  expectedStatus = 200,
  skip = false
) {
  results.summary.total++;

  if (skip) {
    results.summary.skipped++;
    log(`⏭️  SKIPPED: ${name}`);
    return { skipped: true };
  }

  log(`🧪 Testing: ${method} ${endpoint} - ${name}`);

  const result = await makeRequest(
    method,
    endpoint,
    data,
    headers,
    token,
    expectedStatus
  );

  const passed = result.success && result.status === expectedStatus;
  updateCategory(category, passed);
  updatePerformance(`${method} ${endpoint}`, result.responseTime);

  const testResult = {
    name,
    category,
    method,
    endpoint,
    expectedStatus,
    actualStatus: result.status,
    passed,
    responseTime: result.responseTime,
    error: result.error,
    response: result.success ? result.data : null,
    timestamp: new Date().toISOString(),
  };

  results.details.push(testResult);

  if (passed) {
    log(`✅ PASSED: ${name} (${result.responseTime}ms)`, "success");
  } else {
    log(
      `❌ FAILED: ${name} - Expected: ${expectedStatus}, Got: ${result.status} (${result.responseTime}ms)`,
      "error"
    );
    if (result.error) {
      log(`   Error: ${JSON.stringify(result.error)}`, "error");
    }
  }

  return result;
}

// Authentication Tests
async function testAuthentication() {
  log("\n🔐 Testing Authentication Endpoints");

  // Register user
  const registerResult = await runTest(
    "Register User",
    "authentication",
    "POST",
    "/auth/register",
    testData.user,
    {},
    null,
    201
  );

  if (registerResult.success && registerResult.data.data) {
    tokens.user = registerResult.data.data.token;
    testIds.user = registerResult.data.data.user.id;
  }

  // Register admin
  const adminRegisterResult = await runTest(
    "Register Admin",
    "authentication",
    "POST",
    "/auth/register",
    { ...testData.admin, role: "admin" },
    {},
    null,
    201
  );

  if (adminRegisterResult.success && adminRegisterResult.data.data) {
    tokens.admin = adminRegisterResult.data.data.token;
  }

  // Login user
  const loginResult = await runTest(
    "Login User",
    "authentication",
    "POST",
    "/auth/login",
    { email: testData.user.email, password: testData.user.password },
    {},
    null,
    200
  );

  if (loginResult.success && loginResult.data.data) {
    tokens.user = loginResult.data.data.token;
  }

  // Login admin
  const adminLoginResult = await runTest(
    "Login Admin",
    "authentication",
    "POST",
    "/auth/login",
    { email: testData.admin.email, password: testData.admin.password },
    {},
    null,
    200
  );

  if (adminLoginResult.success && adminLoginResult.data.data) {
    tokens.admin = adminLoginResult.data.data.token;
  }

  // Get current user
  await runTest(
    "Get Current User",
    "authentication",
    "GET",
    "/auth/me",
    null,
    {},
    tokens.user,
    200
  );

  // Logout
  await runTest(
    "Logout User",
    "authentication",
    "POST",
    "/auth/logout",
    null,
    {},
    tokens.user,
    200
  );

  // Forgot password
  await runTest(
    "Forgot Password",
    "authentication",
    "POST",
    "/auth/forgot-password",
    { email: testData.user.email },
    {},
    null,
    200
  );

  // Reset password
  await runTest(
    "Reset Password",
    "authentication",
    "POST",
    "/auth/reset-password",
    { token: "test-token", newPassword: "NewPassword123!" },
    {},
    null,
    200
  );

  // Invalid login
  await runTest(
    "Invalid Login",
    "authentication",
    "POST",
    "/auth/login",
    { email: testData.user.email, password: "wrongpassword" },
    {},
    null,
    401
  );

  // Duplicate registration
  await runTest(
    "Duplicate Registration",
    "authentication",
    "POST",
    "/auth/register",
    testData.user,
    {},
    null,
    400
  );
}

// User Management Tests
async function testUserManagement() {
  log("\n👤 Testing User Management Endpoints");

  // Get user profile
  await runTest(
    "Get User Profile",
    "userManagement",
    "GET",
    "/users/profile",
    null,
    {},
    tokens.user,
    200
  );

  // Update user profile
  await runTest(
    "Update User Profile",
    "userManagement",
    "PUT",
    "/users/profile",
    { fullName: "Updated Name", country: "Vietnam", targetBand: 7.5 },
    {},
    tokens.user,
    200
  );

  // Get user progress
  await runTest(
    "Get User Progress",
    "userManagement",
    "GET",
    "/users/progress",
    null,
    {},
    tokens.user,
    200
  );

  // Get skill progress
  await runTest(
    "Get Skill Progress",
    "userManagement",
    "GET",
    "/users/progress/skills/1",
    null,
    {},
    tokens.user,
    200
  );

  // Get user attempts
  await runTest(
    "Get User Attempts",
    "userManagement",
    "GET",
    "/users/attempts",
    null,
    {},
    tokens.user,
    200
  );

  // Get recent attempts
  await runTest(
    "Get Recent Attempts",
    "userManagement",
    "GET",
    "/users/attempts/recent",
    null,
    {},
    tokens.user,
    200
  );
}

// Test Management Tests
async function testTestManagement() {
  log("\n📝 Testing Test Management Endpoints");

  // Get all tests
  const testsResult = await runTest(
    "Get All Tests",
    "tests",
    "GET",
    "/tests?page=1&limit=10",
    null,
    {},
    null,
    200
  );

  if (
    testsResult.success &&
    testsResult.data.data &&
    testsResult.data.data.tests.length > 0
  ) {
    testIds.test = testsResult.data.data.tests[0].id;
  }

  // Get test by ID
  if (testIds.test) {
    await runTest(
      "Get Test by ID",
      "tests",
      "GET",
      `/tests/${testIds.test}`,
      null,
      {},
      null,
      200
    );

    // Get test sections
    await runTest(
      "Get Test Sections",
      "tests",
      "GET",
      `/tests/${testIds.test}/sections`,
      null,
      {},
      null,
      200
    );
  }

  // Get section questions
  await runTest(
    "Get Section Questions",
    "tests",
    "GET",
    "/tests/sections/1/questions",
    null,
    {},
    null,
    200
  );

  // Start test
  const startTestResult = await runTest(
    "Start Test",
    "tests",
    "POST",
    `/tests/${testIds.test || 1}/start`,
    null,
    {},
    tokens.user,
    201
  );

  if (startTestResult.success && startTestResult.data.data) {
    testIds.attempt = startTestResult.data.data.attemptId;
  }

  // Submit answer
  if (testIds.attempt) {
    await runTest(
      "Submit Answer",
      "tests",
      "POST",
      `/tests/attempts/${testIds.attempt}/answers`,
      { questionId: "1", answer: "A" },
      {},
      tokens.user,
      200
    );

    // Submit test
    await runTest(
      "Submit Test",
      "tests",
      "POST",
      `/tests/attempts/${testIds.attempt}/submit`,
      null,
      {},
      tokens.user,
      200
    );

    // Get attempt result
    await runTest(
      "Get Attempt Result",
      "tests",
      "GET",
      `/tests/attempts/${testIds.attempt}`,
      null,
      {},
      tokens.user,
      200
    );
  }
}

// Skill-Specific Tests
async function testSkills() {
  log("\n🎯 Testing Skill-Specific Endpoints");

  // Reading tests
  await runTest(
    "Get Reading Section",
    "skills",
    "GET",
    "/reading/sections/1",
    null,
    {},
    null,
    200
  );

  const readingAttemptResult = await runTest(
    "Start Reading Attempt",
    "skills",
    "POST",
    "/reading/attempts/start",
    { testId: testIds.test || 1 },
    {},
    tokens.user,
    200
  );

  if (readingAttemptResult.success && readingAttemptResult.data.data) {
    const readingAttemptId = readingAttemptResult.data.data.attemptId;

    await runTest(
      "Submit Reading Attempt",
      "skills",
      "POST",
      `/reading/attempts/${readingAttemptId}/submit`,
      null,
      {},
      tokens.user,
      200
    );

    await runTest(
      "Get Reading Result",
      "skills",
      "GET",
      `/reading/attempts/${readingAttemptId}/result`,
      null,
      {},
      tokens.user,
      200
    );
  }

  // Listening tests
  await runTest(
    "Get Listening Section",
    "skills",
    "GET",
    "/listening/sections/1",
    null,
    {},
    null,
    200
  );

  const listeningAttemptResult = await runTest(
    "Start Listening Attempt",
    "skills",
    "POST",
    "/listening/attempts/start",
    { testId: testIds.test || 1 },
    {},
    tokens.user,
    200
  );

  if (listeningAttemptResult.success && listeningAttemptResult.data.data) {
    const listeningAttemptId = listeningAttemptResult.data.data.attemptId;

    await runTest(
      "Submit Listening Attempt",
      "skills",
      "POST",
      `/listening/attempts/${listeningAttemptId}/submit`,
      null,
      {},
      tokens.user,
      200
    );

    await runTest(
      "Get Listening Result",
      "skills",
      "GET",
      `/listening/attempts/${listeningAttemptId}/result`,
      null,
      {},
      tokens.user,
      200
    );
  }

  // Writing tests
  await runTest(
    "Get Writing Task",
    "skills",
    "GET",
    "/writing/tasks/1",
    null,
    {},
    null,
    200
  );

  const writingSubmissionResult = await runTest(
    "Submit Writing",
    "skills",
    "POST",
    "/writing/submissions/submit",
    {
      testAttemptId: testIds.attempt || 1,
      writingTaskId: 1,
      content:
        "This is a sample writing submission for automated testing purposes.",
    },
    {},
    tokens.user,
    200
  );

  if (writingSubmissionResult.success && writingSubmissionResult.data.data) {
    testIds.submission = writingSubmissionResult.data.data.submissionId;

    await runTest(
      "Get Writing Submission",
      "skills",
      "GET",
      `/writing/submissions/${testIds.submission}`,
      null,
      {},
      tokens.user,
      200
    );

    await runTest(
      "Get Writing Feedback",
      "skills",
      "GET",
      `/writing/submissions/${testIds.submission}/feedback`,
      null,
      {},
      tokens.user,
      200
    );
  }

  // Speaking tests
  await runTest(
    "Get Speaking Topics",
    "skills",
    "GET",
    "/speaking/topics",
    null,
    {},
    null,
    200
  );

  await runTest(
    "Get Topic Prompts",
    "skills",
    "GET",
    "/speaking/topics/1/prompts",
    null,
    {},
    null,
    200
  );

  await runTest(
    "Get Recording",
    "skills",
    "GET",
    "/speaking/recordings/1",
    null,
    {},
    tokens.user,
    200
  );

  await runTest(
    "Get Recording Feedback",
    "skills",
    "GET",
    "/speaking/recordings/1/feedback",
    null,
    {},
    tokens.user,
    200
  );
}

// Progress Tests
async function testProgress() {
  log("\n📊 Testing Progress Endpoints");

  await runTest(
    "Get Progress Overview",
    "progress",
    "GET",
    "/progress/overview",
    null,
    {},
    tokens.user,
    200
  );

  await runTest(
    "Get Skill Progress",
    "progress",
    "GET",
    "/progress/skills/1",
    null,
    {},
    tokens.user,
    200
  );

  await runTest(
    "Get Attempt History",
    "progress",
    "GET",
    "/progress/history",
    null,
    {},
    tokens.user,
    200
  );

  await runTest(
    "Get Statistics",
    "progress",
    "GET",
    "/progress/statistics",
    null,
    {},
    tokens.user,
    200
  );
}

// Bookmarks Tests
async function testBookmarks() {
  log("\n🔖 Testing Bookmarks Endpoints");

  const bookmarkResult = await runTest(
    "Add Bookmark",
    "bookmarks",
    "POST",
    "/bookmarks/",
    { questionId: 1, testId: testIds.test || 1, note: "Test bookmark" },
    {},
    tokens.user,
    201
  );

  if (bookmarkResult.success && bookmarkResult.data.data) {
    testIds.bookmark = bookmarkResult.data.data.id;

    await runTest(
      "Get Bookmarks",
      "bookmarks",
      "GET",
      "/bookmarks/",
      null,
      {},
      tokens.user,
      200
    );

    await runTest(
      "Update Bookmark",
      "bookmarks",
      "PATCH",
      `/bookmarks/${testIds.bookmark}`,
      { note: "Updated bookmark note" },
      {},
      tokens.user,
      200
    );

    await runTest(
      "Remove Bookmark",
      "bookmarks",
      "DELETE",
      `/bookmarks/${testIds.bookmark}`,
      null,
      {},
      tokens.user,
      200
    );
  }
}

// Badges Tests
async function testBadges() {
  log("\n🏆 Testing Badges Endpoints");

  await runTest(
    "Get All Badges",
    "badges",
    "GET",
    "/badges/",
    null,
    {},
    null,
    200
  );

  await runTest(
    "Get User Badges",
    "badges",
    "GET",
    "/badges/user",
    null,
    {},
    tokens.user,
    200
  );
}

// Admin Tests
async function testAdmin() {
  log("\n🔧 Testing Admin Endpoints");

  // Test management
  const createTestResult = await runTest(
    "Create Test",
    "admin",
    "POST",
    "/admin/tests",
    testData.test,
    {},
    tokens.admin,
    201
  );

  if (createTestResult.success && createTestResult.data.data) {
    const newTestId = createTestResult.data.data.id;

    await runTest(
      "Update Test",
      "admin",
      "PUT",
      `/admin/tests/${newTestId}`,
      { title: "Updated Test Title" },
      {},
      tokens.admin,
      200
    );

    await runTest(
      "Delete Test",
      "admin",
      "DELETE",
      `/admin/tests/${newTestId}`,
      null,
      {},
      tokens.admin,
      200
    );
  }

  // Question management
  const createQuestionResult = await runTest(
    "Create Question",
    "admin",
    "POST",
    "/admin/questions",
    testData.question,
    {},
    tokens.admin,
    201
  );

  if (createQuestionResult.success && createQuestionResult.data.data) {
    testIds.question = createQuestionResult.data.data.id;

    await runTest(
      "Update Question",
      "admin",
      "PUT",
      `/admin/questions/${testIds.question}`,
      { prompt: "Updated question prompt" },
      {},
      tokens.admin,
      200
    );

    await runTest(
      "Delete Question",
      "admin",
      "DELETE",
      `/admin/questions/${testIds.question}`,
      null,
      {},
      tokens.admin,
      200
    );
  }

  // User management
  await runTest(
    "Get All Users",
    "admin",
    "GET",
    "/admin/users",
    null,
    {},
    tokens.admin,
    200
  );

  await runTest(
    "Update User Status",
    "admin",
    "PATCH",
    `/admin/users/${testIds.user}/status`,
    { isActive: true },
    {},
    tokens.admin,
    200
  );

  // PDF management
  await runTest(
    "Debug PDF",
    "admin",
    "GET",
    "/admin/pdf/debug",
    null,
    {},
    tokens.admin,
    200
  );

  await runTest(
    "Analyze PDF",
    "admin",
    "GET",
    "/admin/pdf/analyze",
    null,
    {},
    tokens.admin,
    200
  );
}

// System Tests
async function testSystem() {
  log("\n⚙️ Testing System Endpoints");

  await runTest(
    "Health Check",
    "system",
    "GET",
    "/../health",
    null,
    {},
    null,
    200
  );

  await runTest(
    "Get Metrics",
    "system",
    "GET",
    "/../metrics",
    null,
    {},
    null,
    200
  );
}

// Security Tests
async function testSecurity() {
  log("\n🔒 Testing Security Vulnerabilities");

  // Test without authentication
  await runTest(
    "Protected Endpoint Without Auth",
    "authentication",
    "GET",
    "/users/profile",
    null,
    {},
    null,
    401
  );

  // Test invalid token
  await runTest(
    "Invalid Token",
    "authentication",
    "GET",
    "/users/profile",
    null,
    {},
    "invalid-token",
    401
  );

  // Test SQL injection
  await runTest(
    "SQL Injection Attempt",
    "authentication",
    "POST",
    "/auth/login",
    { email: "'; DROP TABLE users; --", password: "test" },
    {},
    null,
    401
  );

  // Test XSS
  await runTest(
    "XSS Attempt",
    "authentication",
    "POST",
    "/auth/register",
    {
      email: "test@example.com",
      password: "test",
      fullName: '<script>alert("xss")</script>',
    },
    {},
    null,
    201
  );

  // Test rate limiting (multiple rapid requests)
  log("Testing rate limiting with 10 rapid requests...");
  const rapidRequests = [];
  for (let i = 0; i < 10; i++) {
    rapidRequests.push(
      makeRequest("POST", "/auth/login", {
        email: "test@example.com",
        password: "test",
      })
    );
  }

  const rapidResults = await Promise.all(rapidRequests);
  const rateLimitTriggered = rapidResults.some((r) => r.status === 429);

  if (rateLimitTriggered) {
    log("✅ Rate limiting is working", "success");
    results.categories.security.passed++;
  } else {
    log("⚠️ Rate limiting may not be configured", "warning");
    results.categories.security.failed++;
  }
  results.categories.security.total++;
}

// Performance Tests
async function testPerformance() {
  log("\n⚡ Testing Performance");

  // Concurrent requests test
  log("Testing concurrent requests...");
  const concurrentRequests = [];
  const startTime = Date.now();

  for (let i = 0; i < config.concurrentRequests; i++) {
    concurrentRequests.push(makeRequest("GET", "/tests"));
  }

  const concurrentResults = await Promise.all(concurrentRequests);
  const endTime = Date.now();
  const totalTime = endTime - startTime;

  const successCount = concurrentResults.filter((r) => r.success).length;
  const averageTime =
    concurrentResults.reduce((sum, r) => sum + r.responseTime, 0) /
    concurrentResults.length;

  log(
    `Concurrent Test: ${successCount}/${
      config.concurrentRequests
    } requests successful in ${totalTime}ms (avg: ${averageTime.toFixed(2)}ms)`
  );

  // Performance thresholds
  const performanceThresholds = {
    averageResponseTime: 500, // ms
    successRate: 95, // %
    concurrentRequests: config.concurrentRequests,
  };

  const performanceScore = {
    responseTimeScore:
      averageTime <= performanceThresholds.averageResponseTime
        ? 100
        : Math.max(
            0,
            100 - (averageTime - performanceThresholds.averageResponseTime) / 10
          ),
    successRateScore:
      (successCount / performanceThresholds.concurrentRequests) * 100,
    overallScore: 0,
  };

  performanceScore.overallScore =
    (performanceScore.responseTimeScore + performanceScore.successRateScore) /
    2;

  log(`Performance Score: ${performanceScore.overallScore.toFixed(2)}%`);

  results.performance.concurrentTest = {
    totalRequests: config.concurrentRequests,
    successCount,
    totalTime,
    averageTime,
    score: performanceScore.overallScore,
  };
}

// Generate Report
function generateReport() {
  results.summary.endTime = new Date().toISOString();
  results.summary.duration =
    new Date(results.summary.endTime) - new Date(results.summary.startTime);
  results.summary.passed =
    results.summary.total - results.summary.failed - results.summary.skipped;

  const report = {
    ...results,
    environment: {
      baseUrl: config.baseUrl,
      nodeVersion: process.version,
      platform: process.platform,
      timestamp: new Date().toISOString(),
    },
    recommendations: generateRecommendations(),
  };

  // Save detailed report
  const reportPath = "tests/reports/api-test-results.json";
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  fs.writeFileSync("tests/reports/api-test-results.html", htmlReport);

  return report;
}

function generateRecommendations() {
  const recommendations = [];

  // Security recommendations
  if (results.categories.authentication.failed > 0) {
    recommendations.push({
      category: "Security",
      priority: "HIGH",
      title: "Fix Authentication Issues",
      description:
        "Some authentication endpoints are failing. Review authentication implementation.",
    });
  }

  // Performance recommendations
  if (results.performance.averageResponseTime > 500) {
    recommendations.push({
      category: "Performance",
      priority: "MEDIUM",
      title: "Optimize Response Times",
      description: `Average response time is ${results.performance.averageResponseTime.toFixed(
        2
      )}ms. Consider implementing caching and database optimization.`,
    });
  }

  // Overall recommendations
  const successRate = (results.summary.passed / results.summary.total) * 100;
  if (successRate < 95) {
    recommendations.push({
      category: "Overall",
      priority: "HIGH",
      title: "Improve Test Success Rate",
      description: `Current success rate is ${successRate.toFixed(
        2
      )}%. Target is >95%.`,
    });
  }

  return recommendations;
}

function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>IELTS API Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; }
        .metric { background: #fff; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .metric h3 { margin: 0; color: #333; }
        .metric .value { font-size: 24px; font-weight: bold; color: #007bff; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; }
        .recommendation { background: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #ffc107; }
        .high { border-left-color: #dc3545; }
        .medium { border-left-color: #ffc107; }
        .low { border-left-color: #28a745; }
    </style>
</head>
<body>
    <div class="header">
        <h1>IELTS Web API Test Report</h1>
        <p>Generated: ${report.environment.timestamp}</p>
        <p>Environment: ${report.environment.baseUrl}</p>
    </div>
    
    <div class="summary">
        <div class="metric">
            <h3>Total Tests</h3>
            <div class="value">${report.summary.total}</div>
        </div>
        <div class="metric">
            <h3>Passed</h3>
            <div class="value passed">${report.summary.passed}</div>
        </div>
        <div class="metric">
            <h3>Failed</h3>
            <div class="value failed">${report.summary.failed}</div>
        </div>
        <div class="metric">
            <h3>Success Rate</h3>
            <div class="value">${(
              (report.summary.passed / report.summary.total) *
              100
            ).toFixed(1)}%</div>
        </div>
    </div>
    
    <h2>Category Breakdown</h2>
    <table>
        <tr><th>Category</th><th>Total</th><th>Passed</th><th>Failed</th><th>Success Rate</th></tr>
        ${Object.entries(report.categories)
          .map(
            ([category, stats]) => `
            <tr>
                <td>${category}</td>
                <td>${stats.total}</td>
                <td class="passed">${stats.passed}</td>
                <td class="failed">${stats.failed}</td>
                <td>${
                  stats.total > 0
                    ? ((stats.passed / stats.total) * 100).toFixed(1)
                    : 0
                }%</td>
            </tr>
        `
          )
          .join("")}
    </table>
    
    <h2>Performance Metrics</h2>
    <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Average Response Time</td><td>${report.performance.averageResponseTime.toFixed(
          2
        )}ms</td></tr>
        <tr><td>Fastest Endpoint</td><td>${
          report.performance.fastestEndpoint
            ? `${report.performance.fastestEndpoint.endpoint} (${report.performance.fastestEndpoint.time}ms)`
            : "N/A"
        }</td></tr>
        <tr><td>Slowest Endpoint</td><td>${
          report.performance.slowestEndpoint
            ? `${report.performance.slowestEndpoint.endpoint} (${report.performance.slowestEndpoint.time}ms)`
            : "N/A"
        }</td></tr>
    </table>
    
    <h2>Recommendations</h2>
    ${report.recommendations
      .map(
        (rec) => `
        <div class="recommendation ${rec.priority.toLowerCase()}">
            <h4>${rec.title} (${rec.priority})</h4>
            <p><strong>${rec.category}:</strong> ${rec.description}</p>
        </div>
    `
      )
      .join("")}
    
    <h2>Failed Tests</h2>
    <table>
        <tr><th>Test Name</th><th>Endpoint</th><th>Expected</th><th>Actual</th><th>Error</th></tr>
        ${report.details
          .filter((test) => !test.passed && !test.skipped)
          .map(
            (test) => `
            <tr>
                <td>${test.name}</td>
                <td>${test.method} ${test.endpoint}</td>
                <td>${test.expectedStatus}</td>
                <td class="failed">${test.actualStatus}</td>
                <td>${test.error || "N/A"}</td>
            </tr>
        `
          )
          .join("")}
    </table>
</body>
</html>`;
}

// Main execution
async function main() {
  console.log("🚀 Starting Comprehensive IELTS API Testing...\n");

  try {
    // Create reports directory
    if (!fs.existsSync("tests/reports")) {
      fs.mkdirSync("tests/reports", { recursive: true });
    }

    // Run all test suites
    await testAuthentication();
    await testUserManagement();
    await testTestManagement();
    await testSkills();
    await testProgress();
    await testBookmarks();
    await testBadges();
    await testAdmin();
    await testSystem();
    await testSecurity();
    await testPerformance();

    // Generate and display report
    const report = generateReport();

    // Display summary
    log("\n📊 Test Summary:", "success");
    log(`Total Tests: ${report.summary.total}`);
    log(`Passed: ${report.summary.passed}`, "success");
    log(`Failed: ${report.summary.failed}`, "error");
    log(`Skipped: ${report.summary.skipped}`);
    log(
      `Success Rate: ${(
        (report.summary.passed / report.summary.total) *
        100
      ).toFixed(1)}%`
    );
    log(`Duration: ${report.summary.duration}ms`);
    log(
      `Average Response Time: ${report.performance.averageResponseTime.toFixed(
        2
      )}ms`
    );

    log("\n📁 Reports generated:");
    log("tests/reports/api-test-results.json");
    log("tests/reports/api-test-results.html");

    if (report.recommendations.length > 0) {
      log("\n💡 Recommendations:");
      report.recommendations.forEach((rec) => {
        log(`- ${rec.title} (${rec.priority}): ${rec.description}`);
      });
    }

    // Exit with appropriate code
    process.exit(report.summary.failed > 0 ? 1 : 0);
  } catch (error) {
    log(`Test execution failed: ${error.message}`, "error");
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, generateReport };
