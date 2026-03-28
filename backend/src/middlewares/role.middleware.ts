// Role Middleware - Role-based access control
import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role || "student";

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
