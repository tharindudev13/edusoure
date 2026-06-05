import { LogIn, LogOut, Home, BookOpen, FileText, HelpCircle, User, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link, NavLink, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import SuccessModal from "./FeedBack";
import { encode } from "../features/encode";

const NavBar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const id = encode(user?.id)
  
  const isTeacher = user?.roles?.includes("ROLE_TEACHER");

  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=2563eb&color=fff`;

  const [avatarSrc, setAvatarSrc] = useState(user?.profilePic || DEFAULT_AVATAR);

  // Sync state if user data loads later asynchronously
  

  // Click outside listener hook to auto-close profile menu dropdown safely
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/login");
  };

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
            <Link to="/">EduSource</Link>
          </div>

          {/* Desktop Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase tracking-wide">
            <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
            <NavLink to="/classes" className={desktopLinkClass}>Classes</NavLink>
            <NavLink to="/materials" className={desktopLinkClass}>Study Materials</NavLink>
            {!isTeacher && 
              <NavLink to="/quizes" className={desktopLinkClass}>Quizes</NavLink>
            }
          </div>

          {/* Right Side: Auth / Profile Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                
                {/* User Avatar Action Node */}
                <div className="relative">
                  <img
                    src={avatarSrc}
                    alt="Profile"
                    onError={() => avatarSrc !== DEFAULT_AVATAR && setAvatarSrc(DEFAULT_AVATAR)}
                    className={`w-9 h-9 rounded-full object-cover border cursor-pointer transition-all ${
                      dropdownOpen ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-400"
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />

                  {/* --- DYNAMIC CUSTOM USER PROFILE MENU DROPDOWN --- */}
                  {/* --- DYNAMIC CUSTOM USER PROFILE MENU DROPDOWN --- */}
{dropdownOpen && (
  <div className="absolute right-0 mt-2.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
    {/* Header Info */}
    <div className="px-3 py-2 border-b border-slate-100 mb-1">
      <p className="text-[10px]  text-slate-400 font-bold tracking-wider uppercase">User Account</p>
      <p className="text-sm text-slate-800 font-black truncate max-w-45 mt-0.5">{user?.name || "EduSource User"}</p>
    </div>

    {/* Dropdown Options */}
    <button
      onClick={() => {
        setDropdownOpen(false);
        navigate(`/myprofile/${id}/${user?.name}`);
      }}
      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left"
    >
      <User size={15} className="text-slate-400 group-hover:text-blue-600" /> My Profile
    </button>

    <button
      onClick={() => {
        setDropdownOpen(false);
        navigate("/about");
      }}
      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left"
    >
      <HelpCircle size={15} className="text-slate-400" /> About Us
    </button>

    <button
      onClick={() => {
        setDropdownOpen(false);
        navigate("/privacy");
      }}
      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left"
    >
      <FileText size={15} className="text-slate-400" /> Privacy Policy
    
    </button>
    <button
      onClick={() => {
        setDropdownOpen(false);
        navigate("/settings");
      }}
      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left"
    >
      <Settings size={15} className="text-slate-400" /> Settings
    
    </button>

    <div className="h-px bg-slate-100 my-1" />

    {/* Logout Execution Action */}
    <button
      onClick={() => {
        setDropdownOpen(false);
        setActive(true);
      }}
      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left"
    >
      <LogOut size={15} /> Logout
    </button>
  </div>
)}
                </div>

                {/* Desktop Logout Button (Hidden on tiny mobile viewports) */}
                <button
                  onClick={() => setActive(true)}
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

      {/* --- BOTTOM MOBILE NAVIGATION BAR --- */}
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

        {!isTeacher && (
          <NavLink to="/quizes" className={mobileLinkClass}>
            {/* Swapped custom error icon to standard Lucide FileText configuration mapping */}
            <FileText size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Quizes</span>
          </NavLink>
        )}

        {token && (
          <button
            onClick={() => setActive(true)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-red-500 hover:text-red-600 cursor-pointer"
          >
            <LogOut size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Logout</span>
          </button>
        )}
      </div>
      
      {/* Visual layout footer buffer */}
      <div className="h-16 md:hidden" />

      <SuccessModal 
        isOpen={active}
        onClose={() => {
          handleLogout();
          setActive(false);
        }}
        type="warning"
        heading="Are you sure you want to logout?"
        messege=""
        button_text="Confirm Logout"
        onCancel={() => setActive(false)}
      />
    </>
  );
};

export default NavBar;