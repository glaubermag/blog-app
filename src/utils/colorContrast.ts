/**
 * Utilitário para verificação de contraste de cores seguindo as diretrizes WCAG 2.1
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converte uma cor hexadecimal para RGB
 */
const hexToRgb = (hex: string): RGB => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Formato hexadecimal inválido');
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
};

/**
 * Converte uma cor para valores RGB
 */
const parseColor = (color: string): number[] => {
  // Tenta converter de RGB
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10)
    ];
  }

  // Tenta converter de hexadecimal
  const hex = color.replace('#', '');
  if (hex.length === 6) {
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16)
    ];
  }

  // Retorna preto como fallback
  return [0, 0, 0];
};

/**
 * Calcula o brilho relativo de uma cor
 */
const getRelativeLuminance = (rgb: RGB): number => {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calcula a luminância relativa de uma cor
 */
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calcula a razão de contraste entre duas cores
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  try {
    const [r1, g1, b1] = parseColor(color1);
    const [r2, g2, b2] = parseColor(color2);

    const l1 = getLuminance(r1, g1, b1);
    const l2 = getLuminance(r2, g2, b2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  } catch (error) {
    console.error('Erro ao calcular contraste:', error);
    return 0;
  }
};

/**
 * Verifica se o contraste atende aos requisitos WCAG
 */
export const meetsContrastRequirements = (
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  
  if (level === 'AA') {
    return size === 'normal' ? ratio >= 4.5 : ratio >= 3;
  } else {
    return size === 'normal' ? ratio >= 7 : ratio >= 4.5;
  }
};

/**
 * Gera uma cor com contraste adequado para um fundo dado
 */
export const generateContrastingColor = (
  backgroundColor: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): string => {
  const bgRgb = hexToRgb(backgroundColor);
  const targetLuminance = size === 'normal' 
    ? (level === 'AA' ? 0.2 : 0.1)
    : (level === 'AA' ? 0.3 : 0.2);
  
  // Tenta gerar uma cor com luminância oposta
  const textRgb: RGB = {
    r: bgRgb.r > 128 ? 0 : 255,
    g: bgRgb.g > 128 ? 0 : 255,
    b: bgRgb.b > 128 ? 0 : 255
  };
  
  // Ajusta a luminância até atingir o contraste desejado
  let currentLuminance = getRelativeLuminance(textRgb);
  while (currentLuminance > targetLuminance) {
    textRgb.r = Math.max(0, textRgb.r - 10);
    textRgb.g = Math.max(0, textRgb.g - 10);
    textRgb.b = Math.max(0, textRgb.b - 10);
    currentLuminance = getRelativeLuminance(textRgb);
  }
  
  return `#${textRgb.r.toString(16).padStart(2, '0')}${textRgb.g.toString(16).padStart(2, '0')}${textRgb.b.toString(16).padStart(2, '0')}`;
}; 