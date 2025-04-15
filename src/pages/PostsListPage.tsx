// src/pages/PostsListPage.tsx
import React, { useEffect, useState } from 'react';
import { Post, User } from '../types';
import PostCard from '../components/PostCard';
import * as api from '../services/api';

const PostsListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await api.getPosts();
        setPosts(postsResponse.data);
        
        // Buscar usuários únicos dos posts
        const uniqueUserIds = [...new Set(postsResponse.data.map(post => post.userId))];
        const usersPromises = uniqueUserIds.map(id => api.getUser(id));
        const usersData = await Promise.all(usersPromises);
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Carregando posts...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        const author = users.find(user => user.id === post.userId);
        return (
          <PostCard
            key={post.id}
            post={post}
            author={author}
          />
        );
      })}
    </div>
  );
};

export default PostsListPage;
