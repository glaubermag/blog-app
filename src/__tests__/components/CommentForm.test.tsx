import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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
  const mockComment = {
    name: '',
    email: '',
    body: '',
  };

  const mockOnChange = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza corretamente', () => {
    render(
      <CommentForm
        comment={mockComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comentário/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar comentário/i })).toBeInTheDocument();
  });

  it('mostra estado de carregamento', () => {
    render(
      <CommentForm
        comment={mockComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={true}
      />
    );

    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled();
  });

  it('valida nome com menos de 3 caracteres', async () => {
    render(
      <CommentForm
        comment={mockComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const nameInput = screen.getByLabelText(/nome/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'ab' } });
    });

    await waitFor(() => {
      expect(screen.getByText(/o nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    });
  });

  it('valida email inválido', async () => {
    render(
      <CommentForm
        comment={mockComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const emailInput = screen.getByLabelText(/email/i);
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    });

    await waitFor(() => {
      expect(screen.getByText(/por favor, insira um email válido/i)).toBeInTheDocument();
    });
  });

  it('valida comentário com menos de 10 caracteres', async () => {
    render(
      <CommentForm
        comment={mockComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const bodyInput = screen.getByLabelText(/comentário/i);
    await act(async () => {
      fireEvent.change(bodyInput, { target: { value: 'curto' } });
    });

    await waitFor(() => {
      expect(screen.getByText(/o comentário deve ter pelo menos 10 caracteres/i)).toBeInTheDocument();
    });
  });

  it('mostra preview do comentário', async () => {
    const comment = {
      name: 'João Silva',
      email: 'joao@exemplo.com',
      body: 'Este é um comentário de teste.'
    };

    render(
      <CommentForm
        comment={comment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Mostrar preview'));
    });

    expect(screen.getByText(/preview do comentário/i)).toBeInTheDocument();
    expect(screen.getByText(comment.body, { selector: 'p.text-gray-600' })).toBeInTheDocument();
    expect(screen.getByText(`— ${comment.name}`)).toBeInTheDocument();
  });

  it('não envia formulário com erros de validação', async () => {
    render(
      <CommentForm
        comment={mockComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: /enviar comentário/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('envia formulário válido', async () => {
    const validComment = {
      name: 'João Silva',
      email: 'joao@exemplo.com',
      body: 'Este é um comentário válido com mais de 10 caracteres.'
    };

    render(
      <CommentForm
        comment={validComment}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: /enviar comentário/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(validComment);
  });

  it('suporta modo escuro', () => {
    render(<CommentForm {...defaultProps} />);
    const labels = [
      screen.getByLabelText('Nome').previousElementSibling,
      screen.getByLabelText('Email').previousElementSibling,
      screen.getByLabelText('Comentário').previousElementSibling
    ];
    labels.forEach(label => {
      expect(label).toHaveClass('block text-sm font-medium text-gray-700 dark:text-gray-300');
    });
  });
}); 