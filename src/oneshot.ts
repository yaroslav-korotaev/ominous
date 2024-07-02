import { type UseSpawnCallback } from './types';
import { setup } from './setup';

export type OneshotCallback<T = void> = (use: UseSpawnCallback) => Promise<T>;

export async function oneshot<T>(callback: OneshotCallback<T>): Promise<T> {
  return await setup(async (use, destroy) => {
    const result = await callback(use);
    await destroy();
    
    return result;
  });
}
