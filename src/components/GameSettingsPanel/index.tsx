import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { ActionTypes } from '../../contexts/GameContext/reducer';
import { GAME_LEVEL, GAME_SETTINGS_BY_LEVEL } from '../../constants/game';
import './styles.scss';

function GameSettingsPanel() {
  const {
    state: { levelSetting },
    dispatch,
  } = useContext(GameContext);

  const getSelectedClassName = (level: GAME_LEVEL) => {
    return level === levelSetting.id ? 'selected' : '';
  };
  const handleLevelClick = (level: GAME_LEVEL) => {
    return () =>
      dispatch({
        type: ActionTypes.SET_LEVEL,
        payload: GAME_SETTINGS_BY_LEVEL[level],
      });
  };

  return (
    <div className="game-settings-panel">
      <span>Levels</span>
      <div className="level-buttons">
        {Object.values(GAME_LEVEL).map(level => (
          <button
            key={level}
            className={`button level-button ${getSelectedClassName(level)}`}
            onClick={handleLevelClick(level)}
            title={`Level ${level}`}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameSettingsPanel;
