/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spinn-black': '#0a0a0a',   // Noir profond (fond)
        'spinn-card': '#161616',    // Gris très sombre (cartes)
        'spinn-border': '#262626',  // Gris moyen (bordures)
        'spinn-muted': '#737373',   // Gris texte secondaire
        
        // Couleur d'accent : Bleu Acier (très pro, compatible avec le gris)
        'spinn-accent': {
          light: '#e2e8f0',
          DEFAULT: '#94a3b8',
          dark: '#475569',
        },
        // Couleur de succès (pour le score de conformité)
        'spinn-success': '#10b981', 
      },
      animation: {
        'glow': 'glow 4s infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(148, 163, 184, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(148, 163, 184, 0.3)' },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};