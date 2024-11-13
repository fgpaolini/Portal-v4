export function useLastFetch() {
    const NOW = Date.now();
    const STORAGE_KEY = 'timestamp';

    const isDateStored = (): boolean => !!localStorage.getItem(STORAGE_KEY);

    const getTimeStamp = (): Date | null => {
        const storageDate = localStorage.getItem(STORAGE_KEY);
        return storageDate ? new Date(storageDate) : null;
    };

    const setTimeStamp = () => {
        localStorage.setItem(STORAGE_KEY, new Date(NOW).toISOString());
    };

    const shouldFetch = (): boolean => {

        if (!isDateStored()) {
            setTimeStamp();
            return true;
        }
        const lastFetch = getTimeStamp();
        if (!lastFetch) {
            setTimeStamp();
            return true;
        }
        const diff = NOW - lastFetch.getTime();
        const diffInHours = diff / (1000 * 60 * 60);

        return diffInHours > 6;
    };

    return { shouldFetch, setTimeStamp };
}