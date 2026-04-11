// Progress Service - Update and track user progress
class ProgressService {
  async updateUserProgress(_userId, _skillId, _score) {}
  async getProgressBySkill(_userId, _skillId) {}
  async getAllProgress(_userId) {}
}

module.exports = { ProgressService };
