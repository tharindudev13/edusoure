import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Layers } from 'lucide-react';
import Loading from '../components/Loading';
import MaterialCard from '../components/FileCard';

const MaterialsPage = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAllMaterials = async () => {
            const token = localStorage.getItem('token');
            try {
                // Using your existing base URL structure
                const response = await fetch('http://34.21.152.245:8080/api/v1/material/approved', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMaterials(data);
                }
            } catch (error) {
                console.error("Error fetching materials:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllMaterials();
    }, []);

    

    

    // Logic to filter and then group materials by subject
    const groupedMats = useMemo(() => {
        const filtered = materials.filter(mat => 
            mat.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mat.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mat.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        );

        // Grouping implementation
        return filtered.reduce((acc, mat) => {
            const subject = mat.subject || "General";
            if (!acc[subject]) acc[subject] = [];
            acc[subject].push(mat);
            return acc;
        }, {});
    }, [materials, searchTerm]);

    

    if (loading) return <Loading messege={"Loading Materials"}/>;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            {/* Header & Search Bar */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">Explore Study Materials</h1>
                        <p className="text-slate-500">Find Notes, Papers and Markings</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by subject, filename or type..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Categorized Classes */}
            <div className="max-w-7xl mx-auto space-y-12">
                {Object.keys(groupedMats).length > 0 ? (
                    Object.entries(groupedMats).map(([subject, matList]) => (
                        <section key={subject}>
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                                <Layers className="text-blue-600" size={20} />
                                <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
                                    {subject}
                                </h2>
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg">
                                    {matList.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {matList.map((mat) => (
                                    <MaterialCard
                                    key={mat.id}
                                    previewUrl={mat.url}
                                    author={mat.author}
                                    type={mat.type}
                                    fileName={mat.name}
                                    subject={mat.subject}/>
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-600">No materials found!. Try checking your connection.....</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaterialsPage;