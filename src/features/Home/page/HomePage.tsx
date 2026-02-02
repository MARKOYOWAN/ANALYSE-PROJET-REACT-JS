// src/pages/Home/Home.tsx

import AnalysisHistory from "../components/AnalysisHistory";
import TextAnalyzer from "../components/TextAnalyzer";

const Home = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Section Introduction */}
      <section className="text-center py-16 px-6 animate-in fade-in slide-in-from-top-6 duration-1000">
        {/* Titre en Noir Profond et très épais */}
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 text-black">
          Analyse Intelligente<span className="text-black/20">.</span>
        </h1>

        {/* Paragraphe en noir avec une légère opacité pour la lecture, mais bien plus foncé qu'avant */}
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-black font-medium leading-relaxed">
          Vérifiez instantanément l'intégrité et la conformité de vos documents
          grâce à notre moteur de scoring basé sur des règles analytiques.
        </p>

        {/* Petit indicateur visuel sous le texte */}
        <div className="mt-10 flex justify-center">
          <div className="h-1.5 w-12 bg-black rounded-full"></div>
        </div>
      </section>

      {/* Le Composant d'Analyse (Zone d'action) */}
      <section id="analyzer-section" className="px-6 scroll-mt-32">
        <TextAnalyzer />
      </section>


      {/* SECTION HISTORIQUE */}
      <section id="history-section"  className="px-6 max-w-7xl mx-auto w-full">
        <div className="mb-10 text-left">
          <h2 className="text-4xl font-black tracking-tighter text-black mb-2">Historique des Analyses</h2>
          <p className="text-black/40 font-medium uppercase tracking-widest text-xs">Archives de conformité réglementaire</p>
        </div>

        <AnalysisHistory />
      </section>
    </div>
  );
};

export default Home;