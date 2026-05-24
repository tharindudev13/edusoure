import { useState, useEffect } from "react";
import LeaderBoard from "../components/Leaderboard";
import { useNavigate } from "react-router";
import { ChartNoAxesGanttIcon, Globe} from "lucide-react";

export default function QuizDashboard() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [subjectLeaderboard, setSubjectLeaderboard] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EduSource Quiz Portal";
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const subjects = [
    { id: "sub_1", name: "Combined Maths", symbol: "∑", gradient: "from-blue-500 to-indigo-600" },
    { id: "sub_2", name: "Physics", symbol: "⚛️", gradient: "from-purple-500 to-blue-600" },
    { id: "sub_3", name: "Chemistry", symbol: "🧪", gradient: "from-teal-400 to-emerald-600" },
    { id: "sub_4", name: "ICT", symbol: "💻", gradient: "from-cyan-500 to-blue-500" },
    { id: "sub_5", name: "Biology", symbol: "🧬", gradient: "from-green-400 to-green-600" },
    {id:"sub_6", name: "Accounting", symbol: "📊", gradient: "from-yellow-400 to-yellow-600"},
    {id:"sub_7", name: "Economics", symbol: "📈", gradient: "from-orange-400 to-orange-600"},
    {id:"sub_8", name:  "Business Studies", symbol: "🏢", gradient: "from-red-400 to-red-600"},
  ];

  // Fetch Global Leaderboard on initial load
  useEffect(() => {
    const fetchGlobalLeaderboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/global-leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setGlobalLeaderboard(data);
      } catch (err) {
        console.error("Error fetching global leaderboard", err);
      }
    };
    fetchGlobalLeaderboard();
  }, [token]);

  // Handle Dynamic Subject Click Lifecycle
  const handleSubjectSelect = async (subjectName) => {
    setSelectedSubject(subjectName);
    setLoadingQuizzes(true);
    try {
      // 1. Fetch filtered quizzes
      const quizRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/get-quizes/${subjectName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const quizData = await quizRes.json();
      setQuizzes(quizData);
      console.log(quizData);
      
      // 2. Fetch specific subject leaderboard ranking metrics
      const lbRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/leaderboard/${subjectName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const lbData = await lbRes.json();
      setSubjectLeaderboard(lbData);
    } catch (err) {
      console.error("Error fetching subject specific data", err);
    } finally {
      setLoadingQuizzes(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedSubject(null);
    setQuizzes([]);
    setSubjectLeaderboard([]);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100/50 text-slate-800 p-4 md:p-10 antialiased">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EduSource Quiz Portal
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Select your subject stream below to challenge your conceptual knowledge base.
            </p>
          </div>
          {selectedSubject && (
            <button
              onClick={handleClearSelection}
              className="cursor-pointer self-start md:self-center px-4 py-2 text-sm font-semibold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 rounded-xl transition-all duration-200 shadow-sm"
            >
              ← Back to All Subjects
            </button>
          )}
        </div>

        {/* TOP LEVEL SUBJECT SELECTOR BAR */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ChartNoAxesGanttIcon /> Subjects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((sub) => {
              const isSelected = selectedSubject === sub.name;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubjectSelect(sub.name)}
                  className={`group relative cursor-pointer p-5 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? "bg-white border-blue-600 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20"
                      : "bg-white border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold transition-all shadow-inner ${
                        isSelected 
                          ? `bg-linear-to-br ${sub.gradient} text-white shadow-md` 
                          : "bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}
                    >
                      {sub.symbol}
                    </div>
                    <div>
                      <h3 className="font-bold  text-sm text-slate-800 transition-colors group-hover:text-blue-600">
                        {sub.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">Click to view</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC TWO-COLUMN SPLIT PANEL VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT INTERACTIVE COLUMN */}
          <div className="lg:col-span-2">
            {!selectedSubject ? (
              /* State A: Default Screen Empty Prompt Message */
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-white/50 backdrop-blur-sm">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-slate-700">No Stream Highlighted</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mt-1">
                  Please click on one of the main subject channels above to populate your assigned topic mock tests.
                </p>
              </div>
            ) : (
              /* State B: Subject Content List Panel Frame */
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 animate-fade-in space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Available Quizzes</span>
                    <h2 className="text-2xl font-bold text-slate-800 mt-0.5">
                      {selectedSubject} 
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                    {quizzes.length} Quizzes Found
                  </span>
                </div>

                {loadingQuizzes ? (
                  <div className="py-16 flex flex-col items-center justify-center text-slate-400 space-y-3">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Streaming active evaluations...</span>
                  </div>
                ) : quizzes.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-3xl mb-2">📁</div>
                    <p className="text-sm font-medium">No testing resources assigned to this syllabus bucket yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200/70 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 group"
                      >
                        <div className="space-y-1">
                          <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-md tracking-wide ">
                            15 Questions
                          </span>
                          <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                            {quiz.topic}
                          </h4>
                        </div>
                        <button
                          onClick={() => navigate(`/quiz/${quiz.id}`)}
                          className="cursor-pointer px-5 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 shadow-sm hover:shadow-blue-500/20 transition-all duration-200 shrink-0 text-center"
                        >
                          Start Quiz →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full">
            {selectedSubject ? (
              <div className="animate-fade-in">
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-3xl shadow-sm">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    {selectedSubject} 
                  </h3>
                  <p className="text-blue-100 text-xs mt-2">Top performing students in this stream</p>
                </div>
                <div className="border border-t-0 border-slate-200 rounded-b-3xl bg-white p-5 shadow-xl shadow-slate-200/40">
                  <LeaderBoard leaderboard={subjectLeaderboard} />
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-slate-800 text-white p-4 rounded-t-3xl shadow-sm">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <Globe /> Global Leaderboard
                  </h3>
                  <p className="text-slate-400 text-xs mt-2">All-time platform wide point leaders</p>
                </div>
                <div className="border border-t-0 p-5 border-slate-200 rounded-b-3xl bg-white  shadow-xl shadow-slate-200/40">
                  <LeaderBoard leaderboard={globalLeaderboard} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}