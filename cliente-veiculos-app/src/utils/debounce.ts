export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  wait = 300,
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function debounced(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced as T & { cancel: () => void };
}