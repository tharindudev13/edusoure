import  { useState } from 'react';
import { BookOpen, Users, GraduationCap, FileText, PlusCircle, LogOut, LogIn } from 'lucide-react';
import ClassCard from '../components/ClassCard'; // Assuming ClassCard is in the same directory
import NavBar from '../components/Navbar';

const HomePage = () => {
  // Demo State: Swap this with your JWT/Auth context later
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Saman");
  const [fileName,setFileName] = useState("");
  const [fileType,setFileType] = useState("Notes")

  // Stat Data
  const stats = [
    { label: "Total Classes", count: "128", icon: <BookOpen className="text-blue-600" /> },
    { label: "Active Students", count: "1,450", icon: <Users className="text-blue-600" /> },
    { label: "Expert Teachers", count: "45", icon: <GraduationCap className="text-blue-600" /> },
    { label: "Study Materials", count: "890", icon: <FileText className="text-blue-600" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* --- NAVBAR --- */}
    <NavBar isLoggedIn={isLoggedIn} userName={userName} />    

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        
        {/* --- QUICK STAT CARDS --- */}
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

{/* --- QUICK MATERIAL UPLOAD (Updated with Type Selection) --- */}
<section className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center gap-8">
  <div className="md:w-1/4">
    <h2 className="text-2xl font-bold mb-1">Add Content</h2>
    <p className="text-blue-100 text-xs">Share your resources with the community.</p>
  </div>
  
  <div className="md:w-3/4 w-full flex flex-col lg:flex-row gap-3 bg-white p-2 rounded-2xl">
    {/* File Name Input */}
    <input 
      type="text"
      placeholder="File name..."
      className="flex-1 text-slate-800 p-2 text-sm outline-none border-b lg:border-b-0 lg:border-r border-slate-100"
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}
    />

    {/* New: Material Type Selection */}
    <select 
      className="flex-1 text-slate-800 p-2 text-sm outline-none border-b lg:border-b-0 lg:border-r border-slate-100 bg-white"
      value={fileType}
      onChange={(e) => setFileType(e.target.value)}
    >
      <option value="Note">Note</option>
      <option value="Shortnote">Shortnote</option>
      <option value="pastpaper">Past Paper</option>
      <option value="term test">Term Test</option>
      <option value="marking scheme">Marking Scheme</option>
    </select>
    
    {/* File Chooser */}
    <input 
      type="file" 
      className="flex-1 text-slate-800 p-2 text-sm outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" 
    />
    
    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
      <PlusCircle size={18} /> Upload
    </button>
  </div>
</section>

        {/* --- TOP RATED CLASSES --- */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-black text-slate-800">Top Rated Classes</h3>
            <a href="#" className="text-blue-600 font-bold text-sm hover:underline">View All</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ClassCard key={item} 
                subject="Machine Learning Core" 
                teacherName="Dr. Aruni Bandara" 
                avgRating={4.9} 
                year="2026" 
                numReviews={88} 
              />
            ))}
          </div>
        </section>

        {/* --- RECENT MATERIALS --- */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-black text-slate-800">Recently Added Materials</h3>
            <a href="#" className="text-blue-600 font-bold text-sm hover:underline">Browse Library</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="opacity-80"> {/* Slight styling diff for material vs class */}
                <ClassCard 
                  subject="Past Paper Solutions" 
                  teacherName="Prof. Silva" 
                  avgRating={4.5} 
                  year="Level 1" 
                  numReviews={12} 
                />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;