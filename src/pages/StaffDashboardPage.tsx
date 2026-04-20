import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageSquare, Reply, User, Loader2, Filter, ChevronDown, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Feedback } from '../types';
import { formatDate, cn } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function StaffDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [staffNameSearch, setStaffNameSearch] = useState('');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(loggedInUser);
    if (parsed.role !== 'staff') {
      navigate('/');
      return;
    }
    setUser(parsed);
    setStaffNameSearch(parsed.fullname);
    fetchFeedback(parsed.fullname);
  }, [navigate]);

  const fetchFeedback = async (name: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .ilike('staff_name', `%${name}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (feedbackId: string) => {
    const text = replyText[feedbackId];
    if (!text?.trim()) return;

    try {
      const { error } = await supabase
        .from('feedback')
        .update({ reply: text })
        .eq('id', feedbackId);

      if (error) throw error;
      
      setFeedbacks(prev => prev.map(f => f.id === feedbackId ? { ...f, reply: text } : f));
      setReplyingTo(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const analyticsData = feedbacks.length > 0 ? [
    { name: 'Best', value: feedbacks.filter(f => f.rating_teaching === 'Best').length },
    { name: 'Good', value: feedbacks.filter(f => f.rating_teaching === 'Good').length },
    { name: 'Average', value: feedbacks.filter(f => f.rating_teaching === 'Average').length },
  ] : [];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Staff Portal</h1>
          <p className="text-slate-500 dark:text-gray-400">Welcome back, {user?.fullname}</p>
        </div>

        <div className="user-badge flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-border-sleek dark:border-gray-700 shadow-sm">
          <div className="w-6 h-6 bg-slate-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-[10px] text-slate-500">
            {user?.fullname?.charAt(0)}
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-gray-300">{user?.role === 'staff' ? user.staff_code : user.register_number}</span>
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded">
            {user?.role}
          </span>
        </div>
      </header>

      {/* Stats Grid */}
      {feedbacks.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-sleek dark:border-gray-700 shadow-sm">
            <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Submissions</p>
            <p className="text-3xl font-extrabold text-slate-800 dark:text-white">{feedbacks.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-sleek dark:border-gray-700 shadow-sm">
            <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Avg. Instructor Score</p>
            <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {(feedbacks.reduce((acc, f) => acc + f.overall_rating, 0) / feedbacks.length).toFixed(0)}%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-sleek dark:border-gray-700 shadow-sm">
            <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Pending Replies</p>
            <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {feedbacks.filter(f => !f.reply).length}
            </p>
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-sleek dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border-sleek dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">Recent Feedback History</h2>
              <div className="relative w-48">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-gray-900 border border-border-sleek dark:border-gray-700 rounded-lg text-xs outline-none focus:border-brand-primary dark:text-white"
                  value={staffNameSearch}
                  onChange={(e) => setStaffNameSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchFeedback(staffNameSearch)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-gray-900/50">
                    <th className="px-6 py-4 text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider text-center">Rating</th>
                    <th className="px-6 py-4 text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-sleek dark:divide-gray-800">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center">
                        <Loader2 className="h-8 w-8 text-brand-primary animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : feedbacks.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm italic">No data records found</td>
                    </tr>
                  ) : (
                    feedbacks.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer" onClick={() => setReplyingTo(f.id)}>
                        <td className="px-6 py-4 text-xs font-bold text-slate-800 dark:text-white">{f.student_name}</td>
                        <td className="px-6 py-4 text-xs text-slate-500 dark:text-gray-400">{f.subject}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                            f.rating_teaching === 'Best' ? "bg-emerald-50 text-emerald-700" :
                            f.rating_teaching === 'Good' ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
                          )}>
                            {f.rating_teaching}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={cn(
                            "text-xs font-bold",
                            f.reply ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"
                          )}>
                            {f.reply ? 'Replied' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {replyingTo && feedbacks.find(f => f.id === replyingTo) ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-sleek dark:border-gray-700 shadow-sm transition-all sticky top-24 overflow-hidden">
              <div className="p-6 border-b border-border-sleek dark:border-gray-700">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white">Feedback Detail</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-3">Student Comment</p>
                  <p className="text-sm p-4 bg-slate-50 dark:bg-gray-900 border border-border-sleek dark:border-gray-800 rounded-xl text-slate-700 dark:text-gray-300 italic leading-relaxed">
                    "{feedbacks.find(f => f.id === replyingTo)?.comment}"
                  </p>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Response</label>
                  <textarea
                    placeholder="Describe your response to the student..."
                    value={replyText[replyingTo] || feedbacks.find(f => f.id === replyingTo)?.reply || ''}
                    onChange={(e) => setReplyText({ ...replyText, [replyingTo]: e.target.value })}
                    className="w-full p-4 bg-white dark:bg-gray-900 border border-border-sleek dark:border-gray-700 rounded-xl text-sm outline-none focus:border-brand-primary dark:text-white min-h-[120px] resize-none"
                  />
                  <button
                    onClick={() => handleReply(replyingTo)}
                    className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    Save Reply
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 dark:bg-gray-800/40 rounded-2xl border-2 border-dashed border-slate-200 dark:border-gray-800 p-12 text-center flex flex-col items-center justify-center h-[300px]">
              <MessageSquare className="h-8 w-8 text-slate-300 mb-4" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select a row to respond</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
