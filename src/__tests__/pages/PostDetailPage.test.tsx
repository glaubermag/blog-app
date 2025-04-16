import { render, screen, waitFor } from '@testing-library/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetailPage from '../../pages/PostDetailPage';
import { mockPost, mockUser, mockComments } from '../utils/mocks';
import '@testing-library/jest-dom';

// Mock de react-router-dom é removido daqui, pois usamos MemoryRouter
// Apenas mockamos o useQuery
vi.mock('@tanstack/react-query');

// Helper para renderizar com router
const renderWithRouter = (ui: React.ReactElement, { route = '/', path = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('PostDetailPage', () => {
  const postId = '1'; // ID usado nos testes

  beforeEach(() => {
    vi.clearAllMocks();
    (useMutation as any).mockImplementation(() => ({
      mutate: vi.fn(),
      isPending: false,
    }));
  });

  it('deve mostrar loading spinner enquanto carrega', () => {
    (useQuery as any).mockImplementation(({ queryKey }: { queryKey: (string | number)[] }) => {
      if (queryKey[0] === 'post') {
        return { isLoading: true, data: undefined, error: null };
      }
      return { isLoading: false, data: undefined, error: null };
    });
    renderWithRouter(<PostDetailPage />, { route: `/posts/${postId}`, path: '/posts/:id' });
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando falha ao carregar post', () => {
    (useQuery as any).mockImplementation(({ queryKey }: { queryKey: (string | number)[] }) => {
      if (queryKey[0] === 'post') {
        return { isLoading: false, data: undefined, error: new Error('Erro ao carregar post') };
      }
      return { isLoading: false, data: undefined, error: null };
    });
    renderWithRouter(<PostDetailPage />, { route: `/posts/${postId}`, path: '/posts/:id' });
    expect(screen.getByText('Erro ao carregar o post. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando falha ao carregar autor', () => {
    (useQuery as any).mockImplementation(({ queryKey }: { queryKey: (string | number)[] }) => {
      if (queryKey[0] === 'post') {
        return { isLoading: false, data: mockPost, error: null };
      }
      if (queryKey[0] === 'author') {
        return { isLoading: false, data: undefined, error: new Error('Erro ao carregar autor') };
      }
      return { isLoading: false, data: undefined, error: null };
    });

    renderWithRouter(<PostDetailPage />, { route: `/posts/${postId}`, path: '/posts/:id' });
    expect(screen.getByText('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando falha ao carregar comentários', () => {
    (useQuery as any).mockImplementation(({ queryKey }: { queryKey: (string | number)[] }) => {
      if (queryKey[0] === 'post') {
        return { isLoading: false, data: mockPost, error: null };
      }
      if (queryKey[0] === 'author') {
        return { isLoading: false, data: mockUser, error: null };
      }
      if (queryKey[0] === 'comments') {
        return { isLoading: false, data: undefined, error: new Error('Erro ao carregar comentários') };
      }
      return { isLoading: false, data: undefined, error: null };
    });

    renderWithRouter(<PostDetailPage />, { route: `/posts/${postId}`, path: '/posts/:id' });
    expect(screen.getByText('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
  });

  it('deve renderizar post, autor e comentários corretamente', async () => {
    (useQuery as any).mockImplementation(({ queryKey }: { queryKey: (string | number)[] }) => {
      if (queryKey[0] === 'post') {
        return { isLoading: false, data: mockPost, error: null };
      }
      if (queryKey[0] === 'author') {
        return { isLoading: false, data: mockUser, error: null };
      }
      if (queryKey[0] === 'comments') {
        return { isLoading: false, data: mockComments, error: null };
      }
      return { isLoading: false, data: undefined, error: null };
    });

    renderWithRouter(<PostDetailPage />, { route: `/posts/${postId}`, path: '/posts/:id' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockPost.title })).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Por: ${mockUser.name}`)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Comentários (${mockComments.length})`)).toBeInTheDocument();
      mockComments.forEach(comment => {
        expect(screen.getByText(comment.body)).toBeInTheDocument();
      });
    });
  });
}); 