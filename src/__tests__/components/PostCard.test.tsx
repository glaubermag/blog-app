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
    
    // Verifica o elemento raiz
    const article = screen.getByTestId('post-card');
    expect(article).toBeInTheDocument();
    
    // Verifica o título
    const titleLink = screen.getByRole('link', { name: mockPost.title });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', `/posts/${mockPost.id}`);
    
    // Verifica o corpo do post
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    
    // Verifica informações do autor
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
    const authorLink = screen.getByRole('link', { name: mockUser.name });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', `/author/${mockUser.id}`);
  });

  it('deve renderizar apenas informações do post se autor não for fornecido', () => {
    render(<PostCard post={mockPost} />);
    
    // Verifica o elemento raiz
    const article = screen.getByTestId('post-card');
    expect(article).toBeInTheDocument();
    
    // Verifica o título e corpo
    expect(screen.getByRole('link', { name: mockPost.title })).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    
    // Verifica que informações do autor não estão presentes
    expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUser.company.name)).not.toBeInTheDocument();
  });

  it('renderiza corretamente no modo claro', () => {
    renderWithTheme(<PostCard post={mockPost} author={mockUser} />);
    
    const article = screen.getByTestId('post-card');
    expect(article).toHaveClass('bg-white');
    
    const title = screen.getByRole('heading', { name: mockPost.title });
    expect(title).toHaveClass('text-gray-800');
  });

  it('renderiza corretamente no modo escuro', () => {
    renderWithTheme(<PostCard post={mockPost} author={mockUser} />);
    
    const article = screen.getByTestId('post-card');
    expect(article).toHaveClass('dark:bg-gray-800');
    
    const title = screen.getByRole('heading', { name: mockPost.title });
    expect(title).toHaveClass('dark:text-white');
  });

  it('deve renderizar o botão "Ler mais" e avatar quando autor está presente', () => {
    render(<PostCard post={mockPost} author={mockUser} />);
    
    // Verifica o botão "Ler mais"
    const readMoreButton = screen.getByRole('link', { name: 'Ler mais' });
    expect(readMoreButton).toBeInTheDocument();
    expect(readMoreButton).toHaveAttribute('href', `/posts/${mockPost.id}`);
    
    // Verifica o avatar
    const avatarLetter = screen.getByText(mockUser.name.charAt(0));
    expect(avatarLetter).toBeInTheDocument();
  });
}); 