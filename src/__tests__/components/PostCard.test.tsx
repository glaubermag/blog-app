import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostCard from '../../components/PostCard';
import { mockPost, mockUser } from '../utils/mocks';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock do react-router-dom Link
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('PostCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar informações do post e autor corretamente', () => {
    render(<PostCard post={mockPost} author={mockUser} />);
    
    expect(screen.getByRole('link', { name: mockPost.title })).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
    const authorLink = screen.getByRole('link', { name: mockUser.name });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', `/author/${mockUser.id}`);
  });

  it('deve renderizar apenas informações do post se autor não for fornecido', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByRole('link', { name: mockPost.title })).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    
    expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUser.company.name)).not.toBeInTheDocument();
  });

  it('renderiza corretamente no modo claro', () => {
    renderWithTheme(<PostCard post={mockPost} author={mockUser} />);
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('bg-white');
  });

  it('renderiza corretamente no modo escuro', () => {
    renderWithTheme(<PostCard post={mockPost} author={mockUser} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('dark:bg-gray-800');
  });
}); 