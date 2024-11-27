import GameContextProvider from '../../contexts/GameContext';
import UserPanel from '../../components/UserPanel';
import GameBoard from '../../components/GameBoard';
import GameControls from '../../components/GameControls';
import GameSettingsPanel from '../../components/GameSettingsPanel';
import './styles.scss';

function Game() {
  return (
    <GameContextProvider>
      <div className="game-container">
        <div className="game-section">
          <UserPanel />
        </div>
        <div className="game-section">
          <GameBoard />
          <GameControls />
        </div>
        <div className="game-section">
          <GameSettingsPanel />
        </div>
      </div>
    </GameContextProvider>
  );
}

export default Game;
