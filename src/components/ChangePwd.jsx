import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChangePwd = () => {

    const {user} = useSelector((state) => state.auth)

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [isCorrect,setIsCorrect] = useState(false)
    const [loading,setLoading] = useState(false)

    const token = localStorage.getItem('token')

    const updatePassword = async() => {
        if(newPassword === ""){
            window.alert("New Password Can't be empty")
            return
        }
        setLoading(true)
        try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/changepass/${user?.id}`,{
                    method: "POST",
                    headers: {
                    "Authorization" : `Bearer ${token}`
                    },
                    body: newPassword
                });
                const data = await response.text();
                window.alert(data)
                
            } catch (error) {
                console.error("Error checking email:", error);
            }finally{
                setLoading(false)
            }
    } 

    const handleChangePassword = async(e) => {
        const value = e.target.value;
        setCurrentPassword(value);
        if(value === ""){
            setIsCorrect(false)
            return;
        }
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/checkpass/${user?.id}`,{
                    method: "POST",
                    headers: {
                    "Authorization" : `Bearer ${token}`
                    },
                    body: value
                });
                const data = await response.json();
                setIsCorrect(data);
                
            } catch (error) {
                console.error("Error checking password:", error);
            }
        
    }

    return(
        <>
        <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">Change Password</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update your password to keep your account secure.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => handleChangePassword(e)}
                      className="w-full px-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 outline-none"
                    />
                    {!isCorrect && currentPassword && (
                    <div className={`flex items-center gap-3 p-2 mt-3 border rounded-xl animate-in fade-in zoom-in duration-300 bg-red-500/10 border-red-500/50 text-red-400`}>
                        <div className={`bg-red-500 p-1 rounded-full flex items-center justify-center`}>
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-xs font-semibold tracking-tight">Incorrect Current Password....!</p>
                        </div>)}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 outline-none"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <button 
                className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all"
                onClick={updatePassword}
                disabled={newPassword === "" || !isCorrect}>
                {loading? "Updating..." : "Update Password"}
              </button>
            </div>
          
        </>
    )
}

export default ChangePwd