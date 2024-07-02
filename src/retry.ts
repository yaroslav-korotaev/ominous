import { type Callback } from './types';
import { sleep } from './sleep';

export type RetryWhenCallback = (err: unknown, retry: number) => boolean;

export type RetryOptions = {
  when: RetryWhenCallback;
  retries: number;
  signal?: AbortSignal;
  minDelay: number;
  maxDelay: number;
  factor: number;
  jitter: number;
};

export async function retry<T>(
  callback: Callback<T>,
  options?: Partial<RetryOptions>,
): Promise<T> {
  const {
    when = () => true,
    retries = 10,
    signal,
    minDelay = 250,
    maxDelay = 120_000,
    factor = 1.5,
    jitter = 0.1,
  } = options ?? {};
  
  let retry = 0;
  
  while (true) {
    try {
      return await callback();
    } catch (err) {
      if (retry < retries && when(err, retry)) {
        const raw = minDelay * Math.pow(factor, retry);
        const limited = Math.min(raw, maxDelay);
        const jittered = limited * (1 - jitter + Math.random() * (jitter * 2));
        const ms = Math.round(jittered);
        
        await sleep(ms, { signal });
        retry++;
      } else {
        throw err;
      }
    }
  }
}
