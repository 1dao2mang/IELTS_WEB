// Response Helper - Standardized API responses




class ResponseHelper {
  static success(data, message) {
    return {
      success: true,
      message: message || "Operation successful",
      data,
    };
  }

  static error(
    code,
    message,
    _statusCode = 400,
    details
  ) {
    return {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    };
  }

  static paginated(
    data,
    page,
    limit,
    total,
    message
  ) {
    return {
      success: true,
      message: message || "Data retrieved successfully",
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static created(data, message) {
    return {
      success: true,
      message: message || "Resource created successfully",
      data,
    };
  }

  static updated(data, message) {
    return {
      success: true,
      message: message || "Resource updated successfully",
      data,
    };
  }

  static deleted(message) {
    return {
      success: true,
      message: message || "Resource deleted successfully",
    };
  }
}

module.exports = { ResponseHelper };
