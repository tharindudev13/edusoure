import { ArrowLeft, Rocket, Clock } from 'lucide-react';
import { useEffect } from 'react';

const ComingSoon = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/dashboard';
    }
  };

  useEffect(() => {{
        document.title = "Coming Soon | EduSource"
      }})

  return (
    <div className="min-h-screen bg-[#0d0e12] text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Decorative subtle background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-xl w-full text-center z-10 space-y-8">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full text-sm font-medium text-blue-400 backdrop-blur-sm animate-pulse">
          <Clock size={15} />
          <span>Under Active Development</span>
        </div>

        {/* Main Icon & Title Display */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20 ring-1 ring-white/10 transform hover:rotate-12 transition-transform duration-300">
            <Rocket size={38} className="text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400">
            Something Exciting <br />is Brewing
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            We are working hard behind the scenes to fine-tune this feature. It'll be fully deployed and ready for use very soon!
          </p>
        </div>

        {/* Progress Bar Display */}
        <div className="max-w-xs mx-auto bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 backdrop-blur-sm space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400 px-1">
            <span>Development Status</span>
            <span className="text-blue-400">85% Complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-linear-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: '85%' }}
            />
          </div>
        </div>

        {/* Navigation Action */}
        <div>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 px-5 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-200 hover:-translate-x-0.5"
          >
            <ArrowLeft size={16} />
            <span>Go Back to Dashboard</span>
          </button>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 text-xs text-slate-600 tracking-wider font-medium">
        EDUSOURCE PLATFORM ENGINE
      </div>
    </div>
  );
};

export default ComingSoon;