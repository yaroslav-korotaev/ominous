import {
  type ReturnCallback,
  type AsyncReturnCallback,
  type FallbackCallback,
  type AsyncFallbackCallback,
} from './types';

export async function fallback<T>(
  callback: AsyncReturnCallback<T>,
  fallback: AsyncFallbackCallback<T>,
): Promise<T> {
  try {
    return await callback();
  } catch (err) {
    return await fallback(err);
  }
}

export function fallbackSync<T>(
  callback: ReturnCallback<T>,
  fallback: FallbackCallback<T>,
): T {
  try {
    return callback();
  } catch (err) {
    return fallback(err);
  }
}
