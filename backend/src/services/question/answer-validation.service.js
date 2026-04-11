// Answer Validation Service - Validate user answers
class AnswerValidationService {
  async validateAnswer(_questionId, _userAnswer) {}
  async validateMultipleChoice(_questionId, _selectedOption) {}
  async validateFillBlank(_questionId, _userAnswer) {}
}

module.exports = { AnswerValidationService };
