import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    identifier: '', // username or register_number/staff_code
    password: '',
    code: '' // register_number/staff_code
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Manual authentication simulation as per user request
      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('username', formData.identifier)
        .eq('role', role)
        .single();
      
      if (fetchError || !users) {
        throw new Error('User not found or incorrect role.');
      }

      // Simple password check (Note: In real app, use Supabase Auth for security)
      if (users.password !== formData.password) {
        throw new Error('Invalid password.');
      }

      // Role-specific secondary validation
      if (role === 'student' && users.register_number !== formData.code) {
        throw new Error('Register number does not match.');
      }

      if (role === 'staff' && users.staff_code !== formData.code) {
        throw new Error('Staff code does not match.');
      }

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(users));

      // Redirect based on role
      if (role === 'student') {
        navigate('/feedback');
      } else {
        navigate('/view-feedback');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-900 p-10 rounded-[32px] shadow-sm border border-border-sleek dark:border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Login Portal</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">Secure access to your academic records</p>
        </div>

        <div className="flex p-1 bg-slate-50 dark:bg-gray-800 rounded-xl border border-border-sleek dark:border-gray-700">
          <button
            onClick={() => setRole('student')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
              role === 'student' 
                ? 'bg-white dark:bg-gray-600 text-brand-primary dark:text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('staff')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
              role === 'staff' 
                ? 'bg-white dark:bg-gray-600 text-brand-primary dark:text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Staff
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
            <AlertCircle className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input
                required
                type="text"
                placeholder="Ex: alexsmith"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">
              {role === 'student' ? 'Register Number' : 'Staff Code'}
            </label>
            <div className="relative">
              <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input
                required
                type="text"
                placeholder={role === 'student' ? 'ALX-2024-042' : 'TEC-001'}
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input
                required
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-primary hover:bg-brand-secondary disabled:bg-indigo-300 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Log In Now'}
          </button>
        </form>

        <p className="text-center text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
          New here?{' '}
          <Link to="/register" className="text-brand-primary hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
