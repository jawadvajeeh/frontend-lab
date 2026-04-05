import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      return JSON.parse(item) as T;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const get = useCallback((): T => {
    return storedValue;
  }, [storedValue]);

  const set = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch {
        // ignore
      }
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // ignore
    }
  }, [key, initialValue]);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;

      try {
        if (event.newValue === null) {
          setStoredValue(initialValue);
          return;
        }
        setStoredValue(JSON.parse(event.newValue) as T);
      } catch {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return { get, set, remove };
}
