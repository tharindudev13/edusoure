const LeaderBoard = ({leaderboard}) => {
    return (
        <>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Leaderboard</h2>
              <p className="text-xs text-slate-400">All-time top performing students</p>
            </div>
          </div>

          <div className="space-y-3">
            {leaderboard.length === 0 ? (
              <div className="text-center text-slate-400 py-6 text-sm">No submissions recorded yet.</div>
            ) : (
              leaderboard.map((user, idx) => {
                const isTopThree = idx < 3;
                const rankBadgeColor = 
                  idx === 0 ? "bg-amber-100 text-amber-700 border-amber-200" :
                  idx === 1 ? "bg-slate-100 text-slate-700 border-slate-200" :
                  idx === 2 ? "bg-orange-100 text-orange-700 border-orange-200" :
                  "bg-slate-50 text-slate-500 border-transparent";

                  const getInitials = (name) => {
                    if (!name) return "?";
                    const parts = name.trim().split(/\s+/);
                    if (parts.length > 1) {
                    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
                    }
                    return parts[0].charAt(0).toUpperCase();
                };

                return (
                  <div
                    key={user.userId || idx}
                    className={`flex items-center justify-between p-3.5 rounded-xl border ${
                      isTopThree ? "bg-blue-50/40 border-blue-100/50" : "bg-white border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs ${rankBadgeColor}`}>
                        {idx + 1}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center overflow-hidden shrink-0">
                        {user.profilePictureUrl ? (
                            <img 
                            src={user.profilePictureUrl} 
                            alt={`${user.username}'s profile`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                            />
                        ) : null}
                        <span 
                            className="text-blue-600 font-semibold text-xs tracking-wider uppercase"
                            style={{ display: user.profilePictureUrl ? 'none' : 'flex' }}
                        >
                            {getInitials(user.username)}
                        </span>
                        </div>
                      <span className="font-medium text-slate-700 text-sm truncate max-w-35">
                        {user.username}
                      </span>
                    </div>
                    <div className="text-right flex">
                      <span className="text-sm font-bold text-blue-600">{user.grandTotal} </span>
                      <span className="text-sm ml-1 text-slate-400 block"> pts</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Complete more quizzes to boost your overall platform rank!
            </p>
          </div>
        </div>
        </>
    )

}

export default LeaderBoard;