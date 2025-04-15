import { useState, useEffect } from 'react';
import { Post, User } from '../types';
import * as api from '../services/api';

export const usePosts = (page: number = 1) => {
  const [posts, setPosts] = useState<(Post & { author?: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, total } = await api.getPosts(page);
        setTotalPosts(total);

        const postsWithAuthors = await Promise.all(
          data.map(async (post) => {
            const author = await api.getUser(post.userId);
            return { ...post, author };
          })
        );

        setPosts(postsWithAuthors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return { posts, loading, error, totalPosts };
}; 