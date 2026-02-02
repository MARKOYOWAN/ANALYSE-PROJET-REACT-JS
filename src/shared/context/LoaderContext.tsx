// src/context/LoaderContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';

interface LoaderContextType {
    showLoader: () => void;
    hideLoader: () => void;
    isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeRequests, setActiveRequests] = useState(0);

    const loaderActions = useMemo(() => ({
        showLoader: () => setActiveRequests((prev) => prev + 1),
        hideLoader: () => setActiveRequests((prev) => Math.max(0, prev - 1)),
        isLoading: activeRequests > 0
    }), [activeRequests]);

    return (
        <LoaderContext.Provider value={loaderActions}>
            {children}
        </LoaderContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error("useLoader must be used within LoaderProvider");
    return context;
};