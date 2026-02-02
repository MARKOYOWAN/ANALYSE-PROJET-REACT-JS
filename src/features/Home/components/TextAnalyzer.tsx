import React, { useState } from 'react';
import { HiLightningBolt, HiShieldCheck, HiExclamationCircle } from 'react-icons/hi';
import { analyzeText, type AnalysisResponse } from '../services/analysis.service';
import toast from 'react-hot-toast';

const TextAnalyzer = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<AnalysisResponse | null>(null);

    /**
     * Gère l'analyse du texte.
     * Le loader et les notifications de succès/erreur sont gérés 
     * automatiquement par les intercepteurs Axios.
     */
    const handleAnalyze = async (): Promise<void> => {
        // Validation locale avant appel API
        if (text.trim().length <= 10) {
            toast.error("Le texte doit contenir plus de 10 caractères.");
            return;
        }

        try {
            // L'appel au service déclenche l'intercepteur
            const data = await analyzeText(text);
            setResult(data);
            // Pas de toast.success ici, l'intercepteur s'en occupe !
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // Pas de toast.error ici non plus, l'intercepteur gère l'affichage !
            console.error("Échec de l'analyse sémantique");
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">

            {/* ZONE DE SAISIE */}
            <div className="spinn-card p-1 shadow-2xl bg-white border border-black/10">
                <div className="relative">
                    <textarea
                        className="w-full h-72 p-8 rounded-[2rem] bg-transparent text-black font-medium placeholder:text-gray-400 focus:outline-none resize-none text-lg leading-relaxed"
                        placeholder="Collez votre texte ici pour vérifier sa conformité (min. 10 caractères)..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="absolute bottom-6 right-8 flex items-center gap-6">
                        <span className={`text-xs font-mono font-bold ${text.length <= 10 ? 'text-orange-600' : 'text-black'}`}>
                            {text.length} caractères
                        </span>
                        <button
                            onClick={handleAnalyze}
                            disabled={!text.trim() || text.length === 0}
                            className="btn-spinn py-3 px-8 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all disabled:opacity-20 flex items-center gap-2"
                        >
                            <HiLightningBolt className="text-yellow-400" />
                            <span>Lancer l'analyse</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* SECTION RÉSULTATS */}
            {result && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">

                    {/* JAUGE DE SCORE */}
                    <div className="spinn-card p-10 flex flex-col items-center justify-center text-center bg-white border border-black/5 shadow-lg">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                                <circle
                                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * result.score) / 100}
                                    className={`${result.score >= 70 ? 'text-green-500' : 'text-orange-500'} transition-all duration-1000 ease-out`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-black tracking-tighter">{result.score}</span>
                                <span className="text-sm font-bold text-black opacity-50">%</span>
                            </div>
                        </div>
                        <p className="mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-black">
                            Indice de Conformité
                        </p>
                    </div>

                    {/* DIAGNOSTIC DÉTAILLÉ */}
                    <div className="spinn-card p-10 col-span-2 flex flex-col justify-center bg-white border border-black/5 shadow-lg">
                        <div className="flex items-start gap-6">
                            <div className={`p-4 rounded-2xl ${result.score >= 70 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                {result.score >= 70 ? <HiShieldCheck size={40} /> : <HiExclamationCircle size={40} />}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black text-black">
                                    {result.score >= 70 ? "Document Conforme" : "Conformité Partielle"}
                                </h3>
                                <p className="text-black text-lg font-medium leading-relaxed opacity-90">
                                    {result.score >= 70
                                        ? "Votre texte respecte les standards de sécurité et d'intégrité de notre analyseur sémantique."
                                        : "Attention : certains segments suggèrent un risque potentiel ou le contenu est trop succinct."}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-black uppercase tracking-widest">Statut : {result.status}</span>
                            <div className={`h-2 w-2 rounded-full animate-ping ${result.score >= 70 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextAnalyzer;