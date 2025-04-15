import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, User, Comment } from '../types';
import CommentForm from '../components/CommentForm';  
import * as api from '../services/api';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const postData = await api.getPost(parseInt(id));
        const [authorData, commentsData] = await Promise.all([
          api.getUser(postData.userId),
          api.getPostComments(postData.id)
        ]);

        setPost(postData);
        setAuthor(authorData);
        setComments(commentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar o post');
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleCommentSubmit = async (comment: Omit<Comment, 'id' | 'postId'>) => {
    if (!post) return;
    
    const newComment = await api.createComment(post.id, comment);
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Carregando post...</p>
      </div>
    );
  }

  if (error || !post || !author) {
    return (
      <div className="text-center text-red-600">
        {error || 'Post não encontrado'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <Link 
          to={`/author/${author.id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors mb-4 block"
        >
          Por {author.name}
        </Link>

        <p className="text-gray-700 whitespace-pre-line mb-8">{post.body}</p>
      </article>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionar comentário</h2>
        <CommentForm postId={post.id} onSubmit={handleCommentSubmit} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comentários ({comments.length})
        </h2>

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{comment.name}</h3>
                  <span className="mx-2 text-gray-400">•</span>
                  <a href={`mailto:${comment.email}`} className="text-blue-600 hover:text-blue-800">
                    {comment.email}
                  </a>
                </div>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum comentário ainda.</p>
        )}
      </div>
    </div>
  );
}; 