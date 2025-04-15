import { Link, Outlet, useLocation } from 'react-router-dom';

export const MainLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Blog App
            </Link>
            
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Início
              </Link>
              <Link
                to="/posts"
                className={`text-sm font-medium transition-colors ${
                  isActive('/posts') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Posts
              </Link>
              <Link
                to="/sobre"
                className={`text-sm font-medium transition-colors ${
                  isActive('/sobre') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Sobre
              </Link>
              <Link
                to="/contato"
                className={`text-sm font-medium transition-colors ${
                  isActive('/contato') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Contato
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre o Blog</h3>
              <p className="text-gray-600">
                Um espaço para compartilhar conhecimento e experiências sobre tecnologia e desenvolvimento.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/posts" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Todos os Posts
                  </Link>
                </li>
                <li>
                  <Link to="/sobre" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} Blog App. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 