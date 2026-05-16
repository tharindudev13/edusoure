import  { useEffect, useState } from 'react';
import { Star, MessageCircle, Send, ImageIcon } from 'lucide-react';
import Review from '../components/Review';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useParams,Link} from 'react-router';
import Teacher from '../components/Teacher';

const ClassDetailsPage = () => {
  // Example State for the new review input
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem('token')
  const [loading,setLoading] = useState(true)
  const [details,setDetails] = useState({})
  const {id} = useParams()

  const{user} = useSelector((state) => state.auth)

  const isStudent = user?.roles?.includes("ROLE_STUDENT");

  


  useEffect(() =>{
    const fetchClassDetails = async() => {
      try{
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/class/getclass/${id}`,{
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        })
        if(response.ok){
          const result = await response.json()
          setDetails(result)
          
          
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
    fetchClassDetails()
  },[id])

  


  console.log(details);

  

  if(loading){
    return(
      <Loading messege={"Loading Class Details..."}/>
    )
  }

  return (
    <>
    

    <div className="min-h-screen bg-slate-50 pb-12">
      {/* 1. Hero Section: Main Details & Thumbnail */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:flex gap-8">
          {/* Main Thumbnail (16:9) */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img 
                src={details.thumbnail} 
                alt={`${details.subject} By ${details.teacher.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Quick Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {details.year}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              {details.subject}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
              <Teacher name={details.teacher.name} id={details.teacher.tcId}/>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-slate-800">{details.avgRating}</span>
                <span className="text-sm text-slate-400">({details.reviews? details.reviews.length : 0})</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg">
              {details.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Description & Gallery */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 2. Gallery Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              Class Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {details.images.map((img,index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform duration-300">
                  <img 
                    src={img} 
                    className="w-full h-full object-cover" 
                    alt="Gallery"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 3. Review Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Student Reviews
            </h3>
            
            <div className="space-y-6 mb-10">
              {/* Review Item */}
              {details.reviews.map((rev,index) => (
                <Review 
                  key={index}
                  name={rev.student_name}
                  rating={rev.rating}
                  comment={rev.text}
                  profilePic={rev.student_pic}
                />
              ))}
            </div>

            {/* 4. Submit Review Section */}
            {isStudent && (
            <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <h4 className="text-xl font-bold mb-4">Write a Review</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setRating(s)}>
                        <Star className={`w-6 h-6 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-blue-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea 
                  className="w-full p-4 rounded-xl text-slate-900 focus:ring-4 focus:ring-blue-400 outline-none transition-all"
                  placeholder="Share your experience with this class..."
                  rows="3"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                  <Send className="w-4 h-4" />
                  Submit Review
                </button>
              </div>
            </div>
            )}
          </section>
        </div>

        {/* Right Column: Sidebar / Meta */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 sticky top-6">
            <h4 className="font-bold text-slate-800 mb-4">Class Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-start text-sm gap-17.5">
                <span className="text-slate-500">Subject</span>
                <span className="font-semibold text-slate-800">{details.subject}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mode</span>
                <span className="font-semibold text-slate-800">{details.mode}</span>
              </div>
              {details.duration && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-semibold text-slate-800">{details.duration}</span>
                </div>
              )}
              {details.lms && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">LMS</span>
                  <Link to={`https://${details.lms}`} className="font-semibold text-slate-800  hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                    {details.lms}
                  </Link>
                </div>
              )}
              
              
            </div>
            <button onClick={() => window.open(`https://wa.me/${details.hotline}`, '_blank')} className="cursor-pointer w-full mt-6 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default ClassDetailsPage;