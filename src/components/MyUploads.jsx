import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import MaterialCard from "./FileCard"
import { FileText } from "lucide-react"

const MyUploads = () => {

    const[myUploads,setMyUploads] = useState([])
    const {user} = useSelector((state) => state.auth);
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchMyUploads = async () =>{
            try{
                console.log(user.name);
                
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/material/uploads/${user?.name}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(response.ok){
                    const result = await response.json()
                    setMyUploads(result)
                    
                }
            }catch(error){
                console.log(error);
                
            }
        }
        fetchMyUploads()
    },[])



    const groupedUploads = myUploads.reduce((acc, currentUpload) => {
        const status = currentUpload.status.toLowerCase() || 'Other';
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(currentUpload);
        return acc;
    }, {});

    return(
        <>
        <div className="p-6 space-y-10">
            {Object.entries(groupedUploads).map(([status, items]) => (
                <div key={status} className="space-y-4">
                {/* Group Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
                    <FileText /><h2 className="text-xl font-bold text-slate-800"> {status.charAt(0).toUpperCase() + status.slice(1)} Uploads</h2>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-sm font-medium">
                    {items.length}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((file) => (
                    <MaterialCard key={file.id} 
                            fileName={file.fileName}
                            previewUrl={file.url}
                            author={file.author}
                            type={file.type}
                            fileName={file.name}
                            subject={file.subject}
                        />
                    ))}
                </div>
                </div>
            ))}
</div>
        </>
    )
}

export default MyUploads