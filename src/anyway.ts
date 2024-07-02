import { type Callback } from './types';
import { caught } from './caught';

export async function anyway<T>(
  callback: Callback<T>,
  cleanup: Callback,
): Promise<T> {
  const result = await caught(callback, cleanup);
  await cleanup();
  
  return result;
}
