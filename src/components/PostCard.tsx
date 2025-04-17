// src/components/PostCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  author?: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      data-testid="post-card"
    >
      <div className="p-6 flex-1 flex flex-col">
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
          {post.body}
        </p>

        {author && (
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
            <Link
              to={`/posts/${post.id}`}
              className="px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              Ler mais
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
