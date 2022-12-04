import { useCallback, useState, useEffect } from 'react';

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setStoredValue((prev) => {
            try {
                const item = localStorage.getItem(key);
                return item ? (JSON.parse(item) as T) : prev;
            } catch (error) {
                console.error(error);
                return prev;
            }
        });
    }, []);

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
