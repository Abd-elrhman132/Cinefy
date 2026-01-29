import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    const storedValues = localStorage.getItem(key);
    return storedValues ? JSON.parse(storedValues) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}