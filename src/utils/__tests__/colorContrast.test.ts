import { describe, it, expect } from 'vitest';
import { getContrastRatio, meetsContrastRequirements, generateContrastingColor } from '../colorContrast';

describe('colorContrast', () => {
  describe('getContrastRatio', () => {
    it('deve calcular corretamente o contraste entre preto e branco', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBeCloseTo(21, 1);
    });

    it('deve calcular corretamente o contraste entre cores similares', () => {
      const ratio = getContrastRatio('#CCCCCC', '#DDDDDD');
      expect(ratio).toBeCloseTo(1.1, 1);
    });

    it('deve lançar erro para formato hexadecimal inválido', () => {
      expect(() => getContrastRatio('invalid', '#FFFFFF')).toThrow('Formato hexadecimal inválido');
    });
  });

  describe('meetsContrastRequirements', () => {
    it('deve retornar true para contraste AA com texto normal', () => {
      const meets = meetsContrastRequirements('#000000', '#FFFFFF', 'AA', 'normal');
      expect(meets).toBe(true);
    });

    it('deve retornar false para contraste insuficiente', () => {
      const meets = meetsContrastRequirements('#CCCCCC', '#DDDDDD', 'AA', 'normal');
      expect(meets).toBe(false);
    });

    it('deve considerar texto grande com requisitos mais flexíveis', () => {
      const meets = meetsContrastRequirements('#666666', '#FFFFFF', 'AA', 'large');
      expect(meets).toBe(true);
    });

    it('deve aplicar requisitos mais rigorosos para nível AAA', () => {
      const meets = meetsContrastRequirements('#666666', '#FFFFFF', 'AAA', 'normal');
      expect(meets).toBe(false);
    });
  });

  describe('generateContrastingColor', () => {
    it('deve gerar cor com contraste adequado para fundo escuro', () => {
      const color = generateContrastingColor('#000000', 'AA', 'normal');
      const ratio = getContrastRatio('#000000', color);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('deve gerar cor com contraste adequado para fundo claro', () => {
      const color = generateContrastingColor('#FFFFFF', 'AA', 'normal');
      const ratio = getContrastRatio('#FFFFFF', color);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('deve gerar cor com contraste mais alto para nível AAA', () => {
      const color = generateContrastingColor('#000000', 'AAA', 'normal');
      const ratio = getContrastRatio('#000000', color);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('deve gerar cor com contraste mais flexível para texto grande', () => {
      const color = generateContrastingColor('#000000', 'AA', 'large');
      const ratio = getContrastRatio('#000000', color);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });
  });
}); 