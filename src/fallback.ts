import { type AsyncReturnCallback, type AsyncFallbackCallback } from './types';

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
