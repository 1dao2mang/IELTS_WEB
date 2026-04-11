// Token Service - JWT token generation and validation
class TokenService {
  async generateAccessToken(_userId) {}
  async generateRefreshToken(_userId) {}
  async verifyAccessToken(_token) {}
  async verifyRefreshToken(_token) {}
}

module.exports = { TokenService };
