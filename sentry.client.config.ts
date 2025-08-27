// This file configures the initialization of Sentry on the client side
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in production
  
  // Session Replay
  replaysSessionSampleRate: 0.01, // 1% of sessions will be replayed
  replaysOnErrorSampleRate: 0.5, // 50% of sessions with errors will be replayed

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Environment
  environment: process.env.NODE_ENV,

  // Debugging
  debug: process.env.NODE_ENV === 'development',

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Filtering
  beforeSend(event, hint) {
    // Filter out non-error events in development
    if (process.env.NODE_ENV === 'development') {
      if (event.level !== 'error' && event.level !== 'fatal') {
        return null;
      }
    }

    // Filter out known non-critical errors
    const error = hint.originalException;
    if (error && typeof error === 'object' && 'message' in error) {
      const message = error.message as string;
      
      // Filter out common non-critical errors
      if (
        message.includes('ResizeObserver loop limit exceeded') ||
        message.includes('Non-Error promise rejection captured') ||
        message.includes('Network request failed')
      ) {
        return null;
      }
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Facebook related errors
    'fb_xd_fragment',
    // IE specific errors
    'Non-Error promise rejection captured',
    // Safari specific
    'ResizeObserver loop limit exceeded',
    // Network errors that are usually temporary
    'NetworkError',
    'Network request failed',
  ],
});