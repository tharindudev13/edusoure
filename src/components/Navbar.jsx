import { LogIn, LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { NavLink, useNavigate } from "react-router";

const NavBar = () => {

    const dispatch = useDispatch()
    const {token, user} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    

    return (
        <>
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-black text-blue-600 tracking-tight">
            EduSource
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase tracking-wide">
            <NavLink to="/" className="hover:text-blue-600 transition-colors">Home</NavLink>
            <NavLink to="/classes" className="hover:text-blue-600 transition-colors">Classes</NavLink>
            <NavLink to="/materials" className="hover:text-blue-600 transition-colors">Study Materials</NavLink>
            <NavLink to={`/profile/${user.name}/${user.id}`} className="hover:text-blue-600 transition-colors">Profile</NavLink>
            
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <button onClick={() => {
                  dispatch(logout())
                  navigate('/login')
                }} className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold text-sm hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md cursor-pointer">
                <LogIn size={18} /> Login
              </button>
            )}
          </div>
        </div>
      </nav>
        </>
    )

}

export default NavBar;