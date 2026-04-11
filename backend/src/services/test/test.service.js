// Test Service - Test CRUD operations
class TestService {
  async getAllTests() {}
  async getTestById(_testId) {}
  async getTestSections(_testId) {}
  async createTest(_data) {}
  async updateTest(_testId, _data) {}
  async deleteTest(_testId) {}
}

module.exports = { TestService };
