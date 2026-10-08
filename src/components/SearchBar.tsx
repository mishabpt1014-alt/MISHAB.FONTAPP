import React from 'react';
import { Search, X, Sliders, Type } from 'lucide-react';
import { LanguageType } from '../types';
import { MALAYALAM_FONTS_COUNT, ENGLISH_FONTS_COUNT, TOTAL_FONTS_COUNT } from '../data/fontsData';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
  previewText: string;
  setPreviewText: (text: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLanguage,
  setSelectedLanguage,
  previewText,
  setPreviewText,
  fontSize,
  setFontSize,
}) => {
  return (
    <div className="w-full space-y-3">
      {/* Large Search Input */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-zinc-400 pointer-events-none">
          <Search className="w-5 h-5 text-rose-500" />
        </div>
        <input
          id="main-font-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 1,000+ fonts by name, style, or foundry (e.g. Manjari, Cinzel, Calligraphy, Bold, Poster)..."
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-10 py-3.5 sm:py-4 text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-3.5 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row: Language Selector & Preview Text Config */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900/90 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
          <button
            id="lang-all"
            onClick={() => setSelectedLanguage('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedLanguage === 'all'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            All ({TOTAL_FONTS_COUNT})
          </button>
          <button
            id="lang-malayalam"
            onClick={() => setSelectedLanguage('malayalam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedLanguage === 'malayalam'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <span>🇮🇳 Malayalam</span>
            <span className="text-[10px] opacity-80 font-normal">({MALAYALAM_FONTS_COUNT})</span>
          </button>
          <button
            id="lang-english"
            onClick={() => setSelectedLanguage('english')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedLanguage === 'english'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <span>🔤 English</span>
            <span className="text-[10px] opacity-80 font-normal">({ENGLISH_FONTS_COUNT})</span>
          </button>
        </div>

        {/* Live Type Preview Input & Font Size Slider */}
        <div className="flex items-center gap-2 flex-1 sm:max-w-md">
          <div className="relative flex-1">
            <div className="absolute left-3 top-2.5 text-zinc-400 pointer-events-none">
              <Type className="w-4 h-4 text-rose-500" />
            </div>
            <input
              id="live-preview-text-input"
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Type custom text to preview instantly in all fonts..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-rose-500"
            />
            {previewText && (
              <button
                onClick={() => setPreviewText('')}
                className="absolute right-2 top-2 p-0.5 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Size Slider Pill */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-xl text-xs">
            <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="range"
              min="18"
              max="56"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-16 sm:w-20 accent-rose-500 cursor-pointer"
              title={`Preview Size: ${fontSize}px`}
            />
            <span className="text-[10px] text-zinc-600 dark:text-zinc-300 min-w-5 font-mono">
              {fontSize}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
