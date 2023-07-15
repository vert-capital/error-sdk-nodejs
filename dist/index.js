'use strict';var Sentry=require('@sentry/node');function _interopNamespaceDefault(e){var n=Object.create(null);if(e){Object.keys(e).forEach(function(k){if(k!=='default'){var d=Object.getOwnPropertyDescriptor(e,k);Object.defineProperty(n,k,d.get?d:{enumerable:true,get:function(){return e[k]}});}})}n.default=e;return Object.freeze(n)}var Sentry__namespace=/*#__PURE__*/_interopNamespaceDefault(Sentry);class SentryService {
    static init(opts = {}) {
        Sentry__namespace.init({
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
            ...opts
        });
    }
    static capture(err, context, log = false) {
        if (log)
            console.error(err);
        if (typeof err === 'string') {
            Sentry__namespace.captureException(new Error(err), context);
        }
        else if (err instanceof Error) {
            Sentry__namespace.captureException(err, context);
        }
        else {
            Sentry__namespace.captureEvent(err);
        }
    }
}const HttpStatusMap = {
    200: "Success",
    201: "Created",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Bad Gateway",
    404: "Not Found",
    500: "Internal Server Error",
    503: "Service Unavailable"
};
class AppError extends Error {
    constructor(message, statusCode, code, extra = null) {
        super(message);
        this.delaySendToSentry = false;
        this.statusCode = statusCode || 500;
        this.error = code || HttpStatusMap[statusCode];
        this.extra = extra;
    }
    addExtra(extra) {
        this.extra = { ...this.extra, ...extra };
        return this;
    }
    /**
     * Send error to sentry right away
     * @param [logError=false] true to console log this error and false otherwise
     * @returns {AppError}
     */
    sendToSentry(logError = false) {
        SentryService.capture({
            message: this.message,
            stack: this.stack,
        }, { extra: { statusCode: this.statusCode, error: this.error, ...this.extra } }, logError);
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
    static make(error, code, extra = null) {
        let err = error;
        if (!err) {
            err = new InternalError();
        }
        return new AppError(err.message, 400, code || "Bad Request", extra);
    }
}
class InternalError extends AppError {
    constructor(message = "Internal error") {
        super(message, 500);
    }
}
class UnavailableServiceError extends AppError {
    constructor(message = "Service unavailable at the moment, try again later") {
        super(message, 503);
    }
}
class BadRequestException extends AppError {
    constructor(message = "Bad request") {
        super(message, 400, "Bad Request");
    }
}
class NotImplementedException extends AppError {
    constructor(message = "Operation not implemented") {
        super(message, 400, "Not Implemented");
    }
}
class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401, "Unauthorized");
    }
}
class NotFoundException extends AppError {
    constructor(message = "Not found") {
        super(message, 404, "Not Found");
    }
}
class UnsupportedAssetException extends AppError {
    constructor(message = "Unsupported asset") {
        super(message, 400, "Unsupported asset");
    }
}
class CryptocompareError extends AppError {
}exports.AppError=AppError;exports.BadRequestException=BadRequestException;exports.CryptocompareError=CryptocompareError;exports.InternalError=InternalError;exports.NotFoundException=NotFoundException;exports.NotImplementedException=NotImplementedException;exports.SentryService=SentryService;exports.UnauthorizedException=UnauthorizedException;exports.UnavailableServiceError=UnavailableServiceError;exports.UnsupportedAssetException=UnsupportedAssetException;