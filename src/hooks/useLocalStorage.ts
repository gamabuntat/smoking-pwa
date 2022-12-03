import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) =>
            setStoredValue((prev) => {
                const newValue =
                    value instanceof Function ? value(prev) : value;
                try {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(key, JSON.stringify(newValue));
                    }
                    return newValue;
                } catch (error) {
                    console.error(error);
                    return newValue;
                }
            }),
        [key, initialValue]
    );

    return [storedValue, setValue];
};
