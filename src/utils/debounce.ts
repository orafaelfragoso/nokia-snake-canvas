/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number): Function => {
  let timeout: any = 0;

  const debounced = (...args: any[]): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export default debounce;
