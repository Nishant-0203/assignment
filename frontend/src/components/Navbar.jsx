import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Gem, Sun, Moon, Menu, X, LogOut, User, LayoutDashboard, History, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive(path)
        ? 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkborder/50 hover:text-gray-900 dark:hover:text-white'
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center gap-2 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
      isActive(path)
        ? 'bg-amber-500/10 text-amber-500'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkborder/50'
    }`;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md transition-all group-hover:scale-105">
              <Gem className="h-5 w-5 animate-pulse-slow" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-amber-700 to-amber-600 dark:from-white dark:via-yellow-500 dark:to-amber-500 bg-clip-text text-transparent">
              GemFinder<span className="font-light">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            <Link to="/recommend" className={linkClass('/recommend')}>
              <Sparkles className="h-4 w-4" />
              Get Recommendation
            </Link>
            {isAuthenticated && (
              <Link to="/history" className={linkClass('/history')}>
                <History className="h-4 w-4" />
                My History
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className={linkClass('/admin')}>
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Controls & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-darkborder/50 transition-all border border-transparent dark:hover:border-darkborder"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
            </button>

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3.5 pl-3 border-l border-gray-200 dark:border-darkborder">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-darkborder/50 border border-gray-200 dark:border-darkborder text-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5" />
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl p-2.5 text-red-500 hover:bg-red-500/10 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkborder/50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-amber-600 hover:to-yellow-600 shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.02] transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-darkborder/50 transition-all"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkborder/50 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass('/')}
            >
              Home
            </Link>
            <Link
              to="/recommend"
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass('/recommend')}
            >
              Get Recommendation
            </Link>
            {isAuthenticated && (
              <Link
                to="/history"
                onClick={() => setIsOpen(false)}
                className={mobileLinkClass('/history')}
              >
                My History
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={mobileLinkClass('/admin')}
              >
                Admin Dashboard
              </Link>
            )}
            <hr className="my-3 border-gray-200 dark:border-darkborder" />
            
            {isAuthenticated ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-darkborder/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-darkborder">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{user.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-base font-semibold text-red-500 hover:bg-red-500/20 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center rounded-xl border border-gray-200 dark:border-darkborder px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkborder/50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-amber-600 hover:to-yellow-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
