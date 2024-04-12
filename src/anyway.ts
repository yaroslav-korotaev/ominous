import { type AsyncCallback, type AsyncReturnCallback } from './types';
import { caught } from './caught';

export async function anyway<T>(
  callback: AsyncReturnCallback<T>,
  destroy: AsyncCallback,
): Promise<T> {
  const result = await caught(callback, destroy);
  await destroy();
  
  return result;
}
