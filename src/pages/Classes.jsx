import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Layers } from 'lucide-react';
import ClassCard from '../components/ClassCard';
import Loading from '../components/Loading';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAllClasses = async () => {
            const token = localStorage.getItem('token');
            try {
                // Using your existing base URL structure
                const response = await fetch('http://localhost:8080/api/v1/class/getclasses', {
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

    

    // Logic to filter and then group classes by subject
    const groupedClasses = useMemo(() => {
        const filtered = classes.filter(cls => 
            cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Grouping implementation
        return filtered.reduce((acc, cls) => {
            const subject = cls.subject || "General";
            if (!acc[subject]) acc[subject] = [];
            acc[subject].push(cls);
            return acc;
        }, {});
    }, [classes, searchTerm]);

    console.log(groupedClasses);
    

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            {/* Header & Search Bar */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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
                        <h3 className="text-lg font-medium text-slate-600">No classes found matching "{searchTerm}"</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassesPage;