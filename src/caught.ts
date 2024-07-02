import { type Callback } from './types';

export async function caught<T>(
  callback: Callback<T>,
  cleanup: Callback,
): Promise<T> {
  try {
    return await callback();
  } catch (err) {
    await cleanup();
    
    throw err;
  }
}
