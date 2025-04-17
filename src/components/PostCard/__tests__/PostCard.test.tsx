import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PostCard from '../PostCard';
import { Post, User } from '../../../types';

expect.extend(toHaveNoViolations);

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post body',
  userId: 1
};

const mockAuthor: User = {
  id: 1,
  name: 'Test Author',
  email: 'test@example.com',
  username: 'testauthor',
  address: {
    street: 'Test Street',
    suite: 'Test Suite',
    city: 'Test City',
    zipcode: '12345',
    geo: {
      lat: '0',
      lng: '0'
    }
  },
  phone: '1234567890',
  website: 'https://test.com',
  company: {
    name: 'Test Company',
    catchPhrase: 'Test Catch Phrase',
    bs: 'Test BS'
  }
};

describe('PostCard Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <PostCard post={mockPost} author={mockAuthor} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', () => {
    render(<PostCard post={mockPost} author={mockAuthor} />);

    // Verifica se o card é focável
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('tabIndex', '0');

    // Verifica se os links são focáveis
    const authorLink = screen.getByRole('link', { name: /test author/i });
    const readMoreLink = screen.getByRole('link', { name: /ler mais/i });
    
    expect(authorLink).toHaveAttribute('tabIndex', '0');
    expect(readMoreLink).toHaveAttribute('tabIndex', '0');
  });

  it('should announce state changes to screen readers', () => {
    render(<PostCard post={mockPost} author={mockAuthor} />);

    // Verifica se o título tem o papel correto
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Test Post');

    // Verifica se o conteúdo tem o papel correto
    const content = screen.getByText('This is a test post body');
    expect(content).toBeInTheDocument();
  });

  it('should maintain proper focus management', () => {
    render(<PostCard post={mockPost} author={mockAuthor} />);

    const card = screen.getByRole('article');
    const authorLink = screen.getByRole('link', { name: /test author/i });
    const readMoreLink = screen.getByRole('link', { name: /ler mais/i });

    // Simula navegação por teclado
    fireEvent.keyDown(card, { key: 'Tab' });
    expect(authorLink).toHaveFocus();

    fireEvent.keyDown(authorLink, { key: 'Tab' });
    expect(readMoreLink).toHaveFocus();
  });

  it('should have proper ARIA labels', () => {
    render(<PostCard post={mockPost} author={mockAuthor} />);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'Post: Test Post');

    const authorLink = screen.getByRole('link', { name: /test author/i });
    expect(authorLink).toHaveAttribute('aria-label', 'Ver posts do autor Test Author');

    const readMoreLink = screen.getByRole('link', { name: /ler mais/i });
    expect(readMoreLink).toHaveAttribute('aria-label', 'Ler mais sobre o post Test Post');
  });

  it('should handle loading state accessibly', () => {
    render(<PostCard post={null} author={null} isLoading={true} />);

    const loadingCard = screen.getByRole('article');
    expect(loadingCard).toHaveAttribute('aria-busy', 'true');
    expect(loadingCard).toHaveAttribute('aria-label', 'Carregando post...');
  });

  it('should handle error state accessibly', () => {
    const errorMessage = 'Erro ao carregar o post';
    render(<PostCard post={null} author={null} error={errorMessage} />);

    const errorCard = screen.getByRole('alert');
    expect(errorCard).toHaveTextContent(errorMessage);
    expect(errorCard).toHaveAttribute('aria-live', 'assertive');
  });
}); 