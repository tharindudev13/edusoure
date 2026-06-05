import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Layers} from 'lucide-react';
import ClassCard from '../components/ClassCard';
import Loading from '../components/Loading';
import RequestClassNav from '../components/Req';
import { useSelector } from 'react-redux';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


    const [filterSubject, setFilterSubject] = useState("");
    const [filterRating, setFilterRating] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterLocation, setFilterLocation] = useState("");

    const {user} = useSelector((state) => state.auth)

    const isTeacher = user?.roles?.includes("ROLE_TEACHER");

    useEffect(() => {
        document.title = "Classes | EduSource";
        const fetchAllClasses = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/class/getclasses`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setClasses(data);
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllClasses();
    }, []);

    // --- DYNAMICALLY EXTRACT UNIQUE EXTRAPOLATION LISTS FOR FILTER OPTIONS ---
    const uniqueSubjects = useMemo(() => {
        return [...new Set(classes.map(c => c.subject).filter(Boolean))];
    }, [classes]);

    const uniqueLocations = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"];

    // Logic to filter and then group classes by subject
    const groupedClasses = useMemo(() => {
        const filtered = classes.filter(cls => {
            // 1. Text Search Box Filter
            const matchesSearch = cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 cls.teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            // 2. Dropdown Subject Filter
            const matchesSubject = filterSubject ? cls.subject === filterSubject : true;
            
            // 3. Dropdown Minimum Rating Filter
            const matchesRating = filterRating ? cls.avgRating >= parseFloat(filterRating) : true;
            
            // 4. Dropdown Delivery Type (Online vs Physical) Filter
            const matchesType = filterType ? cls.mode?.toLowerCase() === filterType.toLowerCase() : true;
            
            // 5. Dropdown Location / District Filter
            const classLoc = cls.locations;
            const matchesLocation = filterLocation ? classLoc.includes(filterLocation) : true;

            return matchesSearch && matchesSubject && matchesRating && matchesType && matchesLocation;
        });

        // Grouping implementation
        return filtered.reduce((acc, cls) => {
            const subject = cls.subject || "General";
            if (!acc[subject]) acc[subject] = [];
            acc[subject].push(cls);
            return acc;
        }, {});
    }, [classes, searchTerm, filterSubject, filterRating, filterType, filterLocation]);

    if (loading) return <Loading messege={"Loading Classes...."}/>;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            {/* Header & Search Bar */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">Explore Classes</h1>
                        <p className="text-slate-500">Find the perfect subject and start learning.</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by subject or teacher..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                
                <div className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shadow-sm">
                    {/* Subject Select */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Subject</label>
                        <select 
                            value={filterSubject}
                            onChange={(e) => setFilterSubject(e.target.value)}
                            className="w-full text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-blue-600 outline-none transition-all"
                        >
                            <option value="">All Subjects</option>
                            {uniqueSubjects.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    {/* Rating Select */}
                    <div className="space-y-1">
                        <label className="text-[10px]  font-bold uppercase text-slate-400 tracking-wider">Rating</label>
                        <select 
                            value={filterRating}
                            onChange={(e) => setFilterRating(e.target.value)}
                            className="w-full text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-blue-600 outline-none transition-all"
                        >
                            <option value="">Any Rating</option>
                            <option value="4.5">4.5 ★ &amp; Above</option>
                            <option value="4.0">4.0 ★ &amp; Above</option>
                            <option value="3.5">3.5 ★ &amp; Above</option>
                        </select>
                    </div>

                    {/* Mode Type Select */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Class Type</label>
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-blue-600 outline-none transition-all"
                        >
                            <option value="">Hybrid</option>
                            <option value="online">Online</option>
                            <option value="physical">Physical</option>
                        </select>
                    </div>

                    {/* Location Select */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Location</label>
                        <select 
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                            className="w-full text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-blue-600 outline-none transition-all"
                        >
                            <option value="">All Districts</option>
                            {uniqueLocations.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {isTeacher && <RequestClassNav />}
            </div>

            {/* Categorized Classes */}
            <div className="max-w-7xl mx-auto space-y-12">
                {Object.keys(groupedClasses).length > 0 ? (
                    Object.entries(groupedClasses).map(([subject, classList]) => (
                        <section key={subject}>
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                                <Layers className="text-blue-600" size={20} />
                                <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
                                    {subject}
                                </h2>
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg">
                                    {classList.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {classList.map((cls) => (
                                    <ClassCard key={cls.id} 
                                    thumbnail={cls.thumbnail}
                                    year={cls.year}
                                    teacherName={cls.teacher.name}
                                    numReviews={cls.reviews.length}
                                    avgRating={cls.avgRating}
                                    id={cls.id} />
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-600">No classes found matching your filter criteria.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassesPage;