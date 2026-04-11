// String Helper - String comparison and manipulation utilities
class StringHelper {
  // Case-insensitive comparison
  static compareIgnoreCase(str1, str2) {
    return str1.toLowerCase().trim() === str2.toLowerCase().trim();
  }

  // Check if string contains substring (case-insensitive)
  static containsIgnoreCase(str, substring) {
    return str.toLowerCase().includes(substring.toLowerCase());
  }

  // Remove extra whitespace
  static normalizeWhitespace(str) {
    return str.replace(/\s+/g, " ").trim();
  }

  // Calculate string similarity (for fuzzy matching)
  static similarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  static levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }
}

module.exports = { StringHelper };
