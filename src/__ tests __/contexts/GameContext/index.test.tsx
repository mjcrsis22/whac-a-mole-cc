import { render } from '@testing-library/react';
import GameContextProvider, {
  GameContext,
} from '../../../contexts/GameContext';
import { useContext } from 'react';

const GameContextConsumer = () => {
  const { state } = useContext(GameContext);
  return <>{state.started ? 'Started' : 'Stopped'}</>;
};

describe('GameContext', () => {
  test('Provides data', () => {
    const { container } = render(
      <GameContextProvider>
        <GameContextConsumer />
      </GameContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
