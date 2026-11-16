import { useEffect, useState } from 'react';
import { navigate, getRoute, routes } from './routes/routes';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { Toast } from './components/ui/Toast';
import { HomePage } from './pages/HomePage';
import { VillageMapPage } from './pages/VillageMapPage';
import { StationOnePage } from './pages/StationOnePage';
import { StationTwoPage } from './pages/StationTwoPage';
import { StationThreePage } from './pages/StationThreePage';
import { StationFourPage } from './pages/StationFourPage';
import { PassportPage } from './pages/PassportPage';
import { AccountPage } from './pages/AccountPage';
import { useAuth } from './auth/AuthContext';

function PhasePlaceholder({ route }) {
  const labels = {
    station1: 'Trạm 1: Chọn tre',
    station2: 'Trạm 2: Tạo nan',
    station3: 'Trạm 3: Dán mặt quạt',
    station4: 'Trạm 4: Hoàn thiện',
    passport: 'Craft Passport',
  };

  return (
    <main className="phase-placeholder">
      <div className="container phase-placeholder__content">
        <p className="eyebrow">KÉN · Roadmap</p>
        <h1 className="headline-lg">{labels[route] ?? 'KÉN Digital Craft Experience'}</h1>
        <p className="body-lg">Khu vực này sẽ được triển khai ở phase phù hợp, sau khi hoàn tất nền tảng và journey logic.</p>
      </div>
    </main>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  const { authLoading, retryProgressSync, syncError, user } = useAuth();

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = getRoute(path);
  const activePath = routes[route];
  const protectedRoute = ['map', 'station1', 'station2', 'station3', 'station4', 'passport'].includes(route);
  const canAccessProtectedRoute = !protectedRoute || (!authLoading && Boolean(user));

  useEffect(() => {
    if (protectedRoute && !authLoading && !user) navigate(routes.account);
  }, [authLoading, protectedRoute, user]);

  return (
    <div className="app-shell">
      <Header activePath={activePath} />
      {syncError && (
        <div className="sync-alert" role="alert">
          <span>{syncError}</span>
          <button onClick={() => retryProgressSync().catch(() => {})} type="button">Thử đồng bộ lại</button>
        </div>
      )}
      {protectedRoute && !canAccessProtectedRoute && <AccountPage />}
      {route === 'home' && <HomePage />}
      {route === 'map' && canAccessProtectedRoute && <VillageMapPage />}
      {route === 'station1' && canAccessProtectedRoute && <StationOnePage />}
      {route === 'station2' && canAccessProtectedRoute && <StationTwoPage />}
      {route === 'station3' && canAccessProtectedRoute && <StationThreePage />}
      {route === 'station4' && canAccessProtectedRoute && <StationFourPage />}
      {route === 'passport' && canAccessProtectedRoute && <PassportPage />}
      {route === 'account' && <AccountPage />}
      {!['home', 'map', 'station1', 'station2', 'station3', 'station4', 'passport', 'account'].includes(route) && <PhasePlaceholder route={route} />}
      <Footer />
      <Modal
        footer={<Button onClick={() => setModalOpen(false)}>Đã hiểu</Button>}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title="Hướng dẫn KÉN"
      >
        <p className="body-md">
          Đây là modal dùng chung cho các hướng dẫn, popup địa điểm và trạng thái hoàn thành.
        </p>
      </Modal>
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}

export default App;
