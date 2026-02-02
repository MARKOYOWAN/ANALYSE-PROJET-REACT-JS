/* eslint-disable react-hooks/rules-of-hooks */
import axios, { 
  AxiosError, 
  type InternalAxiosRequestConfig, 
  type AxiosResponse 
} from "axios";
import toast from "react-hot-toast";

// Module Augmentation pour étendre les types officiels d'Axios
declare module "axios" {
  export interface AxiosRequestConfig {
    successMessage?: string;
    errorMessage?: string;
    showToast?: boolean;
  }
}

export const loaderBus = {
  show: () => window.dispatchEvent(new CustomEvent('SHOW_LOADER')),
  hide: () => window.dispatchEvent(new CustomEvent('HIDE_LOADER')),
};

export const createApiService = (customBaseURL?: string) => {
  const apiService = axios.create({
    baseURL: customBaseURL || "http://localhost:3000/api",
    timeout: 15000,
  });

  // --- INTERCEPTEUR REQUÊTE ---
  apiService.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      loaderBus.show();
      return config;
    },
    (error: AxiosError): Promise<never> => {
      loaderBus.hide();
      return Promise.reject(error);
    }
  );

  // --- INTERCEPTEUR RÉPONSE ---
  apiService.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      loaderBus.hide();
      
      const config = response.config;
      // Succès : on affiche le toast si un message est défini
      if (config.showToast !== false && config.successMessage) {
        toast.success(config.successMessage);
      }
      
      return response;
    },
    async (error: AxiosError): Promise<never> => {
      loaderBus.hide();

      // On récupère la config de manière sécurisée
      const config = error.config;
      const response = error.response;
      
      let finalErrorMessage = "";

      // CAS 1 : Erreur Réseau (Serveur éteint / ERR_CONNECTION_REFUSED)
      if (!response) {
        finalErrorMessage = config?.errorMessage || "Le serveur est injoignable (Port 3000).";
      } 
      // CAS 2 : Erreur Serveur (400, 401, 422, 500, etc.)
      else {
        const serverMessage = (response.data as { message?: string })?.message;
        finalErrorMessage = config?.errorMessage || serverMessage || "Une erreur est survenue lors de l'analyse.";
        
        // Logs spécifiques pour le dev
        if (response.status === 401) console.warn("Session expirée (401)");
      }

      // AFFICHAGE DU TOAST
      // On vérifie config?.showToast car en cas d'erreur réseau sévère, config peut être null
      if (config?.showToast !== false) {
        toast.error(finalErrorMessage, {
          id: 'api-error', // Évite les doublons de toasts si on clique trop vite
        });
      }

      return Promise.reject(error);
    }
  );

  return apiService;
};

export const apiService = createApiService();