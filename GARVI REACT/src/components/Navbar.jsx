import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BarChart3, PieChart, Activity, Users, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
              to="/login"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-garvi-orange hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              to="/admin"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-garvi-orange text-white hover:bg-garvi-gold transition-colors text-sm font-medium"
            >
              <Users className="w-4 h-4" />
              Admin Portal
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-garvi-orange focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-garvi-orange/10 text-garvi-orange'
                    : 'text-gray-700 hover:text-garvi-orange hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-garvi-orange hover:bg-gray-50"
          >
            <LogIn className="w-5 h-5" />
            Login
          </Link>
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 mt-2 w-full px-4 py-2 rounded-md bg-garvi-orange text-white hover:bg-garvi-gold font-medium"
          >
            <Users className="w-5 h-5" />
            Admin Portal
          </Link>
        </div>
      )}
    </nav>
  );
}
