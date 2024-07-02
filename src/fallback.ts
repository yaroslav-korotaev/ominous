import {
  type Callback,
  type CallbackSync,
  type FallbackCallback,
  type FallbackCallbackSync,
} from './types';

export async function fallback<T>(
  callback: Callback<T>,
  fallback: FallbackCallback<T>,
): Promise<T> {
  try {
    return await callback();
  } catch (err) {
    return await fallback(err);
  }
}

export function fallbackSync<T>(
  callback: CallbackSync<T>,
  fallback: FallbackCallbackSync<T>,
): T {
  try {
    return callback();
  } catch (err) {
    return fallback(err);
  }
}
