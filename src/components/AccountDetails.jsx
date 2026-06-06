import { MapPin, Phone, Upload, User, GraduationCap, Laptop, BookMarked, Tags } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AccountDetails = () => {

    const {user} = useSelector((state) => state.auth)
    const isTeacher = user?.roles?.includes("ROLE_TEACHER");

    const [profilePic, setProfilePic] = useState(null);
    const [picPreview, setPicPreview] = useState(user?.profilePic || "");
    const [details,setDetails] = useState({})
    const [loading,setLoading] = useState(false)

    const fileInputRef = useRef(null);

    const token = localStorage.getItem('token')
    

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // --- NEW FIELD STATES ---
    const [school, setSchool] = useState("");
    const [mode, setMode] = useState("");
    const [stream, setStream] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    // Available Stream & Subject Configurations
    const streamsList = ["Physical Science", "Biological Science", "Commerce", "Arts", "Technology"];
    const subjectsMapList = ["Combined Mathematics", "Physics", "Chemistry", "Biology", "Accounting", "Business Studies", "Economics", "ICT","English","Engineering Technology","Science for Technology","Bio Systems Technology"];

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPicPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() =>{
      const getDetails = async() =>{
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/details/${user?.id}`,{
                  method: "GET",
                  headers: {
                  "Authorization" : `Bearer ${token}`
                  }
              })
          if(response.ok){
              const result = await response.json()
              setDetails(result)
              setName(result.name || "")
              setPhone(result.phone || "")
              setAddress(result.address || "")
              
              // Map saved values securely from the backend response profile
              setSchool(result.school || "")
              setMode(result.mode || "")
              setStream(result.stream || "")
              setSelectedSubjects(result.subjects || [])
          }
      }
      getDetails()
    },[])

    // Append multiple subjects into your state array list immutably
    const handleSubjectAppend = (e) => {
        const val = e.target.value;
        if (val && !selectedSubjects.includes(val)) {
            setSelectedSubjects([...selectedSubjects, val]);
        }
    };

    const handleSubjectRemove = (subjectToRemove) => {
        setSelectedSubjects(selectedSubjects.filter(sub => sub !== subjectToRemove));
    };

    const detailsToUpdate = {
      name: name,
      phone: phone,
      address: address, 
      school: school,
      mode: mode,
      stream: stream,
      subjects: selectedSubjects
  };


    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(detailsToUpdate)], {type: 'application/json'}));
    if(profilePic){
      formData.append('profile_pic', profilePic);
    }

    const updateProfile = async() => {
            try{
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/update/${user?.id}`,{
                    method: "POST",
                    headers: {
                    "Authorization" : `Bearer ${token}`
                    },
                    body: formData
                })
                if(response.ok){
                    window.alert("Profile Updated Successfully!")    
                }
            }catch(error){
                window.alert("Error: ",error)
            }finally{
                setLoading(false)
            }
        }

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    updateProfile()
}



    return(
        <>
        <form onSubmit={handleUpdateAccount} className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">Account Details</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update your personal details so your profile stays accurate</p>
              </div>

              {/* PROFILE IMAGE AVATAR SUB-SECTION */}
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <div className="relative group">
                  <img
                    src={picPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white ring-4 ring-blue-500/10 shadow-sm"
                  />
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">Profile Picture</h4>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <Upload size={14} /> Upload New Photo
                  </button>
                </div>
              </div>

              {/* TEXT FIELD METADATA MATRIX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Contact Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 7X XXX XXXX"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Somewhere in Sri Lanka..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* --- RENDER FIELD CONDITIONALLY FOR STUDENTS ONLY --- */}
                {!isTeacher && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">School Name</label>
                    <div className="relative">
                      <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="Enter your school name"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* --- RENDER FIELD CONDITIONALLY FOR TEACHERS ONLY --- */}
                {isTeacher && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Teaching Mode</label>
                    <div className="relative">
                      <Laptop size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-slate-600"
                      >
                        <option value="">Select Class Mode</option>
                        <option value="Online">Online Classes</option>
                        <option value="Physical">Physical Classes</option>
                        <option value="Both">Both Online &amp; Physical</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* --- RENDER FIELD CONDITIONALLY FOR STUDENTS ONLY --- */}
                {!isTeacher && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Subject Stream</label>
                    <div className="relative">
                      <BookMarked size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={stream}
                        onChange={(e) => setStream(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-slate-600"
                      >
                        <option value="">Select Your Stream</option>
                        {streamsList.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {/* --- MULTIPLE SELECTION SUBJECT MATRIX (SHARED / FOR BOTH) --- */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Subjects</label>
                  <div className="relative">
                    <Tags size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value=""
                      onChange={handleSubjectAppend}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200/80 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-slate-600"
                    >
                      <option value="">+ Add Subject</option>
                      {subjectsMapList.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Subject Badges Display Panel */}
              {selectedSubjects.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50/50 border border-slate-200/40 rounded-xl">
                  {selectedSubjects.map((sub) => (
                    <span key={sub} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] rounded-lg">
                      {sub}
                      <button type="button" onClick={() => handleSubjectRemove(sub)} className="text-blue-400 hover:text-blue-700 font-extrabold ml-1 outline-none">&times;</button>
                    </span>
                  ))}
                </div>
              )}


              <div className="pt-4 border-t border-slate-100 text-right">
                <button 
                    type="submit" 
                    className="cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    disabled={loading || (
                      name === details?.name && 
                      phone === details?.phone && 
                      address === details?.address && 
                      school === (details?.school || "") &&
                      mode === (details?.mode || "") &&
                      stream === (details?.stream || "") &&
                      JSON.stringify(selectedSubjects) === JSON.stringify(details?.subjects || []) &&
                      !profilePic
                    )}
                    >
                  {loading ? "Updating...." : "Update Profile"}
                </button>
              </div>
            </form>
          
        </>
    )
}

export default AccountDetails;