import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AuthorCard from '../components/AuthorCard';
import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useSearch } from '../hooks/useSearch';
import { User, Post } from '../types';

const AUTHORS_PER_PAGE = 9;

const AuthorsListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading: isLoadingUsers, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
    enabled: !!users,
  });

  const {
    searchQuery,
    setSearchQuery,
    searchResults: filteredAuthors,
    suggestions,
    isSearching,
    isLoading: isSearchLoading,
  } = useSearch({
    items: users || [],
    searchKeys: ['name', 'email', 'company'],
    maxSuggestions: 5,
    debounceMs: 300,
  });

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setCurrentPage(1);
  };

  if (isLoadingUsers || isLoadingPosts) {
    return <LoadingSpinner />;
  }

  if (usersError) {
    return <ErrorMessage message="Erro ao carregar os autores. Por favor, tente novamente mais tarde." />;
  }

  const getAuthorPostCount = (userId: number) => {
    return posts?.data.filter((post: Post) => post.userId === userId).length || 0;
  };

  const totalPages = Math.ceil(filteredAuthors.length / AUTHORS_PER_PAGE);
  const startIndex = (currentPage - 1) * AUTHORS_PER_PAGE;
  const paginatedAuthors = filteredAuthors.slice(startIndex, startIndex + AUTHORS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Autores
        </h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar autores..."
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          isLoading={isSearchLoading}
        />
      </div>

      {filteredAuthors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300" data-testid="no-results">
            {isSearching
              ? `Nenhum autor encontrado com o termo "${searchQuery}"`
              : 'Nenhum autor encontrado'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAuthors.map((author: User) => (
              <AuthorCard
                key={author.id}
                author={author}
                postCount={getAuthorPostCount(author.id)}
              />
            ))}
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

export default AuthorsListPage; 