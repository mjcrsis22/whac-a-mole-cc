import { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { ActionTypes } from '../../contexts/GameContext/reducer';
import { SPOT_POSITIONS, SPOT_STATES } from '../../constants/spot';
import GameSpot from '../GameSpot';
import './styles.scss';

interface BoardSpot {
  left: string;
  top: string;
  state: SPOT_STATES;
}

function GameBoard() {
  const {
    state: { started, levelSetting },
    dispatch,
  } = useContext(GameContext);
  const [boardSpots, setBoardSpots] = useState<BoardSpot[]>([]);
  const [threadId, setThreadId] = useState<number>(0);

  const setActiveSpot = (spotIdx: number) => {
    setBoardSpots(state =>
      state.map((spot, idx) => ({
        ...spot,
        state:
          idx === spotIdx && spot.state === SPOT_STATES.inactive
            ? SPOT_STATES.active
            : SPOT_STATES.inactive,
      })),
    );
  };

  const activateRandomSpot = useCallback(() => {
    setActiveSpot(Math.floor(Math.random() * boardSpots.length));
  }, [boardSpots.length]);

  const restartGame = useCallback(() => {
    activateRandomSpot();
    setThreadId(setTimeout(restartGame, levelSetting.spotRate));
  }, [activateRandomSpot, levelSetting.spotRate]);

  const stopGame = useCallback(() => {
    clearTimeout(threadId);
    setActiveSpot(-1);
    setThreadId(0);
  }, [threadId]);

  useEffect(() => {
    setBoardSpots(
      SPOT_POSITIONS.map(position => ({
        ...position,
        state: SPOT_STATES.inactive,
      })),
    );
  }, []);

  useEffect(() => {
    if (started && threadId === 0) {
      dispatch({ type: ActionTypes.SET_POINTS, payload: 0 });
      restartGame();
    } else if (!started && threadId !== 0) {
      stopGame();
    }
  }, [restartGame, stopGame, started, threadId, dispatch]);

  useEffect(() => {
    clearTimeout(threadId);
    restartGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelSetting]);

  return (
    <div className="game-board-container">
      <div className="play-container">
        {boardSpots.map(({ left, top, state }) => (
          <div
            key={`${left}-${top}`}
            className="spot-wrapper"
            style={{ left, top }}
          >
            <GameSpot state={state} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
