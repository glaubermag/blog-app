// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostDetailPage from './pages/PostDetailPage';
import AuthorPostsPage from './pages/AuthorPostsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/author/:id" element={<AuthorPostsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
