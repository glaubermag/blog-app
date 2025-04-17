import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AuthorPostsPage from '../../pages/AuthorPostsPage';
import { mockUser, mockPosts } from '../utils/mocks';
import '@testing-library/jest-dom';

// Mock do useQuery
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn()
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AuthorPostsPage', () => {
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

    renderWithRouter(<AuthorPostsPage />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('exibe mensagem de erro quando falha ao carregar dados do autor', () => {
    (useQuery as any)
      .mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        error: new Error('Erro ao carregar autor')
      })
      .mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        error: null
      });

    renderWithRouter(<AuthorPostsPage />);
    expect(screen.getByText('Ocorreu um erro ao carregar os dados do autor.')).toBeInTheDocument();
  });

  it('deve renderizar detalhes do autor e seus posts corretamente', async () => {
    (useQuery as any)
      .mockReturnValueOnce({
        data: mockUser,
        isLoading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: mockPosts,
        isLoading: false,
        error: null
      });

    renderWithRouter(<AuthorPostsPage />);

    // Verifica informações do autor
    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
      expect(screen.getByText(mockPosts.length.toString())).toBeInTheDocument();
    });

    // Verifica posts do autor
    await waitFor(() => {
      mockPosts.forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
      });
    });
  });

  it('exibe corretamente quando autor não tem posts', async () => {
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

    renderWithRouter(<AuthorPostsPage />);
    
    await waitFor(() => {
      // Verifica informações do autor
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
      
      // Verifica contador de posts zerado
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
}); 