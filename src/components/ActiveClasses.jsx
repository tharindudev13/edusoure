import { useEffect, useState } from "react"
import ClassCard from "./ClassCard"

const ActiveClasses = ({ id }) => {

    const[myClasses,setMyClasses] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchMyClasses = async () =>{
            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/class/active-classes/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(response.ok){
                    const result = await response.json()
                    setMyClasses(result)
                    
                }
            }catch(error){
                console.log(error);
                
            }
        }
        fetchMyClasses()
    },[id])


    return(
        <>
        <div className="p-6 space-y-10">
           
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myClasses.map((cls) => (
                    <ClassCard key={cls.id} 
                        thumbnail={cls.thumbnail}
                                    year={cls.year}
                                    teacherName={cls.teacher.name}
                                    numReviews={cls.reviews? cls.reviews.length : 0}
                                    avgRating={cls.avgRating}
                                    id={cls.id}
                                    subject={cls.subject}
                                    status={cls.status} 
                                    />
                    ))}
                </div>
                </div>
          
        </>
    )
}

export default ActiveClasses