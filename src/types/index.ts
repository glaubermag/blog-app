// src/types.d.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  isLoading?: boolean;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  suggestions: string[];
}

export interface AuthorPosts {
  posts: Post[];
  author: User;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SearchParams {
  query: string;
  filters?: {
    authorId?: number;
    dateRange?: {
      start: string;
      end: string;
    };
  };
}
