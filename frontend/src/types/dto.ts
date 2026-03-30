import { SkillType, Question } from './index'

export interface ITestDTO {
  id: string | number | bigint;
  title?: string;
  description?: string;
  difficulty?: string;
  timeLimit?: number;
  content?: string;
  prompt?: string;
  questions?: Question[];
}

export interface IAttemptDTO {
  id?: string | number | bigint;
  testId?: string | number | bigint;
  skill?: SkillType;
  testTitle?: string;
  score?: number;
  completedAt?: string;
}
