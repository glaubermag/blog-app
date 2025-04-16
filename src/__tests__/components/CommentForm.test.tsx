import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CommentForm from '../../components/CommentForm';
import { Comment } from '../../types';

// Tipo para o estado do formulário de comentário
type CommentFormData = Omit<Comment, 'id' | 'postId'>;

const defaultProps = {
  comment: {
    name: '',
    email: '',
    body: '',
    postId: 1
  } as Comment,
  onChange: vi.fn(),
  onSubmit: vi.fn(),
  isLoading: false,
  postId: 1
};

describe('CommentForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar campos do formulário', () => {
    render(<CommentForm {...defaultProps} />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comentário/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('deve chamar onChange ao digitar nos campos', () => {
    const handleChange = vi.fn();
    render(<CommentForm {...defaultProps} onChange={handleChange} />);

    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const bodyInput = screen.getByLabelText(/comentário/i);

    fireEvent.change(nameInput, { target: { value: 'Teste' } });
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(bodyInput, { target: { value: 'Teste de comentário' } });

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it('deve chamar onSubmit ao enviar o formulário com dados válidos', async () => {
    const handleSubmit = vi.fn();
    const currentComment = {
      name: 'Teste',
      email: 'teste@teste.com',
      body: 'Teste de comentário',
      postId: 1
    };

    render(
      <CommentForm
        {...defaultProps}
        comment={currentComment}
        onSubmit={handleSubmit}
      />
    );

    const form = screen.getByTestId('comment-form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(currentComment);
  });

  it('deve mostrar loading no botão quando isLoading for true', () => {
    render(<CommentForm {...defaultProps} isLoading={true} />);
    expect(screen.getByRole('button', { name: 'Enviando...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviando...' })).toBeDisabled();
  });

  it('deve renderizar campos do formulário com postId', () => {
    render(<CommentForm {...defaultProps} postId={1} />);
    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
  });
}); 