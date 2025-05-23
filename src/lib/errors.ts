// Error handling utilities

import { ERROR_MESSAGES } from "./constants";

// Custom error classes
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = ERROR_MESSAGES.NETWORK) {
    super(message);
    this.name = "NetworkError";
  }
}

// Error handling utilities
export const handleAPIError = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGES.GENERIC;
};

// HTTP status code to error message mapping
export const getErrorMessageFromStatus = (status: number): string => {
  switch (status) {
    case 400:
      return ERROR_MESSAGES.VALIDATION;
    case 401:
    case 403:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 500:
    case 502:
    case 503:
      return ERROR_MESSAGES.SERVER;
    default:
      return ERROR_MESSAGES.GENERIC;
  }
};

// Retry logic for failed requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000,
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
};

// Error boundary helper
export const logError = (error: Error, errorInfo?: any) => {
  console.error("Application Error:", error);
  if (errorInfo) {
    console.error("Error Info:", errorInfo);
  }

  // In production, you might want to send this to an error reporting service
  // Example: Sentry.captureException(error, { extra: errorInfo });
};
