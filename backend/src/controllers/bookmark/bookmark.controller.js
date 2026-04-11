// Bookmark Controller - Handle bookmark operations

const prisma = require("../../config/database.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

class BookmarkController {
  // GET /api/bookmarks
  getAllBookmarks = catchAsync(async (req, res, next) => {
    const userId = BigInt((req).user?.id || 1);

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
  });

  // POST /api/bookmarks
  addBookmark = catchAsync(async (req, res, next) => {
    const userId = BigInt((req).user?.id || 1);
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
  });

  // DELETE /api/bookmarks/:bookmarkId
  removeBookmark = catchAsync(async (req, res, next) => {
    const { bookmarkId } = req.params;

    await prisma.bookmark.delete({
      where: { id: BigInt(bookmarkId) },
    });

    return res.json({
      success: true,
      message: "Xóa bookmark thành công",
    });
  });

  // PATCH /api/bookmarks/:bookmarkId
  updateBookmark = catchAsync(async (req, res, next) => {
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
  });
}

module.exports = { BookmarkController };
