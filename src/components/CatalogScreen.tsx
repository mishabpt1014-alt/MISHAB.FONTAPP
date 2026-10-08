import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';
import { FontItem, CategoryType, LanguageType } from '../types';
import { FontCard } from './FontCard';
import { SearchBar } from './SearchBar';
import { CategoryBar } from './CategoryBar';
import { MalayalamHelper } from './MalayalamHelper';

interface CatalogScreenProps {
  allFonts: FontItem[];
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
  categoryCounts: Record<string, number>;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  allFonts,
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
  categoryCounts,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'downloads' | 'rating' | 'name'>('popular');
  const [displayCount, setDisplayCount] = useState<number>(36);

  // Filtered & Sorted fonts
  const filteredFonts = useMemo(() => {
    let list = allFonts;

    // 1. Language filter
    if (selectedLanguage !== 'all') {
      list = list.filter((f) => f.language === selectedLanguage);
    }

    // 2. Category filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Malayalam') {
        list = list.filter((f) => f.language === 'malayalam');
      } else if (selectedCategory === 'English') {
        list = list.filter((f) => f.language === 'english');
      } else {
        list = list.filter((f) => f.category === selectedCategory);
      }
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.nativeName && f.nativeName.includes(q)) ||
          f.category.toLowerCase().includes(q) ||
          f.style.toLowerCase().includes(q) ||
          f.author.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 4. Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default: popular
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return b.downloads - a.downloads;
    });
  }, [allFonts, selectedLanguage, selectedCategory, searchQuery, sortBy]);

  const visibleFonts = filteredFonts.slice(0, displayCount);
  const hasMore = visibleFonts.length < filteredFonts.length;

  const handleReset = () => {
    setSearchQuery('');
    setSelectedLanguage('all');
    setSelectedCategory('All');
  };

  return (
    <div id="catalog-screen-container" className="space-y-6 pb-16">
      {/* Top Filter & Search Controls */}
      <div className="space-y-4">
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

        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        <MalayalamHelper
          onInsertText={(char) => setPreviewText(previewText + char)}
          onReplaceText={(txt) => setPreviewText(txt)}
        />
      </div>

      {/* Results Header: Count & Sort */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Showing {filteredFonts.length.toLocaleString()} Fonts
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedLanguage !== 'all') && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-rose-500"
          >
            <option value="popular">🔥 Popularity</option>
            <option value="downloads">⬇️ Most Downloaded</option>
            <option value="rating">⭐ Highest Rated</option>
            <option value="name">🔤 Name (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Grid of Font Cards */}
      {filteredFonts.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-4">
          <Sparkles className="w-12 h-12 text-zinc-400 mx-auto stroke-1" />
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            No matching fonts found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
            We couldn't find any fonts matching "{searchQuery}". Try searching for Malayalam font names like Manjari, Rachana, or English styles like Calligraphy or Bold.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {visibleFonts.map((font) => (
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

          {/* Load More Pagination for 1,000+ fonts */}
          {hasMore && (
            <div className="text-center pt-6">
              <button
                id="load-more-fonts-btn"
                onClick={() => setDisplayCount((prev) => prev + 36)}
                className="px-6 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs sm:text-sm hover:border-rose-500 hover:text-rose-500 active:scale-95 transition-all shadow-sm"
              >
                Load More Fonts ({visibleFonts.length} of {filteredFonts.length})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
