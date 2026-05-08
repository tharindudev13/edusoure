import { Download, User, Calendar, } from 'lucide-react';
import { Link } from 'react-router';

const MaterialCard = ({ 
  previewUrl, 
  fileName, 
  author, 
  subject, 
  type 
}) => {

  
  const isPDF = previewUrl?.toLowerCase().includes(".pdf")

  return (
    <div className="max-w-sm bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      
      {/* Thumbnail: Exact same 16:9 ratio as ClassCard */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
        <img 
          src={isPDF ? "https://cdn-icons-png.flaticon.com/512/337/337946.png" : previewUrl} 
          alt={fileName} 
          className="w-full h-full object-cover"
        />
        {/* Subject Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
          {subject}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1">
        {/* File Name */}
        <h3 className="text-lg font-bold text-slate-800 truncate mb-1">
          {fileName}
        </h3>

        {/* Author Name */}
        <div className="flex items-center gap-2 text-slate-600 mb-3">
          <User className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">By {author}</span>
        </div>

        <hr className="border-slate-100 mb-3" />

        {/* Date Row */}
        <div className="flex items-center gap-2 text-slate-500 mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">{type}</span>
        </div>

        {/* Action Button */}
        <Link to={previewUrl} target='_blank'>
        <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg text-sm transition-colors border border-blue-100 flex items-center justify-center gap-2 cursor-pointer">
          <Download size={16} />
          Download PDF
        </button>
        </Link>
      </div>
    </div>
  );
};

export default MaterialCard;