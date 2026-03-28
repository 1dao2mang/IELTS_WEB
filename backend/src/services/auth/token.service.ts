// Token Service - JWT token generation and validation
export class TokenService {
  async generateAccessToken(_userId: string) {}
  async generateRefreshToken(_userId: string) {}
  async verifyAccessToken(_token: string) {}
  async verifyRefreshToken(_token: string) {}
}
