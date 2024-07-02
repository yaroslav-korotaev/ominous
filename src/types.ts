export type ErrorCallback = (err: unknown) => void;

export type Callback<T = void> = () => Promise<T>;
export type CallbackSync<T = void> = () => T;

export type FallbackCallback<T> = (err: unknown) => Promise<T>;
export type FallbackCallbackSync<T> = (err: unknown) => T;

export type UseCallback<T> = (value: T) => Promise<void>;
export type UseCallbackSync<T> = (value: T) => void;

export type Destructible = {
  destroy(): Promise<void>;
};

export type Teardown = () => Promise<void>;

export type Mortal = Destructible | Teardown;

export type SpawnCallback<T extends Mortal = Mortal> = () => Promise<T>;
export type UseSpawnCallback = <T extends Mortal = Mortal>(spawn: SpawnCallback<T>) => Promise<T>;
