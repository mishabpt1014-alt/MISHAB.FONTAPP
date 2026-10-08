import React, { useState } from 'react';
import { Heart, Download, Copy, Check, Palette, Info, ExternalLink } from 'lucide-react';
import { FontItem } from '../types';
import { copyToClipboard, downloadFontPackage } from '../utils/fontDownload';

interface FontCardProps {
  font: FontItem;
  previewText: string;
  fontSize: number;
  isFavorite: boolean;
  onToggleFavorite: (fontId: string) => void;
  onOpenDesigner: (font: FontItem) => void;
  onOpenDetails: (font: FontItem) => void;
  onShowToast: (msg: string) => void;
}

export const FontCard: React.FC<FontCardProps> = ({
  font,
  previewText,
  fontSize,
  isFavorite,
  onToggleFavorite,
  onOpenDesigner,
  onOpenDetails,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const displayText = previewText.trim().length > 0
    ? previewText
    : (font.language === 'malayalam' ? font.sampleTextMalayalam : font.sampleTextEnglish);

  const handleCopyName = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyToClipboard(font.name);
    if (ok) {
      setCopied(true);
      onShowToast(`Copied "${font.name}" to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadFontPackage(font);
    onShowToast(`Downloading ${font.name} specimen package...`);
  };

  return (
    <div
      id={`font-card-${font.id}`}
      className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {font.name}
              </h3>
              {font.nativeName && (
                <span className="text-xs font-medium text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900/50">
                  {font.nativeName}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 truncate mt-0.5">
              {font.style} • {font.author.split(' - ')[0]}
            </p>
          </div>

          {/* Favorite Toggle */}
          <button
            id={`fav-btn-${font.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(font.id);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-xl transition-all ${
              isFavorite
                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 scale-105'
                : 'text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-rose-500 scale-110' : ''}`}
            />
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              font.language === 'malayalam'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
            }`}
          >
            {font.language === 'malayalam' ? '🇮🇳 Malayalam' : '🔤 English'}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            {font.category}
          </span>
          {font.popular && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
              🔥 Popular
            </span>
          )}
          {font.isNew && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              ✨ New
            </span>
          )}
        </div>

        {/* Live Typography Preview Container */}
        <div
          onClick={() => onOpenDetails(font)}
          className="cursor-pointer bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-4 min-h-[110px] flex items-center justify-center text-center overflow-hidden hover:border-rose-500/40 transition-colors"
          title="Click to view full font details & glyphs"
        >
          <div
            className="w-full break-words leading-relaxed text-zinc-900 dark:text-zinc-50 transition-all select-all"
            style={{
              fontFamily: font.cssFontFamily,
              fontSize: `${fontSize}px`,
            }}
          >
            {displayText}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {/* Copy Font Name */}
          <button
            id={`copy-name-${font.id}`}
            onClick={handleCopyName}
            title="Copy Font Name"
            className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-medium hidden sm:inline">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>

          {/* Details / Glyphs */}
          <button
            id={`details-btn-${font.id}`}
            onClick={() => onOpenDetails(font)}
            title="Font Details & Glyphs"
            className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Glyphs</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Design with font shortcut */}
          <button
            id={`design-btn-${font.id}`}
            onClick={() => onOpenDesigner(font)}
            title="Open in Text Designer"
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center gap-1 transition-all"
          >
            <Palette className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px]">Design</span>
          </button>

          {/* Download Font Specimen */}
          <button
            id={`download-btn-${font.id}`}
            onClick={handleDownload}
            title="Download Font Specimen & License"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500 hover:bg-rose-600 active:scale-95 text-white flex items-center gap-1 transition-all shadow-xs shadow-rose-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-[11px]">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
