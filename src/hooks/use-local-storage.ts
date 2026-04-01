"use client";

import { useCallback, useEffect, useState } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  initialValue: T;
}

export function useLocalStorage<T>({ key, initialValue }: UseLocalStorageOptions<T>) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      setValue(initialValue);
    }
  }, [initialValue, key]);

  const updateValue = useCallback(
    (nextValue: T) => {
      setValue(nextValue);
      window.localStorage.setItem(key, JSON.stringify(nextValue));
    },
    [key],
  );

  return { value, setValue: updateValue };
}