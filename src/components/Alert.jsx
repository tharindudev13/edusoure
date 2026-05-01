export const Alert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-3 p-4 mb-6 bg-red-500/10 border border-red-500/50 rounded-xl animate-in fade-in zoom-in duration-300">
      <div className="bg-red-500 p-1 rounded-full">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p className="text-sm font-medium text-red-400">{message}</p>
    </div>
  );
};