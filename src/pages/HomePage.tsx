import { useState } from 'react';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { usePosts } from '../hooks/usePosts';
import { useSearch } from '../hooks/useSearch';

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error, totalPosts } = usePosts(currentPage);
  const { posts: searchResults, loading: searchLoading } = useSearch(searchQuery);

  const totalPages = Math.ceil(totalPosts / 10);
  const displayPosts = searchQuery ? searchResults : posts;
  const isLoading = loading || searchLoading;

  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Carregando posts...</p>
        </div>
      ) : displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Nenhum post encontrado.</p>
      )}

      {!searchQuery && !loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}; 