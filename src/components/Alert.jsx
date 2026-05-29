export const Alert = ({ message,type }) => {
  if (!message) return null;

  const styles = type === "success" 
    ? {
        container: "bg-green-500/10 border-green-500/50 text-green-400",
        iconBg: "bg-green-500"
      }
    : {
        container: "bg-red-500/10 border-red-500/50 text-red-400",
        iconBg: "bg-red-500"
      };
  

  return (
    <div className={`flex items-center gap-3 p-4 mb-6 border rounded-xl animate-in fade-in zoom-in duration-300 ${styles.container}`}>
      <div className={`${styles.iconBg} p-1 rounded-full flex items-center justify-center`}>
        {type === "success" ? (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <p className="text-sm font-semibold tracking-tight">{message}</p>
    </div>
  );
}
