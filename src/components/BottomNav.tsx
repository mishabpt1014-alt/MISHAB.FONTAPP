import React from 'react';
import { Compass, Sparkles, Palette, Heart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'catalog' | 'designer' | 'favorites';
  setActiveTab: (tab: 'home' | 'catalog' | 'designer' | 'favorites') => void;
  favoritesCount: number;
  isDark: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  isDark,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t backdrop-blur-xl px-4 py-2 transition-colors ${
        isDark
          ? 'bg-zinc-950/95 border-zinc-800 text-zinc-300'
          : 'bg-white/95 border-zinc-200 text-zinc-700 shadow-lg'
      }`}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        <button
          id="mobile-tab-home"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-rose-500 font-bold scale-105'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          id="mobile-tab-catalog"
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeTab === 'catalog'
              ? 'text-rose-500 font-bold scale-105'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">1000+ Fonts</span>
        </button>

        <button
          id="mobile-tab-designer"
          onClick={() => setActiveTab('designer')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeTab === 'designer'
              ? 'text-rose-500 font-bold scale-105'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Palette className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Designer</span>
        </button>

        <button
          id="mobile-tab-favorites"
          onClick={() => setActiveTab('favorites')}
          className={`relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeTab === 'favorites'
              ? 'text-rose-500 font-bold scale-105'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Favorites</span>
          {favoritesCount > 0 && (
            <span className="absolute top-0 right-5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
