export type Callback = () => void;
export type AsyncCallback = () => Promise<void>;

export type ErrorCallback = (err: unknown) => void;
export type AsyncErrorCallback = (err: unknown) => Promise<void>;

export type ReturnCallback<T> = () => T;
export type AsyncReturnCallback<T> = () => Promise<T>;

export type FallbackCallback<T> = (err: unknown) => T;
export type AsyncFallbackCallback<T> = (err: unknown) => Promise<T>;

export type UseCallback<T> = (value: T) => void;
export type AsyncUseCallback<T> = (value: T) => Promise<void>;

export type Destructible = {
  destroy(): Promise<void>;
};

export type Module = {
  init(): Promise<void>;
  destroy(): Promise<void>;
};

export type Mortal = Destructible | Module;
