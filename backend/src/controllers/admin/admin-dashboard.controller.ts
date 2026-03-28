// Admin Dashboard Controller - Platform statistics and analytics
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class AdminDashboardController {
  /**
   * GET /api/admin/dashboard/stats
   * Get overall platform statistics
   */
  async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      // User statistics
      const [totalUsers, activeUsers, newUsersToday, newUsersWeek, newUsersMonth] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isActive: true } }),
        prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
        prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
        prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
      ]);

      // Test statistics
      const [totalTests, totalAttempts, completedAttempts] = await Promise.all([
        prisma.test.count({ where: { isActive: true } }),
        prisma.testAttempt.count(),
        prisma.testAttempt.count({ where: { status: "completed" } }),
      ]);

      const completionRate = totalAttempts > 0 
        ? ((completedAttempts / totalAttempts) * 100).toFixed(1)
        : "0.0";

      // Average scores by skill
      const skillScores = await prisma.$queryRaw`
        SELECT 
          s.name as skillName,
          AVG(ta.band_score) as avgScore,
          COUNT(ta.id) as attemptCount
        FROM test_attempts ta
        JOIN skills s ON ta.skill_id = s.id
        WHERE ta.status = 'completed' AND ta.band_score IS NOT NULL
        GROUP BY s.id, s.name
      ` as any[];

      // Speaking AI usage
      const [totalSpeakingAttempts, completedSpeaking, failedSpeaking] = await Promise.all([
        prisma.speakingRecord.count(),
        prisma.speakingRecord.count({ where: { status: "completed" } }),
        prisma.speakingRecord.count({ where: { status: "failed" } }),
      ]);

      const speakingSuccessRate = totalSpeakingAttempts > 0
        ? ((completedSpeaking / totalSpeakingAttempts) * 100).toFixed(1)
        : "0.0";

      return res.json({
        success: true,
        data: {
          users: {
            total: totalUsers,
            active: activeUsers,
            newToday: newUsersToday,
            newThisWeek: newUsersWeek,
            newThisMonth: newUsersMonth,
          },
          tests: {
            total: totalTests,
            totalAttempts,
            completedAttempts,
            completionRate: parseFloat(completionRate),
          },
          skills: skillScores.map((s) => ({
            skill: s.skillName,
            averageScore: parseFloat(s.avgScore?.toString() || "0").toFixed(1),
            attempts: Number(s.attemptCount),
          })),
          speaking: {
            totalAttempts: totalSpeakingAttempts,
            completed: completedSpeaking,
            failed: failedSpeaking,
            successRate: parseFloat(speakingSuccessRate),
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * GET /api/admin/dashboard/charts
   * Get chart data for dashboard
   */
  async getCharts(_req: Request, res: Response, next: NextFunction) {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      // User registration trend (last 30 days)
      const userTrend = await prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM users
        WHERE created_at >= ${thirtyDaysAgo}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      ` as any[];

      // Test completion trend (last 30 days)
      const testTrend = await prisma.$queryRaw`
        SELECT 
          DATE(completed_at) as date,
          COUNT(*) as count
        FROM test_attempts
        WHERE completed_at >= ${thirtyDaysAgo} AND status = 'completed'
        GROUP BY DATE(completed_at)
        ORDER BY date ASC
      ` as any[];

      // Score distribution (Band Score)
      const scoreDistribution = await prisma.$queryRaw`
        SELECT 
          TRUNCATE(band_score, 0) as bandFloor,
          COUNT(*) as count
        FROM test_attempts
        WHERE status = 'completed' AND band_score IS NOT NULL
        GROUP BY TRUNCATE(band_score, 0)
        ORDER BY bandFloor ASC
      ` as any[];

      // Peak usage hours
      const peakHours = await prisma.$queryRaw`
        SELECT 
          HOUR(started_at) as hour,
          COUNT(*) as count
        FROM test_attempts
        WHERE started_at >= ${thirtyDaysAgo}
        GROUP BY HOUR(started_at)
        ORDER BY hour ASC
      ` as any[];

      return res.json({
        success: true,
        data: {
          userRegistrations: userTrend.map((item) => ({
            date: item.date,
            count: Number(item.count),
          })),
          testCompletions: testTrend.map((item) => ({
            date: item.date,
            count: Number(item.count),
          })),
          scoreDistribution: scoreDistribution.map((item) => ({
            range: `Band ${Number(item.bandFloor)}`,
            count: Number(item.count),
          })),
          peakHours: peakHours.map((item) => ({
            hour: Number(item.hour),
            count: Number(item.count),
          })),
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
