import { Mail, Lock, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../features/authSlice';
import { Alert } from './Alert';

const LoginPage = () => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error} = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({email,password})).then((result) => {            
            if(result.meta.requestStatus === 'fulfilled'){                
                navigate('/')
            }
        })
    }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Login to your EduSource account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            {error && <Alert message={"Something Went wrong....!"}/>}
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="name@university.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>

          <button type='submit' disabled={loading} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" />
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600">
          Don't have an account? <span className="text-blue-600 font-bold cursor-pointer">
            <Link to={"/register"}>
                Register here
            </Link>
            </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;