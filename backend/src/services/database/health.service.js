// Database Health Check Service
const prisma = require("../../config/database.config");

class DatabaseHealthService {
  /**
   * Check database connection
   */
  static async checkConnection() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error("Database connection failed:", error);
      return false;
    }
  }

  /**
   * Get database metrics
   */
  static async getMetrics() {
    try {
      const [userCount, testCount, attemptCount, questionCount] =
        await Promise.all([
          prisma.user.count(),
          prisma.test.count(),
          prisma.testAttempt.count(),
          prisma.question.count(),
        ]);

      return {
        healthy: true,
        metrics: {
          users: userCount,
          tests: testCount,
          attempts: attemptCount,
          questions: questionCount,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Test query performance
   */
  static async testPerformance() {
    const start = Date.now();

    try {
      await prisma.user.findMany({ take: 10 });
      const duration = Date.now() - start;

      return {
        status: duration < 100 ? "excellent" : duration < 500 ? "good" : "slow",
        duration,
        unit: "ms",
      };
    } catch (error) {
      return {
        status: "error",
        error: error.message,
      };
    }
  }

  /**
   * Get connection pool info
   */
  static async getPoolInfo() {
    return {
      connectionLimit: 10,
      poolTimeout: 20,
      connectTimeout: 10,
      provider: "mysql",
    };
  }
}

module.exports = { DatabaseHealthService };
