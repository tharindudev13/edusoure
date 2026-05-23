const ResultView = ({correctCount}) => {
    const percentage = (correctCount / 15) * 100;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color Logic based on your request
    let colorClass = "text-rose-500"; // Red (< 5)
    if (correctCount >= 5 && correctCount <= 10) colorClass = "text-amber-500"; // Yellow (5-10)
    if (correctCount > 10) colorClass = "text-emerald-500"; // Green (> 10)

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center max-w-sm w-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Quiz Results</h2>
          
          {/* Circular Progress Bar */}
          <div className="relative flex items-center justify-center mb-8">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96" cy="96" r={radius}
                stroke="currentColor" strokeWidth="12" fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="96" cy="96" r={radius}
                stroke="currentColor" strokeWidth="12" fill="transparent"
                strokeDasharray={circumference}
                style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-out" }}
                strokeLinecap="round"
                className={colorClass}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-4xl font-black ${colorClass}`}>{correctCount}</span>
              <span className="text-slate-400 font-medium text-sm">out of 15</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-600 font-medium italic">
              {correctCount > 10 ? "Excellent work, Scholar!" : correctCount >= 5 ? "Good effort, keep practicing!" : "Don't give up, try again!"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ResultView;