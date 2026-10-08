import React from 'react';
import { Sparkles, Heart, Palette, Compass, Sun, Moon, Smartphone, Monitor } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'catalog' | 'designer' | 'favorites';
  setActiveTab: (tab: 'home' | 'catalog' | 'designer' | 'favorites') => void;
  favoritesCount: number;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  isDark,
  setIsDark,
  isPhoneFrame,
  setIsPhoneFrame,
}) => {
  return (
    <header
      id="app-header"
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark
          ? 'bg-zinc-950/90 border-zinc-800 text-zinc-100'
          : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <button
          id="brand-logo-btn"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            അA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl font-sans">
                Font<span className="text-rose-500">Hub</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                1000+ Fonts
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
              Malayalam & English
            </p>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900/90 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            id="nav-tab-home"
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'home'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            Home
          </button>
          <button
            id="nav-tab-catalog"
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'catalog'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            1,000+ Fonts
          </button>
          <button
            id="nav-tab-designer"
            onClick={() => setActiveTab('designer')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'designer'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Palette className="w-4 h-4" />
            Text Designer
          </button>
          <button
            id="nav-tab-favorites"
            onClick={() => setActiveTab('favorites')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'favorites'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Heart className="w-4 h-4" />
            Favorites
            {favoritesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-500 border border-rose-500/30">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Tools: View Frame & Theme */}
        <div className="flex items-center gap-2">
          {/* Frame Toggle for responsive / mobile app inspection */}
          <button
            id="toggle-phone-frame-btn"
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            title={isPhoneFrame ? 'Switch to Full Screen' : 'Switch to Mobile App View'}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors text-zinc-600 dark:text-zinc-400"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[11px]">Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px]">Mobile View</span>
              </>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
