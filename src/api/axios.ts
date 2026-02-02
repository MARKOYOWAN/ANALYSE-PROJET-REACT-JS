/* eslint-disable react-hooks/rules-of-hooks */
// src/api/axios.ts
import axios, { AxiosError, type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosResponse } from "axios";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

// Fonction qui crée un service Axios avec un baseURL dynamique
export const createApiService = (customBaseURL?: string) => {
  const apiService = axios.create({
    baseURL: customBaseURL || "http://localhost:3000/api",
  });

  // Intercepteur de requête
  apiService.interceptors.request.use(
    (config): AdaptAxiosRequestConfig => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error: unknown): Promise<never> => Promise.reject(error)
  );

  // Intercepteur de réponse
  apiService.interceptors.response.use(
    async (response: AxiosResponse): Promise<AxiosResponse> => response,
    async (error: AxiosError): Promise<never> => {
      if (error.response?.status === 401) {
        // Session expirée
        sessionStorage.removeItem("token");
        // navigate('/login'); // à activer si tu veux une redirection
      }
      return Promise.reject(error);
    }
  );

  return apiService;
};

// Version par défaut (localhost)
export const apiService = createApiService();
