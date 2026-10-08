export type LanguageType = 'all' | 'malayalam' | 'english';

export type CategoryType = 
  | 'All'
  | 'Malayalam'
  | 'English'
  | 'Calligraphy'
  | 'Handwriting'
  | 'Bold'
  | 'Stylish'
  | 'Poster'
  | 'Logo'
  | 'Wedding'
  | 'Gaming'
  | 'Vintage'
  | 'Modern';

export interface FontItem {
  id: string;
  name: string;
  nativeName?: string; // e.g., 'മഞ്ജരി' for Manjari
  language: 'malayalam' | 'english';
  category: CategoryType;
  style: string; // 'Regular' | 'Bold' | 'Medium' | 'Display' | 'Script' | 'Black' | 'Light' | 'Calligraphic'
  cssFontFamily: string;
  webFontFamily?: string;
  author: string;
  license: string; // 'SIL Open Font License 1.1' | 'Apache 2.0' | 'GPL v3 Font Exception'
  licenseUrl?: string;
  downloads: number;
  rating: number;
  popular?: boolean;
  isNew?: boolean;
  tags: string[];
  weights: number[];
  sampleTextMalayalam: string;
  sampleTextEnglish: string;
}

export interface TextDesignerState {
  primaryText: string;
  secondaryText: string;
  fontId: string;
  fontSize: number;
  secondaryFontSize: number;
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  secondaryTextColor: string;
  textAlign: 'left' | 'center' | 'right';
  isBold: boolean;
  isItalic: boolean;
  textShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  backgroundType: 'gradient' | 'solid' | 'dark' | 'glass';
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5';
  padding: number;
  borderRadius: number;
  showWatermark: boolean;
}
