import { type AsyncCallback, type Destructible } from './types';
import { caught } from './caught';
import { type ContainerSetupCallback, Container } from './container';

export type CollectUseCallback = <T extends Destructible>(
  setup: ContainerSetupCallback<T>,
) => Promise<T>;

export type CollectCallback<T> = (
  use: CollectUseCallback,
  destroy: AsyncCallback,
) => Promise<T>;

export async function collect<T>(callback: CollectCallback<T>): Promise<T> {
  const container = new Container();
  const use: CollectUseCallback = async setup => await container.use(setup);
  const destroy: AsyncCallback = async () => await container.destroy();
  
  return await caught(async () => {
    return await callback(use, destroy);
  }, destroy);
}
