import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
