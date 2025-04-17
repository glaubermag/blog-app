import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface AuthorCardProps {
  author: User;
  postCount: number;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, postCount }) => {
  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      data-testid="author-card"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
              {author.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {author.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {author.company.name}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Email:</span> {author.email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Website:</span> {author.website}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Posts:</span> {postCount}
          </p>
        </div>

        <div className="mt-auto flex justify-end">
          <Link
            to={`/author/${author.id}`}
            className="px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
          >
            Ver Perfil
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AuthorCard; 