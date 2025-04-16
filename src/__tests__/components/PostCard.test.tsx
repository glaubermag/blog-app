import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostCard from '../../components/PostCard';
import { mockPost, mockUser } from '../utils/mocks';
import '@testing-library/jest-dom';

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

describe('PostCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar informações do post e autor corretamente', () => {
    // Passa o mockUser como author
    render(<PostCard post={mockPost} author={mockUser} />); 
    
    // Verifica post
    expect(screen.getByRole('link', { name: mockPost.title })).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    
    // Verifica autor
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
    // Verifica link do autor
    const authorLink = screen.getByRole('link', { name: mockUser.name });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', `/author/${mockUser.id}`);
  });

  it('deve renderizar apenas informações do post se autor não for fornecido', () => {
    render(<PostCard post={mockPost} />); // Não passa author
    
    expect(screen.getByRole('link', { name: mockPost.title })).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    
    // Garante que informações do autor não estão presentes
    expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUser.company.name)).not.toBeInTheDocument();
  });

  // O teste 'deve mostrar link para posts do autor' foi incorporado no primeiro teste
}); 