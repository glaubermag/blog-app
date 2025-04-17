// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import { ToastProvider } from './contexts/ToastContext';

// Lazy loading dos componentes de página
const PostsListPage = lazy(() => import('./pages/PostsListPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const AuthorPostsPage = lazy(() => import('./pages/AuthorPostsPage'));
const AuthorsListPage = lazy(() => import('./pages/AuthorsListPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const App: React.FC = () => {
  const basePath = import.meta.env.BASE_URL;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <Router basename={basePath}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<PostsListPage />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/author/:id" element={<AuthorPostsPage />} />
                    <Route path="/authors" element={<AuthorsListPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
