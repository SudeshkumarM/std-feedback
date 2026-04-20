import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
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
      // Check if user exists
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .or(`username.eq.${formData.username},email.eq.${formData.email}`)
        .single();
      
      if (existing) {
        throw new Error('Username or email already exists.');
      }

      // Insert new user
      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          fullname: formData.fullname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: role,
          register_number: role === 'student' ? formData.code : null,
          staff_code: role === 'staff' ? formData.code : null
        }]);

      if (insertError) throw insertError;

      // Successful registration
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8 bg-white dark:bg-gray-900 p-10 rounded-[32px] shadow-sm border border-border-sleek dark:border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Registration</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">Establish your credentials on the platform</p>
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Johnathan Doe"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Username</label>
            <input
              required
              type="text"
              placeholder="johndoe_99"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">
              {role === 'student' ? 'Reg Number' : 'Staff Code'}
            </label>
            <input
              required
              type="text"
              placeholder={role === 'student' ? 'REG-2024-X' : 'TEC-Y'}
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Academic Email</label>
            <input
              required
              type="email"
              placeholder="john@faculty.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Secure Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 py-5 bg-brand-primary hover:bg-brand-secondary disabled:bg-indigo-300 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Registration'}
          </button>
        </form>

        <p className="text-center text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
          Already verified?{' '}
          <Link to="/login" className="text-brand-primary hover:underline">Access Login</Link>
        </p>
      </div>
    </div>
  );
}
