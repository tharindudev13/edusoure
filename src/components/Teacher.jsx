import { User } from "lucide-react"
import { useState,useEffect } from "react"
import { Link } from "react-router"

const Teacher = ({ name,id }) => {
    const token = localStorage.getItem('token')
    const [tchId,setTchId] = useState("")
    
    useEffect(() => {
        const fetchUserId = async() => {
            try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/userId/${id}`,{
                method: "GET",
                headers: {
                "Authorization" : `Bearer ${token}`
                }
            })
            if(response.ok){
                const result = await response.text()
                setTchId(result)
            }
            }catch(error){
            console.log(error);
            }
        }
        fetchUserId()
    },[])

  return (
    <div className="flex items-center gap-2">
        <Link to={`/profile/${name}/${tchId}`} className="flex items-center gap-2 hover:underline cursor-pointer">
            <User className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-slate-800">{name}</span>
        </Link>
    </div>
  )
}

export default Teacher