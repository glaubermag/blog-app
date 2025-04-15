// src/components/PostCard.tsx
import React from 'react';
import { Post, User } from '../types';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  author?: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition duration-300">
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-2">
          {post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body}
        </p>
      </Link>
      {author && (
        <p className="text-sm text-gray-500">Autor: <Link to={`/author/${author.id}`} className="text-blue-500 hover:underline">{author.name}</Link></p>
      )}
    </div>
  );
};

export default PostCard;
