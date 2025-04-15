import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserPosts, UserNotFoundError } from '../services/api';
import { Post, User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PostCard from '../components/PostCard';

const AuthorPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0', 10);

  const { 
    data: author,
    isLoading: isLoadingAuthor,
    error: authorError
  } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    gcTime: 1000 * 60 * 30, // 30 minutos
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: (failureCount, error) => {
      if (error instanceof UserNotFoundError) return false;
      return failureCount < 3;
    }
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError
  } = useQuery<Post[]>({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!author,
    gcTime: 1000 * 60 * 30, // 30 minutos
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoadingAuthor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (authorError instanceof UserNotFoundError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Autor não encontrado
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Desculpe, não conseguimos encontrar o autor que você está procurando.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authorError || postsError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <ErrorMessage message="Ocorreu um erro ao carregar os dados do autor." />
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
            ← Voltar para a lista
          </Link>
          <ErrorMessage message="Dados do autor não disponíveis." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
          ← Voltar para a lista
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {author.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {author.email}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            {author.company?.name}
          </p>
        </div>

        {isLoadingPosts ? (
          <LoadingSpinner />
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} author={author} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Este autor ainda não possui posts publicados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPostsPage; 