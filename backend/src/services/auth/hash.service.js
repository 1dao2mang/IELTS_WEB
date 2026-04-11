// Hash Service - Password hashing with bcrypt
class HashService {
  async hashPassword(_password) {}
  async comparePassword(_password, _hash) {}
}

module.exports = { HashService };
