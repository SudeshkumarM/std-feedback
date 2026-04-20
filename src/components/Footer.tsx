export default function Footer() {
  return (
    <footer className="w-full py-12 bg-white dark:bg-gray-900 border-t border-border-sleek dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tighter">FeedbackSys</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2024 ARCHITECT_EDU</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-brand-primary transition-colors">Integrity</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Nexus</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
