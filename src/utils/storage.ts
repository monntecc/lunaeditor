export const setStorageValue = <T>(key: string, value: T): void => {
    const old = localStorage[key];
    localStorage[key] = JSON.stringify(value);
    fireUpdate(key, localStorage[key], old);
};

const fireUpdate = (
    key: string,
    newValue: string | null | undefined,
    oldValue: string | null | undefined,
): void => {
    const event = new StorageEvent('storage', {
        key,
        oldValue,
        newValue,
        storageArea: localStorage,
    });
    window.dispatchEvent(event);

    // Also dispatch our own event
    const storageStateEvent = new CustomEvent('storage-state', {
        detail: {
            state: getStorageValue(key),
        },
    });
    window.dispatchEvent(storageStateEvent);
};

export const getStorageValue = <T>(key: string, defaultValue?: T): T | undefined => {
    try {
        return JSON.parse(localStorage[key]);
    } catch (e) {
        return defaultValue;
    }
};