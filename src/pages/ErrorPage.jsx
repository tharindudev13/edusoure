import { useRouteError, useNavigate, Link } from 'react-router';
import { AlertCircle, Home, RotateCcw, ShieldAlert, WifiOff, Lock } from 'lucide-react';
import { useEffect } from 'react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {{
      document.title = "Error | EduSource"
    }})

    const getFriendlyErrorMessage = (err) => {
        if (err?.status === 404) {
            return {
                title: "Page Not Found",
                message: "The page you're looking for doesn't exist. Check the URL or head back home.",
                icon: <ShieldAlert size={48} className="text-orange-500" />
            };
        }
        if (err?.status === 403) {
            return {
                title: "Access Denied",
                message: "You don't have permission to view this page. Try logging in again.",
                icon: <Lock size={48} className="text-red-500" />
            };
        }
        if (err?.status === 500) {
            return {
                title: "Server Error",
                message: "Our servers are having a moment. Please try again in a few minutes.",
                icon: <AlertCircle size={48} className="text-red-500" />
            };
        }

        if (err?.message === "Failed to fetch") {
            return {
                title: "Connection Lost",
                message: "We can't reach the server. Please check your internet connection.",
                icon: <WifiOff size={48} className="text-slate-500" />
            };
        }

        return {
            title: "Something Went Wrong",
            message: "We encountered an unexpected error. Refreshing the page might help.",
            icon: <AlertCircle size={48} className="text-red-500" />
        };
    };

    const content = getFriendlyErrorMessage(error);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-slate-50 rounded-full">
                        {content.icon}
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-800 mb-2">
                    {content.title}
                </h1>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    {content.message}
                </p>

                <div className="flex flex-col gap-3">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-100"
                    >
                        <Home size={18} /> Back to Home
                    </Link>
                    
                    <button 
                        onClick={() => navigate(0)} // Reloads the current page
                        className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all"
                    >
                        <RotateCcw size={18} /> Try Again
                    </button>
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

export default ErrorPage;