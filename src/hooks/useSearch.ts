import { useState, useEffect, useMemo } from 'react';
import { Post, User } from '../types';
import * as api from '../services/api';
import { useDebounce } from './useDebounce';

interface UseSearchProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
}

interface UseSearchReturn<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: T[];
  isSearching: boolean;
}

export function useSearch<T>({
  items,
  searchKeys,
  debounceMs = 300,
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);

  useEffect(() => {
    setIsSearching(!!debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery) return items;

    return items.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        }
        return false;
      })
    );
  }, [items, searchKeys, debouncedSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
  };
}

export const useSearchPosts = (query: string) => {
  const [posts, setPosts] = useState<(Post & { author?: User })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim()) {
        setPosts([]);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await api.searchPosts(query);

        const postsWithAuthors = await Promise.all(
          searchResults.map(async (post) => {
            const author = await api.getUser(post.userId);
            return { ...post, author };
          })
        );

        setPosts(postsWithAuthors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar posts');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { posts, loading, error };
}; 