import { type Mortal } from './types';

export class Composite {
  private _mortals: Mortal[];
  
  constructor() {
    this._mortals = [];
  }
  
  protected _use<T extends Mortal>(mortal: T): T {
    this._mortals.push(mortal);
    
    return mortal;
  }
  
  public async init(): Promise<void> {
    let n = -1;
    
    try {
      for (let i = 0; i < this._mortals.length; i++) {
        const mortal = this._mortals[i];
        
        if ('init' in mortal) {
          await mortal.init();
        }
        
        n++;
      }
    } catch (err) {
      for (let i = n; i >= 0; i--) {
        await this._mortals[i].destroy();
      }
      
      throw err;
    }
  }
  
  public async destroy(): Promise<void> {
    for (let i = this._mortals.length - 1; i >= 0; i--) {
      await this._mortals[i].destroy();
    }
  }
}
