import  { useEffect, useState } from 'react';
import { User, BookOpen, Camera, ChevronRight, ChevronLeft, EyeOff, Eye } from 'lucide-react';
import { Alert } from './Alert';
import Loading from './Loading';
import SuccessModal from './FeedBack';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState([]);

  const [loading,setLoading] = useState(false)

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const [profilePicPreview, setProfilePicPreview] = useState();
  const [profilePicFile, setProfilePicFile] = useState("");
  const [name, setName] = useState("User");
  const [school,setSchool] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [mode,setMode] = useState("");
  const [stream,setStream] = useState("");
  const [subjects,setSubjects] = useState([]);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [showSuccess,setShowSuccess] = useState(false)
  const [btn,setBtn] = useState("")
  const [heading,setHeading] = useState("")
  const [messege,setMessege] = useState("")
  const [type,setType] = useState("")
  const [isValid,setIsValid] = useState(true)
  const [msg,setMsg] = useState("")

  const navigate = useNavigate()

  const toggleSubject = (sub) => {
    setSubjects((prev) =>
      prev.includes(sub) ? prev.filter((item) => item !== sub) : [...prev, sub]
    );
  };

  const handleEmailChange = async(e) => {
    const value = e.target.value;
    setEmail(value);    
    if(value.includes("@") && value.includes(".")){
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/checkemail/${value}`);
        const data = await response.json();
        setIsValid(data);
        if(data){
          setMsg("Email is valid")
        }else{
          setMsg("This email is already in use!")
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }else{
      setIsValid(false)
      setMsg("Please enter a valid email address")
    }
  }

  const createUser = async() => {
    const formData = new FormData()

    const newUser = {
      email: email,
      password: password,
      roles: [role],
      stream: stream,
      subjects: subjects,
      info: {
        name: name,
        phone: phone,
        address: address,
        ...(role === "TEACHER" && { mode }),
        ...(role === "STUDENT" && { school })
      }
      
    }
    formData.append('data', new Blob([JSON.stringify(newUser)], {type: 'application/json'}));
    if(profilePicFile) formData.append('profile_pic',profilePicFile);

    try{
      setLoading(true)
      console.log([...formData])
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/create`,{
                method: "POST",
                body: formData
            })
      
      if(response.ok){
        setShowSuccess(true)
        setBtn("Go to Login")
        setMessege("Your Account created successfully...!")
        setHeading("Account created!")
        setType("success")
        setLoading(false)
      }else{
        setShowSuccess(true);
        setBtn("Back")
        setMessege("Failed to send your request!. Please try again")
        setHeading("Request Failed!")
        setType("fail")
        setLoading(false)
      }
    }catch(error){
      setShowSuccess(false);
      throw error
    }finally{
      setLoading(false)
    }


    
  }

  useEffect(() => {{
        document.title = "Register | EduSource"
      }})

  if(loading){
    return(
      <Loading messege={"Creating User...."} />
    )
  }

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
                  onClick={() => {setRole('STUDENT'); nextStep();}}
                  className={`p-8 border-2 rounded-2xl transition-all text-center ${role === 'STUDENT' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                  <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <span className="font-bold text-slate-800">I am a Student</span>
                </button>
                <button 
                  onClick={() => {setRole('TEACHER'); nextStep();}}
                  className={`p-8 border-2 rounded-2xl transition-all text-center ${role === 'TEACHER' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
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
                <div className="col-span-1 md:col-span-2 flex justify-center mb-4">
                  <label className="w-24 h-24 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
                    {profilePicPreview ? (
                      <img src={profilePicPreview} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <>
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold uppercase mt-1">Profile Pic</span>
                      </>
                    )}
                    <input required onChange={(e) => {
                                              setProfilePicPreview(URL.createObjectURL(e.target.files[0]))
                                              setProfilePicFile(e.target.files[0])}} 
                                              type="file" className="hidden" accept='image/*'/>
                  </label>
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {role === 'TEACHER' ? (
                  <input 
                    required
                    type="text" 
                    placeholder="Online/Physical or Hybrid?" 
                    className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" 
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  />
                ): (
                  <input 
                    required
                    type="text" 
                    placeholder="School Name" 
                    className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" 
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  />
                )}
                <div className="relative flex items-center w-full max-w-sm">
                    <div className="absolute left-4 flex items-center gap-1.5 select-none pointer-events-none text-slate-400 font-semibold text-sm">
                      <span>+94</span>
                      <div className="w-px h-4 bg-slate-200 ml-1" /> 
                    </div>

                    <input 
                      required
                      type="tel" 
                      placeholder="7X XXX XXXX" 
                      className="w-full p-3 pl-20 rounded-xl border border-slate-200 outline-none focus:border-blue-500 text-sm font-medium text-slate-800 transition-colors" 
                      value={phone ? phone.replace(/^\+94/, '') : ''} 
                      onChange={(e) => {
                        let rawInput = e.target.value.replace(/\s+/g, ''); 

                        if (!rawInput) {
                          setPhone('');
                          return;
                        }

                        if (rawInput.startsWith('+94')) {
                          rawInput = rawInput.substring(3);
                        } else if (rawInput.startsWith('94')) {
                          rawInput = rawInput.substring(2);
                        }

                        if (rawInput.startsWith('0')) {
                          rawInput = rawInput.replace(/^0+/, '');
                        }

                        const cleanDigits = rawInput.replace(/\D/g, '');

                        setPhone(`+94${cleanDigits}`);
                      }}
                    />
                  </div>
                <input 
                  required
                  type="text" 
                  placeholder="Hometown" 
                  className="p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Subjects & Stream */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Academic Focus</h3>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-3">Select Stream</label>
                <select 
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                >
                  <option>Physical Science (Combined Maths)</option>
                  <option>Biological Science</option>
                  <option>Technology</option>
                  <option>Commerce</option>
                  <option>Arts</option>
                  <option>Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-3">Interested Subjects</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Combined Maths', 'Physics', 'Chemistry', 'ICT', 'Biology','Business Studies','Accounting','Economics','Agriculture','Science for Technology','Engineering Technology','Bio systems technology'].map(sub => (
                    <label key={sub} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input 
                        required
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded" 
                        checked={subjects.includes(sub)}
                        onChange={() => toggleSubject(sub)}
                      />
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
                {isValid ? <Alert message={msg} type={"success"}/> : <Alert message={msg} type={"error"}/>}
                <input type="email" required value={email} onChange={(e) => handleEmailChange(e)} placeholder="Email Address" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                
                {password !== confirmPassword ? <Alert type="error" message={"Passwords are not matching!"}/> : <Alert type="success" message={"Passwords are matching!"}/>}
                <div className="relative flex items-center">
                <input type={showPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                <button
                  type="button" 
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-blue-700 text-xs">
                By clicking register, you agree to provide accurate information for academic verification purposes.
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-slate-100">
            {step > 1 && (
              <button onClick={prevStep}  className="cursor-pointer flex items-center gap-2 px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <button onClick={nextStep} className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={createUser} disabled={password !== confirmPassword || !isValid} className="cursor-pointer px-10 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all">
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
      isOpen={showSuccess}
      onClose={() =>{
        if(showSuccess){
           navigate('/login')
        }else{
          navigate('/register')
        }
        setShowSuccess(false)
      }}
      button_text={btn}
      heading={heading}
      messege={messege}
      type={type}
      />

    </div>
  );
};

export default RegisterPage;