import { vibrate } from '../../utils/vibrate';

Object.defineProperty(global.navigator, 'vibrate', {
  value: jest.fn(),
});

describe('VIBRATE functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Call navigator vibrate API on vibrate', () => {
    vibrate(500);
    expect(global.navigator.vibrate).toHaveBeenCalledWith(500);
  });
});
