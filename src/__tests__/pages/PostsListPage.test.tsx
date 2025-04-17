import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PostsListPage from '../../pages/PostsListPage';
import { mockPosts, mockUser } from '../utils/mocks';
import '@testing-library/jest-dom';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn().mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null
  })
}));

describe('PostsListPage', () => {
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

    render(
      <MemoryRouter>
        <PostsListPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando falha ao carregar posts', () => {
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

    render(
      <MemoryRouter>
        <PostsListPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Erro ao carregar os posts. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
  });

  it('deve renderizar lista de posts corretamente', async () => {
    (useQuery as any)
      .mockReturnValueOnce({
        data: { data: mockPosts },
        isLoading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: [mockUser],
        isLoading: false,
        error: null
      });

    render(
      <MemoryRouter>
        <PostsListPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockPosts.forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
      });
    });
  });
}); 