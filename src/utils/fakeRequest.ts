export function fakeRequest<T = any>(delay: number, value: T) {
  return new Promise((resolve) => setTimeout(resolve, delay, value));
}
