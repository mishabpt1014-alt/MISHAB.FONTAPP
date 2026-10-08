import React, { useState, useRef } from 'react';
import { Download, Sparkles, RefreshCw, Layers, AlignLeft, AlignCenter, AlignRight, Type, Image as ImageIcon } from 'lucide-react';
import { FontItem, TextDesignerState } from '../types';
import { ALL_FONTS, SAMPLE_TEXT_PRESETS } from '../data/fontsData';

interface TextDesignerProps {
  initialFont?: FontItem;
  onShowToast: (msg: string) => void;
}

const GRADIENT_PRESETS = [
  { name: 'Kerala Sunset', from: '#f43f5e', to: '#fb923c', angle: 135 },
  { name: 'Backwaters Emerald', from: '#059669', to: '#0284c7', angle: 120 },
  { name: 'Royal Gold', from: '#d97706', to: '#b45309', angle: 90 },
  { name: 'Cyber Neon', from: '#8b5cf6', to: '#ec4899', angle: 145 },
  { name: 'Midnight Titanium', from: '#18181b', to: '#09090b', angle: 180 },
  { name: 'Kochi Harbour', from: '#0369a1', to: '#1e1b4b', angle: 135 },
  { name: 'Kasavu Cream & Red', from: '#fef3c7', to: '#b91c1c', angle: 45 },
  { name: 'Pure White Clean', from: '#f8fafc', to: '#e2e8f0', angle: 180 }
];

export const TextDesigner: React.FC<TextDesignerProps> = ({
  initialFont,
  onShowToast,
}) => {
  const [designerState, setDesignerState] = useState<TextDesignerState>({
    primaryText: initialFont?.language === 'malayalam' ? 'എന്റെ കേരളം' : 'FontHub Studio',
    secondaryText: initialFont?.language === 'malayalam' ? 'ദൈവത്തിന്റെ സ്വന്തം നാട്' : 'Modern Malayalam & English Typography',
    fontId: initialFont?.id || 'mal-base-1',
    fontSize: 48,
    secondaryFontSize: 20,
    letterSpacing: 1,
    lineHeight: 1.3,
    textColor: '#ffffff',
    secondaryTextColor: '#f4f4f5',
    textAlign: 'center',
    isBold: true,
    isItalic: false,
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.65)',
    shadowBlur: 14,
    backgroundType: 'gradient',
    backgroundColor: '#09090b',
    gradientFrom: '#f43f5e',
    gradientTo: '#fb923c',
    gradientAngle: 135,
    aspectRatio: '1:1',
    padding: 40,
    borderRadius: 24,
    showWatermark: true,
  });

  const [fontSearch, setFontSearch] = useState('');
  const [fontFilter, setFontFilter] = useState<'all' | 'malayalam' | 'english'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedFont = ALL_FONTS.find((f) => f.id === designerState.fontId) || ALL_FONTS[0];

  const filteredFonts = ALL_FONTS.filter((f) => {
    if (fontFilter !== 'all' && f.language !== fontFilter) return false;
    if (fontSearch.trim()) {
      return (
        f.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
        (f.nativeName && f.nativeName.includes(fontSearch)) ||
        f.category.toLowerCase().includes(fontSearch.toLowerCase())
      );
    }
    return true;
  }).slice(0, 100);

  // Aspect ratio classes for responsive display
  const getAspectClass = () => {
    switch (designerState.aspectRatio) {
      case '1:1':
        return 'aspect-square max-w-[460px]';
      case '9:16':
        return 'aspect-[9/16] max-w-[340px]';
      case '16:9':
        return 'aspect-[16/9] max-w-[540px]';
      case '4:5':
        return 'aspect-[4/5] max-w-[400px]';
      default:
        return 'aspect-square max-w-[460px]';
    }
  };

  // Export Design via Canvas
  const handleExport = async (format: 'png' | 'jpeg') => {
    setIsExporting(true);
    try {
      // Dimensions based on aspect ratio for crisp export
      let width = 1080;
      let height = 1080;
      if (designerState.aspectRatio === '9:16') {
        width = 1080;
        height = 1920;
      } else if (designerState.aspectRatio === '16:9') {
        width = 1920;
        height = 1080;
      } else if (designerState.aspectRatio === '4:5') {
        width = 1080;
        height = 1350;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      if (designerState.backgroundType === 'gradient') {
        // Linear gradient
        const rad = (designerState.gradientAngle * Math.PI) / 180;
        const x1 = width / 2 - (Math.cos(rad) * width) / 2;
        const y1 = height / 2 - (Math.sin(rad) * height) / 2;
        const x2 = width / 2 + (Math.cos(rad) * width) / 2;
        const y2 = height / 2 + (Math.sin(rad) * height) / 2;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, designerState.gradientFrom);
        grad.addColorStop(1, designerState.gradientTo);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = designerState.backgroundColor;
      }
      ctx.fillRect(0, 0, width, height);

      // Subtle border/frame vignette
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 20;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // Text rendering setup
      const scaleFactor = width / 460;
      const primaryFontSizeScaled = designerState.fontSize * scaleFactor;
      const secondaryFontSizeScaled = designerState.secondaryFontSize * scaleFactor;

      // Text Shadow
      if (designerState.textShadow) {
        ctx.shadowColor = designerState.shadowColor;
        ctx.shadowBlur = designerState.shadowBlur * scaleFactor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4 * scaleFactor;
      } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      // Compute X position
      let posX = width / 2;
      ctx.textAlign = 'center';
      if (designerState.textAlign === 'left') {
        posX = 80 * scaleFactor;
        ctx.textAlign = 'left';
      } else if (designerState.textAlign === 'right') {
        posX = width - 80 * scaleFactor;
        ctx.textAlign = 'right';
      }

      // Draw Primary Text
      const fontStyle = `${designerState.isItalic ? 'italic ' : ''}${
        designerState.isBold ? 'bold ' : 'normal '
      }${primaryFontSizeScaled}px ${selectedFont.cssFontFamily.split(',')[0].replace(/'/g, '')}, 'Noto Sans Malayalam', sans-serif`;

      ctx.font = fontStyle;
      ctx.fillStyle = designerState.textColor;

      // Center vertically with gap for secondary text
      const centerY = designerState.secondaryText
        ? height / 2 - 30 * scaleFactor
        : height / 2;

      ctx.fillText(designerState.primaryText, posX, centerY);

      // Draw Secondary Text
      if (designerState.secondaryText.trim()) {
        ctx.font = `500 ${secondaryFontSizeScaled}px 'Noto Sans Malayalam', system-ui, sans-serif`;
        ctx.fillStyle = designerState.secondaryTextColor;
        ctx.shadowBlur = (designerState.shadowBlur / 2) * scaleFactor;
        ctx.fillText(designerState.secondaryText, posX, centerY + primaryFontSizeScaled * 0.9);
      }

      // Watermark
      if (designerState.showWatermark) {
        ctx.font = `600 ${18 * scaleFactor}px system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'transparent';
        ctx.fillText('Created with FontHub Malayalam & English', width / 2, height - 50 * scaleFactor);
      }

      // Trigger download
      const dataUrl = canvas.toDataURL(`image/${format}`, 0.95);
      const link = document.createElement('a');
      link.download = `fonthub-design-${Date.now()}.${format === 'jpeg' ? 'jpg' : 'png'}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onShowToast(`Design successfully exported as ${format.toUpperCase()}!`);
    } catch (err) {
      console.error(err);
      onShowToast('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div id="text-designer-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-500" />
            <span>Text & Typography Designer</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Compose elegant Malayalam & English banners, quotes, or poster art, and export as high-res PNG or JPG.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="export-png-btn"
            disabled={isExporting}
            onClick={() => handleExport('png')}
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-rose-500/25 disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>Export PNG</span>
          </button>
          <button
            id="export-jpg-btn"
            disabled={isExporting}
            onClick={() => handleExport('jpeg')}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>Export JPG</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas, Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-8 min-h-[480px]">
          {/* Aspect Ratio Toolbar */}
          <div className="flex items-center gap-1.5 mb-4 bg-white dark:bg-zinc-900 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 px-2">
              Ratio:
            </span>
            {(['1:1', '4:5', '9:16', '16:9'] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setDesignerState({ ...designerState, aspectRatio: ratio })}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  designerState.aspectRatio === ratio
                    ? 'bg-rose-500 text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          {/* Canvas Card */}
          <div
            ref={previewRef}
            className={`w-full ${getAspectClass()} relative rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-center overflow-hidden transition-all duration-300 border border-white/20`}
            style={{
              background:
                designerState.backgroundType === 'gradient'
                  ? `linear-gradient(${designerState.gradientAngle}deg, ${designerState.gradientFrom}, ${designerState.gradientTo})`
                  : designerState.backgroundColor,
              textAlign: designerState.textAlign,
            }}
          >
            {/* Primary Text Layer */}
            <h2
              className="transition-all break-words leading-tight"
              style={{
                fontFamily: selectedFont.cssFontFamily,
                fontSize: `${designerState.fontSize}px`,
                color: designerState.textColor,
                letterSpacing: `${designerState.letterSpacing}px`,
                lineHeight: designerState.lineHeight,
                fontWeight: designerState.isBold ? 700 : 400,
                fontStyle: designerState.isItalic ? 'italic' : 'normal',
                textShadow: designerState.textShadow
                  ? `0 6px ${designerState.shadowBlur}px ${designerState.shadowColor}`
                  : 'none',
              }}
            >
              {designerState.primaryText || 'Type primary text'}
            </h2>

            {/* Secondary Text Layer */}
            {designerState.secondaryText && (
              <p
                className="mt-3 transition-all break-words opacity-90"
                style={{
                  fontSize: `${designerState.secondaryFontSize}px`,
                  color: designerState.secondaryTextColor,
                  textShadow: designerState.textShadow
                    ? `0 3px ${designerState.shadowBlur / 2}px ${designerState.shadowColor}`
                    : 'none',
                }}
              >
                {designerState.secondaryText}
              </p>
            )}

            {/* Subtle Watermark */}
            {designerState.showWatermark && (
              <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-white/40 tracking-wider uppercase font-sans font-medium pointer-events-none">
                FontHub Malayalam & English
              </div>
            )}
          </div>

          {/* Current Font Info Bar */}
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Font:</span>
            <strong className="text-zinc-900 dark:text-zinc-100">{selectedFont.name}</strong>
            {selectedFont.nativeName && (
              <span className="text-rose-500">({selectedFont.nativeName})</span>
            )}
            <span>• {selectedFont.category}</span>
          </div>
        </div>

        {/* Right Column: Controls & Styling Panels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Text Input Controls */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-rose-500" />
              <span>Text Layers & Content</span>
            </h3>

            {/* Primary Text */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Main Headline (Malayalam / English):
              </label>
              <input
                type="text"
                value={designerState.primaryText}
                onChange={(e) =>
                  setDesignerState({ ...designerState, primaryText: e.target.value })
                }
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                placeholder="e.g. എന്റെ കേരളം"
              />
            </div>

            {/* Secondary Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Subtitle / Tagline (Optional):
              </label>
              <input
                type="text"
                value={designerState.secondaryText}
                onChange={(e) =>
                  setDesignerState({ ...designerState, secondaryText: e.target.value })
                }
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                placeholder="e.g. ദൈവത്തിന്റെ സ്വന്തം നാട്"
              />
            </div>

            {/* Quick Malayalam Chips */}
            <div className="pt-1">
              <span className="text-[10px] text-zinc-600 dark:text-zinc-300 block mb-1">
                Quick Sample Phrases:
              </span>
              <div className="flex flex-wrap gap-1">
                {SAMPLE_TEXT_PRESETS.malayalam.slice(0, 4).map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setDesignerState({
                        ...designerState,
                        primaryText: phrase,
                      })
                    }
                    className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 hover:text-rose-500 hover:bg-rose-500/10"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Font Picker Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Choose Font</span>
              </h3>
              <span className="text-[10px] text-zinc-600 dark:text-zinc-300">
                {filteredFonts.length} matching
              </span>
            </div>

            {/* Language filter pills */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl">
              <button
                onClick={() => setFontFilter('all')}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  fontFilter === 'all'
                    ? 'bg-rose-500 text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                All (1000+)
              </button>
              <button
                onClick={() => setFontFilter('malayalam')}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  fontFilter === 'malayalam'
                    ? 'bg-rose-500 text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                🇮🇳 Malayalam
              </button>
              <button
                onClick={() => setFontFilter('english')}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  fontFilter === 'english'
                    ? 'bg-rose-500 text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                🔤 English
              </button>
            </div>

            {/* Font Search Filter */}
            <input
              type="text"
              placeholder="Search font by name..."
              value={fontSearch}
              onChange={(e) => setFontSearch(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-rose-500"
            />

            {/* Scrollable Font List */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
              {filteredFonts.map((font) => (
                <button
                  key={font.id}
                  onClick={() => setDesignerState({ ...designerState, fontId: font.id })}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between border transition-all ${
                    designerState.fontId === font.id
                      ? 'bg-rose-500/10 border-rose-500 text-rose-500 font-bold'
                      : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200/60 dark:border-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="truncate flex-1">
                    <span className="text-xs block truncate">{font.name}</span>
                    {font.nativeName && (
                      <span className="text-[10px] opacity-70 block">{font.nativeName}</span>
                    )}
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-zinc-200 dark:bg-zinc-800 ml-2">
                    {font.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Typography Formatting Controls */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-rose-500" />
              <span>Typography Styling</span>
            </h3>

            {/* Size Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                <span>Font Size</span>
                <span>{designerState.fontSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="96"
                value={designerState.fontSize}
                onChange={(e) =>
                  setDesignerState({ ...designerState, fontSize: Number(e.target.value) })
                }
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Alignment & Style Buttons */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {/* Alignment */}
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl">
                <button
                  onClick={() => setDesignerState({ ...designerState, textAlign: 'left' })}
                  className={`p-1.5 rounded-lg ${
                    designerState.textAlign === 'left'
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDesignerState({ ...designerState, textAlign: 'center' })}
                  className={`p-1.5 rounded-lg ${
                    designerState.textAlign === 'center'
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDesignerState({ ...designerState, textAlign: 'right' })}
                  className={`p-1.5 rounded-lg ${
                    designerState.textAlign === 'right'
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bold & Italic */}
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl">
                <button
                  onClick={() =>
                    setDesignerState({ ...designerState, isBold: !designerState.isBold })
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    designerState.isBold
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  B
                </button>
                <button
                  onClick={() =>
                    setDesignerState({ ...designerState, isItalic: !designerState.isItalic })
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-serif italic transition-all ${
                    designerState.isItalic
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  I
                </button>
                <button
                  onClick={() =>
                    setDesignerState({ ...designerState, textShadow: !designerState.textShadow })
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    designerState.textShadow
                      ? 'bg-rose-500 text-white'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  Shadow
                </button>
              </div>

              {/* Text Color */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Color:</span>
                <input
                  type="color"
                  value={designerState.textColor}
                  onChange={(e) =>
                    setDesignerState({ ...designerState, textColor: e.target.value })
                  }
                  className="w-7 h-7 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-700 p-0.5 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Background Gradients & Presets */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
              <span>Background Gradients</span>
            </h3>

            <div className="grid grid-cols-4 gap-2">
              {GRADIENT_PRESETS.map((g, i) => (
                <button
                  key={i}
                  title={g.name}
                  onClick={() =>
                    setDesignerState({
                      ...designerState,
                      backgroundType: 'gradient',
                      gradientFrom: g.from,
                      gradientTo: g.to,
                      gradientAngle: g.angle,
                    })
                  }
                  className="aspect-video rounded-xl border border-white/20 hover:scale-105 transition-transform flex items-end p-1 shadow-xs"
                  style={{
                    background: `linear-gradient(${g.angle}deg, ${g.from}, ${g.to})`,
                  }}
                >
                  <span className="text-[9px] text-white font-medium drop-shadow-md truncate">
                    {g.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
