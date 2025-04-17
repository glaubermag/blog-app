import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';

const RoutePreloader: React.FC = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const preloadRoutes = async () => {
      const path = location.pathname;
      
      if (path === '/') {
        // Preload posts e users para a página inicial
        queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: api.getPosts });
        queryClient.prefetchQuery({ queryKey: ['users'], queryFn: api.getUsers });
      } else if (path.startsWith('/posts/')) {
        const postId = parseInt(path.split('/')[2], 10);
        // Preload post, autor e comentários
        queryClient.prefetchQuery({ 
          queryKey: ['post', postId], 
          queryFn: () => api.getPost(postId) 
        });
        queryClient.prefetchQuery({ 
          queryKey: ['comments', postId], 
          queryFn: () => api.getComments(postId) 
        });
      } else if (path.startsWith('/author/')) {
        const authorId = parseInt(path.split('/')[2], 10);
        // Preload autor e posts do autor
        queryClient.prefetchQuery({ 
          queryKey: ['user', authorId], 
          queryFn: () => api.getUser(authorId) 
        });
        queryClient.prefetchQuery({ 
          queryKey: ['userPosts', authorId], 
          queryFn: () => api.getPostsByUser(authorId) 
        });
      } else if (path === '/authors') {
        // Preload lista de autores
        queryClient.prefetchQuery({ queryKey: ['users'], queryFn: api.getUsers });
      }
    };

    preloadRoutes();
  }, [location.pathname, queryClient]);

  return null;
};

export default RoutePreloader; 