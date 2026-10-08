import React, { useState } from 'react';
import { X, Heart, Download, Copy, Check, Palette, ShieldCheck, Star } from 'lucide-react';
import { FontItem } from '../types';
import { copyToClipboard, downloadFontPackage } from '../utils/fontDownload';
import { MALAYALAM_GLYPHS } from '../data/fontsData';

interface FontModalProps {
  font: FontItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (fontId: string) => void;
  onOpenDesigner: (font: FontItem) => void;
  onShowToast: (msg: string) => void;
}

export const FontModal: React.FC<FontModalProps> = ({
  font,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenDesigner,
  onShowToast,
}) => {
  if (!font) return null;

  const [modalText, setModalText] = useState(
    font.language === 'malayalam'
      ? 'എന്റെ കേരളം എത്ര സുന്ദരം! മലയാള ഭാഷയുടെ തനിമയും പ്രൗഢിയും.'
      : 'The quick brown fox jumps over the lazy dog. 1234567890'
  );
  const [modalFontSize, setModalFontSize] = useState(36);
  const [copiedCss, setCopiedCss] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'glyphs' | 'license'>('preview');

  const cssSnippet = `/* FontHub CSS Integration for ${font.name} */
.custom-typography {
  font-family: ${font.cssFontFamily};
  font-weight: 400;
  font-style: normal;
}`;

  const handleCopyCss = async () => {
    const ok = await copyToClipboard(cssSnippet);
    if (ok) {
      setCopiedCss(true);
      onShowToast('CSS snippet copied to clipboard!');
      setTimeout(() => setCopiedCss(false), 2000);
    }
  };

  return (
    <div
      id="font-details-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="font-details-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-950/40">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                {font.name}
              </h2>
              {font.nativeName && (
                <span className="text-sm font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900">
                  {font.nativeName}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
              By {font.author} • Style: {font.style}
            </p>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {font.language === 'malayalam' ? '🇮🇳 Malayalam' : '🔤 English'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                {font.category}
              </span>
              <span className="text-xs text-amber-500 flex items-center gap-1 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {font.rating}
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-300">
                {font.downloads.toLocaleString()} downloads
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite(font.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-2 rounded-xl transition-all ${
                isFavorite
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-rose-500 text-rose-500'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Type Tester & Preview
          </button>
          <button
            onClick={() => setActiveTab('glyphs')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'glyphs'
                ? 'border-rose-500 text-rose-500'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Glyphs & Character Map
          </button>
          <button
            onClick={() => setActiveTab('license')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'license'
                ? 'border-rose-500 text-rose-500'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            License & Web Integration
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'preview' && (
            <div className="space-y-4">
              {/* Type Tester Input */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Type your custom test text:
                </label>
                <textarea
                  value={modalText}
                  onChange={(e) => setModalText(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-rose-500 resize-none"
                  placeholder="Type anything here..."
                />
              </div>

              {/* Font Size Slider */}
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 min-w-16">
                  Size: {modalFontSize}px
                </span>
                <input
                  type="range"
                  min="18"
                  max="72"
                  value={modalFontSize}
                  onChange={(e) => setModalFontSize(Number(e.target.value))}
                  className="flex-1 accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Live Render Area */}
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 min-h-[160px] flex items-center justify-center text-center">
                <div
                  className="w-full text-zinc-900 dark:text-zinc-100 leading-relaxed break-words select-all"
                  style={{
                    fontFamily: font.cssFontFamily,
                    fontSize: `${modalFontSize}px`,
                  }}
                >
                  {modalText || 'Type something to preview...'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'glyphs' && (
            <div className="space-y-5">
              {font.language === 'malayalam' ? (
                <>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      Vowels & Chillus (സ്വരങ്ങൾ & ചില്ലുകൾ)
                    </h4>
                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                      {[...MALAYALAM_GLYPHS.vowels, ...MALAYALAM_GLYPHS.chillus].map((char, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-xl font-medium text-zinc-900 dark:text-zinc-100 hover:border-rose-500 transition-colors"
                          style={{ fontFamily: font.cssFontFamily }}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      Consonants (വ്യഞ്ജനാക്ഷരങ്ങൾ)
                    </h4>
                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                      {MALAYALAM_GLYPHS.consonants.map((char, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-xl font-medium text-zinc-900 dark:text-zinc-100 hover:border-rose-500 transition-colors"
                          style={{ fontFamily: font.cssFontFamily }}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      Malayalam Numbers (സംഖ്യകൾ)
                    </h4>
                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                      {MALAYALAM_GLYPHS.numbers.map((char, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-lg font-medium text-zinc-900 dark:text-zinc-100"
                          style={{ fontFamily: font.cssFontFamily }}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      Uppercase Alphabets (A - Z)
                    </h4>
                    <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5">
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => (
                        <div
                          key={char}
                          className="aspect-square bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-lg font-bold text-zinc-900 dark:text-zinc-100"
                          style={{ fontFamily: font.cssFontFamily }}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      Lowercase Alphabets (a - z)
                    </h4>
                    <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5">
                      {'abcdefghijklmnopqrstuvwxyz'.split('').map((char) => (
                        <div
                          key={char}
                          className="aspect-square bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-lg font-normal text-zinc-900 dark:text-zinc-100"
                          style={{ fontFamily: font.cssFontFamily }}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      Numerals & Symbols (0 - 9, !?#)
                    </h4>
                    <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5">
                      {'0123456789!@#$%^&*()_+-='.split('').map((char, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-base text-zinc-900 dark:text-zinc-100"
                          style={{ fontFamily: font.cssFontFamily }}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'license' && (
            <div className="space-y-4">
              {/* License Card */}
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-sm">Verified Open License</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <strong>License:</strong> {font.license}
                  <br />
                  <strong>Author / Foundry:</strong> {font.author}
                  <br />
                  This font is freely redistributable for both personal and commercial typography projects under open font license standards. Proper attribution has been preserved.
                </p>
              </div>

              {/* CSS Code Snippet */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    CSS Integration Rule:
                  </label>
                  <button
                    onClick={handleCopyCss}
                    className="flex items-center gap-1 text-xs text-rose-500 font-semibold hover:underline"
                  >
                    {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCss ? 'Copied!' : 'Copy CSS'}</span>
                  </button>
                </div>
                <pre className="bg-zinc-950 text-zinc-200 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-zinc-800">
                  {cssSnippet}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenDesigner(font);
            }}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center gap-2 transition-colors"
          >
            <Palette className="w-4 h-4 text-rose-500" />
            <span>Open in Text Designer</span>
          </button>

          <button
            onClick={() => {
              downloadFontPackage(font);
              onShowToast(`Downloading ${font.name} package...`);
            }}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-500 hover:bg-rose-600 active:scale-95 text-white flex items-center gap-2 transition-all shadow-md shadow-rose-500/25"
          >
            <Download className="w-4 h-4" />
            <span>Download Specimen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
