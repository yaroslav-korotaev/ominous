import { type AsyncCallback, type AsyncReturnCallback } from './types';

export async function caught<T>(
  callback: AsyncReturnCallback<T>,
  destroy: AsyncCallback,
): Promise<T> {
  try {
    return await callback();
  } catch (err) {
    await destroy();
    
    throw err;
  }
}
