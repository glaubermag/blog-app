import axios from 'axios';
import { Post, User, Comment } from '../types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = async (page: number = 1, limit: number = 10) => {
  const response = await api.get<Post[]>(`/posts?_page=${page}&_limit=${limit}`);
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0')
  };
};

export const getPost = async (id: number) => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const getPostComments = async (postId: number) => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
};

export const getUserPosts = async (userId: number) => {
  const response = await api.get<Post[]>(`/posts?userId=${userId}`);
  return response.data;
};

export const createComment = async (postId: number, comment: Omit<Comment, 'id' | 'postId'>) => {
  const response = await api.post<Comment>(`/posts/${postId}/comments`, {
    ...comment,
    postId
  });
  return response.data;
};

export const searchPosts = async (query: string) => {
  const response = await api.get<Post[]>(`/posts?q=${query}`);
  return response.data;
}; 