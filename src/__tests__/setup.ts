import '@testing-library/jest-dom';
import { configureAxe } from 'jest-axe';

export const axe = configureAxe({
  rules: {
    // Desabilitar regras específicas se necessário
    'color-contrast': { enabled: false },
  },
}); 