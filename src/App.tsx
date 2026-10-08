/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { TextDesigner } from './components/TextDesigner';
import { FavoritesScreen } from './components/FavoritesScreen';
import { FontModal } from './components/FontModal';
import { ALL_FONTS, CATEGORIES } from './data/fontsData';
import { CategoryType, FontItem, LanguageType } from './types';
import { CheckCircle2, Smartphone } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'designer' | 'favorites'>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [previewText, setPreviewText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(30);

  // Selected Font for Modal & Designer
  const [modalFont, setModalFont] = useState<FontItem | null>(null);
  const [designerFont, setDesignerFont] = useState<FontItem | undefined>(undefined);

  // Toast notification
  const [toast, setToast] = useState<string | null>(null);

  // Theme state with localStorage persistence
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('fonthub_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Favorites with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fonthub_favorites');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Default favorites with top Malayalam and English fonts
    return ['mal-base-1', 'mal-base-2', 'eng-base-1', 'eng-base-4'];
  });

  // Sync dark theme to <html> tag
  useEffect(() => {
    localStorage.setItem('fonthub_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('fonthub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 2800);
  };

  const toggleFavorite = (fontId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(fontId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== fontId);
      } else {
        showToast('Added to favorites! ❤️');
        return [...prev, fontId];
      }
    });
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite fonts?')) {
      setFavorites([]);
      showToast('Cleared all favorites');
    }
  };

  const handleOpenDesignerWithFont = (font: FontItem) => {
    setDesignerFont(font);
    setActiveTab('designer');
    showToast(`Loaded ${font.name} into Text Designer`);
  };

  // Precompute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: ALL_FONTS.length,
      Malayalam: ALL_FONTS.filter((f) => f.language === 'malayalam').length,
      English: ALL_FONTS.filter((f) => f.language === 'english').length,
    };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All' && cat !== 'Malayalam' && cat !== 'English') {
        counts[cat] = ALL_FONTS.filter((f) => f.category === cat).length;
      }
    });
    return counts;
  }, []);

  const favoriteFontObjects = useMemo(() => {
    return ALL_FONTS.filter((f) => favorites.includes(f.id));
  }, [favorites]);

  // View routing
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            previewText={previewText}
            setPreviewText={setPreviewText}
            fontSize={fontSize}
            setFontSize={setFontSize}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDesigner={handleOpenDesignerWithFont}
            onOpenDetails={setModalFont}
            onShowToast={showToast}
            onNavigateToCatalog={(cat, lang) => {
              if (cat) setSelectedCategory(cat);
              if (lang) setSelectedLanguage(lang);
              setActiveTab('catalog');
            }}
            onNavigateToFavorites={() => setActiveTab('favorites')}
            categoryCounts={categoryCounts}
            allFonts={ALL_FONTS}
          />
        );
      case 'catalog':
        return (
          <CatalogScreen
            allFonts={ALL_FONTS}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            previewText={previewText}
            setPreviewText={setPreviewText}
            fontSize={fontSize}
            setFontSize={setFontSize}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDesigner={handleOpenDesignerWithFont}
            onOpenDetails={setModalFont}
            onShowToast={showToast}
            categoryCounts={categoryCounts}
          />
        );
      case 'designer':
        return (
          <TextDesigner
            initialFont={designerFont}
            onShowToast={showToast}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            favoriteFonts={favoriteFontObjects}
            previewText={previewText}
            setPreviewText={setPreviewText}
            fontSize={fontSize}
            onToggleFavorite={toggleFavorite}
            onOpenDesigner={handleOpenDesignerWithFont}
            onOpenDetails={setModalFont}
            onShowToast={showToast}
            onNavigateToCatalog={() => setActiveTab('catalog')}
            onClearAllFavorites={clearAllFavorites}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="app-root"
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
      } ${isPhoneFrame ? 'py-6 px-4 bg-zinc-900' : ''}`}
    >
      {/* If phone frame simulator is active, frame it in a mobile bezel */}
      <div
        className={
          isPhoneFrame
            ? 'max-w-[440px] mx-auto rounded-[42px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden min-h-[860px] bg-zinc-950 flex flex-col relative ring-1 ring-zinc-700/50'
            : 'w-full min-h-screen flex flex-col'
        }
      >
        {/* Top App Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          favoritesCount={favorites.length}
          isDark={isDark}
          setIsDark={setIsDark}
          isPhoneFrame={isPhoneFrame}
          setIsPhoneFrame={setIsPhoneFrame}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 pb-20 md:pb-12">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          favoritesCount={favorites.length}
          isDark={isDark}
        />

        {/* Font Details & Glyphs Modal */}
        {modalFont && (
          <FontModal
            font={modalFont}
            onClose={() => setModalFont(null)}
            isFavorite={favorites.includes(modalFont.id)}
            onToggleFavorite={toggleFavorite}
            onOpenDesigner={handleOpenDesignerWithFont}
            onShowToast={showToast}
          />
        )}

        {/* Toast Notification */}
        {toast && (
          <div
            id="app-toast"
            className="fixed bottom-16 md:bottom-6 right-6 z-50 bg-zinc-900/95 dark:bg-zinc-100 text-white dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            <CheckCircle2 className="w-4 h-4 text-rose-500" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
}
