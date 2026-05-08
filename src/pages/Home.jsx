import  { useEffect, useState } from 'react';
import { BookOpen, Users, GraduationCap, FileText} from 'lucide-react';
import TopRatedClasses from '../components/TopRatedClasses';
import RecentMaterials from '../components/RecentMaterials';
import FileUpload from '../components/FileUpload';

const HomePage = () => {
  const [counts,setCounts] = useState({})

  useEffect(() =>{
    const fetchCounts = async ()=>{
      try{
        const response = await fetch("http://localhost:8080/api/v1/users/count")
        
        if(response.ok){
        const  result = await response.json()
        setCounts(result)
        }
      }catch(error){
        console.log(error);
        
      } 
    }
    fetchCounts()
  },[])

  

  const stats = [
    { label: "Total Classes", count: counts[2], icon: <BookOpen className="text-blue-600" /> },
    { label: "Active Students", count: counts[3], icon: <Users className="text-blue-600" /> },
    { label: "Expert Teachers", count: counts[0], icon: <GraduationCap className="text-blue-600" /> },
    { label: "Study Materials", count: counts[1], icon: <FileText className="text-blue-600" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
        

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-black text-slate-800">{stat.count}</h4>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

          <FileUpload />

        <TopRatedClasses />

        <RecentMaterials />

      </main>
    </div>
  );
};

export default HomePage;