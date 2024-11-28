import { render } from '@testing-library/react';
import PWABadge from '../../../components/PWABadge';
import { useRegisterSW } from 'virtual:pwa-register/react';
import userEvent from '@testing-library/user-event';

const mSetOfflineReady = jest.fn();
const mSetNeedRefresh = jest.fn();
const mUpdateServiceWorker = jest.fn();

jest.mock(
  'virtual:pwa-register/react',
  () => ({
    useRegisterSW: jest.fn(() => ({
      offlineReady: [false, mSetOfflineReady],
      needRefresh: [false, mSetNeedRefresh],
      updateServiceWorker: mUpdateServiceWorker,
    })),
  }),
  { virtual: true },
);

const mockedUseRegisterSW = useRegisterSW as jest.Mock;

describe('PWABadge component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders correctly', () => {
    const { container } = render(<PWABadge />);
    expect(container).toMatchSnapshot();
  });

  test('Renders correctly - offlineReady state', () => {
    mockedUseRegisterSW.mockReturnValue({
      offlineReady: [true, mSetOfflineReady],
      needRefresh: [false, mSetNeedRefresh],
      updateServiceWorker: mUpdateServiceWorker,
    });

    const { container } = render(<PWABadge />);
    expect(container).toMatchSnapshot();
  });

  test('Renders correctly - needRefresh state', () => {
    mockedUseRegisterSW.mockReturnValue({
      offlineReady: [false, mSetOfflineReady],
      needRefresh: [true, mSetNeedRefresh],
      updateServiceWorker: mUpdateServiceWorker,
    });

    const { container } = render(<PWABadge />);
    expect(container).toMatchSnapshot();
  });

  test('Performs reload action', async () => {
    mockedUseRegisterSW.mockReturnValue({
      offlineReady: [false, mSetOfflineReady],
      needRefresh: [true, mSetNeedRefresh],
      updateServiceWorker: mUpdateServiceWorker,
    });

    const result = render(<PWABadge />);

    const button = result.getByText('Reload', { selector: 'button' });
    await userEvent.click(button);

    expect(mUpdateServiceWorker).toHaveBeenCalledWith(true);
  });

  test('Performs close action', async () => {
    mockedUseRegisterSW.mockReturnValue({
      offlineReady: [false, mSetOfflineReady],
      needRefresh: [true, mSetNeedRefresh],
      updateServiceWorker: mUpdateServiceWorker,
    });

    const result = render(<PWABadge />);

    const button = result.getByText('Close', { selector: 'button' });
    await userEvent.click(button);

    expect(mSetOfflineReady).toHaveBeenCalledWith(false);
    expect(mSetNeedRefresh).toHaveBeenCalledWith(false);
  });
});
