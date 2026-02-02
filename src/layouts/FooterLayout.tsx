import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';

/**
 * Interface pour la structure des colonnes du footer.
 */
interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/**
 * FooterLayout Component
 * Design sombre (High-Contrast) avec accents minimalistes.
 */
const FooterLayout = () => {
  // Récupération dynamique de l'année pour le copyright
  const currentYear = new Date().getFullYear();

  // --- DONNÉES DES SECTIONS (Modulable) ---
  const sections: FooterSection[] = [
    {
      title: "Produit",
      links: [
        { label: "Fonctionnalités", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Statut API", href: "#" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Confidentialité", href: "#" },
        { label: "Conditions d'utilisation", href: "#" },
        { label: "Mentions Légales", href: "#" },
      ],
    },
  ];

  // --- RÉSEAUX SOCIAUX ---
  const socialLinks = [
    { Icon: FaGithub, href: "#", label: "GitHub" },
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-black border-t border-white/5 relative overflow-hidden">
      
      {/* EFFET DE LUMIÈRE (Glow) : Apporte de la profondeur au fond noir */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full filter blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* --- COLONNE 1 : BRANDING --- */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo/Logo_txt_light.png"
                alt="Logo Analyse AI"
                className="w-10 h-10 object-contain"
              />
              <span className="text-white font-black tracking-tighter text-xl">
                ANALYSE<span className="opacity-30">.AI</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
              Solution d'analyse sémantique haute performance pour la conformité réglementaire et l'intégrité des données.
            </p>
          </div>

          {/* --- COLONNES 2 & 3 : LIENS (Mapping) --- */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-black mb-6 text-[11px] uppercase tracking-[0.3em]">
                {section.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-white/40 hover:text-white transition-all duration-300 font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* --- COLONNE 4 : SOCIAL CONNECT --- */}
          <div>
            <h4 className="text-white font-black mb-6 text-[11px] uppercase tracking-[0.3em]">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- BARRE INFÉRIEURE : COPYRIGHT & TECH STATUS --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">
            © {currentYear} ANALYSE.AI — SYSTÈME DE CONTRÔLE RÉGLEMENTAIRE
          </p>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/5">
            <HiLightningBolt className="text-yellow-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
              Powered by Next-Gen Analysis
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;