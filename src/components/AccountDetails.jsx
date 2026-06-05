import { MapPin, Phone, Upload, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AccountDetails = () => {

    const {user} = useSelector((state) => state.auth)

    const [profilePic, setProfilePic] = useState(null);
    const [picPreview, setPicPreview] = useState(user?.profilePic || "");
    const [details,setDetails] = useState({})
    const [loading,setLoading] = useState(false)

    const fileInputRef = useRef(null);

    const token = localStorage.getItem('token')
    

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

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
              setName(result.name)
              setPhone(result.phone)
              setAddress(result.address)
          }
      }
      getDetails()
    },[])

    const detailsToUpdate = {
      name: name,
      phone: phone,
      address: address, 
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
              </div>


              <div className="pt-4 border-t border-slate-100 text-right">
                <button 
                    type="submit" 
                    className="cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    disabled={loading || (name === details?.name && phone === details?.phone && address === details?.address && !profilePic)}
                    >
                  {loading ? "Updating...." : "Update Profile"}
                </button>
              </div>
            </form>
          
        </>
    )
}

export default AccountDetails