import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { ActionTypes } from '../../contexts/GameContext/reducer';
import './styles.scss';

function GameControls() {
  const {
    state: { started },
    dispatch,
  } = useContext(GameContext);

  const toggleStarted = () => {
    dispatch({ type: ActionTypes.SET_STARTED, payload: !started });
  };

  return (
    <div className="game-controls-container">
      <button className="button" onClick={toggleStarted}>
        {started ? 'Stop' : 'Play'}
      </button>
    </div>
  );
}

export default GameControls;
