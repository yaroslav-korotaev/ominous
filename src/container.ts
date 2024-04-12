import { type Destructible } from './types';

export type ContainerSetupCallback<T extends Destructible> = () => Promise<T>;

export class Container {
  private _destructibles: Destructible[];
  
  constructor() {
    this._destructibles = [];
  }
  
  public async use<T extends Destructible>(setup: ContainerSetupCallback<T>): Promise<T> {
    const destructible = await setup();
    this._destructibles.push(destructible);
    
    return destructible;
  }
  
  public async destroy(): Promise<void> {
    for (let i = this._destructibles.length - 1; i >= 0; i--) {
      await this._destructibles[i].destroy();
    }
  }
}
