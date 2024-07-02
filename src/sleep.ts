export type SleepOptions = {
  signal?: AbortSignal;
};

export async function sleep(ms: number, options?: Partial<SleepOptions>): Promise<void> {
  const {
    signal,
  } = options ?? {};
  
  await new Promise<void>((resolve, reject) => {
    if (signal) {
      const abort = () => reject(new Error('aborted', { cause: signal.reason }));
      
      if (signal.aborted) {
        return abort();
      }
      
      const timeout = setTimeout(() => {
        signal.removeEventListener('abort', fail);
        resolve();
      }, ms);
      
      const fail = () => {
        clearTimeout(timeout);
        signal.removeEventListener('abort', fail);
        abort();
      };
      
      signal.addEventListener('abort', fail);
    } else {
      setTimeout(resolve, ms);
    }
  });
}
