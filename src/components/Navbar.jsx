import { LogIn, LogOut, Home, BookOpen, FileText, User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Dynamic UI Avatar fallback if user has no profile pic or it fails to load
  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=2563eb&color=fff`;

  const [avatarSrc, setAvatarSrc] = useState(user?.profilePic || DEFAULT_AVATAR);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Helper class for mobile nav links to keep code clean
  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
      isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
    }`;

  const desktopLinkClass = ({ isActive }) =>
    `hover:text-blue-600 transition-colors ${isActive ? "text-blue-600" : ""}`;

  return (
    <>
      {/* --- TOP NAVBAR (Desktop & Mobile Brand Line) --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-black text-blue-600 tracking-tight">
            EduSource
          </div>

          {/* Desktop Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase tracking-wide">
            <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
            <NavLink to="/classes" className={desktopLinkClass}>Classes</NavLink>
            <NavLink to="/materials" className={desktopLinkClass}>Study Materials</NavLink>
            <NavLink to={`/myprofile/${user?.id}/${user?.name}`} className={desktopLinkClass}>Profile</NavLink>
          </div>

          {/* Right Side: Auth / Profile Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-3">
                {/* User Avatar with error fallback */}
                <img
                  src={avatarSrc}
                  alt="Profile"
                  onError={() => avatarSrc !== DEFAULT_AVATAR && setAvatarSrc(DEFAULT_AVATAR)}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 cursor-pointer"
                  onClick={() => navigate(`/myprofile/${user?.id}/${user?.name}`)}
                />
                {/* Logout Button (Hidden on tiny mobile screens to save space) */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-red-500 font-bold text-sm hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 shadow-md cursor-pointer"
              >
                <LogIn size={18} /> Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- BOTTOM MOBILE NAVIGATION BAR (Facebook-Style / Hidden on Desktop) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 z-50 px-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <NavLink to="/" className={mobileLinkClass}>
          <Home size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </NavLink>

        <NavLink to="/classes" className={mobileLinkClass}>
          <BookOpen size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Classes</span>
        </NavLink>

        <NavLink to="/materials" className={mobileLinkClass}>
          <FileText size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Materials</span>
        </NavLink>

        <NavLink to={`/myprofile/${user?.id}/${user?.name}`} className={mobileLinkClass}>
          <UserIcon size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </NavLink>

        {/* Mobile-only interactive action for Logout if token exists */}
        {token && (
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-red-500 hover:text-red-600 cursor-pointer"
          >
            <LogOut size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Logout</span>
          </button>
        )}
      </div>
      
      {/* Visual buffer element so absolute content at the bottom of pages doesn't get hidden behind the mobile navbar */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default NavBar;