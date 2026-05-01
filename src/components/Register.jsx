import  { useState } from 'react';
import { User, BookOpen, Camera, ChevronRight, ChevronLeft } from 'lucide-react';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Step Indicator */}
        <div className="bg-blue-600 p-6 flex justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === s ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>
                {s}
              </div>
              <span className={`hidden md:block text-sm font-medium ${step === s ? 'text-white' : 'text-blue-200'}`}>
                Step {s}
              </span>
            </div>
          ))}
        </div>

        <div className="p-10">
          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800">Choose Your Role</h3>
                <p className="text-slate-500">Are you joining us to learn or to teach?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <button 
                  onClick={() => {setRole('student'); nextStep();}}
                  className={`p-8 border-2 rounded-2xl transition-all text-center ${role === 'student' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                  <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <span className="font-bold text-slate-800">I am a Student</span>
                </button>
                <button 
                  onClick={() => {setRole('teacher'); nextStep();}}
                  className={`p-8 border-2 rounded-2xl transition-all text-center ${role === 'teacher' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <span className="font-bold text-slate-800">I am a Teacher</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Personal Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 flex justify-center mb-4">
                  <div className="w-24 h-24 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
                    <Camera className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase mt-1">Profile Pic</span>
                  </div>
                </div>
                <input type="text" placeholder="Full Name" className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <input type="text" placeholder="NIC Number" className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <input type="text" placeholder="Phone Number" className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <input type="text" placeholder="Address" className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
              </div>
            </div>
          )}

          {/* STEP 3: Subjects & Stream */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Academic Focus</h3>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-3">Select Stream</label>
                <select className="w-full p-3 rounded-xl border border-slate-200 outline-none">
                  <option>Physical Science (Combined Maths)</option>
                  <option>Biological Science</option>
                  <option>Engineering Technology</option>
                  <option>Commerce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-3">Interested Subjects</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Mathematics', 'Physics', 'Chemistry', 'ICT', 'Biology'].map(sub => (
                    <label key={sub} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-slate-700">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Credentials */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Security Credentials</h3>
              <div className="space-y-4">
                <input type="email" placeholder="Email Address" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <input type="password" placeholder="Password" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <input type="password" placeholder="Confirm Password" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-blue-700 text-xs">
                By clicking register, you agree to provide accurate information for academic verification purposes.
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-slate-100">
            {step > 1 && (
              <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button className="px-10 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all">
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;