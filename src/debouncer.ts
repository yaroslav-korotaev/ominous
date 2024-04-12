import { type UseCallback, type AsyncUseCallback } from './types';

export type DebouncerParams<T> = {
  callback: AsyncUseCallback<T>;
};

export class Debouncer<T> {
  private _callback: AsyncUseCallback<T>;
  private _next: { value: T } | undefined;
  private _promise: Promise<void> | undefined;
  
  constructor(params: DebouncerParams<T>) {
    const {
      callback,
    } = params;
    
    this._callback = callback;
    this._next = undefined;
    this._promise = undefined;
  }
  
  private _execute(): void {
    if (this._promise || !this._next) {
      return;
    }
    
    const { value } = this._next;
    
    this._next = undefined;
    this._promise = this._callback(value).then(() => {
      this._promise = undefined;
      this._execute();
    });
  }
  
  public async init(): Promise<void> {
    // no-op
  }
  
  public async destroy(): Promise<void> {
    if (this._promise) {
      await this._promise;
    }
  }
  
  public callback(): UseCallback<T> {
    return (value: T) => {
      this._next = { value };
      this._execute();
    };
  }
}
