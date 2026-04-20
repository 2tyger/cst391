import { Navigate, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RequestCreatePage from './pages/RequestCreatePage';
import RequestDetailsPage from './pages/RequestDetailsPage';
import RequestEditPage from './pages/RequestEditPage';
import RequestListPage from './pages/RequestListPage';

export default function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="site-title" to="/requests">
          Prayer Request Tracker
        </Link>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Navigate to="/requests" replace />} />
          <Route path="/requests" element={<RequestListPage />} />
          <Route path="/requests/new" element={<RequestCreatePage />} />
          <Route path="/requests/:id" element={<RequestDetailsPage />} />
          <Route path="/requests/:id/edit" element={<RequestEditPage />} />
          <Route path="*" element={<Navigate to="/requests" replace />} />
        </Routes>
      </main>
    </div>
  );
}