import { CheckCircle2,  HeartCrack, HelpCircle, ShieldAlert, } from "lucide-react";

const SuccessModal = ({ isOpen, onClose, type, messege, heading, button_text, onCancel }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50',
          iconColor: 'text-emerald-500',
          icon: <CheckCircle2 size={36} className="animate-pulse"/>,
          btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white'
        };
      case 'error':
        return {
          bg: 'bg-rose-50',
          iconColor: 'text-rose-500',
          icon: <ShieldAlert size={36} className="animate-pulse"/>,
          btnClass: 'bg-rose-600 hover:bg-rose-700 text-white'
        };
      case 'logout':
        return {
          bg: 'bg-red-50',
          iconColor: 'text-red-600',
          icon: <HeartCrack size={30} className="animate-pulse" />, // Minimal offset to visually center the arrow
          btnClass: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      default:
        return {
          bg: 'bg-amber-50',
          iconColor: 'text-amber-500',
          icon: <HelpCircle size={36} className="animate-pulse"/>,
          btnClass: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-slate-100 transform transition-all animate-in zoom-in-95 duration-150">
        <div className="flex flex-col items-center text-center">
          
          {/* Circular Clean Icon */}
          <div className={`w-14 h-14 ${styles.bg} ${styles.iconColor} rounded-full flex items-center justify-center mb-4`}>
            {styles.icon}
          </div>
          
          {/* Typography */}
          <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-1">
            {heading}
          </h3>
          <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 px-4">
            {messege}
          </p>
          
          {/* 🌟 FIXED ACTION BUTTONS ROW 🌟 */}
          <div className="w-full flex items-center gap-3">
            {type === 'warning' || type === 'logout' && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className={`py-2.5 px-4 font-semibold rounded-xl text-sm transition-colors cursor-pointer ${
                type === 'warning' ? 'flex-1' : 'w-full'
              } ${styles.btnClass}`}
            >
              {button_text}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuccessModal;