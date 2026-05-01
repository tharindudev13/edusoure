import { Star } from "lucide-react"

const Review = () =>{
    return (    
        <>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <img src="https://i.pravatar.cc/150?u=1" className="w-12 h-12 rounded-full border-2 border-blue-100" alt="User" />
                  <div>
                    <h4 className="font-bold text-slate-800">Sandun Perera</h4>
                    <div className="flex text-yellow-400 scale-75 origin-left">
                      <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"The lecture notes were very detailed. Really helped with my AI implementation using Spring Boot."</p>
              </div>
        </>
    )
}

export default Review;