import { useEffect, useState } from "react"
import ClassCard from "./ClassCard"
import { useSelector } from "react-redux"

const MyClasses = () => {

    const[myClasses,setMyClasses] = useState([])
    const {user} = useSelector((state) => state.auth);
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchMyClasses = async () =>{
            try{
                const response = await fetch(`http://34.21.152.245:8080/api/v1/class/classes-by-teacher/${user.id}`, {
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
    },[])



    const groupedClasses = myClasses.reduce((acc, currentClass) => {
        const status = currentClass.status.toLowerCase() || 'Other';
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(currentClass);
        return acc;
    }, {});

    return(
        <>
        <div className="p-6 space-y-10">
            {Object.entries(groupedClasses).map(([status, items]) => (
                <div key={status} className="space-y-4">
                {/* Group Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
                    <h2 className="text-xl font-bold text-slate-800">{status} Classes</h2>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-sm font-medium">
                    {items.length}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((cls) => (
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
            ))}
</div>
        </>
    )
}

export default MyClasses