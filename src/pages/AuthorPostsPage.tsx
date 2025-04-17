import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserPosts, UserNotFoundError } from '../services/api';
import { Post, User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PostCard from '../components/PostCard';
import { useSearch } from '../hooks/useSearch';

const AuthorPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const authorId = parseInt(id || '0', 10);
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: author,
    isLoading: isLoadingAuthor,
    error: authorError
  } = useQuery<User>({
    queryKey: ['user', authorId],
    queryFn: () => getUser(authorId),
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
    queryKey: ['userPosts', authorId],
    queryFn: () => getUserPosts(authorId),
    enabled: !!author,
    gcTime: 1000 * 60 * 30, // 30 minutos
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const {
    searchResults: filteredPosts,
    suggestions,
    isSearching,
    isLoading: isSearchLoading,
  } = useSearch({
    items: posts || [],
    searchKeys: ['title', 'body'],
    maxSuggestions: 5,
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

  const totalPosts = posts?.length || 0;

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
                {author.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {author.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {author.company?.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total de Posts</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalPosts}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-800 dark:text-white">{author.email}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
              <a
                href={`https://${author.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {author.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Posts ({filteredPosts.length})
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              {isSearching
                ? `Nenhum post encontrado com o termo "${searchQuery}"`
                : 'Nenhum post encontrado'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                author={author}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPostsPage; 