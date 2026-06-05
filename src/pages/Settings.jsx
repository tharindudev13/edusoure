import { useState,} from "react";
import { 
  User, Trash2, ArrowUpCircle, 
  ShieldCheck
} from "lucide-react";
import { useSelector} from "react-redux";
import AccountDetails from "../components/AccountDetails";
import ChangePwd from "../components/ChangePwd";
import DeleteUser from "../components/DeleteUser";
import UpdateStatus from "../components/UpdateStatus";

export default function SettingsPage() {
  const { user } = useSelector((state) => state.auth);

  
  // Notification Toggle States (Recommendation)
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);

  // Layout Controls
  const [activeTab, setActiveTab] = useState("account");

  const isTeacher = user?.roles?.includes("ROLE_TEACHER");
  

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans p-4 md:p-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* SIDEBAR NAVIGATION MAPPING PANEL */}
        <aside className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase p-2 mb-2">
            Settings
          </div>
          {[
            { id: "account", label: "Edit Profile", icon: <User size={16} /> },
            { id: "security", label: "Change Password", icon: <ShieldCheck size={16} /> },
            // { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
            ...(!isTeacher ? [{ id: "status", label: "Become a Teacher", icon: <ArrowUpCircle size={16} /> }] : []),
            { id: "danger", label: "Delete Account", icon: <Trash2 size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer w-full flex items-center gap-3 text-xs font-bold px-3 py-2.5 rounded-xl transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-1"
                  : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        {/* SETTINGS CONTENT INTERACTION CANVAS */}
        <main className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm min-h-130">
          
          {/* TAB CONTENT: UPDATE ACCOUNT DETAILS */}
          {activeTab === "account" && (
            <AccountDetails />
          )}

          {/* TAB CONTENT: SECURITY UPDATE KEYS PANEL (RECOMMENDATION) */}
          {activeTab === "security" && (
            <ChangePwd />
            )}

          {/* TAB CONTENT: NOTIFICATION RULES CONFIG (RECOMMENDATION) */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">Notifications</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control pipeline alerts delivered to your email account matrix.</p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-slate-50/50">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Email Marketing Pipelines</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Receive announcements regarding performance optimization updates.</p>
                  </div>
                  <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50/50">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Quiz Allocation Reminders</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Get tracked notifications when timed syllabus papers launch inside clusters.</p>
                  </div>
                  <input type="checkbox" checked={quizReminders} onChange={(e) => setQuizReminders(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ELEVATE ACCOUNT ROLE STATUS */}
          {activeTab === "status" && (
            <UpdateStatus />
          )}

          {/* TAB CONTENT: DANGER MATRIX ZONE (DELETE ACCOUNT) */}
          {activeTab === "danger" && (
            <DeleteUser />
          )}

        </main>
      </div>
    </div>
  );
}