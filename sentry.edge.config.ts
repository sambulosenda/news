// This file configures the initialization of Sentry for edge runtime
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Environment
  environment: process.env.NODE_ENV,

  // Debugging
  debug: process.env.NODE_ENV === 'development',

  // Filtering
  beforeSend(event, hint) {
    // Filter out non-error events in development
    if (process.env.NODE_ENV === 'development') {
      if (event.level !== 'error' && event.level !== 'fatal') {
        return null;
      }
    }

    return event;
  },
});