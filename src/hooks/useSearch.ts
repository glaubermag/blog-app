import { useState, useEffect, useMemo } from 'react';
import { Post, User } from '../types';
import * as api from '../services/api';
import { useDebounce } from './useDebounce';

interface UseSearchProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
  maxSuggestions?: number;
}

interface UseSearchReturn<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: T[];
  suggestions: string[];
  isSearching: boolean;
  isLoading: boolean;
}

export function useSearch<T>({
  items,
  searchKeys,
  debounceMs = 300,
  maxSuggestions = 5,
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setIsSearching(false);
      setIsLoading(false);
      return;
    }
    
    setIsSearching(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [debouncedSearchQuery]);

  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery) return items;

    const query = debouncedSearchQuery.toLowerCase().trim();
    return items.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        return false;
      })
    );
  }, [items, searchKeys, debouncedSearchQuery]);

  const suggestions = useMemo(() => {
    if (!debouncedSearchQuery) return [];

    const query = debouncedSearchQuery.toLowerCase().trim();
    const uniqueSuggestions = new Set<string>();
    
    items.forEach(item => {
      searchKeys.forEach(key => {
        const value = item[key];
        if (typeof value === 'string') {
          const words = value.toLowerCase().split(/\s+/);
          words.forEach(word => {
            if (word.includes(query) && word.length > query.length) {
              uniqueSuggestions.add(word);
            }
          });
        }
      });
    });

    return Array.from(uniqueSuggestions)
      .sort((a, b) => a.length - b.length)
      .slice(0, maxSuggestions);
  }, [items, searchKeys, debouncedSearchQuery, maxSuggestions]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    suggestions,
    isSearching,
    isLoading,
  };
}

export const useSearchPosts = (query: string) => {
  const [posts, setPosts] = useState<(Post & { author?: User })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim()) {
        setPosts([]);
        setSuggestions([]);
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
        setSuggestions(
          searchResults
            .map(post => post.title)
            .filter(title => title.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
        );
      } catch (err) {
        setError('Erro ao buscar posts');
        console.error('Erro na busca:', err);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();
  }, [query]);

  return { posts, loading, error, suggestions };
}; 