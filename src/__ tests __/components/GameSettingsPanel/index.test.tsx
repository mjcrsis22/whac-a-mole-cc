import { useContext } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameContextProvider from '../../../contexts/GameContext';
import {
  ActionTypes,
  INITIAL_STATE,
} from '../../../contexts/GameContext/reducer';
import { GAME_LEVEL, GAME_SETTINGS_BY_LEVEL } from '../../../constants/game';
import GameSettingsPanel from '../../../components/GameSettingsPanel';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockedContext = {
  state: INITIAL_STATE,
  dispatch: jest.fn(),
};

const mockedUseContext = useContext as jest.MockedFn<typeof useContext>;

describe('GameSettingsPanel component', () => {
  beforeEach(() => {
    mockedUseContext.mockReturnValue(mockedContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders correctly', () => {
    const { container } = render(
      <GameContextProvider>
        <GameSettingsPanel />
      </GameContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Dispatches SET_LEVEL action on button click', async () => {
    const result = render(
      <GameContextProvider>
        <GameSettingsPanel />
      </GameContextProvider>,
    );

    const buttons = result.getAllByRole('button');
    expect(buttons.length).toEqual(3);
    await userEvent.click(buttons[1]);

    expect(mockedContext.dispatch).toHaveBeenCalledWith({
      type: ActionTypes.SET_LEVEL,
      payload: GAME_SETTINGS_BY_LEVEL[GAME_LEVEL.MEDIUM],
    });
  });
});
