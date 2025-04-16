import { Post, User, Comment } from '../../types';

export const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Título do Post 1',
  body: 'Conteúdo do post 1'
};

export const mockPosts: Post[] = [
  mockPost,
  {
    id: 2,
    userId: 1,
    title: 'Título do Post 2',
    body: 'Conteúdo do post 2'
  }
];

export const mockUser: User = {
  id: 1,
  name: 'Autor 1',
  username: 'autor1',
  email: 'autor1@example.com',
  phone: '1234567890',
  website: 'www.autor1.com',
  company: {
    name: 'Empresa 1',
    catchPhrase: 'Slogan da empresa',
    bs: 'Business strategy'
  },
  address: {
    street: 'Rua Principal',
    suite: 'Apt 123',
    city: 'Cidade',
    zipcode: '12345-678',
    geo: {
      lat: '-37.3159',
      lng: '81.1496'
    }
  }
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: 2,
    name: 'Autor 2',
    username: 'autor2',
    email: 'autor2@example.com',
    phone: '987654321',
    website: 'autor2.com',
    company: {
      name: 'Empresa 2',
      catchPhrase: 'Frase da empresa 2',
      bs: 'BS da empresa 2'
    },
    address: {
      street: 'Rua 2',
      suite: 'Apto 2',
      city: 'Cidade 2',
      zipcode: '54321-876',
      geo: {
        lat: '0',
        lng: '0'
      }
    }
  }
];

export const mockComment: Comment = {
  id: 1,
  postId: 1,
  name: 'Comentarista 1',
  email: 'comentarista1@example.com',
  body: 'Comentário 1'
};

export const mockComments: Comment[] = [
  mockComment,
  {
    id: 2,
    postId: 1,
    name: 'Comentarista 2',
    email: 'comentarista2@example.com',
    body: 'Comentário 2'
  }
]; 