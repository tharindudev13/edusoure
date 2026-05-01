import { Book } from "lucide-react"
import { useEffect, useState } from "react"

const Subjects = ({id,isTeacher}) => {

    const token = localStorage.getItem('token')
    const [subjects,setSubjects] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() =>{
        const fetchSubjects = async (id)=>{
            
        const targetType = isTeacher ? 'teachers' : 'students';
          try{
            const response = await fetch(`http://localhost:8080/api/v1/${targetType}/subjects/${id}`,{
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}` 
              }
            })
            if(response.ok){
              const  result = await response.json()
              setSubjects(result)
            }
            
          }catch(error){
            console.log(error);
          }finally{
            setLoading(false)
          }
        }
        fetchSubjects(id)
      },[])


       

  return (
    <>
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Book size={20} className="text-blue-600" /> Subjects
            </h2>
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {sub}
                </span>
              ))}
            </div>
          </div>
    </>
  )
}

export default Subjects