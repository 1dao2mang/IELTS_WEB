// Role Middleware - Role-based access control

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = (req).user?.role || "student";

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Bạn không có quyền truy cập",
        },
      });
    }

    return next();
  };
};

module.exports = { roleMiddleware };
