import { useState } from "react";
import { AlertTriangle, Trash2, Eye, EyeOff, KeyRound } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice"; // Adjust path based on your project structure

const DeleteUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State Machine for the delete process: 'verify' -> 'confirm' -> 'processing'
  const [deleteStep, setDeleteStep] = useState("verify"); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {user} = useSelector((state) => state.auth)

  // --- STEP 1: Verify Password with Backend ---
  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMessage("Please enter your current password to proceed.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    const token = localStorage.getItem("token");

    try {
      // Create an endpoint on your backend specifically for verifying passwords before sensitive actions
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/checkpass/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: password 
      });

      if (response.ok) {
        // Password confirmed on backend -> advance to ultimate step
        setDeleteStep("confirm");
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || "Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Verification connection error:", error);
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STEP 2: Final Permanent Execution Call ---
  const handleFinalDelete = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/delete/${user?.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Clean up client-side states, remove local storage auth tokens
        dispatch(logout()); 
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        
        // Dynamic redirect routing
        navigate("/login");
      } else {
        setErrorMessage("Could not complete account deletion. Please contact support.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Deletion execution error:", error);
      setErrorMessage("Network error processing deletion request.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Delete Account</h2>
        <p className="text-xs text-slate-400 mt-0.5">Completely close your account and remove your information.</p>
      </div>

      {/* Shared Global Error Alert */}
      {errorMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
          <AlertTriangle size={16} className="shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* ================= STEP 1 VIEW: VERIFY PASSWORD ================= */}
      {deleteStep === "verify" && (
        <form onSubmit={handleVerifyPassword} className="space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
            <KeyRound size={22} className="text-slate-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Identity Verification Required</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                For security purposes, please re-enter your account password to confirm ownership before making changes.
              </p>
            </div>
          </div>

          <div className="space-y-1 max-w-sm">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Confirm Your Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify Password"}
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 2 VIEW: ULTIMATE CONFIRMATION ================= */}
      {deleteStep === "confirm" && (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex gap-4">
            <AlertTriangle size={24} className="text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-red-900 uppercase tracking-wide">Warning: This is permanent &amp; Cannot be Undone</h4>
              <p className="text-xs text-red-700 leading-relaxed">
                Deleting your account means you will permanently lose all your saved study notes, past papers, and quiz scores. This action cannot be reversed.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={handleFinalDelete}
              disabled={isSubmitting}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-100 transition-all disabled:opacity-50"
            >
              <Trash2 size={14} /> {isSubmitting ? "Deleting Profile..." : "Yes, Permanently Delete My Account"}
            </button>
            
            <button 
              type="button" 
              onClick={() => {
                setDeleteStep("verify");
                setPassword("");
              }}
              disabled={isSubmitting}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;