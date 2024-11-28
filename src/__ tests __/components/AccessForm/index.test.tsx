import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { STORE_KEYS, storeData } from '../../../utils/storage';
import { APP_ROUTES } from '../../../constants/routes';
import AccessForm from '../../../components/AccessForm';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => mockedNavigate),
}));

jest.mock('../../../utils/storage', () => ({
  ...jest.requireActual('../../../utils/storage'),
  storeData: jest.fn(),
}));

describe('AccessForm component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders correctly', () => {
    const { container } = render(<AccessForm />);
    expect(container).toMatchSnapshot();
  });

  test('Enables submit button when username is written', async () => {
    const result = render(<AccessForm />);

    const button = result.getByRole('button');
    expect(button).toBeDisabled();

    const input = result.getByRole('textbox');
    await userEvent.type(input, 'MiNombre');

    expect(button).not.toBeDisabled();
  });

  test('Calls storeData and navigate on submit', async () => {
    const result = render(<AccessForm />);

    const input = result.getByRole('textbox');
    await userEvent.type(input, 'MiNombre');

    const button = result.getByRole('button');
    await userEvent.click(button);

    expect(storeData).toHaveBeenCalledWith(STORE_KEYS.USERNAME, 'MiNombre');
    expect(mockedNavigate).toHaveBeenCalledWith(APP_ROUTES.GAME);
  });
});
