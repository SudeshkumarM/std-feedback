import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send, Loader2, BookOpen, User, Building } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FeedbackFormPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    department: '',
    staff_name: '',
    subject: '',
    rating_teaching: 'Good',
    rating_coaching: 'Good',
    rating_explanation: 'Good',
    overall_rating: 50,
    comment: ''
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(loggedInUser);
    if (parsed.role !== 'student') {
      navigate('/');
      return;
    }
    setUser(parsed);
    setFormData(prev => ({ ...prev, student_name: parsed.fullname }));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{
          student_name: formData.student_name,
          staff_name: formData.staff_name,
          subject: formData.subject,
          rating_teaching: formData.rating_teaching,
          rating_coaching: formData.rating_coaching,
          rating_explanation: formData.rating_explanation,
          overall_rating: formData.overall_rating,
          comment: formData.comment
        }]);

      if (error) throw error;
      navigate('/response');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ratingOptions = ['Good', 'Average', 'Best'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm border border-border-sleek dark:border-gray-800 overflow-hidden">
        <div className="px-10 py-12">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">New Feedback</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-2">Submit your evaluation for the current academic session.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 pb-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Student Name
              </label>
              <input
                readOnly
                type="text"
                value={formData.student_name}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-sleek dark:border-gray-800 rounded-xl outline-none dark:text-white opacity-70"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Department
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 border border-border-sleek dark:border-gray-800 rounded-xl focus:border-brand-primary outline-none dark:text-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Staff Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Prof. Smith"
                value={formData.staff_name}
                onChange={(e) => setFormData({ ...formData, staff_name: e.target.value })}
                className="w-full px-4 py-3 border border-border-sleek dark:border-gray-800 rounded-xl focus:border-brand-primary outline-none dark:text-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Data Structures"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-border-sleek dark:border-gray-800 rounded-xl focus:border-brand-primary outline-none dark:text-white dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest border-b border-border-sleek dark:border-gray-800 pb-2">Technical Evaluation</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {(['teaching', 'coaching', 'explanation'] as const).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-gray-400 capitalize">
                    {key.replace('_', ' ')} Quality
                  </label>
                  <select
                    value={formData[`rating_${key}` as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [`rating_${key}`]: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-800 rounded-xl outline-none focus:border-brand-primary dark:text-white"
                  >
                    {ratingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Overall Satisfaction</label>
              <span className="text-xl font-black text-brand-primary">{formData.overall_rating}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.overall_rating}
              onChange={(e) => setFormData({ ...formData, overall_rating: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Additional Comments</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your experience..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-800 rounded-xl focus:border-brand-primary outline-none dark:text-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-primary hover:bg-brand-secondary disabled:bg-indigo-300 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
