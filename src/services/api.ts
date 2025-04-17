import axios from 'axios';
import { Post, User, Comment } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  const response = await axios.get<Post[]>(`${API_URL}/posts`);
  return { data: response.data };
};

export const getPost = async (id: number) => {
  const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get<User[]>(`${API_URL}/users`);
  return response.data;
};

export class UserNotFoundError extends Error {
  constructor(userId: number) {
    super(`Usuário com ID ${userId} não foi encontrado`);
    this.name = 'UserNotFoundError';
  }
}

export const getUser = async (id: number) => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new UserNotFoundError(id);
    }
    throw error;
  }
};

export const getComments = async (postId: number) => {
  const response = await axios.get<Comment[]>(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};

export const getPostComments = async (postId: number) => {
  const response = await axios.get<Comment[]>(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};

export const getUserPosts = async (userId: number) => {
  const response = await axios.get<Post[]>(`${API_URL}/posts?userId=${userId}`);
  return response.data;
};

export const createComment = async (comment: Omit<Comment, 'id'>) => {
  const response = await axios.post<Comment>(`${API_URL}/comments`, comment);
  return response.data;
};

export const searchPosts = async (query: string) => {
  const [postsResponse, usersResponse] = await Promise.all([
    axios.get<Post[]>(`${API_URL}/posts`),
    axios.get<User[]>(`${API_URL}/users`),
  ]);

  const posts = postsResponse.data;
  const users = usersResponse.data;

  const searchResults = posts.filter(post => {
    const postTitle = post.title.toLowerCase();
    const postBody = post.body.toLowerCase();
    const author = users.find(user => user.id === post.userId);
    const authorName = author?.name.toLowerCase() || '';
    const searchTerm = query.toLowerCase();

    return (
      postTitle.includes(searchTerm) ||
      postBody.includes(searchTerm) ||
      authorName.includes(searchTerm)
    );
  });

  return searchResults;
};

export const getPostsByUser = async (userId: number) => {
  const response = await axios.get<Post[]>(`${API_URL}/users/${userId}/posts`);
  return response.data;
};

export const getAuthorPosts = async (authorId: number) => {
  const [posts, author] = await Promise.all([
    getPostsByUser(authorId),
    getUser(authorId),
  ]);

  return {
    posts,
    author,
  };
}; 