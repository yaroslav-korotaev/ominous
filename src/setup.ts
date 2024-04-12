import { type CollectUseCallback, collect } from './collect';

export type SetupCallback<T> = (use: CollectUseCallback) => Promise<T>;

export async function setup<T>(callback: SetupCallback<T>): Promise<T> {
  return await collect(async (use, _) => {
    return await callback(use);
  });
}

export async function autodestroy<T>(callback: SetupCallback<T>): Promise<T> {
  return await collect(async (use, destroy) => {
    const result = await callback(use);
    await destroy();
    
    return result;
  });
}
