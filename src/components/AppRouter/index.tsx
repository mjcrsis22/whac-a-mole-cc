import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../constants/routes';
import HomeView from '../../views/Home';
import GameView from '../../views/Game';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to={APP_ROUTES.HOME} replace />} />
        <Route path={APP_ROUTES.HOME} element={<HomeView />} />
        <Route path={APP_ROUTES.GAME} element={<GameView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
