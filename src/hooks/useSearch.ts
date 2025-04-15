import { useState, useEffect } from 'react';
import { Post, User } from '../types';
import * as api from '../services/api';

export const useSearch = (query: string) => {
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