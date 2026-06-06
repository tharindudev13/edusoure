import { Mail, Lock, LogIn, EyeOff, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../features/authSlice';
import { Alert } from './Alert';

// --- GOOGLE AUTH PACKAGES ---
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[showPass,setShowPass] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error} = useSelector((state) => state.auth)

    // Standard Form Handler (Dispatches to /api/v1/auth/login)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ 
            credentials: { email, password }, 
            type: 'login' 
        })).then((result) => {            
            if(result.meta.requestStatus === 'fulfilled'){                
                navigate('/')
            }
        })
    }

    // Google Sign-In Success Handler (Dispatches to /api/v1/auth/google)
    const handleGoogleSuccess = (credentialResponse) => {
        dispatch(loginUser({ 
            credentials: { idToken: credentialResponse.credential }, 
            type: 'google' 
        })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/');
            }
        });
    };

    useEffect(() => {
      document.title = "Login | EduSource"
    }, [])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Login to your EduSource account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {error && <Alert message={error === "Login Failed" ? "Invalid Credentials....!" : error}/>}
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="user@gmail.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input type={showPass ? "text" : "password"} 
                 value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
              </div>
            </div>

            <button type='submit' disabled={loading} className="cursor-pointer w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <LogIn className="w-5 h-5" />
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          {/* VISUAL LAYOUT SEPARATOR */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-mono font-bold tracking-wider">Or Continue With</span></div>
          </div>

          {/* --- FIXED OAUTH CONTAINER INNER WRAPPER --- */}
          <div className="w-full flex justify-center transform scale-102 sm:scale-100 origin-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => window.alert("Google Sign-In was cancelled or failed.")}
              shape="pill"
              theme="outline"
              size="large"
              // Removed width parameter to let Google auto-scale inside parent layout boundaries
              text="signin_with"
            />
          </div>

          <p className="text-center mt-8 text-sm text-slate-600">
            Don't have an account? <span className="text-blue-600 text-sm font-bold cursor-pointer">
              <Link to={"/register"}>
                  Register here
              </Link>
              </span>
          </p>

          <p className="text-center mt-2 text-slate-600">
            <span className="text-blue-600 text-sm font-bold cursor-pointer">
              <Link to={"/forgot-password"}>
                  forgot password?
              </Link>
              </span>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;