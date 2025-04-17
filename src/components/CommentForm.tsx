// src/components/CommentForm.tsx
import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

interface Comment {
  name: string;
  email: string;
  body: string;
  postId?: number;
}

interface CommentFormProps {
  comment: Comment;
  onChange: (comment: Comment) => void;
  onSubmit: (comment: Comment) => void;
  isLoading: boolean;
  postId?: number;
}

const CommentForm: React.FC<CommentFormProps> = ({
  comment,
  onChange,
  onSubmit,
  isLoading,
  postId,
}) => {
  const { showToast = () => {} } = useToast() || {};
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Partial<Comment>>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (name: keyof Comment, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (value.length < 3) {
          newErrors.name = 'O nome deve ter pelo menos 3 caracteres';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          newErrors.email = 'Por favor, insira um email válido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'body':
        if (value.length < 10) {
          newErrors.body = 'O comentário deve ter pelo menos 10 caracteres';
        } else {
          delete newErrors.body;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...comment, [name]: value });
    validateField(name as keyof Comment, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = Object.keys(comment).every(key => 
      validateField(key as keyof Comment, comment[key as keyof Comment] as string)
    );

    if (isValid) {
      try {
        await onSubmit({ ...comment, postId });
        showToast('Comentário enviado com sucesso!', 'success');
      } catch (error) {
        showToast('Erro ao enviar comentário. Tente novamente.', 'error');
      }
    } else {
      showToast('Por favor, corrija os erros no formulário.', 'warning');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="comment-form">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={comment.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.name ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={comment.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.email ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Comentário
        </label>
        <textarea
          id="body"
          name="body"
          value={comment.body}
          onChange={handleChange}
          rows={3}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.body ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.body}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          {showPreview ? 'Ocultar preview' : 'Mostrar preview'}
        </button>

        <button
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Enviando...' : 'Enviar comentário'}
        </button>
      </div>

      {showPreview && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview do comentário:
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {comment.body}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              — {comment.name}
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
