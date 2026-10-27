import { useCallback, useState } from "react";

/** Read a JSON object from localStorage, falling back to {} when storage is blocked or the value is corrupt. */
export function readJSON<T extends object>(key: string): Partial<T> {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

/** Returns false when the browser refuses to store (private mode, quota, blocked site data). */
export function writeJSON(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** React state mirrored to a localStorage key; writes happen on every update. */
export function useLocalStorage<T extends object>(key: string) {
  const [value, setValue] = useState<Partial<T>>(() => readJSON<T>(key));
  const update = useCallback(
    (next: Partial<T>) => {
      setValue(next);
      writeJSON(key, next);
    },
    [key],
  );
  return [value, update] as const;
}
