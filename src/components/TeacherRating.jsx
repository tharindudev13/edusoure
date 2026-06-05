import { useEffect, useState } from "react"
import { decode } from "../features/encode"

const TeacherRating = ({id}) => {

    const token = localStorage.getItem('token')
    const [ratings,setRatings] = useState([])
    
    useEffect(() => {
        const fetchRatings = async(id) => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/getratings/${decode(id)}`,{
                    method : "GET",
                    headers:{
                        "Authorization" : `Bearer ${token}`
                    }
                })
                if(response.ok){
                    const result = await response.json()
                    setRatings(result)
                }
            }catch(error){
                console.log(error);           
            }
        }
        fetchRatings(id)
    },[id])

    return(
        <>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Teacher Rating</h3>
                        <div className="flex items-center mt-1">
                            {/* Star Icon */}
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-2 text-2xl font-bold text-slate-800">
                                {ratings[0]?.toFixed(2) || "0.0"}
                            </span>
                            <span className="ml-1 text-slate-400 text-sm">/ 5.0</span>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Reviews</h3>
                        <p className="mt-1 text-2xl font-bold text-blue-600">
                            {parseInt(ratings[1]) || 0}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TeacherRating