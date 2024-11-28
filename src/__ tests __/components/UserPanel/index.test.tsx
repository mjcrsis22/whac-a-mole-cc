import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  STORE_KEYS,
  getStoredData,
  removeStoredData,
} from '../../../utils/storage';
import { APP_ROUTES } from '../../../constants/routes';
import UserPanel from '../../../components/UserPanel';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => mockedNavigate),
}));

jest.mock('../../../utils/storage', () => ({
  ...jest.requireActual('../../../utils/storage'),
  getStoredData: jest.fn(),
  removeStoredData: jest.fn(),
}));

const mockedGetStoredData = getStoredData as jest.MockedFn<
  typeof getStoredData
>;

describe('UserPanel component', () => {
  beforeEach(() => {
    mockedGetStoredData.mockReturnValue('MiNombre');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders correctly', () => {
    const { container } = render(<UserPanel />);
    expect(container).toMatchSnapshot();
  });

  test('Renders correctly', () => {
    mockedGetStoredData.mockReturnValue(null);
    const { container } = render(<UserPanel />);
    expect(container).toMatchSnapshot();
    expect(mockedNavigate).toHaveBeenCalledWith(APP_ROUTES.HOME);
  });

  test('Calls removeStoredData and navigate button click', async () => {
    const result = render(<UserPanel />);

    const button = result.getByRole('button');
    await userEvent.click(button);

    expect(removeStoredData).toHaveBeenCalledWith(STORE_KEYS.USERNAME);
    expect(mockedNavigate).toHaveBeenCalledWith(APP_ROUTES.HOME);
  });
});
