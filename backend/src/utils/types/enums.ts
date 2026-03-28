// Enums - Application-wide enumerations
export enum SkillCode {
  LISTENING = "listening",
  READING = "reading",
  WRITING = "writing",
  SPEAKING = "speaking",
}

export enum QuestionType {
  MULTIPLE_CHOICE = "mcq",
  TRUE_FALSE_NOT_GIVEN = "true_false_not_given",
  MATCHING = "matching",
  FILL_BLANK = "fill_blank",
  SHORT_ANSWER = "short_answer",
}

export enum AttemptStatus {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ABANDONED = "abandoned",
}

export enum AttemptMode {
  PRACTICE = "practice",
  MOCK_TEST = "mock_test",
}

export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
}

export enum TestLevel {
  ACADEMIC = "Academic",
  GENERAL = "General",
}

export enum WritingTaskType {
  TASK1 = "task1",
  TASK2 = "task2",
}

export enum SpeakingPart {
  PART1 = 1,
  PART2 = 2,
  PART3 = 3,
}

export enum AnswerMatchType {
  EXACT = "exact",
  CASE_INSENSITIVE = "case_insensitive",
  CONTAINS = "contains",
  FUZZY = "fuzzy",
}
