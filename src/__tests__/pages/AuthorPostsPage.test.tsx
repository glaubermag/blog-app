import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthorPostsPage from '../../pages/AuthorPostsPage';
import { mockUser, mockPosts } from '../utils/mocks';
import '@testing-library/jest-dom';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn().mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null
  })
}));

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

describe('AuthorPostsPage', () => {
  const authorId = '1'; // ID usado nos testes

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve mostrar loading spinner enquanto carrega', () => {
    (useQuery as any)
      .mockReturnValueOnce({
        data: undefined,
        isLoading: true,
        error: null
      })
      .mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        error: null
      });

    renderWithRouter(<AuthorPostsPage />, { route: `/author/${authorId}`, path: '/author/:id' });
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando falha ao carregar', () => {
    (useQuery as any)
      .mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        error: new Error('Erro ao carregar')
      })
      .mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        error: null
      });

    renderWithRouter(<AuthorPostsPage />, { route: `/author/${authorId}`, path: '/author/:id' });
    expect(screen.getByText('Ocorreu um erro ao carregar os dados do autor.')).toBeInTheDocument();
  });

  it('deve renderizar detalhes do autor e seus posts corretamente', async () => {
    const authorPosts = mockPosts.filter(p => p.userId === parseInt(authorId));
    
    (useQuery as any)
      .mockReturnValueOnce({
        data: mockUser,
        isLoading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: authorPosts,
        isLoading: false,
        error: null
      });

    renderWithRouter(<AuthorPostsPage />, { route: `/author/${authorId}`, path: '/author/:id' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: mockUser.name })).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getAllByText(mockUser.company.name)[0]).toBeInTheDocument();
    });

    await waitFor(() => {
      authorPosts.forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });
  });

  it('deve mostrar mensagem quando autor não tem posts', async () => {
    (useQuery as any)
      .mockReturnValueOnce({
        data: mockUser,
        isLoading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: null
      });

    renderWithRouter(<AuthorPostsPage />, { route: `/author/${authorId}`, path: '/author/:id' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: mockUser.name })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Este autor ainda não possui posts publicados.')).toBeInTheDocument();
    });
  });
}); 