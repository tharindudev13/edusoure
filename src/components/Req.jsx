import { useNavigate } from 'react-router';
import { PlusCircle, ArrowRight } from 'lucide-react';

const RequestClassNav = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/request-class')}
      className="group relative mt-10 overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-full max-w-sm"
    >
      {/* Decorative Background Circles */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
      
      <div className="relative flex items-center gap-4">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-inner">
          <PlusCircle size={28} />
        </div>
        
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg leading-tight">Request New Class</h4>
          <p className="text-blue-100 text-xs">Fill the form to start a new session</p>
        </div>

        <div className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default RequestClassNav;