import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Eager load Home & Login for instant initial paint & Lighthouse speed
import Home from './pages/Home';
import Login from './pages/Login';

// Code-split heavier analytical, simulation, and admin suites
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Benchmarking = lazy(() => import('./pages/Benchmarking'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Admin = lazy(() => import('./pages/Admin'));
const Verification = lazy(() => import('./pages/Verification'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-4 animate-pulse">
        <div className="w-6 h-6 border-2 border-garvi-orange border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Loading GARVI Module...</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
