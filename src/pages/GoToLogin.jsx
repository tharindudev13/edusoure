import {  Link } from 'react-router';
import { LogIn, Lock } from 'lucide-react';

const GoToLogin = () => {
   

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-slate-50 rounded-full">
                        <Lock />
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-800 mb-2">
                    Session Expired !
                </h1>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    You are not logged in or your session has expired. Please log in to continue accessing the content...
                </p>

                <div className="flex flex-col gap-3">
                    <Link 
                        to="/login" 
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-100"
                    >
                        <LogIn size={18} /> Go to Login
                    </Link>
                </div>
            </div>

            {/* Keep technical details hidden for users, but visible for you in console
            {process.env.NODE_ENV === 'development' && (
                <p className="mt-4 text-xs text-slate-300">
                    Debug: {error?.message || "No message available"}
                </p>
            )} */}
        </div>
    );
};

export default GoToLogin;