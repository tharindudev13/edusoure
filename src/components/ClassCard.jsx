import { Star,  BookOpen } from 'lucide-react'; // Using lucide-react for professional icons
import { useNavigate } from 'react-router';



const ClassCard = ({ 
  thumbnail, 
  subject, 
  avgRating, 
  teacherName, 
  year, 
  numReviews,
  id,
  status 
}) => {

  const navigate = useNavigate()

  return (
    <div className="max-w-sm bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Thumbnail: Aspect Ratio 16:9 (YouTube Standard) */}
      <div className="relative aspect-video w-full bg-slate-100">
        <img 
          src={thumbnail || "/api/placeholder/400/225"} 
          alt={subject} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {year}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
        {/* Subject Title */}
          <h3 className="text-lg font-bold text-slate-800 truncate flex-1">
            {subject}
          </h3>
    
      {/* Status Badge */}
      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
        status === 'Approved'.toUpperCase() ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
        status === 'Pending'.toUpperCase() ? 'bg-amber-50 text-amber-600 border-amber-100' :
        'bg-rose-50 text-rose-600 border-rose-100'
      }`}>
        {status}
      </span>
      </div>

        {/* Teacher Name */}
        <div className="flex items-center text-slate-600 mb-3">
          <span className="text-sm font-medium">By {teacherName}</span>
        </div>

        <hr className="border-slate-100 mb-3" />

        {/* Stats Row */}
        <div className="flex items-center justify-between text-slate-500">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-slate-700">{avgRating}</span>
            <span className="text-xs text-slate-400">({numReviews})</span>
          </div>

          {/* Enrolled/Reviews Context */}
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
               Course Info
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <button onClick={() => navigate(`/class/${teacherName}/${id}`)}  className="cursor-pointer w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg text-sm transition-colors border border-blue-100">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ClassCard;