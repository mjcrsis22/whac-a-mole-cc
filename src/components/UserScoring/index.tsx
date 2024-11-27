import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import './styles.scss';

function UserScoring() {
  const {
    state: { points },
  } = useContext(GameContext);
  return <>{points}</>;
}

export default UserScoring;
