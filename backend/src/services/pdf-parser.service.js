const fs = require("fs");
const { PrismaClient } = require("@prisma/client");









class PDFParserService {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async parsePDF(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const { PDFParse } = require("pdf-parse");
      const parser = new PDFParse({ data: dataBuffer });
      const result = await parser.getText();
      return result.text;
    } catch (error) {
      console.error("PDF Parse error details:", error);
      throw new Error(
        `Failed to parse PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async debugPDFStructure(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const { PDFParse } = require("pdf-parse");
    const parser = new PDFParse({ data: dataBuffer });
    const info = await parser.getInfo();
    const text = await parser.getText();

    return {
      numPages: info.total,
      info: info.info,
      metadata: info.metadata,
      textLength: text.text.length,
      textSample: text.text.substring(0, 5000),
    };
  }

  async importTestsToDatabase(pdfPath) {
    const text = await this.parsePDF(pdfPath);

    console.log("📄 PDF text length:", text.length);
    console.log("📝 First 1000 chars:", text.substring(0, 1000));

    const tests = await this.parseTestsFromText(text);

    console.log(`\n✅ Found ${tests.length} tests`);

    const results = [];
    for (const test of tests) {
      const result = await this.importTestToDb(test);
      results.push(result);
      console.log(`✅ Imported test: ${test.title}`);
    }

    return {
      totalTests: tests.length,
      imported: results.length,
      tests: results,
    };
  }

  async parseTestsFromText(text) {
    const tests = [];

    const testMatches = text.match(/Reading Practice Test \d+/gi) || [];

    console.log(`\n🔍 Found ${testMatches.length} test headers:`, testMatches);

    const testSections = text.split(/Reading Practice Test \d+/i);

    for (let i = 1; i < testSections.length; i++) {
      const testContent = testSections[i];

      const passages = this.parsePassages(testContent);
      const questions = this.parseQuestions(testContent);

      tests.push({
        title: `IELTS Reading Practice Test ${i}`,
        sections: [
          {
            type: "READING",
            title: `Reading Practice Test ${i}`,
            passages,
            questions,
          },
        ],
      });
    }

    return tests;
  }

  parsePassages(text) {
    const passages = [];
    const passageMatches = text.match(/PASSAGE \d+/gi) || [];

    if (passageMatches.length > 0) {
      const passageSections = text.split(/PASSAGE \d+/i);

      for (let i = 1; i < passageSections.length; i++) {
        const content = passageSections[i].trim();
        const endIndex = content.search(/Questions?\s+\d+-\d+/i);
        const passageContent =
          endIndex > 0
            ? content.substring(0, endIndex).trim()
            : content.substring(0, 500);

        passages.push({
          title: `Passage ${i}`,
          content: passageContent,
        });
      }
    }

    return passages;
  }

  parseQuestions(text) {
    const questions = [];
    const addedQuestions = new Set();

    const questionRanges = text.match(/Questions?\s+(\d+)-(\d+)/gi) || [];

    console.log("  Question ranges found:", questionRanges);

    // Tìm các main ranges (ranges lớn nhất không bị bao phủ bởi range khác)
    const ranges = [];
    questionRanges.forEach((range) => {
      const match = range.match(/Questions?\s+(\d+)-(\d+)/i);
      if (match) {
        ranges.push({
          start: parseInt(match[1]),
          end: parseInt(match[2]),
          text: range,
        });
      }
    });

    // Sắp xếp theo start, rồi theo độ dài giảm dần
    ranges.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return b.end - b.start - (a.end - a.start);
    });

    // Chỉ lấy các range không overlap
    const mainRanges = [];
    for (const range of ranges) {
      const isSubRange = mainRanges.some(
        (main) => range.start >= main.start && range.end <= main.end
      );
      if (!isSubRange) {
        mainRanges.push(range);
      }
    }

    console.log(
      "  Main ranges:",
      mainRanges.map((r) => `${r.start}-${r.end}`)
    );

    // Tạo questions từ main ranges
    mainRanges.forEach((range) => {
      for (let i = range.start; i <= range.end; i++) {
        if (!addedQuestions.has(i)) {
          questions.push({
            questionNumber: i,
            questionText: `Question ${i}`,
            questionType: "MULTIPLE_CHOICE",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          });
          addedQuestions.add(i);
        }
      }
    });

    return questions;
  }

  async importTestToDb(parsedTest) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Tạo Test
      const test = await tx.test.create({
        data: {
          title: parsedTest.title,
          level: "INTERMEDIATE",
          description: `IELTS Reading Practice Test`,
        },
      });

      // 2. Lấy hoặc tạo Skill READING
      let readingSkill = await tx.skill.findFirst({
        where: { code: "READING" },
      });

      if (!readingSkill) {
        readingSkill = await tx.skill.create({
          data: {
            code: "READING",
            name: "Reading",
          },
        });
      }

      // 3. Tạo TestSection
      for (const section of parsedTest.sections) {
        const testSection = await tx.testSection.create({
          data: {
            testId: test.id,
            skillId: readingSkill.id,
            sectionIndex: 1,
            title: section.title,
            instructions: "Read the passages and answer the questions.",
          },
        });

        // 4. Tạo Passage và QuestionGroup
        if (section.passages && section.passages.length > 0) {
          // Sắp xếp questions theo số thứ tự
          const sortedQuestions = [...section.questions].sort(
            (a, b) => a.questionNumber - b.questionNumber
          );

          // Phân chia questions cho mỗi passage
          const questionsPerPassage = Math.ceil(
            sortedQuestions.length / section.passages.length
          );

          for (let i = 0; i < section.passages.length; i++) {
            const passageData = section.passages[i];

            // Tạo Passage
            const passage = await tx.passage.create({
              data: {
                testSectionId: testSection.id,
                title: passageData.title,
                content: passageData.content,
              },
            });

            // Lấy questions cho passage này
            const startIdx = i * questionsPerPassage;
            const endIdx = Math.min(
              (i + 1) * questionsPerPassage,
              sortedQuestions.length
            );
            const questionsForThisPassage = sortedQuestions.slice(
              startIdx,
              endIdx
            );

            if (questionsForThisPassage.length === 0) continue;

            const firstQ = questionsForThisPassage[0].questionNumber;
            const lastQ =
              questionsForThisPassage[questionsForThisPassage.length - 1]
                .questionNumber;

            // Tạo QuestionGroup
            const questionGroup = await tx.questionGroup.create({
              data: {
                testSectionId: testSection.id,
                passageId: passage.id,
                groupTitle: `${passageData.title} Questions`,
                questionRange: `${firstQ}-${lastQ}`,
              },
            });

            // 5. Tạo Questions
            for (const q of questionsForThisPassage) {
              const question = await tx.question.create({
                data: {
                  questionGroupId: questionGroup.id,
                  questionIndex: q.questionNumber,
                  questionType: q.questionType,
                  prompt: q.questionText,
                  score: 1,
                },
              });

              // 6. Tạo QuestionOptions
              if (q.options && q.options.length > 0) {
                for (const opt of q.options) {
                  const isCorrect = opt === q.correctAnswer;
                  await tx.questionOption.create({
                    data: {
                      questionId: question.id,
                      optionKey: opt,
                      content: `Option ${opt}`,
                      isCorrect,
                    },
                  });
                }
              }

              // 7. Tạo QuestionAnswer
              if (q.correctAnswer) {
                await tx.questionAnswer.create({
                  data: {
                    questionId: question.id,
                    answerText: q.correctAnswer,
                  },
                });
              }
            }
          }
        }
      }

      return test;
    });
  }
}

module.exports = { PDFParserService };
