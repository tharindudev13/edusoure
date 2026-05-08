import { useEffect, useState } from "react"
import ClassCard from "./ClassCard"
import { Link } from "react-router"

const TopRatedClasses = () => {

    const[topClasses,setTopClasses] = useState([])

    useEffect(() => {
        const fetchTopClasses = async () =>{
            try{
                const response = await fetch("http://localhost:8080/api/v1/class/top-rated")
                if(response.ok){
                    const result = await response.json()
                    setTopClasses(result)
                    
                }
            }catch(error){
                console.log(error);
                
            }
        }
        fetchTopClasses()
    },[])

    return(
        <>
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-black text-slate-800">Top Rated Classes</h3>
            <Link to={'/classes'} className="text-blue-600 font-bold text-sm hover:underline">View All</Link>
          </div>
          {topClasses.length === 0 && (
            <p className="text-gray-500 text-center py-16">No classes found!. Try checking your connection.....</p>
          ) }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topClasses.map((item) => (
              <ClassCard key={item.id} 
                thumbnail={item.thumbnail}
                subject={item.subject} 
                teacherName={item.teacher.name} 
                avgRating={item.avgRating} 
                year={item.year} 
                numReviews={item.reviews.length} 
                id={item.id}
              />
            ))}
          </div>
        </section>
        </>
    )
}

export default TopRatedClasses