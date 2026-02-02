import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';

const FooterLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-spinn-bg border-t border-spinn-border relative overflow-hidden">
      {/* Glow discret en bas à gauche */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-spinn-accent/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Section Marque */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">A</span>
              </div>
              <span className="text-white font-bold tracking-tighter">ANALYSE.AI</span>
            </div>
            <p className="text-spinn-muted text-sm leading-relaxed max-w-xs">
              Solution d'analyse sémantique haute performance pour la conformité réglementaire.
            </p>
          </div>

          {/* Section Produit */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Produit</h4>
            <ul className="space-y-4 text-sm text-spinn-muted">
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Statut Système</a></li>
            </ul>
          </div>

          {/* Section Légal */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Légal</h4>
            <ul className="space-y-4 text-sm text-spinn-muted">
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
            </ul>
          </div>

          {/* Section Connect */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-spinn-card border border-spinn-border flex items-center justify-center text-spinn-muted hover:text-white hover:border-spinn-accent transition-all">
                <FaGithub size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-spinn-card border border-spinn-border flex items-center justify-center text-spinn-muted hover:text-white hover:border-spinn-accent transition-all">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-spinn-card border border-spinn-border flex items-center justify-center text-spinn-muted hover:text-white hover:border-spinn-accent transition-all">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Barre basse */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-spinn-muted text-xs">
            © {currentYear} ANALYSE.AI. Développé pour le test technique.
          </p>
          <div className="flex items-center gap-2 text-xs text-spinn-muted">
            <HiLightningBolt className="text-spinn-accent animate-pulse" />
            <span>Powered by Next-Gen Analysis Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;