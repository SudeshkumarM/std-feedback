import { MessageSquare, Users, LineChart, Globe } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '2,500+', icon: Users },
    { label: 'Feedbacks Submitted', value: '15,000+', icon: MessageSquare },
    { label: 'Improvement Rate', value: '45%', icon: LineChart },
    { label: 'Departments', value: '12+', icon: Globe },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 space-y-32">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-100 dark:border-indigo-800">
          The Philosophy
        </div>
        <h1 className="text-5xl font-black text-slate-800 dark:text-white sm:text-7xl tracking-tighter leading-none mb-8">Data-Driven <span className="text-brand-primary">Growth.</span></h1>
        <p className="mt-4 text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Reimagining the academic feedback loop through a precision architectural lens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">The Core Strategy</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 leading-relaxed">
              In traditional educational systems, evaluation data is often fragmented. FeedbackSys centralizes these signals, transforming raw sentiment into surgical improvement paths for modern faculty.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="shrink-0 h-12 w-12 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 flex items-center justify-center rounded-2xl text-brand-primary font-black shadow-sm">
                01
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-white tracking-tight">Identity Isolation</h4>
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">Encrypted workflows ensure honest data collection while maintaining complete user integrity.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0 h-12 w-12 bg-white dark:bg-gray-800 border border-border-sleek dark:border-gray-700 flex items-center justify-center rounded-2xl text-brand-primary font-black shadow-sm">
                02
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-white tracking-tight">High-Fidelity Insights</h4>
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">Categorized metrics provide staff with granular visualizations of their pedagogical performance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-brand-primary/5 rounded-[40px] blur-2xl group-hover:bg-brand-primary/10 transition-all"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-[40px] border border-border-sleek dark:border-gray-800 overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="https://picsum.photos/seed/vision/1200/900"
              alt="System Vision"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-12">
              <p className="text-white text-xl font-bold italic border-l-4 border-brand-primary pl-6">"Performance is improved when results are measured and reported."</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-10 bg-white dark:bg-gray-900 rounded-[32px] border border-border-sleek dark:border-gray-800 shadow-sm hover:border-brand-primary transition-all">
            <div className="inline-flex h-12 w-12 bg-slate-50 dark:bg-gray-800 rounded-2xl items-center justify-center mb-8 text-brand-primary">
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter mb-2">{stat.value}</div>
            <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
