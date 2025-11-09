import * as Sentry from '@sentry/nextjs';
import { User } from '@supabase/supabase-js';

/**
 * Set Sentry user context from Supabase user
 * Call this after successful authentication
 */
export function setSentryUser(user: User | null) {
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.user_metadata?.full_name || user.email,
    });
  } else {
    // Clear user context on logout
    Sentry.setUser(null);
  }
}

/**
 * Capture exception with additional context
 */
export function captureSentryError(
  error: Error,
  context?: Record<string, any>
) {
  if (context) {
    Sentry.setContext('additional_context', context);
  }
  Sentry.captureException(error);
}
