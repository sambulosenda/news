// This file configures the initialization of Sentry on the server side
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

  // Profiling (Node.js only)
  profilesSampleRate: 0.1,

  // Filtering
  beforeSend(event, hint) {
    // Filter out non-error events in development
    if (process.env.NODE_ENV === 'development') {
      if (event.level !== 'error' && event.level !== 'fatal') {
        return null;
      }
    }

    // Don't send errors from bots/crawlers
    const userAgent = event.request?.headers?.['user-agent'];
    if (userAgent && /bot|crawler|spider|scraper/i.test(userAgent)) {
      return null;
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    // Next.js specific
    'NEXT_NOT_FOUND',
    'NEXT_REDIRECT',
    // GraphQL network errors
    'GraphQL error',
    'Network request failed',
  ],
});