import { useContext } from 'react';
import { render } from '@testing-library/react';
import GameContextProvider from '../../../contexts/GameContext';
import { INITIAL_STATE } from '../../../contexts/GameContext/reducer';
import UserScoring from '../../../components/UserScoring';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockedContext = {
  state: INITIAL_STATE,
  dispatch: jest.fn(),
};

const mockedUseContext = useContext as jest.MockedFn<typeof useContext>;

describe('UserScoring component', () => {
  beforeEach(() => {
    mockedUseContext.mockReturnValue(mockedContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders correctly', () => {
    const { container } = render(
      <GameContextProvider>
        <UserScoring />
      </GameContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
