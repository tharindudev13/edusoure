import { ArrowUpCircle } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

const UpdateStatus = () => {
    const [loading,setLoading] = useState(false)
    const {user} = useSelector((state) => state.auth)
    const token = localStorage.getItem('token')

    const upgradeToTeacher = async() => {
        setLoading(true)
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/upgrade/${user?.id}`, {
                method: "POSt",
                headers: {"Authorization": `Bearer ${token}`}
            });
            if(response.ok){
                window.alert("Profile Upgraded..!")
            }
        }catch(e){
            window.alert(e)
        }finally{
            setLoading(false)
        }
    }


    return(
        <>
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-800">Become a Teacher</h2>
                <p className="text-xs text-slate-400 mt-0.5">File an onboarding structural request to convert your user mapping state parameters.</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
                <ArrowUpCircle size={24} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">Apply to Become a Verified Teacher(Student &rarr; Teacher)</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Want to start listing your classes and uploading papers? Submit a request to upgrade your account. Our team will review your credentials within a few business days.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                
                <button 
                    onClick={upgradeToTeacher}
                    className="cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                    {loading ? "Upgrading..." : "Submit Upgrade Request"}
                </button>
              </div>
            </div>
        </>
    )
}
export default UpdateStatus