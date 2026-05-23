import { CheckCircle2, CircleAlert, CircleQuestionMark} from "lucide-react";

const SuccessModal = ({ isOpen, onClose ,type,messege,heading,button_text,onCancel}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 transform animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
            {/* <CheckCircle2 size={48} className="text-green-500" /> */}
            {type === 'success' ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={48} className="text-green-500" />
                </div>
            ) : type === 'error' ? (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <CircleAlert size={48} className="text-red-500" />
                </div>
            ) : <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <CircleQuestionMark size={48} className="text-yellow-500" />
                </div>}
          
          <h3 className="text-2xl font-bold text-slate-800 mb-2">{heading}</h3>
          <p className="text-slate-500 text-sm mb-6">
            {messege}
          </p>
          
          <button
            onClick={onClose}
            className="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            {button_text}
          </button>
          {/* Optional Cancel Button for Warning Modals */}
            {type === 'warning' && (
          <button
            onClick={onCancel}
            className="cursor-pointer w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors mt-2"
          >
            Cancel
          </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;