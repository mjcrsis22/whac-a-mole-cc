export enum STORE_KEYS {
  USERNAME = 'wam_username',
}

export const storeData = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getStoredData = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeStoredData = (key: string): void => {
  localStorage.removeItem(key);
};
