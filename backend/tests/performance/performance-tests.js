#!/usr/bin/env node

/**
 * Performance Testing for IELTS Web API
 * Tests API performance under various load conditions
 */

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configuration
const config = {
  baseUrl: process.env.API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000,
  concurrentUsers: [1, 5, 10, 25, 50],
  testDuration: 30, // seconds
  rampUpTime: 10, // seconds
};

// Performance test results
const performanceResults = {
  summary: {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    averageResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: Infinity,
    requestsPerSecond: 0,
    errorRate: 0,
    startTime: new Date().toISOString(),
    endTime: null,
    duration: null,
  },
  endpoints: {},
  loadTests: {},
  recommendations: [],
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

async function makeRequest(method, endpoint, data = null, headers = {}) {
  const startTime = Date.now();

  try {
    const response = await axios({
      method,
      url: `${config.baseUrl}${endpoint}`,
      timeout: config.timeout,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data,
    });

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

// Performance test functions
async function testEndpointPerformance(
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) {
  log(`Testing performance of ${method} ${endpoint}`);

  const results = {
    endpoint,
    method,
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalResponseTime: 0,
    averageResponseTime: 0,
    minResponseTime: Infinity,
    maxResponseTime: 0,
    errors: [],
  };

  // Test with different concurrency levels
  for (const concurrency of config.concurrentUsers) {
    log(`Testing with ${concurrency} concurrent requests...`);

    const concurrentResults = {
      concurrency,
      requests: [],
      startTime: Date.now(),
    };

    // Make concurrent requests
    const promises = [];
    for (let i = 0; i < concurrency; i++) {
      promises.push(makeRequest(method, endpoint, data, headers));
    }

    const concurrentResponses = await Promise.all(promises);
    const endTime = Date.now();

    // Process results
    concurrentResponses.forEach((response, index) => {
      results.totalRequests++;
      concurrentResults.requests.push({
        index,
        responseTime: response.responseTime,
        success: response.success,
        status: response.status,
      });

      if (response.success) {
        results.successfulRequests++;
        results.totalResponseTime += response.responseTime;
        results.minResponseTime = Math.min(
          results.minResponseTime,
          response.responseTime
        );
        results.maxResponseTime = Math.max(
          results.maxResponseTime,
          response.responseTime
        );
      } else {
        results.failedRequests++;
        results.errors.push({
          concurrency,
          error: response.error,
          status: response.status,
        });
      }
    });

    results.averageResponseTime =
      results.totalResponseTime / results.successfulRequests;
    concurrentResults.duration = endTime - concurrentResults.startTime;
    concurrentResults.averageResponseTime =
      concurrentResults.requests.reduce(
        (sum, req) => sum + req.responseTime,
        0
      ) / concurrentResults.requests.length;
    concurrentResults.successRate =
      (results.successfulRequests / results.totalRequests) * 100;

    performanceResults.loadTests[`${method}_${endpoint}_${concurrency}`] =
      concurrentResults;
  }

  performanceResults.endpoints[`${method}_${endpoint}`] = results;
  return results;
}

async function testLoadBalancing() {
  log("\n⚖️ Testing Load Balancing and Scalability");

  const endpoints = [
    { path: "/tests", method: "GET" },
    { path: "/auth/me", method: "GET", protected: true },
    { path: "/users/profile", method: "GET", protected: true },
  ];

  for (const endpoint of endpoints) {
    const headers = endpoint.protected
      ? { Authorization: "Bearer test-token" }
      : {};
    await testEndpointPerformance(
      endpoint.path,
      endpoint.method,
      null,
      headers
    );
  }
}

async function testMemoryUsage() {
  log("\n🧠 Testing Memory Usage");

  const initialMemory = process.memoryUsage();
  log(
    `Initial memory usage: ${Math.round(
      initialMemory.heapUsed / 1024 / 1024
    )}MB`
  );

  // Make many requests to test memory leaks
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(makeRequest("GET", "/tests"));
  }

  await Promise.all(promises);

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  const finalMemory = process.memoryUsage();
  const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
  log(
    `Final memory usage: ${Math.round(finalMemory.heapUsed / 1024 / 1024)}MB`
  );
  log(`Memory increase: ${Math.round(memoryIncrease / 1024 / 1024)}MB`);

  if (memoryIncrease > 100 * 1024 * 1024) {
    // 100MB increase is concerning
    performanceResults.recommendations.push({
      type: "memory",
      severity: "HIGH",
      title: "Potential Memory Leak",
      description: `Memory increased by ${Math.round(
        memoryIncrease / 1024 / 1024
      )}MB during testing`,
      recommendation: "Investigate potential memory leaks in request handling",
    });
  }

  performanceResults.summary.memoryUsage = {
    initial: initialMemory,
    final: finalMemory,
    increase: memoryIncrease,
  };
}

async function testDatabasePerformance() {
  log("\n🗄️ Testing Database Performance");

  const dbTests = [
    {
      name: "Simple Query",
      endpoint: "/tests?page=1&limit=10",
      expectedMaxTime: 200,
    },
    {
      name: "Complex Query with Relations",
      endpoint: "/tests/1",
      expectedMaxTime: 500,
    },
    {
      name: "Large Dataset Query",
      endpoint: "/tests?page=1&limit=100",
      expectedMaxTime: 1000,
    },
  ];

  for (const test of dbTests) {
    const results = [];
    log(`Testing ${test.name}...`);

    // Run multiple iterations
    for (let i = 0; i < 10; i++) {
      const result = await makeRequest("GET", test.endpoint);
      results.push(result.responseTime);
    }

    const avgTime =
      results.reduce((sum, time) => sum + time, 0) / results.length;
    const maxTime = Math.max(...results);

    log(`${test.name}: Avg ${avgTime.toFixed(2)}ms, Max ${maxTime}ms`);

    if (avgTime > test.expectedMaxTime) {
      performanceResults.recommendations.push({
        type: "database",
        severity: "MEDIUM",
        title: "Slow Database Query",
        description: `${test.name} took ${avgTime.toFixed(2)}ms on average`,
        recommendation: "Optimize database query and add appropriate indexes",
      });
    }

    performanceResults.summary.databasePerformance =
      performanceResults.summary.databasePerformance || {};
    performanceResults.summary.databasePerformance[test.name] = {
      averageTime: avgTime,
      maxTime,
      expectedMaxTime: test.expectedMaxTime,
      withinThreshold: avgTime <= test.expectedMaxTime,
    };
  }
}

async function testResponseCompression() {
  log("\n🗜️ Testing Response Compression");

  const endpoint = "/tests?page=1&limit=50"; // Large response

  // Test without compression
  const uncompressedResponse = await makeRequest("GET", endpoint);
  const uncompressedSize = JSON.stringify(uncompressedResponse.data).length;

  // Test with compression header
  const compressedResponse = await makeRequest("GET", endpoint, null, {
    "Accept-Encoding": "gzip, deflate",
  });
  const compressedSize = JSON.stringify(compressedResponse.data).length;

  log(`Uncompressed response size: ${uncompressedSize} bytes`);
  log(`Compressed response size: ${compressedSize} bytes`);

  const compressionRatio =
    ((uncompressedSize - compressedSize) / uncompressedSize) * 100;
  log(`Compression ratio: ${compressionRatio.toFixed(2)}%`);

  if (compressionRatio < 50) {
    performanceResults.recommendations.push({
      type: "compression",
      severity: "MEDIUM",
      title: "Poor Response Compression",
      description: `Compression ratio is only ${compressionRatio.toFixed(2)}%`,
      recommendation: "Enable gzip compression for API responses",
    });
  }

  performanceResults.summary.compression = {
    uncompressedSize,
    compressedSize,
    compressionRatio,
    compressionEnabled: compressionRatio > 50,
  };
}

async function testRateLimiting() {
  log("\n🚦 Testing Rate Limiting");

  const endpoint = "/auth/login";
  const rapidRequests = [];

  // Make rapid requests
  for (let i = 0; i < 20; i++) {
    rapidRequests.push(
      makeRequest("POST", endpoint, {
        email: "test@example.com",
        password: "wrongpassword",
      })
    );
  }

  const results = await Promise.all(rapidRequests);
  const rateLimitedRequests = results.filter((r) => r.status === 429).length;
  const successRequests = results.filter((r) => r.status === 200).length;
  const errorRequests = results.filter((r) => r.status === 401).length;

  log(`Rate limited requests: ${rateLimitedRequests}/20`);
  log(`Success requests: ${successRequests}/20`);
  log(`Error requests: ${errorRequests}/20`);

  if (rateLimitedRequests === 0) {
    performanceResults.recommendations.push({
      type: "security",
      severity: "HIGH",
      title: "No Rate Limiting",
      description: "No rate limiting detected on authentication endpoint",
      recommendation: "Implement rate limiting to prevent brute force attacks",
    });
  }

  performanceResults.summary.rateLimiting = {
    totalRequests: 20,
    rateLimitedRequests,
    successRequests,
    errorRequests,
    rateLimitingEnabled: rateLimitedRequests > 0,
  };
}

// Generate performance report
function generatePerformanceReport() {
  performanceResults.summary.endTime = new Date().toISOString();
  performanceResults.summary.duration =
    new Date(performanceResults.summary.endTime) -
    new Date(performanceResults.summary.startTime);

  // Calculate overall metrics
  let totalRequests = 0;
  let totalResponseTime = 0;
  let totalErrors = 0;

  Object.values(performanceResults.endpoints).forEach((endpoint) => {
    totalRequests += endpoint.totalRequests;
    totalResponseTime += endpoint.totalResponseTime;
    totalErrors += endpoint.failedRequests;
  });

  performanceResults.summary.totalTests = totalRequests;
  performanceResults.summary.passedTests = totalRequests - totalErrors;
  performanceResults.summary.failedTests = totalErrors;
  performanceResults.summary.averageResponseTime =
    totalResponseTime / totalRequests;
  performanceResults.summary.errorRate = (totalErrors / totalRequests) * 100;
  performanceResults.summary.requestsPerSecond =
    totalRequests / (performanceResults.summary.duration / 1000);

  const report = {
    ...performanceResults,
    environment: {
      baseUrl: config.baseUrl,
      nodeVersion: process.version,
      platform: process.platform,
      timestamp: new Date().toISOString(),
    },
  };

  // Save report
  const reportPath = "tests/reports/performance-report.json";
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  fs.writeFileSync("tests/reports/performance-report.html", htmlReport);

  return report;
}

function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>IELTS API Performance Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #fff; padding: 20px; border-radius: 5px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .metric h3 { margin: 0; color: #333; }
        .metric .value { font-size: 24px; font-weight: bold; color: #007bff; }
        .performance { background: #fff; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #007bff; padding: 15px; }
        .warning { border-left-color: #ffc107; }
        .error { border-left-color: #dc3545; }
        .success { border-left-color: #28a745; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: bold; }
        .recommendation { background: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #ffc107; }
        .high { border-left-color: #dc3545; }
        .medium { border-left-color: #ffc107; }
        .low { border-left-color: #28a745; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ IELTS API Performance Report</h1>
            <p>Generated: ${report.environment.timestamp}</p>
            <p>Environment: ${report.environment.baseUrl}</p>
        </div>
        
        <div class="summary">
            <div class="metric">
                <h3>Total Requests</h3>
                <div class="value">${report.summary.totalTests}</div>
            </div>
            <div class="metric">
                <h3>Success Rate</h3>
                <div class="value">${(100 - report.summary.errorRate).toFixed(
                  1
                )}%</div>
            </div>
            <div class="metric">
                <h3>Avg Response Time</h3>
                <div class="value">${report.summary.averageResponseTime.toFixed(
                  2
                )}ms</div>
            </div>
            <div class="metric">
                <h3>Requests/Second</h3>
                <div class="value">${report.summary.requestsPerSecond.toFixed(
                  2
                )}</div>
            </div>
        </div>
        
        <h2>🔍 Performance Analysis</h2>
        
        <h3>Endpoint Performance</h3>
        <table>
            <tr><th>Endpoint</th><th>Method</th><th>Total Requests</th><th>Success Rate</th><th>Avg Response Time</th><th>Max Response Time</th></tr>
            ${Object.entries(report.endpoints)
              .map(
                ([key, endpoint]) => `
                <tr>
                    <td>${endpoint.endpoint}</td>
                    <td>${endpoint.method}</td>
                    <td>${endpoint.totalRequests}</td>
                    <td>${(
                      (endpoint.successfulRequests / endpoint.totalRequests) *
                      100
                    ).toFixed(1)}%</td>
                    <td>${endpoint.averageResponseTime.toFixed(2)}ms</td>
                    <td>${endpoint.maxResponseTime}ms</td>
                </tr>
            `
              )
              .join("")}
        </table>
        
        <h3>📊 Load Test Results</h3>
        <table>
            <tr><th>Endpoint</th><th>Concurrency</th><th>Duration</th><th>Avg Response Time</th><th>Success Rate</th></tr>
            ${Object.entries(report.loadTests)
              .map(
                ([key, test]) => `
                <tr>
                    <td>${key.split("_").slice(0, -2).join("_")}</td>
                    <td>${test.concurrency}</td>
                    <td>${test.duration}ms</td>
                    <td>${test.averageResponseTime.toFixed(2)}ms</td>
                    <td>${test.successRate.toFixed(1)}%</td>
                </tr>
            `
              )
              .join("")}
        </table>
        
        <h2>💡 Recommendations</h2>
        ${report.recommendations
          .map(
            (rec) => `
            <div class="recommendation ${rec.severity.toLowerCase()}">
                <h4>${rec.title} (${rec.severity})</h4>
                <p><strong>Type:</strong> ${rec.type}</p>
                <p><strong>Description:</strong> ${rec.description}</p>
                <p><strong>Recommendation:</strong> ${rec.recommendation}</p>
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
  console.log("⚡ Starting IELTS API Performance Testing...\n");

  try {
    // Create reports directory
    if (!fs.existsSync("tests/reports")) {
      fs.mkdirSync("tests/reports", { recursive: true });
    }

    // Run performance tests
    await testLoadBalancing();
    await testMemoryUsage();
    await testDatabasePerformance();
    await testResponseCompression();
    await testRateLimiting();

    // Generate report
    const report = generatePerformanceReport();

    // Display summary
    log("\n📊 Performance Test Summary:", "success");
    log(`Total Requests: ${report.summary.totalTests}`);
    log(`Successful Requests: ${report.summary.passedTests}`, "success");
    log(`Failed Requests: ${report.summary.failedTests}`, "error");
    log(`Success Rate: ${(100 - report.summary.errorRate).toFixed(1)}%`);
    log(
      `Average Response Time: ${report.summary.averageResponseTime.toFixed(
        2
      )}ms`
    );
    log(`Requests per Second: ${report.summary.requestsPerSecond.toFixed(2)}`);

    if (report.recommendations.length > 0) {
      log("\n💡 Performance Recommendations:");
      report.recommendations.forEach((rec) => {
        log(`- ${rec.title}: ${rec.description}`, "warning");
      });
    }

    log("\n📁 Performance reports generated:");
    log("tests/reports/performance-report.json");
    log("tests/reports/performance-report.html");

    // Exit with appropriate code
    process.exit(report.summary.failedTests > 0 ? 1 : 0);
  } catch (error) {
    log(`Performance testing failed: ${error.message}`, "error");
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, generatePerformanceReport };
