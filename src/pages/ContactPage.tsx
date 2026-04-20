import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">Direct Access</h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-md leading-relaxed">
              Connectivity matters. Reach out to our technical coordinators for integration support or system inquiries.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex gap-6 items-center group">
              <div className="h-14 w-14 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm group-hover:border-brand-primary transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Administrative Link</h4>
                <p className="text-sm font-bold text-slate-700 dark:text-gray-200">nexus@feedbacksys.edu</p>
              </div>
            </div>
            <div className="flex gap-6 items-center group">
              <div className="h-14 w-14 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm group-hover:border-brand-primary transition-colors">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority Hotline</h4>
                <p className="text-sm font-bold text-slate-700 dark:text-gray-200">+1 (800) OPS-SYNC</p>
              </div>
            </div>
            <div className="flex gap-6 items-center group">
              <div className="h-14 w-14 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm group-hover:border-brand-primary transition-colors">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Physical Hub</h4>
                <p className="text-sm font-bold text-slate-700 dark:text-gray-200">Building 7, Digital Campus, Zone Alpha</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-12 rounded-[32px] border border-border-sleek dark:border-gray-800 shadow-sm relative overflow-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="h-24 w-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-[32px] flex items-center justify-center text-brand-primary shadow-sm">
                <Send className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Transmission Received</h2>
                <p className="text-slate-500 dark:text-gray-400 text-sm">Response cycle initiated. Expect contact within 12 hours.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-black uppercase tracking-widest text-brand-primary hover:underline pt-4"
              >
                Send Secondary Signal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Full Signature</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Marcus Aurelius"
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Return Email</label>
                <input
                  required
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest ml-1">Message Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry with precision..."
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 rounded-xl focus:border-brand-primary outline-none dark:text-white resize-none transition-colors"
                />
              </div>
              <button className="w-full py-5 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                Deploy Communication <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
