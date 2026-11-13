import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Benchmarking from './pages/Benchmarking';
import Simulator from './pages/Simulator';
import Admin from './pages/Admin';
import Verification from './pages/Verification';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/verify/:id" element={<Verification />} />
            <Route path="/verify" element={<Verification />} />

            {/* In-app route redirects for legacy URLs */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/powerbi" element={<Navigate to="/analytics" replace />} />
            <Route path="/compare" element={<Navigate to="/benchmarking" replace />} />
            <Route path="/simulation" element={<Navigate to="/simulator" replace />} />
            <Route path="/signin" element={<Navigate to="/login" replace />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
