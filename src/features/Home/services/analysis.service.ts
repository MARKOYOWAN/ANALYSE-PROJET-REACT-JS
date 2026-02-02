// src/pages/Home/services/analysis.service.ts
import { apiService } from "../../../api/axios";

export interface AnalysisResponse {
  score: number;
  status: string;
}

export const analyzeText = async (text: string): Promise<AnalysisResponse> => {
  // Plus besoin de "as any" !
  const response = await apiService.post<AnalysisResponse>(
    "/analyze", 
    { text }, 
    { 
      successMessage: "Analyse terminée avec succès !",
      errorMessage: "Échec de l'analyse : Vérifiez votre connexion au serveur.",
      showToast: true 
    }
  );
  return response.data;
};