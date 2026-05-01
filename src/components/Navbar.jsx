import { LogIn, LogOut } from "lucide-react"

const NavBar = ({ isLoggedIn, userName }) => {

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
            <a href="#" className="hover:text-blue-600 transition-colors">Classes</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Study Materials</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Profile</a>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-slate-700 font-medium hidden sm:block">Hello, {userName}</span>
                <button className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold text-sm hover:bg-red-50 rounded-lg transition-all">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md">
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