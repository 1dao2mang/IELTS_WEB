// Content Management Controller - Admin content management
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class ContentManagementController {
  // POST /api/admin/questions
  async createQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { questionGroupId, questionType, prompt, score } = req.body;

      const question = await prisma.question.create({
        data: {
          questionGroupId: BigInt(questionGroupId),
          questionIndex: 1, // Should be calculated based on existing questions
          questionType,
          prompt,
          score: score || 1.0,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Tạo question thành công",
        data: {
          id: Number(question.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // PUT /api/admin/questions/:questionId
  async updateQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { questionId } = req.params;
      const { prompt, score, questionType } = req.body;

      const question = await prisma.question.update({
        where: { id: BigInt(questionId) },
        data: { prompt, score, questionType },
      });

      return res.json({
        success: true,
        message: "Cập nhật question thành công",
        data: {
          id: Number(question.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /api/admin/questions/:questionId
  async deleteQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { questionId } = req.params;

      await prisma.question.delete({
        where: { id: BigInt(questionId) },
      });

      return res.json({
        success: true,
        message: "Xóa question thành công",
      });
    } catch (error) {
      return next(error);
    }
  }

  // PUT /api/admin/content/:type/:id
  async updateContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, id } = req.params;
      const updates = req.body;

      // TODO: Implement dynamic content update based on type
      console.log("Update content:", { type, id, updates });

      return res.json({
        success: true,
        message: `Cập nhật ${type} thành công`,
      });
    } catch (error) {
      return next(error);
    }
  }
}
