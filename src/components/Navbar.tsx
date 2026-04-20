import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, GraduationCap, Info, Mail, LayoutDashboard, Settings, Users, Building, Home, Sun, Moon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen sticky top-0 shrink-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-xl font-extrabold text-slate-800 dark:text-white">
            EduFeedback
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
            isActive('/') ? "bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary" : "text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          )}
        >
          <Home className="h-5 w-5" /> Home
        </Link>
        <Link 
          to="/about" 
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
            isActive('/about') ? "bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary" : "text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          )}
        >
          <Info className="h-5 w-5" /> About
        </Link>
        <Link 
          to="/contact" 
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
            isActive('/contact') ? "bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary" : "text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          )}
        >
          <Mail className="h-5 w-5" /> Contact
        </Link>

        {user && (
          <div className="pt-8 pb-2">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Portal</p>
            {user.role === 'student' ? (
              <Link 
                to="/feedback" 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  isActive('/feedback') ? "bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary" : "text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <LayoutDashboard className="h-5 w-5" /> Feedbacks
              </Link>
            ) : (
              <Link 
                to="/view-feedback" 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  isActive('/view-feedback') ? "bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary" : "text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
        {user && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl mb-4">
            <div className="w-10 h-10 bg-slate-200 dark:bg-gray-700 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-500">
              {user.fullname.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.fullname}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">{user.role}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-all"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>

        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-brand-primary hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-xl transition-all"
          >
            <LogOut className="h-5 w-5" /> Login
          </Link>
        )}
      </div>
    </aside>
  );
}
