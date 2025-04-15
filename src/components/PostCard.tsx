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
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.body}
        </p>

        {author && (
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
        )}
      </div>
    </article>
  );
};

export default PostCard;
