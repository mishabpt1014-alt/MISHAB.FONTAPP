import React from 'react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { FontItem } from '../types';
import { FontCard } from './FontCard';

interface FavoritesScreenProps {
  favoriteFonts: FontItem[];
  previewText: string;
  setPreviewText: (txt: string) => void;
  fontSize: number;
  onToggleFavorite: (id: string) => void;
  onOpenDesigner: (font: FontItem) => void;
  onOpenDetails: (font: FontItem) => void;
  onShowToast: (msg: string) => void;
  onNavigateToCatalog: () => void;
  onClearAllFavorites: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favoriteFonts,
  previewText,
  setPreviewText,
  fontSize,
  onToggleFavorite,
  onOpenDesigner,
  onOpenDetails,
  onShowToast,
  onNavigateToCatalog,
  onClearAllFavorites,
}) => {
  return (
    <div id="favorites-screen-container" className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>My Favorite Fonts</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            {favoriteFonts.length} saved font{favoriteFonts.length === 1 ? '' : 's'} in your personal typography library.
          </p>
        </div>

        {favoriteFonts.length > 0 && (
          <button
            onClick={onClearAllFavorites}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {favoriteFonts.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            No favorite fonts saved yet
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Browse our 1,000+ Malayalam & English fonts and tap the heart icon on any font to pin it here for easy access.
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 flex items-center gap-2 mx-auto transition-all"
          >
            <span>Explore 1,000+ Fonts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {favoriteFonts.map((font) => (
            <FontCard
              key={font.id}
              font={font}
              previewText={previewText}
              fontSize={fontSize}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onOpenDesigner={onOpenDesigner}
              onOpenDetails={onOpenDetails}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      )}
    </div>
  );
};
