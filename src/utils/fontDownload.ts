import { FontItem } from '../types';

/**
 * Downloads font package containing CSS snippet, license, and HTML specimen.
 */
export function downloadFontPackage(font: FontItem) {
  const readmeContent = `=====================================================
FontHub Typography Studio - Specimen & License Package
=====================================================

Font Name: ${font.name}
Native Name: ${font.nativeName || 'N/A'}
Language: ${font.language.toUpperCase()}
Category: ${font.category}
Style: ${font.style}
Author / Foundry: ${font.author}
License: ${font.license}
Attribution: Licensed under ${font.license}. Free for personal and commercial usage in accordance with open font terms.

CSS Integration:
----------------
font-family: ${font.cssFontFamily};

HTML Specimen:
--------------
<div style="font-family: ${font.cssFontFamily}; font-size: 32px;">
  ${font.language === 'malayalam' ? 'എന്റെ കേരളം എത്ര സുന്ദരം' : 'The quick brown fox jumps over the lazy dog'}
</div>

Thank you for choosing FontHub Malayalam & English!
Visit: FontHub Studio
`;

  const htmlSpecimen = `<!DOCTYPE html>
<html lang="${font.language === 'malayalam' ? 'ml' : 'en'}">
<head>
  <meta charset="UTF-8">
  <title>${font.name} - FontHub Specimen</title>
  <style>
    body {
      background: #09090b;
      color: #f4f4f5;
      font-family: system-ui, sans-serif;
      padding: 40px;
      margin: 0;
    }
    .specimen-card {
      max-width: 800px;
      margin: 0 auto;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      color: #f43f5e;
      margin-bottom: 8px;
    }
    .meta {
      color: #a1a1aa;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .preview-box {
      font-family: ${font.cssFontFamily};
      font-size: 42px;
      line-height: 1.5;
      padding: 24px;
      background: #09090b;
      border-radius: 12px;
      border: 1px dashed #3f3f46;
      margin-bottom: 24px;
    }
    .license {
      background: #27272a;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      color: #d4d4d8;
    }
  </style>
</head>
<body>
  <div class="specimen-card">
    <div class="title">${font.name} ${font.nativeName ? `(${font.nativeName})` : ''}</div>
    <div class="meta">Category: ${font.category} • Style: ${font.style} • Author: ${font.author}</div>
    <div class="preview-box">
      ${font.language === 'malayalam' ? 'എന്റെ കേരളം എത്ര സുന്ദരം • മലയാളം ലിപി ഭംഗി' : 'FontHub Typography Studio • Quick Brown Fox 2026'}
    </div>
    <div class="license">
      <strong>License:</strong> ${font.license}<br>
      Attribution: Distributed via FontHub under open license terms.
    </div>
  </div>
</body>
</html>`;

  // Trigger download of the HTML specimen & web kit package
  const blob = new Blob([htmlSpecimen], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${font.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-specimen.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copies text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy', err);
    return false;
  }
}
