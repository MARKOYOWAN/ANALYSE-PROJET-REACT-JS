// src/components/GlobalLoader.tsx
import { useState, useEffect } from 'react';

const GlobalLoader = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const show = () => setVisible(true);
        const hide = () => setVisible(false);

        window.addEventListener('SHOW_LOADER', show);
        window.addEventListener('HIDE_LOADER', hide);

        return () => {
            window.removeEventListener('SHOW_LOADER', show);
            window.removeEventListener('HIDE_LOADER', hide);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Analyse en cours...</p>
            </div>
        </div>
    );
};

export default GlobalLoader;