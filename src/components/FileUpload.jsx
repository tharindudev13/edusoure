import { PlusCircle } from "lucide-react";
import { useState } from "react";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const FileUpload = () => {
    
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('Note');
    const [subject,setSubject] = useState('Physics')
    const [file,setFile] = useState()
    const {user} = useSelector((state) => state.auth)
    const author = user.id
    const token = localStorage.getItem('token')
    const [loading,setLoading] = useState(false)

    const [status,setStatus] = useState({type: '', messege: ''})


    const subjects = ["Combined Maths",
                      "Physics",
                      "Chemistry",
                      "Information Communication Technology",
                      "Accounting",
                      "Business Studies",
                      "Economics",
                      "English",
                      "Other"
                    ]

    const uploadFiles = async(file,author,name,subject,type) =>{

        setStatus({type: '',messege: ''})
        const formData = new FormData()

        formData.append('file',file)
        formData.append('author',author)
        formData.append('name',name || "")
        formData.append('subject',subject || "")
        formData.append('type',type || "")

        formData.forEach((value,key) =>{
            console.log(key + ": " + value);
        })

        try{
            setLoading(true)
            const response = await fetch("http://34.21.152.245:8080/api/v1/material/upload",{
                method: "POST",
                headers: {
                    "Authorization" : `Bearer ${token}`
                },
                body: formData
            })
            if (response.ok) {
                setStatus({ type: 'success', message: 'Material uploaded successfully!.Sent to the Admin Review' });
            } else {
                const errorText = await response.text();
                setStatus({ type: 'error', message: `Upload failed: ${errorText}` });
            }
        }catch(error){
            setStatus({type: 'error',messege: 'Network Error. Please try again later'})
            throw error    
        }finally{
            setLoading(false)
        }
    }

    const handleUpload = () => {
        uploadFiles(file,author,fileName,subject,fileType)
    }

    if(loading){
        return(
            <Loading messege={"Uploading Files"}/>
        )
    }

    
    return (
        <>

        {status.message && (
            <div className={`p-4 mb-4 rounded-lg text-sm font-medium animate-in fade-in duration-300 ${
                status.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
         }`}>
            <div className="flex items-center justify-between">
                <span>{status.message}</span>
                <button 
                    onClick={() => setStatus({ type: '', message: '' })}
                    className="ml-2 font-bold hover:opacity-70"
                >
                    ✕
                </button>
            </div>
        </div>
    )}

        <section className="bg-blue-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col xl:flex-row items-center gap-6">
  <div className="xl:w-1/4 w-full text-center xl:text-left">
    <h2 className="text-2xl font-bold mb-1">Add Content</h2>
    <p className="text-blue-100 text-xs opacity-80">Share your resources with the community.</p>
  </div>
  
  <div className="xl:w-3/4 w-full flex flex-col md:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-inner">
    {/* File Name Input */}
    <input 
      type="text"
      required
      placeholder="File name..."
      className="w-full md:flex-[1.5] text-slate-800 px-4 py-2 text-sm outline-none border-b md:border-b-0 md:border-r border-slate-100 placeholder:text-slate-400"
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}
    />
    
    {/* Subject Selection */}
    <select 
      className="w-full md:flex-1 text-slate-600 px-3 py-2 text-sm outline-none border-b md:border-b-0 md:border-r border-slate-100 bg-white cursor-pointer"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    >
      {subjects.map((s, index) => (
        <option key={index} value={s}>{s}</option>
      ))}
    </select>

    {/* Material Type Selection */}
    <select 
      className="w-full md:flex-1 text-slate-600 px-3 py-2 text-sm outline-none border-b md:border-b-0 md:border-r border-slate-100 bg-white cursor-pointer"
      value={fileType}
      onChange={(e) => setFileType(e.target.value)}
    >
      <option value="Note">Note</option>
      <option value="Shortnote">Shortnote</option>
      <option value="pastpaper">Past Paper</option>
      <option value="term test">Term Test</option>
      <option value="marking scheme">Marking Scheme</option>
    </select>
    
    {/* File Chooser - Simplified Width */}
    <div className="w-full md:flex-[1.2] px-2">
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-xs text-slate-500
          file:mr-3 file:py-1.5 file:px-3
          file:rounded-full file:border-0
          file:text-xs file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 cursor-pointer" 
      />
    </div>
    
    <button onClick={handleUpload} className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95">
      <PlusCircle size={18} /> <span>Upload</span>
    </button>
  </div>
</section>
        </>
    )
}

export default FileUpload;