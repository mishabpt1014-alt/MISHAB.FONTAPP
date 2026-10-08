import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Keyboard, Sparkles } from 'lucide-react';
import { MALAYALAM_GLYPHS, SAMPLE_TEXT_PRESETS } from '../data/fontsData';

interface MalayalamHelperProps {
  onInsertText: (text: string) => void;
  onReplaceText: (text: string) => void;
}

export const MalayalamHelper: React.FC<MalayalamHelperProps> = ({
  onInsertText,
  onReplaceText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'phrases' | 'keyboard'>('phrases');

  return (
    <div className="w-full bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 rounded-2xl p-3 text-xs">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors"
        >
          <Keyboard className="w-4 h-4" />
          <span>മലയാളം ടൈപ്പിംഗ് സഹായി (Malayalam Quick Helper & Phrases)</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-600 dark:text-zinc-300">Click to preview</span>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-rose-500/10 space-y-3">
          {/* Subtabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('phrases')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeTab === 'phrases'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Popular Phrases
            </button>
            <button
              onClick={() => setActiveTab('keyboard')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeTab === 'keyboard'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Malayalam Aksharangal (അക്ഷരങ്ങൾ)
            </button>
          </div>

          {activeTab === 'phrases' ? (
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_TEXT_PRESETS.malayalam.map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => onReplaceText(phrase)}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 hover:text-rose-500 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-all shadow-2xs active:scale-95"
                >
                  {phrase}
                </button>
              ))}
              {SAMPLE_TEXT_PRESETS.english.map((phrase, i) => (
                <button
                  key={`en-${i}`}
                  onClick={() => onReplaceText(phrase)}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 hover:text-rose-500 text-zinc-700 dark:text-zinc-300 font-medium text-xs transition-all shadow-2xs active:scale-95"
                >
                  {phrase}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Vowels (സ്വരങ്ങൾ) & Chillus (ചില്ലുകൾ)
                </span>
                <div className="flex flex-wrap gap-1">
                  {[...MALAYALAM_GLYPHS.vowels, ...MALAYALAM_GLYPHS.chillus].map((char, i) => (
                    <button
                      key={i}
                      onClick={() => onInsertText(char)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-800 dark:text-zinc-100 font-bold text-xs flex items-center justify-center transition-all"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Consonants (വ്യഞ്ജനങ്ങൾ)
                </span>
                <div className="flex flex-wrap gap-1">
                  {MALAYALAM_GLYPHS.consonants.map((char, i) => (
                    <button
                      key={i}
                      onClick={() => onInsertText(char)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-800 dark:text-zinc-100 font-bold text-xs flex items-center justify-center transition-all"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Signs & Numbers (ചിഹ്നങ്ങൾ & സംഖ്യകൾ)
                </span>
                <div className="flex flex-wrap gap-1">
                  {[...MALAYALAM_GLYPHS.vowelSigns, ...MALAYALAM_GLYPHS.numbers].map((char, i) => (
                    <button
                      key={i}
                      onClick={() => onInsertText(char)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-800 dark:text-zinc-100 font-bold text-xs flex items-center justify-center transition-all"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
