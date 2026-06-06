import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GraduationCap, Landmark } from "lucide-react";
import { updateUserRole } from "../features/authSlice";
import { useNavigate } from "react-router";

const RoleSelectionModal = ({ isOpen, onClose }) => {

    const { user, token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
  if (!isOpen) return null;

  

  const handleRoleSelection = async (selectedRole) => {

    try {
      setLoading(true);

     
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/set-role/${user?.id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: selectedRole
      });

      if (response.ok) {
        dispatch(updateUserRole(selectedRole)); // Instantly updates layout access permissions in Redux
        onClose();
      }
    } catch (err) {
      window.alert("Failed to update profile role.");
    } finally {
      setLoading(false);
      navigate("/settings")
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 text-center space-y-6 scale-in duration-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Welcome to EduSource!</h2>
          <p className="text-xs text-slate-400 mt-1">Please confirm your account profile identity type below.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {/* STUDENT BUTTON */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleRoleSelection("STUDENT")}
            className="cursor-pointer group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all outline-none"
          >
            <div className="p-3 bg-slate-100 group-hover:bg-blue-100 rounded-xl text-slate-500 group-hover:text-blue-600 transition-colors">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 group-hover:text-blue-900">I am a Student</h4>
              <p className="text-[11px] text-slate-400 leading-normal">Access dashboard modules, attend classrooms, and track course records.</p>
            </div>
          </button>

          {/* TEACHER BUTTON */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleRoleSelection("TEACHER")}
            className="cursor-pointer group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all outline-none"
          >
            <div className="p-3 bg-slate-100 group-hover:bg-blue-100 rounded-xl text-slate-500 group-hover:text-blue-600 transition-colors">
              <Landmark size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 group-hover:text-blue-900">I am a Teacher</h4>
              <p className="text-[11px] text-slate-400 leading-normal">Create classes, schedule live meeting timelines, and publish materials.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;