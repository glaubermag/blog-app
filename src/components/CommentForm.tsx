// src/components/CommentForm.tsx
import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (comment: { name: string; email: string; body: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, body });
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded">
      <h3 className="font-bold mb-2">Adicione um comentário</h3>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Comentário"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Enviar
      </button>
    </form>
  );
};

export default CommentForm;
