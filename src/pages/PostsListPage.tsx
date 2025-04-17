// src/pages/PostsListPage.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostCard from '../components/PostCard';
import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useSearch } from '../hooks/useSearch';

const POSTS_PER_PAGE = 9;

const PostsListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts, isLoading: isLoadingPosts, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
  });

  const { data: users, isLoading: isLoadingUsers, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
    enabled: !!posts,
  });

  const {
    searchQuery,
    setSearchQuery,
    searchResults: filteredPosts,
    suggestions,
    isSearching,
    isLoading: isSearchLoading,
  } = useSearch({
    items: posts?.data || [],
    searchKeys: ['title', 'body'],
    maxSuggestions: 5,
    debounceMs: 300,
  });

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setCurrentPage(1); // Resetar a página ao selecionar uma sugestão
  };

  if (isLoadingPosts || isLoadingUsers) {
    return <LoadingSpinner />;
  }

  if (postsError || usersError) {
    return <ErrorMessage message="Erro ao carregar os posts. Por favor, tente novamente mais tarde." />;
  }

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Posts Recentes
        </h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar posts..."
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          isLoading={isSearchLoading}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300" data-testid="no-results">
            {isSearching
              ? `Nenhum post encontrado com o termo "${searchQuery}"`
              : 'Nenhum post encontrado'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => {
              const author = users?.find(user => user.id === post.userId);
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  author={author}
                />
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostsListPage;
