// src/pages/AuthorPostsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, User } from '../types';
import PostCard from '../components/PostCard';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const AuthorPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const postId = parseInt(id || '0');
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState({ name: '', email: '', body: '' });

  const { data: post, isLoading: isLoadingPost, error: postError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => api.getPost(postId),
  });

  const { data: authorData, isLoading: isLoadingAuthor, error: authorError } = useQuery({
    queryKey: ['author', post?.userId],
    queryFn: () => api.getUser(post?.userId || 0),
    enabled: !!post?.userId,
  });

  const { data: comments = [], isLoading: isLoadingComments, error: commentsError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => api.getComments(postId),
  });

  const createCommentMutation = useMutation({
    mutationFn: (comment: { name: string; email: string; body: string }) => api.createComment(postId, comment),
    onSuccess: (newComment) => {
      // Atualiza o cache do React Query manualmente
      queryClient.setQueryData(['comments', postId], (oldComments: Comment[]) => {
        const commentWithId = {
          ...newComment,
          id: Date.now(), // Gera um ID único
          postId: postId,
        };
        return [...(oldComments || []), commentWithId];
      });
      setNewComment({ name: '', email: '', body: '' });
    },
  });

  const handleSubmitComment = (comment: { name: string; email: string; body: string }) => {
    createCommentMutation.mutate(comment);
  };

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

  if (isLoadingPost || isLoadingAuthor || isLoadingComments) {
    return <LoadingSpinner />;
  }

  if (postError || authorError || commentsError) {
    return <ErrorMessage message="Erro ao carregar o post. Por favor, tente novamente mais tarde." />;
  }

  if (!post || !authorData) {
    return <ErrorMessage message="Post não encontrado." />;
  }

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

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Comentários ({comments?.length || 0})
          </h2>

          <CommentForm
            comment={newComment}
            onChange={setNewComment}
            onSubmit={handleSubmitComment}
            isLoading={createCommentMutation.isPending}
          />

          <CommentList comments={comments || []} />
        </div>
      </section>
    </div>
  );
};

export default AuthorPostsPage;
