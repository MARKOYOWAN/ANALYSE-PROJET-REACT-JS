import React, { useState, useEffect, useCallback } from 'react';
import { HiSearch, HiChevronLeft, HiChevronRight, HiRefresh, HiWifi, HiAdjustments } from 'react-icons/hi';
import { getHistory, type HistoryItem, type PaginationInfo } from '../services/history.service';


/**
 * Composant AnalysisHistory
 * Texte limité à 3 lignes + Filtre Score dynamique de 1 à 100.
 */
const AnalysisHistory = () => {
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // --- PARAMÈTRES DYNAMIQUES ---
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [minScore, setMinScore] = useState(1); // Filtre range de 1 à 100

    /**
     * Fetch des données avec inclusion du minScore dans les params API
     */
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            // Ton API reçoit maintenant ?page=X&limit=Y&search=Z&minScore=S
            const res = await getHistory(page, limit, searchTerm, minScore);
            setItems(res.data);
            setPagination(res.pagination);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError(true);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [page, limit, searchTerm, minScore]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Réinitialisation de la page lors d'un changement de filtre
    const handleFilterChange = (type: 'search' | 'score', value: string | number) => {
        if (type === 'search') setSearchTerm(value as string);
        if (type === 'score') setMinScore(value as number);
        setPage(1);
    };

    if (error) {
        return (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <HiWifi size={40} className="text-red-500 animate-pulse mb-4" />
                <h3 className="text-xl font-black text-black">Erreur API</h3>
                <button onClick={fetchData} className="mt-4 bg-black text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    <HiRefresh className="inline mr-2" /> Réessayer
                </button>
            </div>
        );
    }

    return (
        <div id="history-section" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- SECTION FILTRES --- */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Recherche (Texte Noir) */}
                <div className="w-full md:w-80 bg-white p-2 rounded-2xl border border-black/5 shadow-sm">
                    <div className="relative">
                        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none text-sm font-bold text-black placeholder:text-black/30"
                            value={searchTerm}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                </div>

                {/* Range Score Dynamique (1 à 100) */}
                <div className="w-full md:flex-1 bg-white p-4 rounded-2xl border border-black/5 shadow-sm flex items-center gap-6">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <HiAdjustments className="text-black/40" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Score Min:</span>
                        <span className="text-sm font-black text-black w-8">{minScore}%</span>
                    </div>
                    <input
                        type="range" min="1" max="100" step="1"
                        className="flex-1 h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                        value={minScore}
                        onChange={(e) => handleFilterChange('score', Number(e.target.value))}
                    />
                </div>
            </div>

            {/* --- TABLEAU --- */}
            <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                    </div>
                )}

                <table className="w-full text-left table-fixed">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="w-32 p-6 text-[10px] uppercase tracking-[0.2em] font-black">Date</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-black">Contenu Analysé</th>
                            <th className="w-28 p-6 text-[10px] uppercase tracking-[0.2em] font-black text-center">Score</th>
                            {/* <th className="w-28 p-6 text-[10px] uppercase tracking-[0.2em] font-black text-right">Action</th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item) => (
                            <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors">
                                <td className="p-6 text-[11px] font-bold text-black/40 font-mono">
                                    {new Date(item.created_on).toLocaleDateString()}
                                </td>
                                <td className="p-6">
                                    {/* LIMITATION À 3 LIGNES AVEC POINTS DE SUSPENSION */}
                                    <p className="text-sm font-bold text-black opacity-80 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                                        {item.text}
                                    </p>
                                </td>
                                <td className="p-6 text-center">
                                    <div className={`text-xl font-black ${item.score >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {item.score}%
                                    </div>
                                </td>
                                {/* <td className="p-6 text-right">
                                    <button className="px-4 py-2 bg-black text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                                        VOIR
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* --- PAGINATION --- */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1 || loading}
                            className="px-5 py-2.5 bg-black text-neutral-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30 transition-all"
                        >
                            <HiChevronLeft size={16} />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${page === num ? 'bg-black text-white shadow-xl scale-110' : 'bg-black/5 text-black/40 hover:bg-black hover:text-white'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages || loading}
                            className="px-5 py-2.5 bg-black text-neutral-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30 transition-all"
                        >
                            <HiChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisHistory;