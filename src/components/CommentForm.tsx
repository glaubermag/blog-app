// src/components/CommentForm.tsx
import React from 'react';

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...comment, postId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="comment-form">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={comment.name}
          onChange={(e) => onChange({ ...comment, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={comment.email}
          onChange={(e) => onChange({ ...comment, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Comentário
        </label>
        <textarea
          id="body"
          value={comment.body}
          onChange={(e) => onChange({ ...comment, body: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Enviando...' : 'Enviar Comentário'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
