// Bookmark Controller - Handle bookmark operations
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class BookmarkController {
  // GET /api/bookmarks
  async getAllBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);

      const bookmarks = await prisma.bookmark.findMany({
        where: { userId },
        include: { question: true },
      });

      return res.json({
        success: true,
        data: bookmarks.map((b) => ({
          id: Number(b.id),
          questionId: Number(b.questionId),
          questionPrompt: b.question?.prompt || "N/A",
          note: b.note,
          createdAt: b.createdAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/bookmarks
  async addBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);
      const { questionId, note } = req.body;

      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          questionId: BigInt(questionId),
          note,
        },
      });

      return res.json({
        success: true,
        message: "Thêm bookmark thành công",
        data: {
          id: Number(bookmark.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /api/bookmarks/:bookmarkId
  async removeBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookmarkId } = req.params;

      await prisma.bookmark.delete({
        where: { id: BigInt(bookmarkId) },
      });

      return res.json({
        success: true,
        message: "Xóa bookmark thành công",
      });
    } catch (error) {
      return next(error);
    }
  }

  // PATCH /api/bookmarks/:bookmarkId
  async updateBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookmarkId } = req.params;
      const { note } = req.body;

      const bookmark = await prisma.bookmark.update({
        where: { id: BigInt(bookmarkId) },
        data: { note },
      });

      return res.json({
        success: true,
        message: "Cập nhật bookmark thành công",
        data: {
          id: Number(bookmark.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
