import  { useEffect, useState } from 'react';
import { Star, MessageCircle, Send, ImageIcon } from 'lucide-react';
import Review from '../components/Review';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useParams} from 'react-router';
import Teacher from '../components/Teacher';
import SuccessModal from '../components/FeedBack';

const ClassDetailsPage = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem('token')
  const [loading,setLoading] = useState(true)
  const [details,setDetails] = useState({})
  const {id} = useParams()
  const [messege,setMessage] = useState("Loading Class Details...")



  const{user} = useSelector((state) => state.auth)

  const isStudent = user?.roles?.includes("ROLE_STUDENT");

  const [showSuccess, setShowSuccess] = useState(false);
  const [heading,setHeading] = useState("")
  const [msg,setMsg] = useState("")
  const [type,setType] = useState("")
  const [btn,setBtn] = useState("")

  


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
            window.alert("Please login or sign up to see class details")
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

  const submitReview = async() => {
      try{
        setLoading(true)
        setMessage("Submitting your review...")
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/class/review`,{
          method: 'POST',
          headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            class_id: Number(id)  ,
            user_id: Number(user.id),
            text: reviewText,
            rating: Number(rating)
          })
        })
        const result = (await response.text()).trim()
        if(result === "Review Submitted Successfully"){
          setShowSuccess(true)
          setReviewText("")
          setRating(0)
          setBtn("Ok")
          setHeading("Review Submitted!")
          setMsg("You successfuly reviewed this class")
          setType('success')
        }else if(result === "You have already reviewed this class."){
          setShowSuccess(true)
          setBtn("Back")
          setHeading("Already Reviewed!")
          setMsg("You have already reviewed this class.")
          setType('error')
        }

      }catch(error){
        console.log(error);
        setShowSuccess(false)
        setBtn("Back")
        setHeading("Review Failed!")
        setMsg("Failed to submit your review!")
        setType('error')
        
      }finally{
        setLoading(false)
      }
  }

  useEffect(() => {{
      document.title = "Class Details | EduSource"
    }})

  



  

  if(loading){
    return(
      <Loading messege={messege}/>
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
                <span className="font-bold text-slate-800">{details.avgRating?.toFixed(2)}</span>
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
  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm max-w-2xl w-full">
    {/* Heading */}
    <h4 className="text-lg font-bold text-slate-800 mb-5">Write a Review</h4>
    
    <div className="space-y-5">
      {/* Interactive Rating Row */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-600">Your Rating</span>
        <div className="flex gap-1 bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-100">
          {[1, 2, 3, 4, 5].map((s) => (
            <button 
              key={s} 
              type="button"
              onClick={() => setRating(s)}
              className="cursor-pointer transition-transform duration-100 active:scale-90"
            >
              <Star 
                className={`w-5 h-5 transition-colors duration-150 ${
                  s <= rating 
                    ? 'fill-amber-400 text-amber-400' 
                    : 'text-slate-300 hover:text-slate-400'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Styled Feedback Input Block */}
      <div className="relative">
        <textarea 
          className="w-full p-4 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-sm leading-relaxed"
          placeholder="Share your experience with this class..."
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>

      {/* Action Button Layout Alignment */}
      <div className="flex justify-end">
        <button 
          onClick={submitReview} 
          className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-600/10"
        >
          <Send className="w-4 h-4" />
          Submit Review
        </button>
      </div>
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
              <div className="flex justify-between items-start text-sm">
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
            </div>

            {/* 🌟 UPDATED BUTTON LAYOUT: Purely changing the button positioning to side-by-side on the same line */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button 
                onClick={() => window.open(`https://wa.me/${details.hotline}`, '_blank')} 
                className="cursor-pointer w-full py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
              >
                Contact
              </button>

              <button 
                onClick={() => window.open(`https://${details.lms}`, '_blank')} 
                className="cursor-pointer w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all flex items-center justify-center"
              >
                LMS
              </button>
            </div>

          </div>
        </div>

      </div>
      <SuccessModal isOpen={showSuccess} 
                    onClose={() => setShowSuccess(false)} 
                    heading={heading} 
                    messege={msg} 
                    type={type}
                    button_text={btn}
                    />
    </div>
    </>
  );
};

export default ClassDetailsPage;