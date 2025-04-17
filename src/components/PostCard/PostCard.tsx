import React from 'react';
import { Post, User } from '../../types';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post | null;
  author: User | null;
  isLoading?: boolean;
  error?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, author, isLoading = false, error }) => {
  if (error) {
    return (
      <div 
        role="alert" 
        aria-live="assertive"
        aria-atomic="true"
        className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-200"
      >
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <article 
        aria-busy="true" 
        aria-label="Carregando post..." 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
      >
        <div className="p-6" aria-hidden="true">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </article>
    );
  }

  if (!post || !author) return null;

  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      data-testid="post-card"
      aria-label={`Post: ${post.title}`}
      tabIndex={0}
    >
      <div className="p-6 flex-1 flex flex-col">
        <Link
          to={`/posts/${post.id}`}
          aria-label={`Ler o post ${post.title}`}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
          {post.body}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4"> 
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              {author.name[0]}
            </span>
          </div>
          <div className="flex items-center justify-between flex-1 min-w-0"> 
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200" title={author.name}>
              {author.name}
            </span>
            <Link
              to={`/author/${author.id}`}
              className="ml-4 flex-shrink-0 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label={`Ver perfil do autor ${author.name}`}
            >
              Ver autor
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;