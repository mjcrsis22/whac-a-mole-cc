import { useState } from 'react';
import moleLogo from '../../assets/mole.png';
import PWABadge from '../PWABadge';
import './styles.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://es.wikipedia.org/wiki/Whac-A-Mole" target="_blank">
          <img src={moleLogo} className="logo react" alt="Whac-A-Mole logo" />
        </a>
      </div>
      <h1>Whac-A-Mole</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <PWABadge />
    </>
  );
}

export default App;
