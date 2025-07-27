/**
 * Django Error Handler Class
 * Handles various types of Django API error responses
 *
 * @example
 * // Basic usage
 * const handler = new DjangoErrorHandler(error, 'Default error message');
 * const message = handler.getMessage();
 * handler.logError('Component Name');
 *
 * @example
 * // Quick utility usage
 * const message = DjangoErrorUtils.getMessage(error, 'Default message');
 * const handledMessage = DjangoErrorUtils.handle(error, 'Default message', 'Context');
 *
 * @example
 * // Status code checking
 * if (handler.isValidationError()) {
 *   // Handle validation error
 * }
 * if (handler.isUnauthorized()) {
 *   // Handle auth error
 * }
 *
 * @example
 * // Field-specific errors
 * const fieldErrors = handler.getFieldErrors();
 * if (fieldErrors.email) {
 *   console.log('Email errors:', fieldErrors.email);
 * }
 *
 * @example
 * // React component usage
 * try {
 *   const response = await api.createSubscription(data);
 * } catch (error) {
 *   const handler = new DjangoErrorHandler(error, 'Failed to create subscription');
 *   setError(handler.getMessage());
 *   handler.logError('Subscription Creation');
 * }
 */
export class DjangoErrorHandler {
  private error: any;
  private defaultMessage: string;

  constructor(error: any, defaultMessage: string = 'An error occurred') {
    this.error = error;
    this.defaultMessage = defaultMessage;
  }

  /**
   * Extract error message from Django response
   */
  private extractMessage(): string {
    // Handle API client error format (result.error)
    if (this.error?.error) {
      const errorData = this.error.error;

      // Handle non_field_errors (general errors)
      if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
        return errorData.non_field_errors[0];
      }

      // Handle field-specific errors
      if (typeof errorData === 'object') {
        const fieldErrors = Object.values(errorData).flat();
        if (fieldErrors.length > 0) {
          const firstError = fieldErrors[0];
          if (Array.isArray(firstError)) {
            return typeof firstError[0] === 'string' ? firstError[0] : String(firstError[0]);
          }
          return typeof firstError === 'string' ? firstError : String(firstError);
        }
      }

      // Handle string error
      if (typeof errorData === 'string') {
        return errorData;
      }
    }

    // Handle traditional error format (error.response.data)
    if (this.error?.response?.data) {
      const errorData = this.error.response.data;

      // Handle non_field_errors (general errors)
      if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
        return errorData.non_field_errors[0];
      }

      // Handle field-specific errors
      if (typeof errorData === 'object') {
        const fieldErrors = Object.values(errorData).flat();
        if (fieldErrors.length > 0) {
          const firstError = fieldErrors[0];
          if (Array.isArray(firstError)) {
            return typeof firstError[0] === 'string' ? firstError[0] : String(firstError[0]);
          }
          return typeof firstError === 'string' ? firstError : String(firstError);
        }
      }

      // Handle string error
      if (typeof errorData === 'string') {
        return errorData;
      }
    }

    return this.error?.message || this.defaultMessage;
  }

  /**
   * Get field-specific errors
   */
  getFieldErrors(): Record<string, string[]> {
    const fieldErrors: Record<string, string[]> = {};

    // Handle API client error format (result.error)
    if (this.error?.error) {
      const errorData = this.error.error;
      if (typeof errorData === 'object') {
        Object.keys(errorData).forEach((field) => {
          if (field !== 'non_field_errors') {
            const errors = errorData[field];
            fieldErrors[field] = Array.isArray(errors) ? errors : [errors];
          }
        });
      }
    }

    // Handle traditional error format (error.response.data)
    if (this.error?.response?.data) {
      const errorData = this.error.response.data;
      if (typeof errorData === 'object') {
        Object.keys(errorData).forEach((field) => {
          if (field !== 'non_field_errors') {
            const errors = errorData[field];
            fieldErrors[field] = Array.isArray(errors) ? errors : [errors];
          }
        });
      }
    }

    return fieldErrors;
  }

  /**
   * Get general errors (non_field_errors)
   */
  getGeneralErrors(): string[] {
    // Handle API client error format (result.error)
    if (this.error?.error?.non_field_errors) {
      return this.error.error.non_field_errors;
    }

    // Handle traditional error format (error.response.data)
    if (this.error?.response?.data?.non_field_errors) {
      return this.error.response.data.non_field_errors;
    }

    return [];
  }

  /**
   * Get HTTP status code
   */
  getStatusCode(): number | null {
    // Handle API client error format (result.response.status)
    if (this.error?.response?.status) {
      return this.error.response.status;
    }

    // Handle traditional error format (error.response.status)
    if (this.error?.response?.status) {
      return this.error.response.status;
    }

    return null;
  }

  /**
   * Check if error is a specific HTTP status
   */
  isStatus(statusCode: number): boolean {
    return this.getStatusCode() === statusCode;
  }

  /**
   * Check if error is 400 Bad Request
   */
  isBadRequest(): boolean {
    return this.isStatus(400);
  }

  /**
   * Check if error is 401 Unauthorized
   */
  isUnauthorized(): boolean {
    return this.isStatus(401);
  }

  /**
   * Check if error is 403 Forbidden
   */
  isForbidden(): boolean {
    return this.isStatus(403);
  }

  /**
   * Check if error is 404 Not Found
   */
  isNotFound(): boolean {
    return this.isStatus(404);
  }

  /**
   * Check if error is 422 Unprocessable Entity
   */
  isValidationError(): boolean {
    return this.isStatus(422);
  }

  /**
   * Check if error is 500 Internal Server Error
   */
  isServerError(): boolean {
    return this.isStatus(500);
  }

  /**
   * Get the main error message
   */
  getMessage(): string {
    return this.extractMessage();
  }

  /**
   * Get all error messages as array
   */
  getAllMessages(): string[] {
    const messages: string[] = [];

    // Add general errors
    messages.push(...this.getGeneralErrors());

    // Add field errors
    const fieldErrors = this.getFieldErrors();
    Object.values(fieldErrors).forEach((errors) => {
      messages.push(...errors);
    });

    // If no specific errors found, add the main message
    if (messages.length === 0) {
      messages.push(this.getMessage());
    }

    return messages;
  }

  /**
   * Get formatted error summary
   */
  getSummary(): {
    message: string;
    statusCode: number | null;
    fieldErrors: Record<string, string[]>;
    generalErrors: string[];
  } {
    return {
      message: this.getMessage(),
      statusCode: this.getStatusCode(),
      fieldErrors: this.getFieldErrors(),
      generalErrors: this.getGeneralErrors(),
    };
  }

  /**
   * Log error to console with context
   */
  logError(context: string = 'API Error'): void {
    console.error(`${context}:`, {
      message: this.getMessage(),
      statusCode: this.getStatusCode(),
      fieldErrors: this.getFieldErrors(),
      generalErrors: this.getGeneralErrors(),
      originalError: this.error,
    });
  }
}

/**
 * Static utility functions for quick error handling
 */
export class DjangoErrorUtils {
  /**
   * Quick error message extraction
   */
  static getMessage(error: any, defaultMessage: string = 'An error occurred'): string {
    const handler = new DjangoErrorHandler(error, defaultMessage);
    return handler.getMessage();
  }

  /**
   * Quick error handling with logging
   */
  static handle(error: any, defaultMessage: string = 'An error occurred', context?: string): string {
    const handler = new DjangoErrorHandler(error, defaultMessage);
    if (context) {
      handler.logError(context);
    }
    return handler.getMessage();
  }

  /**
   * Check if error is a specific type
   */
  static isValidationError(error: any): boolean {
    const handler = new DjangoErrorHandler(error);
    return handler.isValidationError();
  }

  /**
   * Check if error is authentication related
   */
  static isAuthError(error: any): boolean {
    const handler = new DjangoErrorHandler(error);
    return handler.isUnauthorized() || handler.isForbidden();
  }

  /**
   * Check if error is server related
   */
  static isServerError(error: any): boolean {
    const handler = new DjangoErrorHandler(error);
    return handler.isServerError();
  }
}
