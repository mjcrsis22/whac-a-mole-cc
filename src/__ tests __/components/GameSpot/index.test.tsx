import { useContext } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import GameContextProvider from '../../../contexts/GameContext';
import {
  ActionTypes,
  INITIAL_STATE,
} from '../../../contexts/GameContext/reducer';
import { vibrate } from '../../../utils/vibrate';
import { SPOT_STATES } from '../../../constants/spot';
import GameSpot from '../../../components/GameSpot';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('../../../utils/vibrate', () => ({
  ...jest.requireActual('../../../utils/vibrate'),
  vibrate: jest.fn(),
}));

const mockedContext = {
  state: INITIAL_STATE,
  dispatch: jest.fn(),
};

const mockedUseContext = useContext as jest.MockedFn<typeof useContext>;

describe('GameSpot component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedUseContext.mockReturnValue(mockedContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([SPOT_STATES.inactive, SPOT_STATES.active])(
    'Renders correctly - according to the state prop',
    async stateProp => {
      const { container } = render(
        <GameContextProvider>
          <GameSpot state={stateProp} />
        </GameContextProvider>,
      );
      await act(() => {
        jest.runAllTimers();
      });
      expect(container).toMatchSnapshot();
    },
  );

  test('Dispatches SET_POINTS action on image click', async () => {
    const currentPoints = mockedContext.state.points;
    const levelPoints = mockedContext.state.levelSetting.points;
    const finalPoints = currentPoints + levelPoints;

    const result = render(
      <GameContextProvider>
        <GameSpot state={SPOT_STATES.active} />
      </GameContextProvider>,
    );

    await act(() => {
      jest.runAllTimers();
    });

    const button = result.getByRole('button');
    fireEvent(button, new MouseEvent('click', { bubbles: true }));

    expect(result.container).toMatchSnapshot();
    expect(vibrate).toHaveBeenCalledWith(200);
    expect(mockedContext.dispatch).toHaveBeenCalledWith({
      type: ActionTypes.SET_POINTS,
      payload: finalPoints,
    });
  });
});
