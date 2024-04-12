import { type AsyncUseCallback } from './types';

export type DeiteratorParams<T> = {
  iterable: AsyncIterable<T>;
  callback: AsyncUseCallback<T>;
};

export class Deiterator<T> {
  private _iterable: AsyncIterable<T>;
  private _callback: AsyncUseCallback<T>;
  private _promise!: Promise<void>;
  
  constructor(params: DeiteratorParams<T>) {
    const {
      iterable,
      callback,
    } = params;
    
    this._iterable = iterable;
    this._callback = callback;
  }
  
  private async _listen(): Promise<void> {
    for await (const value of this._iterable) {
      await this._callback(value);
    }
  }
  
  public async init(): Promise<void> {
    this._promise = this._listen();
  }
  
  public async destroy(): Promise<void> {
    await this._promise;
  }
}
