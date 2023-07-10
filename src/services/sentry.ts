import * as Sentry from '@sentry/node';
import { CaptureContext } from '@sentry/types';

export class SentryService {
  static init(opts: Sentry.NodeOptions = {}) {
    Sentry.init({
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
	  ...opts
    });
  }

  static capture(err: string | Error | Sentry.Event, context?: CaptureContext, log = false) {
    if (log) console.error(err);
    if (typeof err === 'string') {
      Sentry.captureException(new Error(err), context);
    } else if (err instanceof Error) {
      Sentry.captureException(err, context);
    } else {
      Sentry.captureEvent(err);
    }
  }
}
