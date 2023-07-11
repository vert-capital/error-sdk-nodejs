export declare class AppError extends Error {
    statusCode: number;
    error: string;
    extra: any;
    delaySendToSentry: boolean;
    constructor(message: string, statusCode: number, code?: string, extra?: null);
    addExtra(extra: any): this;
    /**
     * Send error to sentry right away
     * @param [logError=false] true to console log this error and false otherwise
     * @returns {AppError}
     */
    sendToSentry(logError?: boolean): this;
    /**
     * Delay sending this error to sentry if error is handled by default errorHandler
     * @returns {AppError}
     */
    lazySendToSentry(): this;
    toHttpJSON(): {
        error: string;
        message: string;
        statusCode: number;
    };
    static make(error: Error, code?: string, extra?: null): AppError;
}
export declare class InternalError extends AppError {
    constructor(message?: string);
}
export declare class UnavailableServiceError extends AppError {
    constructor(message?: string);
}
export declare class BadRequestException extends AppError {
    constructor(message?: string);
}
export declare class NotImplementedException extends AppError {
    constructor(message?: string);
}
export declare class UnauthorizedException extends AppError {
    constructor(message?: string);
}
export declare class NotFoundException extends AppError {
    constructor(message?: string);
}
export declare class UnsupportedAssetException extends AppError {
    constructor(message?: string);
}
export declare class CryptocompareError extends AppError {
}
