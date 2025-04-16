import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CommentList from '../../components/CommentList';
import { mockComments } from '../utils/mocks';
import '@testing-library/jest-dom';

describe('CommentList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar lista de comentários corretamente', () => {
    render(<CommentList comments={mockComments} />);
    
    expect(screen.getByText(mockComments[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockComments[0].body)).toBeInTheDocument();
    expect(screen.getByText(mockComments[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockComments[1].body)).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não há comentários', () => {
    render(<CommentList comments={[]} />);
    
    expect(screen.getByText('Nenhum comentário ainda. Seja o primeiro a comentar!')).toBeInTheDocument();
  });

  it('deve mostrar email do autor do comentário', () => {
    render(<CommentList comments={mockComments} />);
    
    expect(screen.getByText(mockComments[0].email)).toBeInTheDocument();
    expect(screen.getByText(mockComments[1].email)).toBeInTheDocument();
  });
}); 