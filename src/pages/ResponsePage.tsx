import { Link } from 'react-router-dom';
import { CheckCircle, Home, FileText, ArrowRight, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function ResponsePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[32px] shadow-sm p-12 text-center space-y-10 border border-border-sleek dark:border-gray-800"
      >
        <div className="flex justify-center">
          <div className="h-28 w-28 bg-emerald-50 dark:bg-emerald-900/20 rounded-[40px] flex items-center justify-center text-emerald-500 shadow-sm">
            <CheckCircle className="h-16 w-16" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Confirmed.</h1>
          <p className="text-slate-500 dark:text-gray-400 leading-relaxed">Your data has been successfully archived in the central server. We appreciate your contribution to academic excellence.</p>
        </div>

        <div className="grid gap-4 pt-4">
          <Link
            to="/feedback"
            className="flex items-center justify-between w-full p-6 bg-slate-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-border-sleek dark:border-gray-700 rounded-2xl group transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <FileText className="h-5 w-5 text-brand-primary" />
              </div>
              <span className="font-bold text-slate-700 dark:text-gray-200 text-sm tracking-tight">New Evaluation</span>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
          </Link>

          {user?.role === 'staff' && (
            <Link
              to="/view-feedback"
              className="flex items-center justify-between w-full p-6 bg-slate-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-border-sleek dark:border-gray-700 rounded-2xl group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <LayoutDashboard className="h-5 w-5 text-brand-primary" />
                </div>
                <span className="font-bold text-slate-700 dark:text-gray-200 text-sm tracking-tight">Staff Console</span>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
            </Link>
          )}

          <Link
            to="/"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors py-2"
          >
            ← Exit to Workspace
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
