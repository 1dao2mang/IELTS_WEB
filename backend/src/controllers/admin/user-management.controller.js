// User Management Controller - Admin user management

const prisma = require("../../config/database.config");

class AdminUserManagementController {
  // GET /api/admin/users
  // FIXED: Removed deletedAt filter, added search/pagination
  async getAllUsers(req, res, next) {
    try {
      console.log("⚡ [DEBUG] Executing getAllUsers - FIX VERIFIED ⚡");
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      const search = req.query.search;
      const role = req.query.role;
      const status = req.query.status;

      const where = {};

      if (search) {
        where.OR = [
          { email: { contains: search } },
          { profile: { fullName: { contains: search } } },
        ];
      }

      if (role) {
        where.role = role;
      }

      if (status === 'active') {
        where.isActive = true;
      } else if (status === 'inactive') {
        where.isActive = false;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          include: { profile: true },
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.user.count({ where }),
      ]);

      return res.json({
        success: true,
        data: {
          users: users.map((u) => ({
            id: Number(u.id),
            email: u.email,
            role: u.role,
            isActive: u.isActive,
            fullName: u.profile?.fullName,
            createdAt: u.createdAt,
          })),
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // PATCH /api/admin/users/:userId
  async updateUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const user = await prisma.user.update({
        where: { id: BigInt(userId) },
        data: { role },
      });

      return res.json({
        success: true,
        message: "Cập nhật user thành công",
        data: {
          id: Number(user.id),
          role: user.role,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // PATCH /api/admin/users/:userId/status
  async updateUserStatus(req, res, next) {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;

      const user = await prisma.user.update({
        where: { id: BigInt(userId) },
        data: { isActive },
      });

      return res.json({
        success: true,
        message: "User status updated successfully",
        data: {
          id: Number(user.id),
          isActive: user.isActive,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/admin/users/:userId
  async getUserDetail(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: BigInt(userId) },
        include: {
          profile: true,
          _count: {
            select: {
              testAttempts: true,
              userBadges: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: { code: "USER_NOT_FOUND", message: "User not found" },
        });
      }

      return res.json({
        success: true,
        data: {
          id: Number(user.id),
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          fullName: user.profile?.fullName,
          avatar: user.profile?.avatarUrl,
          testAttempts: user._count.testAttempts,
          badges: user._count.userBadges,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/admin/users
  async createUser(req, res, next) {
    try {
      const { email, password, role, fullName } = req.body;
      const bcrypt = require("bcryptjs");
      
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role,
          profile: fullName
            ? {
                create: { fullName },
              }
            : undefined,
        },
        include: { profile: true },
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          id: Number(user.id),
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /api/admin/users/:userId
  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;

      // Soft delete by setting isActive to false
      await prisma.user.update({
        where: { id: BigInt(userId) },
        data: { isActive: false },
      });

      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/admin/users/:userId/activity
  async getUserActivity(req, res, next) {
    try {
      const { userId } = req.params;

      const activity = await prisma.activityLog.findMany({
        where: { userId: BigInt(userId) },
        orderBy: { createdAt: "desc" },
        take: 50,
      });

      return res.json({
        success: true,
        data: activity.map((a) => ({
          id: Number(a.id),
          action: a.action,
          metadata: a.metadata,
          createdAt: a.createdAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = { AdminUserManagementController };
