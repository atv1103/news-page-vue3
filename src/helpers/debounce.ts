export const debounce = <T extends (...args: any[]) => void>(
  cb: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<typeof cb>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  };
};
