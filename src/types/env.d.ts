/**
 * Types pour les variables d'environnement Vite
 * Définit les types TypeScript pour toutes les variables d'environnement
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Configuration Google Drive API
  readonly VITE_GOOGLE_DRIVE_API_KEY: string;
  readonly VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID: string;
  
  // Configuration des dossiers Google Drive
  readonly VITE_GOOGLE_DRIVE_SOCIETY_FOLDER_NAME: string;
  readonly VITE_GOOGLE_DRIVE_PUBLIC_FOLDER_NAME: string;
  readonly VITE_GOOGLE_DRIVE_ACTUALITY_FOLDER_NAME: string;
  
  // Configuration de l'application
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENVIRONMENT: 'development' | 'production' | 'staging';
  
  // Configuration du serveur de développement
  readonly VITE_DEV_SERVER_PORT: string;
  readonly VITE_DEV_SERVER_HOST: string;
  
  // Configuration des URLs de base
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_BASE_URL: string;
  
  // Configuration des timeouts
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_CACHE_TTL: string;
  
  // Configuration de sécurité
  readonly VITE_ENABLE_HTTPS: string;
  readonly VITE_ENABLE_CORS: string;
  
  // Configuration du cache
  readonly VITE_CACHE_ENABLED: string;
  readonly VITE_CACHE_MAX_ENTRIES: string;
  readonly VITE_CACHE_TTL_DEFAULT: string;
  readonly VITE_CACHE_TTL_FOLDERS: string;
  readonly VITE_CACHE_TTL_FILES: string;
  
  // Configuration des logs
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_ENABLE_DEBUG_LOGS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 