import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, BarChart3, PieChart, Activity, Users } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/benchmarking', label: 'Benchmarking', icon: PieChart },
    { path: '/simulator', label: 'Simulator', icon: Activity },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-garvi-orange">
              GARVI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-garvi-orange/10 text-garvi-orange'
                      : 'text-gray-700 hover:text-garvi-orange hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/admin"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-garvi-orange text-white hover:bg-garvi-gold transition-colors text-sm font-medium"
            >
              <Users className="w-4 h-4" />
              Admin Portal
            </Link>
          </div>

          <button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-garvi-orange">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
