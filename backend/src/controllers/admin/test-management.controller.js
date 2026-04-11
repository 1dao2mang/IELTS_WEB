// Test Management Controller - Admin test management

const prisma = require("../../config/database.config");

class TestManagementController {
  // GET /api/admin/tests
  async getAllTests(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 20;
      
      // If limit is 0 or 'all', fetch all records (take)
      if (req.query.limit === '0' || req.query.limit === 'all') {
        limit = 0; // Represents 'all' for internal logic
      }

      const skip = limit > 0 ? (page - 1) * limit : 0;
      const search = req.query.search;
      const level = req.query.level; 

      const where = {};

      if (search) {
        where.title = { contains: search };
      }

      if (level) {
        where.level = level;
      }

      // Prepare query options
      const queryOptions = {
        where,
        include: {
          testSections: {
            take: 1, // Only need one to determine skill
            include: { skill: true }
          },
          _count: {
            select: { testSections: true },
          },
        },
        orderBy: { createdAt: "desc" },
      };

      // Apply pagination only if limit > 0
      if (limit > 0) {
        queryOptions.skip = skip;
        queryOptions.take = limit;
      }

      const [tests, total] = await Promise.all([
        prisma.test.findMany(queryOptions),
        prisma.test.count({ where }),
      ]);

      return res.json({
        success: true,
        data: {
          tests: tests.map((t) => ({
            id: Number(t.id),
            title: t.title,
            level: t.level,
            skill: t.testSections[0]?.skill?.name || null,
            description: t.description,
            sectionsCount: t._count.testSections,
            createdAt: t.createdAt,
          })),
          pagination: {
            page,
            limit: limit === 0 ? total : limit,
            total,
            totalPages: limit === 0 ? 1 : Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/admin/tests
  async createTest(req, res, next) {
    try {
      const { title, description, level, source } = req.body;

      const test = await prisma.test.create({
        data: {
          title,
          description,
          level,
          source,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Tạo test thành công",
        data: {
          id: Number(test.id),
          title: test.title,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // PUT /api/admin/tests/:testId
  async updateTest(req, res, next) {
    try {
      const { testId } = req.params;
      const { title, description, level, source } = req.body;

      const test = await prisma.test.update({
        where: { id: BigInt(testId) },
        data: { title, description, level, source },
      });

      return res.json({
        success: true,
        message: "Cập nhật test thành công",
        data: {
          id: Number(test.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /api/admin/tests/:testId
  async deleteTest(req, res, next) {
    try {
      const { testId } = req.params;

      await prisma.test.delete({
        where: { id: BigInt(testId) },
      });

      return res.json({
        success: true,
        message: "Xóa test thành công",
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = { TestManagementController };
