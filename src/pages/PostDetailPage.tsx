// src/pages/PostDetailPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as api from '../services/api';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PostCard from '../components/PostCard';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0', 10);
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const { data: post, isLoading: isLoadingPost, error: postError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => api.getPost(postId),
  });

  const { data: author, isLoading: isLoadingAuthor, error: authorError } = useQuery({
    queryKey: ['author', post?.userId],
    queryFn: () => api.getUser(post?.userId || 0),
    enabled: !!post,
  });

  const { data: comments, isLoading: isLoadingComments, error: commentsError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => api.getComments(postId),
    enabled: !!post,
  });

  const { data: relatedPosts, isLoading: isLoadingRelatedPosts } = useQuery({
    queryKey: ['relatedPosts', post?.userId],
    queryFn: () => api.getPostsByUser(post?.userId || 0),
    enabled: !!post,
  });

  const handleCommentSubmit = async (newComment: typeof comment) => {
    try {
      await api.createComment({
        ...newComment,
        postId,
      });
      // Atualizar a lista de comentários após o envio
      // Isso será feito automaticamente pelo React Query
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  if (isLoadingPost || isLoadingAuthor || isLoadingComments) {
    return <LoadingSpinner />;
  }

  if (postError || authorError || commentsError) {
    return <ErrorMessage message="Erro ao carregar o post. Por favor, tente novamente mais tarde." />;
  }

  if (!post || !author) {
    return <ErrorMessage message="Post não encontrado." />;
  }

  const filteredRelatedPosts = relatedPosts?.filter(p => p.id !== post.id) || [];

  return (
    <div className="space-y-8">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {author.name.charAt(0)}
              </span>
            </div>
            <div>
              <Link
                to={`/author/${author.id}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {author.name}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {author.company.name}
              </p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {post.body}
            </p>
          </div>
        </div>
      </article>

      {filteredRelatedPosts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Outros posts de {author.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelatedPosts.slice(0, 3).map(relatedPost => (
              <PostCard
                key={relatedPost.id}
                post={relatedPost}
                author={author}
              />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Comentários ({comments?.length || 0})
        </h2>
        
        <CommentForm
          comment={comment}
          onChange={setComment}
          onSubmit={handleCommentSubmit}
          isLoading={false}
          postId={postId}
        />

        {isLoadingComments ? (
          <LoadingSpinner />
        ) : commentsError ? (
          <ErrorMessage message="Erro ao carregar os comentários." />
        ) : (
          <CommentList comments={comments || []} />
        )}
      </section>
    </div>
  );
};

export default PostDetailPage;
