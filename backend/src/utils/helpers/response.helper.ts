// Response Helper - Standardized API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ResponseHelper {
  static success<T = any>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message: message || "Operation successful",
      data,
    };
  }

  static error(
    code: string,
    message: string,
    _statusCode: number = 400,
    details?: any
  ): ApiResponse {
    return {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    };
  }

  static paginated<T = any>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): PaginatedResponse<T> {
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

  static created<T = any>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message: message || "Resource created successfully",
      data,
    };
  }

  static updated<T = any>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message: message || "Resource updated successfully",
      data,
    };
  }

  static deleted(message?: string): ApiResponse {
    return {
      success: true,
      message: message || "Resource deleted successfully",
    };
  }
}
