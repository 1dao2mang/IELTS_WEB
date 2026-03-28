// Band Calculator Helper - IELTS band score mapping and calculation
export class BandCalculatorHelper {
  // Listening band score conversion (Academic & General)
  static listeningBandScore(correctAnswers: number): number {
    if (correctAnswers >= 39) return 9.0;
    if (correctAnswers >= 37) return 8.5;
    if (correctAnswers >= 35) return 8.0;
    if (correctAnswers >= 32) return 7.5;
    if (correctAnswers >= 30) return 7.0;
    if (correctAnswers >= 26) return 6.5;
    if (correctAnswers >= 23) return 6.0;
    if (correctAnswers >= 18) return 5.5;
    if (correctAnswers >= 16) return 5.0;
    if (correctAnswers >= 13) return 4.5;
    if (correctAnswers >= 10) return 4.0;
    return 3.5;
  }

  // Reading band score conversion (Academic)
  static readingAcademicBandScore(correctAnswers: number): number {
    if (correctAnswers >= 39) return 9.0;
    if (correctAnswers >= 37) return 8.5;
    if (correctAnswers >= 35) return 8.0;
    if (correctAnswers >= 33) return 7.5;
    if (correctAnswers >= 30) return 7.0;
    if (correctAnswers >= 27) return 6.5;
    if (correctAnswers >= 23) return 6.0;
    if (correctAnswers >= 19) return 5.5;
    if (correctAnswers >= 15) return 5.0;
    if (correctAnswers >= 13) return 4.5;
    if (correctAnswers >= 10) return 4.0;
    return 3.5;
  }

  // Overall band score from 4 skills
  static calculateOverallBand(
    listening: number,
    reading: number,
    writing: number,
    speaking: number
  ): number {
    const average = (listening + reading + writing + speaking) / 4;
    return Math.round(average * 2) / 2; // Round to nearest 0.5
  }
}
