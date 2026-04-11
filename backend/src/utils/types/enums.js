// Enums - Application-wide enumerations
const SkillCode = Object.freeze({
  LISTENING: "listening",
  READING: "reading",
  WRITING: "writing",
  SPEAKING: "speaking"
})

const QuestionType = Object.freeze({
  MULTIPLE_CHOICE: "mcq",
  TRUE_FALSE_NOT_GIVEN: "true_false_not_given",
  MATCHING: "matching",
  FILL_BLANK: "fill_blank",
  SHORT_ANSWER: "short_answer"
})

const AttemptStatus = Object.freeze({
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  ABANDONED: "abandoned"
})

const AttemptMode = Object.freeze({
  PRACTICE: "practice",
  MOCK_TEST: "mock_test"
})

const UserRole = Object.freeze({
  STUDENT: "student",
  ADMIN: "admin"
})

const TestLevel = Object.freeze({
  ACADEMIC: "Academic",
  GENERAL: "General"
})

const WritingTaskType = Object.freeze({
  TASK1: "task1",
  TASK2: "task2"
})

const SpeakingPart = Object.freeze({
  PART1: 1,
  PART2: 2,
  PART3: 3
})

const AnswerMatchType = Object.freeze({
  EXACT: "exact",
  CASE_INSENSITIVE: "case_insensitive",
  CONTAINS: "contains",
  FUZZY: "fuzzy"
})

module.exports = { SkillCode, QuestionType, AttemptStatus, AttemptMode, UserRole, TestLevel, WritingTaskType, SpeakingPart, AnswerMatchType };
