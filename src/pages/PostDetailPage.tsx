// src/pages/AuthorPostsPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';
import { Post, User, Comment } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0');
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = React.useState({ name: '', email: '', body: '' });

  const { data: post, isLoading: isLoadingPost, error: postError } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => api.getPost(postId),
    gcTime: 1000 * 60 * 30, // 30 minutos
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const { data: author, isLoading: isLoadingAuthor, error: authorError } = useQuery<User>({
    queryKey: ['author', post?.userId],
    queryFn: () => api.getUser(post?.userId || 0),
    enabled: !!post?.userId,
    gcTime: 1000 * 60 * 30, // 30 minutos
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: (failureCount, error) => {
      if (error instanceof api.UserNotFoundError) return false;
      return failureCount < 3;
    }
  });

  const { data: comments = [], isLoading: isLoadingComments, error: commentsError } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => api.getComments(postId),
    gcTime: 1000 * 60 * 30, // 30 minutos
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const createCommentMutation = useMutation({
    mutationFn: (comment: { name: string; email: string; body: string }) => 
      api.createComment(postId, comment),
    onSuccess: (newComment) => {
      queryClient.setQueryData(['comments', postId], (oldComments: Comment[]) => {
        const commentWithId = {
          ...newComment,
          id: Date.now(),
          postId: postId,
        };
        return [...(oldComments || []), commentWithId];
      });
      setNewComment({ name: '', email: '', body: '' });
    },
  });

  const handleSubmitComment = (comment: { name: string; email: string; body: string }) => {
    createCommentMutation.mutate(comment);
  };

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <ErrorMessage message="Erro ao carregar o post. Por favor, tente novamente mais tarde." />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <ErrorMessage message="Post não encontrado." />
        </div>
      </div>
    );
  }

  if (isLoadingAuthor || isLoadingComments) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {post.body}
            </p>
          </div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (authorError instanceof api.UserNotFoundError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {post.body}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Autor não encontrado
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Desculpe, não conseguimos encontrar o autor deste post.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authorError || commentsError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {post.body}
            </p>
          </div>
          <ErrorMessage message="Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
          ← Voltar para a lista
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          {author && (
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400">
                Por: {author.name}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                {author.email}
              </p>
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300">
            {post.body}
          </p>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Comentários ({comments.length})
          </h2>

          <CommentForm
            comment={newComment}
            onChange={setNewComment}
            onSubmit={handleSubmitComment}
            isLoading={createCommentMutation.isPending}
          />

          <CommentList comments={comments} />
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage;
