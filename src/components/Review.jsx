import { Star } from "lucide-react"

const Review = ({
  name,
  rating,
  comment,
  profilePic
}) =>{

  console.log(profilePic);
    return (    
        <>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <img src={profilePic ||`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      name || 'User'
                  )}&background=2563eb&color=fff`} className="w-12 h-12 rounded-full border-2 border-blue-100" alt="User" />
                  <div>
                    <h4 className="font-bold text-slate-800">{name}</h4>
                    <div className="flex text-yellow-400 scale-75 origin-left">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < parseInt(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic">{comment}</p>
              </div>
        </>
    )
}

export default Review;