import { useEffect, useState } from "react"
import MaterialCard from "./FileCard"

const RecentMaterials = () => {

    const token = localStorage.getItem('token')
    const [recents,setRecents] = useState([])

    useEffect(() => {
        const fetchRecentmaterials = async() => {

            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/material/recents`,{
                method: "GET",
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            })
                if(response.ok){
                    const result = await response.json()
                    setRecents(result)
                }
            }catch(error){
                console.log(error);
                
            }
            
        }
        fetchRecentmaterials()

    },[])

    

    

    return(
        <>

            <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-black text-slate-800">Recently Added Materials</h3>
            <a href="#" className="text-blue-600 font-bold text-sm hover:underline">Browse Library</a>
          </div>

            {recents.length === 0 && (
            <p className="text-gray-500 text-center py-16">No materials found!. Try checking your connection.....</p>
          ) }

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recents.map((item) => (
              <div key={item.id} className="opacity-80"> {/* Slight styling diff for material vs class */}
                <MaterialCard 
                        previewUrl={item.url} 
                        fileName={item.name} 
                        author={item.author}
                        subject={item.subject}
                        type={item.type}/>
              </div>
            ))}
          </div>
        </section>
        </>
    )
}

export default RecentMaterials