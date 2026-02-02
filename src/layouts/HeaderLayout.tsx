import { useState, useEffect } from 'react';
import { HiChartBar, HiClock, HiMenu, HiX } from 'react-icons/hi';
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Analyseur', href: '#', icon: HiChartBar },
    { label: 'Historique', href: '#', icon: HiClock }, // Remplacé ici
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isSticky
          ? 'bg-spinn-black/80 backdrop-blur-lg border-spinn-border py-3'
          : 'bg-transparent border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO : Minimaliste & Tech */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
            <span className="text-black font-black text-xl">A</span>
          </div>
          <span className="text-white font-bold tracking-tighter text-xl hidden sm:block">
            ANALYSE<span className="text-spinn-muted">.AI</span>
          </span>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-spinn-muted hover:text-white transition-colors text-sm font-medium"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}

          {/* Status de l'API (Simulé) */}
          <div className="flex items-center gap-2 px-3 py-1 bg-spinn-card border border-spinn-border rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spinn-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-spinn-success"></span>
            </span>
            <span className="text-[10px] text-spinn-muted font-bold uppercase tracking-widest">API Online</span>
          </div>
        </nav>

        {/* BOUTON ACTION */}
        <div className="hidden md:block">
          <button className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-spinn-accent-light transition-all active:scale-95">
            Démarrer
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-spinn-black border-b border-spinn-border p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-white flex items-center gap-3 text-lg">
              <link.icon className="text-spinn-muted" /> {link.label}
            </a>
          ))}
          <button className="bg-white text-black font-bold py-3 rounded-xl mt-2">
            Démarrer l'analyse
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;