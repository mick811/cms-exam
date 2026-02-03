import { useEffect, useMemo, useState } from 'react';

export function useDebounce<T>(value: T, ms = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), ms);
        return () => clearTimeout(id);
    }, [value, ms]);

    return debounced;
}

export function useSuggestions<T>(url: string | null, ms = 300): T[] {
    const [data, setData] = useState<{ url: string; results: T[] } | null>(
        null,
    );
    const debounced = useDebounce(url, ms);

    useEffect(() => {
        if (!debounced) return;
        const controller = new AbortController();

        fetch(debounced, {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
        })
            .then((r) => (r.ok ? r.json() : []))
            .then((results: T[]) => setData({ url: debounced, results }))
            .catch(() => {});

        return () => controller.abort();
    }, [debounced]);

    return useMemo(() => {
        if (!debounced || data?.url !== debounced) return [];
        return data.results;
    }, [debounced, data]);
}
