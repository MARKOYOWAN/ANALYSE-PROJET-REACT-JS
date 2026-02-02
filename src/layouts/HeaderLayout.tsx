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
    { label: 'Historique', href: '#', icon: HiClock },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isSticky
          ? 'bg-white/70 backdrop-blur-xl border-black/5 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO : Image test.png + Texte */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <a href="/" className="flex items-center gap-3"> 
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img
                src="/logo/Logo_txt_dark.png"
                alt="Logo"
                className="w-full h-full object-contain" // Utilise w-full pour que le logo prenne toute la place du conteneur
              />
            </div>

            {/* Le texte reste à côté, harmonisé avec le logo dark */}
            <span className="text-spinn-black font-bold tracking-tighter text-xl hidden sm:block">
              ANALYSE<span className="text-spinn-muted">.AI</span>
            </span>
          </a>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-spinn-muted hover:text-spinn-black transition-colors text-sm font-semibold"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}

          {/* Status de l'API */}
          <div className="flex items-center gap-2 px-3 py-1 bg-black/[0.03] border border-black/[0.05] rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spinn-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-spinn-success"></span>
            </span>
            <span className="text-[10px] text-spinn-muted font-bold uppercase tracking-widest">API Online</span>
          </div>
        </nav>

        {/* BOUTON ACTION */}
        <div className="hidden md:block">
          <button className="bg-spinn-black text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/5">
            Démarrer
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-spinn-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-black/5 p-6 flex flex-col gap-4 md:hidden shadow-xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-spinn-black flex items-center gap-3 text-lg font-medium">
              <link.icon className="text-spinn-muted" /> {link.label}
            </a>
          ))}
          <button className="bg-spinn-black text-white font-bold py-3 rounded-xl mt-2">
            Démarrer l'analyse
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;