import { useSelector } from 'react-redux';
import { User, Phone, MapPin,  FileText,  Contact, Video, School } from 'lucide-react';
import MaterialCard from '../components/FileCard'; // Using the card we built earlier
import {  useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import Subjects from '../components/Subjects';
import TeacherRating from '../components/TeacherRating';
import RequestClassNav from '../components/Req';
import MyClasses from '../components/MyClasses';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [userDetails,setUserDetails] = useState({})
  const token = localStorage.getItem('token')
  const [loading,setLoading] = useState(true)

  const {id} = useParams()

  useEffect(() =>{
      const fetchUserDetails = async (id)=>{
        try{
          const response = await fetch(`http://localhost:8080/api/v1/users/getuser/${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
          })
          
          if(response.ok){
          const  result = await response.json()
          setUserDetails(result)
          }
          if(response.status === 403){
            window.alert("Session expired. Please log in again.")
            localStorage.removeItem('token')
            window.location.href = '/login'
          }
        }catch(error){
          console.log(error);
        }finally{
          setLoading(false)
        }
      }
      fetchUserDetails(id)
      
    },[])
    

  const isTeacher = user?.roles?.includes("ROLE_TEACHER");

  if (loading) {
    return (
        <Loading messege={"Loading Profile..."}/>
    );
    }

    if (!userDetails) {
        return <div>User not found.</div>;
    }

    if(!loading){
        const profileData = {
            profilePic: userDetails.info.profile_pic,
            nic: userDetails.info.nic,
            phone: userDetails.info.phone,
            address: userDetails.info.address,
            mode: userDetails.info.mode,
            school: userDetails.info.school,
            uploadedMaterials: [
            { id: 1, fileName: "Intro to ML.pdf", subject: "Machine Learning", author: "Saman", uploadedDate: "2026-04-10" }
            ],
            classes: ["Batch 2026 - AI Core", "Advanced React"] // Only for Teachers
        };


        return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Profile Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img 
              src={profileData.profilePic} 
              className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover" 
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full border-2 border-white shadow-sm">
              <User size={16} className="text-white" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-slate-800">{userDetails.info.name}</h1>
            <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mt-1">
              {isTeacher ? "Teacher" : "Student"}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Contact size={20} className="text-blue-600" />Contact
            </h2>
            <div className="space-y-3">
              {/* <InfoItem icon={<CreditCard size={16}/>} label="NIC" value={profileData.nic} /> */}
              <InfoItem icon={<Phone size={16}/>} label="Phone" value={profileData.phone} />
              <InfoItem icon={<MapPin size={16}/>} label="Address" value={profileData.address} />
              {isTeacher ? 
                <InfoItem icon={<Video size={16}/>} label="Mode" value={profileData.mode} />
               :
               <InfoItem icon={<School size={16}/>} label="Mode" value={profileData.school} />}
            </div>
          </div>

          <Subjects id={id} isTeacher={isTeacher} />
        </div>

        {isTeacher && (
            <TeacherRating id={id}/>
        )}

        {isTeacher && <RequestClassNav />}


        {/* Conditional Teacher Classes Section */}
        {isTeacher && (
            <MyClasses />
        )}

        {/* Uploaded Materials Section */}
        <section>
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <FileText size={22} className="text-blue-600" /> Uploads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.uploadedMaterials.map((material) => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </div>
        </section>
      </div>
    </div>
        )
    }
    
};

// Helper component for clean list items
const InfoItem = ({ icon, label, value }) => (
  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
    <div className="flex items-center gap-2 text-slate-500">
      {icon} <span>{label}:</span>
    </div>
    <span className="font-semibold text-slate-700">{value}</span>
  </div>
);

export default ProfilePage;