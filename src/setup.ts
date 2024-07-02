import { type Teardown, type UseSpawnCallback } from './types';
import { caught } from './caught';
import { Container } from './container';

export type SetupCallback<T> = (use: UseSpawnCallback, teardown: Teardown) => Promise<T>;

export async function setup<T>(callback: SetupCallback<T>): Promise<T> {
  const container = new Container();
  const use: UseSpawnCallback = async spawn => await container.use(spawn);
  const teardown = async () => await container.destroy();
  
  return await caught(async () => {
    return await callback(use, teardown);
  }, teardown);
}
