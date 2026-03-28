// JWT Configuration
export const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || "your-access-secret-key",
  refreshTokenSecret:
    process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",
  accessTokenExpiry: "24h", // Extended for development/testing (was 15m)
  refreshTokenExpiry: "30d", // Extended refresh token (was 7d)
};
