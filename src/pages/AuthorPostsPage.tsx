import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post, User } from '../types';
import PostCard from '../components/PostCard';
import * as api from '../services/api';

const AuthorPostsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [authorData, postsData] = await Promise.all([
          api.getUser(parseInt(id)),
          api.getUserPosts(parseInt(id))
        ]);

        setAuthor(authorData);
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do autor');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Carregando perfil do autor...</p>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="text-center text-red-600">
        {error || 'Autor não encontrado'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{author.name}</h1>
        <p className="text-gray-600 mb-1">@{author.username}</p>
        <a 
          href={`mailto:${author.email}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {author.email}
        </a>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Posts do autor ({posts.length})
      </h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              excerpt={post.body}
              date={new Date().toLocaleDateString()}
              author={author.name}
              imageUrl={`https://picsum.photos/seed/${post.id}/800/400`}
              slug={post.id.toString()}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Este autor ainda não tem posts.</p>
      )}
    </div>
  );
};

export default AuthorPostsPage; 