import { SentryService } from "./services/sentry";

export { SentryService };

const HttpStatusMap: { [status: number]: string } = {
  200: "Success",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Bad Gateway",
  404: "Not Found",
  500: "Internal Server Error",
};

export class AppError extends Error {
  statusCode: number;
  error: string;
  extra: any;
  delaySendToSentry = false;

  constructor(message: string, statusCode: number, code?: string, extra = null) {
    super(message);
    this.statusCode = statusCode || 500;
    this.error = code || HttpStatusMap[statusCode];
    this.extra = extra;
  }

  addExtra(extra: any) {
    this.extra = { ...this.extra, ...extra };
    return this;
  }
  /**
   * Send error to sentry right away
   * @param [logError=false] true to console log this error and false otherwise
   * @returns {AppError}
   */
  sendToSentry(logError = false) {
    SentryService.capture(
      {
        message: this.message,
        stack: this.stack,
      },
      { extra: { statusCode: this.statusCode, error: this.error, ...this.extra } },
      logError
    );
    return this;
  }
  /**
   * Delay sending this error to sentry if error is handled by default errorHandler
   * @returns {AppError}
   */
  lazySendToSentry() {
    this.delaySendToSentry = true;
    return this;
  }
  toHttpJSON() {
    return {
      error: HttpStatusMap[this.statusCode],
      message: this.message,
      statusCode: this.statusCode,
    };
  }

  static make(error: Error, code?: string, extra = null) {
    let err = error;
    if (!err) {
      err = new InternalError();
    }
    return new AppError(err.message, 400, code || "Bad Request", extra);
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal error") {
    super(message, 500);
  }
}
export class UnavailableServiceError extends AppError {
  constructor(message = "Unavailable service error") {
    super(message, 500, "Unavailable Service Error");
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad request") {
    super(message, 400, "Bad Request");
  }
}

export class NotImplementedException extends AppError {
  constructor(message = "Not implemented") {
    super(message, 400, "Not Implemented");
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "Unauthorized");
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "Not Found");
  }
}

export class UnsupportedAssetException extends AppError {
  constructor(message = "Unsupported asset") {
    super(message, 400, "Unsupported asset");
  }
}

export class CryptocompareError extends AppError {}
