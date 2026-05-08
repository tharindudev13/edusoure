import { Plus, Upload, Info, Image as ImageIcon, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import SuccessModal from '../components/FeedBack';
import { useNavigate } from 'react-router';

const RequestClassForm = () => {

    const[gallery,setGallery] = useState([null,null,null,null])
    const[subject,setSubject] = useState('')
    const[year,setYear] = useState(new Date().getFullYear())
    const[desc,setDesc] = useState('')
    const[mode,setMode] = useState('Select')
    const[locations,setLocations] = useState('')
    const[thumbFile,setThumbFile] = useState()
    const[pay,setPay] = useState()
    const[duration,setDuration] = useState('')
    const[lms,setLms] = useState('')
    const[hotline,setHotline] = useState('')
    const[tc_id,setTc_id] = useState(null)
    const[images,setImages] = useState([])
    

    const[loading,setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [heading,setHeading] = useState("")
    const [messege,setMessege] = useState("")
    const [type,setType] = useState("")
    const [btn,setBtn] = useState("")


    const {user} = useSelector((state) => state.auth)
    const token = localStorage.getItem('token')

    const teacherName = user.name

    const isTeacher = user?.roles?.includes("ROLE_TEACHER");
    const navigate = useNavigate()



    const handleGallery = (e,index) => {
        const file = e.target.files[0]
        if(file){
            const newGallery = [...gallery]
            const newImages = [...images]
            newImages[index] = file
            newGallery[index] = URL.createObjectURL(file)
            setGallery(newGallery)
            setImages(newImages)
        }
    }

    console.log(images);
    useEffect(() => {
        const fetchTc_id = async (id) =>{
            try{
                const response = await fetch(`http://localhost:8080/api/v1/teachers/id/${id}`,{
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                })

                if(response.ok){
                    const result = await response.json()
                    setTc_id(result)
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchTc_id(user.id)
    },[])

    const requestClass = async() => {
        const formData = new FormData()

        const classData = {
            subject: subject,
            year: year,
            tc_name: teacherName,
            tc_id: tc_id,
            mode: mode,
            duration: duration,
            lms: lms,
            locations: locations.split(',').map(l => l.trim()),
            hotline: hotline
        }

        formData.append('data', new Blob([JSON.stringify(classData)], {type: 'application/json'}));
        if(thumbFile) formData.append('thumbnail',thumbFile);

        images.forEach((file) => {
            if (file != undefined && file instanceof File) formData.append('images', file); 
        });

        if(pay) formData.append('source',pay)

        try{
            setLoading(true)
            const response = await fetch('http://localhost:8080/api/v1/class/req',{
                method: "POST",
                headers: {"Authorization" : `Bearer ${token}`},
                body: formData
            })

            if(response.ok){
                setShowSuccess(true);
                setBtn("Great, Thanks!")
                setMessege("Your request has been sent to the administration. You can track the status in your pending classes.")
                setHeading("Class requested!")
                setType("success")
            }else{
                setShowSuccess(true);
                setBtn("Back")
                setMessege("Failed to send your request!. Please try again")
                setHeading("Request Failed!")
                setType("fail")
            }
        }catch(error){
            setShowSuccess(false);
            throw error 
        }finally{
            setLoading(false)
        }
        
    }


    if(loading){
        return(
            <Loading messege={"Sending Request...."}/>
        )
    }

    if(!isTeacher){
        return(
            <SuccessModal 
                isOpen={true} 
                onClose={() => navigate('/')} 
                button_text={"Back to home"}
                heading={"Access Denied"}
                messege={"You have no permissions here..."}
                type={'error'}
    />
        )
    }


  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side: Payment Instructions */}
          <div className="lg:w-1/3 bg-blue-600 p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Class Request</h2>
            <div className="space-y-6">
              <div className="bg-blue-500/30 p-4 rounded-2xl border border-blue-400/30">
                <h3 className="flex items-center gap-2 font-semibold mb-3">
                  <Info size={18} /> Payment Instructions
                </h3>
                <div className="space-y-3 text-sm text-blue-50">
                  <div>
                    <p className="opacity-70">Bank</p>
                    <p className="font-medium">Bank of Ceylon (BOC)</p>
                  </div>
                  <div>
                    <p className="opacity-70">Account Number</p>
                    <p className="font-medium tracking-wider">8123 4567 8901</p>
                  </div>
                  <div>
                    <p className="opacity-70">Amount</p>
                    <p className="font-bold text-lg">LKR 1,500.00</p>
                  </div>
                  <div>
                    <p className="opacity-70">Remarks</p>
                    <p className="font-medium underline decoration-blue-300">REQ_CLASS_[YOUR_NAME]</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                * Please ensure the payment receipt clearly shows the date and transaction ID. Your request will be reviewed within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Side: Form Fields */}
          <div className="lg:w-2/3 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Academic Year</label>
                  <input required type="text" value={year} onChange={(e) => setYear(e.target.value)}  placeholder="e.g. 2025" className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Subject</label>
                  <input required type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Combined Maths" className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Class duration</label>
                  <input  required type="text" value={duration} onChange={(e) =>setDuration(e.target.value)} placeholder="e.g. 4 hours/week" className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Hotline</label>
                  <input  required type="text" value={hotline} onChange={(e) =>setHotline(e.target.value)} placeholder="e.g. +94789101112" className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mode</label>
                  <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm outline-none">
                    <option>Online</option>
                    <option>Physical</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Location(s)</label>
                  <input required type="text" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="e.g. Colombo, Galle" className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">lms link(If available)</label>
                  <input required type="text" value={lms} onChange={(e) => setLms(e.target.value)} placeholder="e.g. www.onlineclass.lk" className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Class Description</label>
              <textarea required rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the class schedule, syllabus coverage..." className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
            </div>

            {/* Image Uploads Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-blue-600" /> Media & Attachments
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Thumbnail */}
                <label className="border-2 border-dashed border-slate-100 rounded-2xl p-4 hover:border-blue-200 transition-colors cursor-pointer group">
                  <p className="text-[10px] font-bold text-blue-600 mb-2 uppercase">Main Thumbnail</p>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Upload size={18} />
                    </div>
                    <span className="text-xs text-slate-400">Upload 16:9 image</span>
                  </div>
                  <input required type="file"  onChange={(e) => setThumbFile(e.target.files[0])} className="cursor-pointer text-xs text-slate-400" accept="image/*" />
                </label>

                {/* Payment Proof */}
                <label className="border-2 border-dashed border-slate-100 rounded-2xl p-4 hover:border-blue-200 transition-colors cursor-pointer group bg-slate-50/50">
                  <p className="text-[10px] font-bold text-green-600 mb-2 uppercase">Payment Confirmation</p>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <FileText size={18} />
                    </div>
                    <span className="text-xs text-slate-400">PDF or Screenshot</span>
                  </div>
                  <input required type="file" onChange={(e) => setPay(e.target.files[0])} className="text-xs text-slate-400" accept="image/*,application/pdf" />
                </label>
              </div>

              {/* Gallery Images */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase ml-1">Gallery Images (Up to 4)</p>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <label key={i} className="aspect-square border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-100 cursor-pointer transition-all">
                      {gallery[i] ? (
                                <img src={gallery[i]} className="w-full h-full object-cover" />
                            ) : (
                                <Plus size={20} className="text-slate-300" />
                        )}
                        <input required type="file" className="hidden" onChange={(e) => handleGallery(e, i)} />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button onClick={() => requestClass()} className="w-full mt-10 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98]">
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <SuccessModal 
      isOpen={showSuccess} 
      onClose={() => setShowSuccess(false)} 
      button_text={btn}
      heading={heading}
      messege={messege}
      type={type}
    />
  
    </div>

    
  );
};

export default RequestClassForm;