// Auth Service - Authentication business logic
class AuthService {
  async register(_email, _password) {}
  async login(_email, _password) {}
  async logout(_userId) {}
  async validateUser(_email, _password) {}
}

module.exports = { AuthService };
