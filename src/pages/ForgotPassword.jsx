import { useEffect, useState } from "react";
import { Mail, KeyRound, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("email"); 
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        if (step !== "otp" || timeLeft <= 0) return;

        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [step, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        setStep("otp");
      } else {
        const txt = await response.text();
        setErrorMessage(txt || "This email address is not registered with EduSource.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STEP 2: Verify 6-Digit OTP Code ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit code sent to your email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, otp: otp })
      });

      if (response.ok) {
        setStep("reset");
      } else {
        setErrorMessage("Invalid or expired verification code. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error verifying code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STEP 3: Save New Password ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage("Your new password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please check again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, otp: otp, newPassword: newPassword })
      });

      if (response.ok) {
        setStep("success");
      } else {
        setErrorMessage("Could not update password. Please request a new code.");
      }
    } catch (err) {
      setErrorMessage("Network error updating password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Top Branding/Back Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="text-xl font-black text-blue-600 tracking-tight">EduSource</div>
          {step !== "success" && (
            <button 
              onClick={() => step === "email" ? navigate("/login") : setStep("email")}
              className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 outline-none cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
        </div>

        {/* Global Error Banner Box */}
        {errorMessage && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle size={16} className="shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* ================= STEP 1: ENTER EMAIL ================= */}
        {step === "email" && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-800">Forgot Password?</h2>
              <p className="text-xs text-slate-400 leading-normal">Enter your account email address below, and we'll send you a 6-digit code to verify your identity.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Your Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-100 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Sending Code..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* ================= STEP 2: ENTER 6-DIGIT OTP ================= */}
        {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
            <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-800">Verify Your Identity</h2>
            <p className="text-xs text-slate-400 leading-normal">
                We have sent a security code to <span className="text-slate-700 font-bold">{email}</span>. Please enter it below.
            </p>
            </div>

            <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">6-Digit Verification Code</label>
            <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                type="text"
                maxLength={6}
                placeholder="0 0 0 0 0 0"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only allow digits
                disabled={isSubmitting || timeLeft === 0} // Blocks entry if code is completely expired
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-center tracking-[0.5em] font-mono text-sm font-bold rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none disabled:bg-slate-100 disabled:text-slate-400"
                required
                />
            </div>
            </div>

            {/* --- DYNAMIC COOLDOWN & RESEND TIMER VIEW PANEL --- */}
            <div className="flex items-center justify-between text-xs px-1">
            {timeLeft > 0 ? (
                <p className="text-slate-400 font-medium">
                Code expires in: <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{formatTime(timeLeft)}</span>
                </p>
            ) : (
                <p className="text-red-500 font-bold flex items-center gap-1">
                Code has expired!
                </p>
            )}

            {/* Resend Action Trigger */}
            <button
                type="button"
                onClick={handleRequestOtp}
                disabled={timeLeft > 0 || isSubmitting}
                className={`font-bold transition-colors outline-none ${
                timeLeft > 0 
                    ? "text-slate-300 cursor-not-allowed" 
                    : "text-blue-600 hover:text-blue-700 underline cursor-pointer"
                }`}
            >
                Resend Code
            </button>
            </div>

            <button
            type="submit"
            disabled={isSubmitting || timeLeft === 0}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-100 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isSubmitting ? "Verifying..." : "Verify Code"}
            </button>
        </form>
        )}

        {/* ================= STEP 3: RESET NEW PASSWORD ================= */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-800">Create New Password</h2>
              <p className="text-xs text-slate-400 leading-normal">Choose a secure password that you haven't used before for your account.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                  required
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

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-type your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-100 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Saving Changes..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* ================= STEP 4: SUCCESS OVERVIEW ================= */}
        {step === "success" && (
          <div className="text-center space-y-4 py-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
              <CheckCircle2 size={28} className="text-green-500" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-800">Password Reset Complete</h2>
              <p className="text-xs text-slate-400 leading-normal">Your password has been changed successfully. You can now use your new credentials to log into the system.</p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Go to Login Page
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;