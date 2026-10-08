import React from 'react';
import { Sparkles, Flame, Star, Compass, Heart, ArrowRight, Palette, Layers } from 'lucide-react';
import { FontItem, CategoryType, LanguageType } from '../types';
import { FontCard } from './FontCard';
import { SearchBar } from './SearchBar';
import { CategoryBar } from './CategoryBar';
import { MalayalamHelper } from './MalayalamHelper';
import {
  POPULAR_FONTS,
  NEW_FONTS,
  MALAYALAM_FEATURED,
  ENGLISH_FEATURED,
  MALAYALAM_FONTS_COUNT,
  ENGLISH_FONTS_COUNT,
  TOTAL_FONTS_COUNT,
} from '../data/fontsData';

interface HomeScreenProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  previewText: string;
  setPreviewText: (txt: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDesigner: (font: FontItem) => void;
  onOpenDetails: (font: FontItem) => void;
  onShowToast: (msg: string) => void;
  onNavigateToCatalog: (category?: CategoryType, language?: LanguageType) => void;
  onNavigateToFavorites: () => void;
  categoryCounts: Record<string, number>;
  allFonts: FontItem[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLanguage,
  setSelectedLanguage,
  selectedCategory,
  setSelectedCategory,
  previewText,
  setPreviewText,
  fontSize,
  setFontSize,
  favorites,
  onToggleFavorite,
  onOpenDesigner,
  onOpenDetails,
  onShowToast,
  onNavigateToCatalog,
  onNavigateToFavorites,
  categoryCounts,
  allFonts,
}) => {
  const favoriteFonts = allFonts.filter((f) => favorites.includes(f.id));

  return (
    <div id="home-screen-container" className="space-y-8 pb-12">
      {/* Hero Banner */}
      <section
        id="hero-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-rose-950/40 border border-zinc-800 p-6 sm:p-10 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Modern Typography Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Font<span className="text-rose-500">Hub</span>
            <span className="block text-xl sm:text-3xl font-semibold text-zinc-300 mt-1">
              1000+ Malayalam & English Fonts
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
            Explore 500+ Malayalam fonts and 500+ English fonts with real-time live preview, custom text designer, full Unicode glyph support, and instant font downloads.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => onNavigateToCatalog('Malayalam', 'malayalam')}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20"
            >
              <span>500+ Malayalam Fonts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToCatalog('English', 'english')}
              className="px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 text-xs sm:text-sm font-semibold border border-zinc-700/60 transition-colors"
            >
              500+ English Fonts
            </button>
          </div>
        </div>
      </section>

      {/* Search & Category Section */}
      <section id="search-and-categories" className="space-y-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          previewText={previewText}
          setPreviewText={setPreviewText}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />

        {/* Category Buttons */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat !== 'All') {
              onNavigateToCatalog(cat);
            }
          }}
          categoryCounts={categoryCounts}
        />

        {/* Quick Malayalam Phrase and typing helper */}
        <MalayalamHelper
          onInsertText={(char) => setPreviewText(previewText + char)}
          onReplaceText={(txt) => setPreviewText(txt)}
        />
      </section>

      {/* 🔥 Section 1: Popular Fonts */}
      <section id="section-popular-fonts" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              🔥
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                Popular Fonts
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Trending typography choices across Malayalam & English
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToCatalog('All')}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_FONTS.slice(0, 6).map((font) => (
            <FontCard
              key={font.id}
              font={font}
              previewText={previewText}
              fontSize={fontSize}
              isFavorite={favorites.includes(font.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDesigner={onOpenDesigner}
              onOpenDetails={onOpenDetails}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      </section>

      {/* 🆕 Section 2: New Fonts */}
      <section id="section-new-fonts" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              ✨
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                New Fonts
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Fresh typography additions with modern stylistic cuts
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToCatalog('All')}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NEW_FONTS.slice(0, 6).map((font) => (
            <FontCard
              key={font.id}
              font={font}
              previewText={previewText}
              fontSize={fontSize}
              isFavorite={favorites.includes(font.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDesigner={onOpenDesigner}
              onOpenDetails={onOpenDetails}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      </section>

      {/* 🇮🇳 Section 3: Malayalam Fonts (500+) */}
      <section id="section-malayalam-fonts" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              🇮🇳
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Malayalam Fonts</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {MALAYALAM_FONTS_COUNT}+ Fonts
                </span>
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Manjari, Chilanka, Gayathri, Baloo Chettan, Rachana, Anek & more
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToCatalog('Malayalam', 'malayalam')}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <span>All 500+ Malayalam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MALAYALAM_FEATURED.slice(0, 6).map((font) => (
            <FontCard
              key={font.id}
              font={font}
              previewText={previewText}
              fontSize={fontSize}
              isFavorite={favorites.includes(font.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDesigner={onOpenDesigner}
              onOpenDetails={onOpenDetails}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      </section>

      {/* 🔤 Section 4: English Fonts (500+) */}
      <section id="section-english-fonts" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              🔤
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>English Fonts</span>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                  {ENGLISH_FONTS_COUNT}+ Fonts
                </span>
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Bebas Neue, Cinzel, Playfair Display, Great Vibes, Orbitron & more
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToCatalog('English', 'english')}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <span>All 500+ English</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENGLISH_FEATURED.slice(0, 6).map((font) => (
            <FontCard
              key={font.id}
              font={font}
              previewText={previewText}
              fontSize={fontSize}
              isFavorite={favorites.includes(font.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDesigner={onOpenDesigner}
              onOpenDetails={onOpenDetails}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      </section>

      {/* ❤️ Section 5: Favorites */}
      <section id="section-favorites" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              ❤️
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                Your Favorites
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                {favorites.length} saved typography styles
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={onNavigateToFavorites}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <span>View All ({favorites.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {favoriteFonts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center space-y-3">
            <Heart className="w-10 h-10 text-zinc-400 mx-auto stroke-1" />
            <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
              No favorites saved yet
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto">
              Click the heart icon on any Malayalam or English font card to save it to your personal collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteFonts.slice(0, 6).map((font) => (
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
      </section>
    </div>
  );
};
