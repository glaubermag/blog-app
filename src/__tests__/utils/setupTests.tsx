import '@testing-library/jest-dom';
import { expect, afterEach, vi, describe, it } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpa o DOM após cada teste
afterEach(() => {
  cleanup();
});

// Adiciona as globais do Vitest
(window as any).expect = expect;
(window as any).vi = vi;
(window as any).describe = describe;
(window as any).it = it;

// Mock do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// Mock do @tanstack/react-query
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    // Mock genérico - testes específicos devem sobrescrever conforme necessário
    useQuery: vi.fn().mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      error: null,
    })),
    useQueryClient: vi.fn().mockImplementation(() => ({
      invalidateQueries: vi.fn(),
    })),
  };
}); 