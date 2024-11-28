import { useContext } from 'react';
import { render } from '@testing-library/react';
import GameContextProvider from '../../../contexts/GameContext';
import { INITIAL_STATE } from '../../../contexts/GameContext/reducer';
import GameBoard from '../../../components/GameBoard';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockedContext = {
  state: INITIAL_STATE,
  dispatch: jest.fn(),
};

const mockedUseContext = useContext as jest.MockedFn<typeof useContext>;

describe('GameBoard component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

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
          <GameBoard />
        </GameContextProvider>,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
