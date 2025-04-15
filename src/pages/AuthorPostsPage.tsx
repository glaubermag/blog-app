import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as api from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AuthorPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');

  const { data: author, isLoading: isLoadingAuthor, error: authorError } = useQuery({
    queryKey: ['author', userId],
    queryFn: () => api.getUser(userId),
  });

  const { data: posts, isLoading: isLoadingPosts, error: postsError } = useQuery({
    queryKey: ['author-posts', userId],
    queryFn: () => api.getUserPosts(userId),
    enabled: !!userId,
  });

  if (isLoadingAuthor || isLoadingPosts) {
    return <LoadingSpinner />;
  }

  if (authorError || postsError) {
    return <ErrorMessage message="Erro ao carregar os posts do autor. Por favor, tente novamente mais tarde." />;
  }

  if (!author || !posts) {
    return <ErrorMessage message="Autor não encontrado." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
                {author.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {author.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {author.company.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {author.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Posts ({posts.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              author={author}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorPostsPage; 