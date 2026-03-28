import { Request, Response } from "express";
import { PDFParserService } from "../../services/pdf-parser.service";
import path from "path";

const pdfParser = new PDFParserService();

export const debugPDFStructure = async (_req: Request, res: Response) => {
  try {
    // Đường dẫn đến file PDF
    const pdfPath = path.join(__dirname, "../../../IELTS_READING_TEST.pdf");

    const structure = await pdfParser.debugPDFStructure(pdfPath);

    res.json({
      success: true,
      data: structure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const analyzePDFContent = async (_req: Request, res: Response) => {
  try {
    const pdfPath = path.join(__dirname, "../../../IELTS_READING_TEST.pdf");

    // Parse PDF để lấy text
    const text = await pdfParser.parsePDF(pdfPath);

    res.json({
      success: true,
      data: {
        textLength: text.length,
        preview: text.substring(0, 1000),
        testPatterns: text.match(/Reading Practice Test \d+/gi) || [],
        passagePatterns: text.match(/READING PASSAGE \d+/gi) || [],
        questionRanges: text.match(/Questions?\s+\d+-\d+/gi) || [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const importPDFToDatabase = async (_req: Request, res: Response) => {
  try {
    const pdfPath = path.join(__dirname, "../../../IELTS_READING_TEST.pdf");

    console.log("\n🚀 Starting PDF import...");
    const result = await pdfParser.importTestsToDatabase(pdfPath);

    res.json({
      success: true,
      message: `Successfully imported ${result.imported} tests`,
      data: result,
    });
  } catch (error) {
    console.error("❌ Import failed:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
