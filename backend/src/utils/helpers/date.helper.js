// Date Helper - Date utility functions
class DateHelper {
  static formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getDaysDifference(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

module.exports = { DateHelper };
