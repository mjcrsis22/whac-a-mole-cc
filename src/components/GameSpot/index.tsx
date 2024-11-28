import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { ActionTypes } from '../../contexts/GameContext/reducer';
import { SPOT_STATES } from '../../constants/spot';
import { vibrate } from '../../utils/vibrate';
import moleLogo from '../../assets/mole.png';
import './styles.scss';

interface GameSpotProps {
  state: SPOT_STATES;
}

function GameSpot({ state }: GameSpotProps) {
  const {
    state: { points, levelSetting },
    dispatch,
  } = useContext(GameContext);
  const [spotReady, setSpotReady] = useState(false);
  const [showMole, setShowMole] = useState(false);

  const moleClick = () => {
    vibrate(200);
    dispatch({
      type: ActionTypes.SET_POINTS,
      payload: points + levelSetting.points,
    });
  };

  useEffect(() => {
    window.setTimeout(() => setSpotReady(true), 100);
    return () => {
      setSpotReady(false);
    };
  }, []);

  useEffect(() => {
    setShowMole(state == SPOT_STATES.active);
  }, [state]);

  return (
    <div className="game-spot">
      <div className={`spot-mark ${spotReady ? 'ready' : ''}`}></div>
      <div className="spot-mole-wrapper">
        <img
          className={`spot-mole ${showMole ? 'show' : ''}`}
          src={moleLogo}
          alt="Mole"
          role="button"
          onClick={moleClick}
        />
      </div>
    </div>
  );
}

export default GameSpot;
