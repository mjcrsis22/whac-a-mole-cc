import {
  getStoredData,
  removeStoredData,
  storeData,
} from '../../utils/storage';

describe('STORAGE functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Call localStorage.setItem on storeData', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    storeData('key', 'value');
    expect(setItem).toHaveBeenCalledWith('key', 'value');
  });

  test('Call localStorage.getItem on getStoredData', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    getStoredData('key');
    expect(getItem).toHaveBeenCalledWith('key');
  });

  test('Call localStorage.removeItem on removeStoredData', () => {
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');
    removeStoredData('key');
    expect(removeItem).toHaveBeenCalledWith('key');
  });
});
