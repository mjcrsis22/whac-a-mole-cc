import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserScoring from '../UserScoring';
import {
  removeStoredData,
  getStoredData,
  STORE_KEYS,
} from '../../utils/storage';
import { APP_ROUTES } from '../../constants/routes';
import './styles.scss';

function UserPanel() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleExit = () => {
    removeStoredData(STORE_KEYS.USERNAME);
    navigate(APP_ROUTES.HOME);
  };

  useEffect(() => {
    const item = getStoredData(STORE_KEYS.USERNAME);
    if (item) {
      setUsername(item);
    } else {
      navigate(APP_ROUTES.HOME);
    }
  }, [navigate]);

  return (
    <div className="user-panel">
      <UserScoring />
      <div className="user-info-container">
        <span className="username">{username}</span>
        <button className="button exit-button" onClick={handleExit} title='Exit'>
          X
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
