import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData, STORE_KEYS } from '../../utils/storage';
import { APP_ROUTES } from '../../constants/routes';
import './styles.scss';

function AccessForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event: FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    storeData(STORE_KEYS.USERNAME, username);
    navigate(APP_ROUTES.GAME);
  };

  return (
    <form
      id="access-form"
      className="access-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="username"
        id="access-username"
        className="form-control"
        maxLength={15}
        placeholder="Name"
        onChange={handleUsernameChange}
      />
      <input
        type="submit"
        id="access-submit-button"
        className="button"
        value="Join"
        disabled={!username}
      />
    </form>
  );
}

export default AccessForm;
