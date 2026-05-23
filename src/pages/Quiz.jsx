import { useState, useEffect } from "react";
import LeaderBoard from "../components/Leaderboard";
import { useNavigate } from "react-router";

export default function QuizDashboard() {
  // Navigation States
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  // Subjects with relevant symbols
  const subjects = [
    { id: "sub_1", name: "Combined Maths", symbol: "∑" },
    { id: "sub_2", name: "Physics", symbol: "⚛️" },
    { id: "sub_3", name: "Chemistry", symbol: "🧪" },
    { id: "sub_4", name: "ICT", symbol: "💻" },
  ];

  useEffect(() => {
    const fetchGlobalLeaderboard = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/global-leaderboard`,{
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setLeaderboard(data);
      
    } catch (err) {
      console.error("Error fetching leaderboard", err);
    }
  };

    fetchGlobalLeaderboard();
  },[]);

  

  const handleSubjectSelect = async (subjectName) => {
    setSelectedSubject(subjectName);
    setLoadingQuizzes(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/get-quizes/${subjectName}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setQuizzes(data);
    } catch (err) {
      console.error("Error fetching quiz topics", err);
    } finally {
      setLoadingQuizzes(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              EduSource Quiz Portal
            </h1>
            <p className="text-slate-500 mt-2">
              Select a subject stream below to display its interactive challenge topics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="text-blue-500">1.</span> Select a Subject
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubjectSelect(sub.name)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-200 transform hover:-translate-y-0.5 ${
                    selectedSubject === sub.name
                      ? "bg-blue-50 border-blue-500 shadow-md shadow-blue-500/5"
                      : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${
                      selectedSubject === sub.name ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                    }`}>
                      {sub.symbol}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{sub.name}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedSubject && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-700">
                  <span className="text-blue-500">2.</span> Available Topics in <span className="text-blue-600">{selectedSubject}</span>
                </h2>
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="text-xs text-slate-400 hover:text-blue-600 underline"
                >
                  Clear Selection
                </button>
              </div>

              {loadingQuizzes ? (
                <div className="py-8 text-center text-slate-400">Loading topic documents...</div>
              ) : quizzes.length === 0 ? (
                <div className="py-8 text-center text-slate-400">No active quizzes found for this stream.</div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {quizzes.map((quiz) => (
                    <>
                      <div key={quiz.id}>
                        <span className="text-xs text-blue-500 font-medium tracking-wide uppercase">15 Questions • 75 Max Points</span>
                        <h4 className="font-medium text-slate-700 group-hover:text-blue-600 mt-0.5">{quiz.topic}</h4>
                      </div>
                      <button
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      className="w-full p-4 rounded-xl bg-white border border-slate-200 text-left hover:border-blue-500 hover:bg-blue-50/30 transition-all group flex justify-between items-center"
                    >
                      <div className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Start Quiz →
                      </div>
                    </button>
                    </>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <LeaderBoard leaderboard={leaderboard} />

      </div>
    </div>
  );
}