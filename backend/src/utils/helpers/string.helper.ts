// String Helper - String comparison and manipulation utilities
export class StringHelper {
  // Case-insensitive comparison
  static compareIgnoreCase(str1: string, str2: string): boolean {
    return str1.toLowerCase().trim() === str2.toLowerCase().trim();
  }

  // Check if string contains substring (case-insensitive)
  static containsIgnoreCase(str: string, substring: string): boolean {
    return str.toLowerCase().includes(substring.toLowerCase());
  }

  // Remove extra whitespace
  static normalizeWhitespace(str: string): string {
    return str.replace(/\s+/g, " ").trim();
  }

  // Calculate string similarity (for fuzzy matching)
  static similarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
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
