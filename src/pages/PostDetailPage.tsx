// src/pages/AuthorPostsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, User } from '../types';
import PostCard from '../components/PostCard';

const AuthorPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchAuthorPosts() {
      // Busca autor
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const userData: User = await userResponse.json();
      setAuthor(userData);
      // Busca posts do autor
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      const postsData: Post[] = await postsResponse.json();
      setPosts(postsData);
    }
    fetchAuthorPosts();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">← Voltar para a lista</Link>
      {author && (
        <h1 className="text-3xl font-bold mb-4">Posts de {author.name}</h1>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} author={author || undefined} />
        ))}
      </div>
    </div>
  );
};

export default AuthorPostsPage;
