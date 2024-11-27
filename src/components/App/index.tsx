import AppRouter from '../AppRouter';
import PWABadge from '../PWABadge';
import './styles.scss';

function App() {
  return (
    <div className="app-container">
      <AppRouter />
      <PWABadge />
    </div>
  );
}

export default App;
