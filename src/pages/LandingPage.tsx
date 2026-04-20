import { GraduationCap, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col p-8 md:p-12">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-start justify-center py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-100 dark:border-indigo-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Next-Gen Academic Analytics</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-800 dark:text-white mb-8 leading-[0.9]">
            Education <span className="text-brand-primary">Refined.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-gray-400 mb-12 leading-relaxed max-w-lg">
            A minimalist workspace for honest academic evaluation. Empowering both students and faculty through high-fidelity data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="px-10 py-5 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-bold text-sm tracking-widest uppercase shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
            >
              Enter Portal <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="px-10 py-5 bg-white dark:bg-gray-800 border-2 border-border-sleek dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-primary text-slate-600 dark:text-gray-200 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all"
            >
              The System
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-[32px] border border-border-sleek dark:border-gray-800 shadow-sm group hover:border-brand-primary transition-all">
          <div className="h-14 w-14 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
            <GraduationCap className="h-7 w-7 text-brand-primary" />
          </div>
          <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Student Access</p>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Precision Reporting</h3>
          <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm">
            High-fidelity feedback forms designed for clarity. Evaluate teaching, coaching, and explanation with granular precision.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-10 rounded-[32px] border border-border-sleek dark:border-gray-800 shadow-sm group hover:border-brand-primary transition-all">
          <div className="h-14 w-14 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
            <Users className="h-7 w-7 text-brand-primary" />
          </div>
          <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Faculty Management</p>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Insight Dashboards</h3>
          <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm">
            Advanced analytics and direct response mechanisms. Transform student voices into actionable improvement paths.
          </p>
        </div>
      </section>
    </div>
  );
}
