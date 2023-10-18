export default function arrayHasChanged<T>(arr: T[]) {
  if (arr.length === 0) return false;
  const firstValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== firstValue) return true;
  }
  return false;
}
