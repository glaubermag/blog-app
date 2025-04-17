import { describe, it, vi, beforeEach, expect, vi as vitest } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { axe, toHaveNoViolations } from 'jest-axe';
import PostsListPage from '../../pages/PostsListPage';
import { User } from '../../types'; // Importar User se ainda não estiver

const { mockPosts, mockUsers } = vitest.hoisted(() => {
  return {
    mockPosts: [
      {
        id: 1,
        title: 'Test Post Hoisted',
        body: 'Test content hoisted',
        userId: 1,
      },
    ],
    mockUsers: [
      {
        id: 1,
        name: 'Test User Hoisted',
        company: { name: 'Test Company Hoisted' },
        address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
        phone: '',
        website: '',
        username: '',
        email: '',
      },
    ]
  };
});

vi.mock('../../services/api', () => ({
  getPosts: vi.fn().mockImplementation(async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockPosts;
  }),
  getUsers: vi.fn().mockImplementation(async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockUsers;
  }),
}));

expect.extend(toHaveNoViolations);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

describe('PostsListPage Accessibility', () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('should not have any accessibility violations after loading', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PostsListPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByRole('article')).resolves.toBeInTheDocument();
    });

    const postCardElement = await screen.findByRole('article');

    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('should have proper heading hierarchy', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PostsListPage />
      </QueryClientProvider>
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Posts Recentes');
  });

  it('should have proper ARIA labels for interactive elements', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PostsListPage />
      </QueryClientProvider>
    );
    const searchInput = await screen.findByLabelText('Buscar posts');
    expect(searchInput).toBeInTheDocument();
  });
});