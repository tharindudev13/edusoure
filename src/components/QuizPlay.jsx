import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function QuizPlay() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [activeQuiz,setActiveQuiz] = useState()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth)

  const {id} = useParams()

  useEffect(()=>{
        document.title = "Quiz | EduSource"    
        const getQuiz = async(id) => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/get-quiz/${id}`,{
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if(response.ok){
                    const result =  await response.json()
                    setActiveQuiz(result)
                }
            }catch(error){
                console.error(error);
            }
        }

        getQuiz(id)
  },[id,token])


  const submitScore = async(score) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quiz/submit`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "quizId": activeQuiz.id,
              "score": score,
              "userId": user.id
            })
        });
        if (response.ok) {
            console.log('Score submitted successfully');
        }
    } catch (error) {
        console.error('Error submitting score:', error);
    }
};

  const currentQuestion = activeQuiz?.questions[currentIdx];
  const totalQuestions = activeQuiz?.questions.length;

  const handleCheckAnswer = () => {
    if (selectedAnswerId === null || hasChecked) return;
    const chosenAnswer = currentQuestion.answers.find(ans => ans.answerId === selectedAnswerId);
    if (chosenAnswer?.correct) {        
      setCorrectCount(prev => prev + 1);
    }
    setHasChecked(true);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswerId(null);
      setHasChecked(false);
    } else {
      setQuizFinished(true);
      const score = correctCount * 5;
      submitScore(score);
    }
  };

  if (quizFinished) {
    const percentage = (correctCount / totalQuestions) * 100;
    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let colorClass = "text-rose-500";
    if (correctCount >= 5 && correctCount <= 10) colorClass = "text-amber-500";
    if (correctCount > 10) colorClass = "text-emerald-500";

    

    return (
      <div className="min-h-screen  bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/80 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Quiz Summary</h2>
          
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r={radius} stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
              <circle
                cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent"
                strokeDasharray={circumference}
                style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-out" }}
                strokeLinecap="round"
                className={colorClass}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-3xl font-black ${colorClass}`}>{correctCount}</span>
              <span className="text-slate-400 text-xs font-semibold uppercase">/ {totalQuestions} Correct</span>
            </div>
          </div>

          <p className="text-slate-700 font-medium mb-6 text-sm">
            {correctCount > 10 ? "Excellent work, Scholar!" : correctCount >= 5 ? "Good effort, keep practicing!" : "Don't give up, try again!"}
          </p>
          
          <button onClick={() => navigate('/quizes')} className=" cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        <div className="p-4 md:p-6 bg-slate-50/70 border-b border-slate-100 flex justify-between items-center gap-4">
          <div className="min-w-0">
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {activeQuiz?.subject}
            </span>
            <h1 className="text-base font-bold text-slate-800 mt-1 truncate">{activeQuiz?.topic}</h1>
          </div>
          <div className="text-right shrink-0 bg-white border border-slate-200/60 rounded-xl px-3 py-1.5 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Question</span>
            <div className="text-sm font-black text-blue-600">{currentIdx + 1} <span className="text-slate-300 font-normal">/</span> {totalQuestions}</div>
          </div>
        </div>

        <div className="w-full h-1 bg-slate-100">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }} />
        </div>

        <div className="p-5 md:p-6 space-y-5">
          <div className="bg-slate-50/40 border border-slate-200/50 rounded-xl p-4 md:p-5">
            <span className="text-xs text-blue-500 font-bold block mb-1 uppercase tracking-wide">Problem Statement</span>
            <h3 className="text-base md:text-lg font-bold text-slate-800 leading-snug">
              {currentQuestion?.questionText}
            </h3>
          </div>

          <div className="grid gap-2.5">
            {currentQuestion?.answers.map((ans) => {
              let cardStyle = "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/10 text-slate-700";
              
              if (selectedAnswerId === ans.answerId && !hasChecked) {
                cardStyle = "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 text-blue-900 font-medium";
              } 
              
              if (hasChecked) {
                if (ans.correct) {
                  cardStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-900 font-bold ring-1 ring-emerald-500 shadow-2xs shadow-emerald-100";
                } else if (selectedAnswerId === ans.answerId && !ans.correct) {
                  cardStyle = "border-rose-500 bg-rose-50/80 text-rose-900 ring-1 ring-rose-500 opacity-90";
                } else {
                  cardStyle = "border-slate-100 bg-slate-50/30 text-slate-400 opacity-40 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={ans.answerId}
                  onClick={() => !hasChecked && setSelectedAnswerId(ans.answerId)}
                  disabled={hasChecked}
                  className={`w-full py-3.5 px-4 rounded-xl border transition-all text-sm md:text-base text-left flex items-center justify-between gap-4 group ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 text-xs rounded-lg border flex items-center justify-center font-bold shrink-0 transition-colors ${
                      selectedAnswerId === ans.answerId && !hasChecked
                        ? "bg-blue-600 text-white border-blue-600"
                        : hasChecked && ans.correct
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : hasChecked && selectedAnswerId === ans.answerId && !ans.correct
                        ? "bg-rose-600 text-white border-rose-600"
                        : "bg-slate-50 text-slate-400 border-slate-200 group-hover:bg-blue-100 group-hover:text-blue-700 group-hover:border-blue-300"
                    }`}>
                      {String.fromCharCode(64 + ans.answerId)}
                    </span>
                    <span>{ans.text}</span>
                  </div>
                  
                  {hasChecked && ans.correct && (
                    <span className="text-[11px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-2xs">Correct</span>
                  )}
                  {hasChecked && selectedAnswerId === ans.answerId && !ans.correct && (
                    <span className="text-[11px] bg-rose-600 text-white font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-2xs">Incorrect</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="min-w-0">
            {hasChecked && (
              <p className="text-xs font-bold truncate animate-fade-in">
                {currentQuestion.answers.find(a => a.answerId === selectedAnswerId)?.correct ? (
                  <span className="text-emerald-600">✓ Excellent job! Score saved.</span>
                ) : (
                  <span className="text-rose-600">✕ Incorrect calculation. Review solution.</span>
                )}
              </p>
            )}
          </div>

          <div className="shrink-0">
            {!hasChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswerId === null}
                className={`cursor-pointer px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${
                  selectedAnswerId === null
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-xs shadow-blue-200"
                }`}
              >
                Confirm Choice
              </button>
            ) :  (
              <button
                onClick={handleNextQuestion}
                className="cursor-pointer px-6 py-2.5 bg-slate-800 c text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-all shadow-xs"
              >
                {currentIdx + 1 === totalQuestions ? "See Summary" : "Next Question →"}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}