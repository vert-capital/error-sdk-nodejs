import * as Sentry from '@sentry/node';
import { CaptureContext } from '@sentry/types';
export declare class SentryService {
    static init(opts?: Sentry.NodeOptions): void;
    static capture(err: string | Error | Sentry.Event, context?: CaptureContext, log?: boolean): void;
}
