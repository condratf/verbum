import { useEffect, useState } from "react";

type Initializer<T> = T | (() => T);

const isBrowser = typeof window !== "undefined";

function readValue<T>(key: string, initialValue: Initializer<T>): T {
  if (!isBrowser) {
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
    return JSON.parse(item) as T;
  } catch {
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: Initializer<T>
): [T, (value: Initializer<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readValue<T>(key, initialValue)
  );

  useEffect(() => {
    if (!isBrowser) return;

    setStoredValue(readValue<T>(key, initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!isBrowser) return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue((prev) => {
          if (event.newValue === null) {
            return readValue<T>(key, initialValue);
          }
          try {
            return JSON.parse(event.newValue) as T;
          } catch {
            return prev;
          }
        });
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue]);

  const setValue = (value: Initializer<T>) => {
    const valueToStore =
      typeof value === "function" ? (value as (prev: T) => T)(storedValue) : value;

    setStoredValue(valueToStore);

    if (!isBrowser) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // ignore write errors (e.g. quota exceeded)
    }
  };

  return [storedValue, setValue];
}

