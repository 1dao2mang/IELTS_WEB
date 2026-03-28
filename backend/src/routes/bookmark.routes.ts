// Bookmark routes - Bookmark management endpoints
import { Router } from "express";
import { BookmarkController } from "../controllers/bookmark/bookmark.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const bookmarkController = new BookmarkController();

// All bookmark routes require authentication
router.get("/", authMiddleware, (req, res, next) =>
  bookmarkController.getAllBookmarks(req, res, next)
);
router.post("/", authMiddleware, (req, res, next) =>
  bookmarkController.addBookmark(req, res, next)
);
router.delete("/:bookmarkId", authMiddleware, (req, res, next) =>
  bookmarkController.removeBookmark(req, res, next)
);
router.patch("/:bookmarkId", authMiddleware, (req, res, next) =>
  bookmarkController.updateBookmark(req, res, next)
);

export default router;
