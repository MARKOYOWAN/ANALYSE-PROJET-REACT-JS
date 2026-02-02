import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';

const FooterLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-spinn-black border-t border-white/5 relative overflow-hidden">
      {/* Glow discret pour casser le noir pur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spinn-accent/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Section Marque : Logo inversé en blanc */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo/Logo_txt_light.png"
                alt="Logo"
                className="w-10 h-10 object-contain" // Rend le logo noir totalement blanc
              />
              <span className="text-white font-bold tracking-tighter text-xl">
                ANALYSE<span className="text-spinn-muted">.AI</span>
              </span>
            </div>
            <p className="text-spinn-muted text-sm leading-relaxed max-w-xs">
              Solution d'analyse sémantique haute performance pour la conformité réglementaire.
            </p>
          </div>

          {/* Section Produit */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Produit</h4>
            <ul className="space-y-4 text-sm text-spinn-muted">
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Statut API</a></li>
            </ul>
          </div>

          {/* Section Légal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Légal</h4>
            <ul className="space-y-4 text-sm text-spinn-muted">
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
            </ul>
          </div>

          {/* Section Connect : Boutons sombres avec bordures blanches discrètes */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Connect</h4>
            <div className="flex gap-3">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-spinn-muted hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barre basse */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-spinn-muted">
          <p className="text-[10px] uppercase tracking-widest font-medium">
            © {currentYear} ANALYSE.AI — Système de contrôle réglementaire
          </p>
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest">
            <HiLightningBolt className="text-spinn-accent animate-pulse" />
            <span>Powered by Next-Gen Analysis</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;