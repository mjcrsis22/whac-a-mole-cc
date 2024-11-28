import { useContext } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameContextProvider from '../../../contexts/GameContext';
import {
  ActionTypes,
  INITIAL_STATE,
} from '../../../contexts/GameContext/reducer';
import GameControls from '../../../components/GameControls';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockedContext = {
  state: INITIAL_STATE,
  dispatch: jest.fn(),
};

const mockedUseContext = useContext as jest.MockedFn<typeof useContext>;

describe('GameControls component', () => {
  beforeEach(() => {
    mockedUseContext.mockReturnValue(mockedContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([true, false])(
    'Renders correctly - according to the started value',
    async started => {
      mockedUseContext.mockReturnValue({
        ...mockedContext,
        state: { ...mockedContext.state, started },
      });
      const { container } = render(
        <GameContextProvider>
          <GameControls />
        </GameContextProvider>,
      );
      expect(container).toMatchSnapshot();
    },
  );

  test('Dispatches SET_STARTED action on button click', async () => {
    const result = render(
      <GameContextProvider>
        <GameControls />
      </GameContextProvider>,
    );

    const button = result.getByRole('button');
    await userEvent.click(button);

    expect(result.container).toMatchSnapshot();
    expect(mockedContext.dispatch).toHaveBeenCalledWith({
      type: ActionTypes.SET_STARTED,
      payload: true,
    });
  });
});
