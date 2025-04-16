# Blog App

Um aplicativo moderno de blog desenvolvido com React, TypeScript e TailwindCSS, oferecendo uma experiência completa de visualização e interação com posts e comentários.

## 📋 Funcionalidades

- **Lista de Posts**
  - Visualização em grid com design responsivo
  - Exibição de autor para cada post
  - Paginação para navegar entre múltiplos posts
  - Tema claro/escuro personalizado

- **Página de Post Detalhado**
  - Visualização completa do post com conteúdo integral
  - Exibição do autor do post com informações de contato
  - Lista de comentários relacionados ao post
  - Formulário para adição de novos comentários

- **Páginas de Autor**
  - Visualização de todos os posts de um autor específico
  - Informações detalhadas sobre o autor (email, empresa, website, etc.)

## 🔧 Tecnologias Utilizadas

- **Frontend:**
  - React 18 (com Hooks e Context API)
  - TypeScript para tipagem estática
  - TailwindCSS para estilização
  - React Router v6 para navegação
  - React Query (@tanstack/react-query) para gerenciamento de estado e requisições

- **Integração:**
  - API JSONPlaceholder para dados de posts, comentários e usuários
  - Axios para requisições HTTP

- **Testes:**
  - Vitest como framework de testes
  - React Testing Library para testes de componentes
  - Jest DOM para testes de DOM
  - Mocks avançados para simular requisições e comportamentos

- **Tooling:**
  - Vite como bundler e servidor de desenvolvimento
  - ESLint para linting
  - PostCSS para processamento de CSS

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular e componentizada:

```
src/
  ├── components/         # Componentes reutilizáveis
  │   ├── layout/         # Componentes de layout (Header, Footer)
  │   └── ...             # Outros componentes (PostCard, CommentForm)
  ├── contexts/           # Contextos React (ThemeContext)
  ├── hooks/              # Custom hooks personalizados
  ├── layouts/            # Layouts reutilizáveis (MainLayout)
  ├── pages/              # Componentes de página
  ├── services/           # Serviços para API e outras funcionalidades
  ├── types/              # Definições de tipos TypeScript
  ├── __tests__/          # Testes unitários e de integração
  │   ├── components/     # Testes de componentes
  │   ├── pages/          # Testes de páginas
  │   └── utils/          # Utilitários de teste (mocks, helpers)
  └── main.tsx            # Ponto de entrada da aplicação
```

### Padrões Arquiteturais:

- **Container/Presentation Pattern**: Separação entre lógica e apresentação
- **Custom Hooks**: Abstração de lógicas complexas em hooks reutilizáveis
- **Context API**: Para gerenciamento de estado global como tema
- **Error Boundaries**: Para tratamento de erros de forma elegante

## 🧪 Testes

O projeto inclui uma suíte abrangente de testes unitários e de integração, utilizando Vitest e React Testing Library. Os testes são organizados de forma modular e seguem as melhores práticas de teste.

### Estrutura dos Testes

```
src/__tests__/
  ├── components/         # Testes de componentes
  │   ├── CommentForm.test.tsx
  │   ├── CommentList.test.tsx
  │   ├── PostCard.test.tsx
  │   └── layout/         # Testes de componentes de layout
  ├── pages/              # Testes de páginas
  │   ├── AuthorPage.test.tsx
  │   ├── AuthorPostsPage.test.tsx
  │   ├── PostDetailPage.test.tsx
  │   └── PostsListPage.test.tsx
  └── utils/              # Utilitários de teste
      └── mocks.ts        # Dados mockados para testes
```

### Mocks e Utilitários

O projeto utiliza um sistema robusto de mocks para simular dados e comportamentos:

```typescript
// Exemplo de mock de dados
export const mockUser = {
  id: 1,
  name: 'Autor 1',
  username: 'autor1',
  email: 'autor1@example.com',
  // ... outros dados
};

export const mockPosts = [
  {
    id: 1,
    userId: 1,
    title: 'Título do Post 1',
    body: 'Conteúdo do post 1'
  },
  // ... outros posts
];
```

### Tipos de Testes Implementados

1. **Testes de Componentes**
   - Renderização básica
   - Interações do usuário
   - Estados de loading e erro
   - Props e eventos

2. **Testes de Páginas**
   - Integração com React Router
   - Carregamento de dados
   - Estados de loading e erro
   - Navegação

3. **Testes de Integração**
   - Interação entre componentes
   - Fluxos completos de usuário
   - Estados assíncronos

### Exemplos de Testes

```typescript
// Teste de componente
test('renderiza PostCard corretamente', () => {
  render(<PostCard post={mockPost} author={mockUser} />);
  expect(screen.getByText(mockPost.title)).toBeInTheDocument();
});

// Teste de página
test('mostra loading spinner enquanto carrega posts', () => {
  (useQuery as any).mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null
  });
  
  render(
    <MemoryRouter>
      <PostsListPage />
    </MemoryRouter>
  );
  
  expect(screen.getByText('Carregando...')).toBeInTheDocument();
});
```

### Cobertura de Testes

O projeto mantém uma cobertura de testes abrangente, com foco especial em:

- Componentes principais: >90% de cobertura
- Páginas principais: >80% de cobertura
- Funcionalidades críticas: 100% de cobertura

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/glaubermag/blog-app.git

# Entre no diretório
cd blog-app

# Instale as dependências
npm install
```

### Executando

```bash
# Modo de desenvolvimento
npm run dev

# Compilação para produção
npm run build

# Executar testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

## 📱 Responsividade

O aplicativo é totalmente responsivo, com três breakpoints principais:
- **Mobile**: < 640px
- **Tablet**: 768px
- **Desktop**: 1024px+

## 🎨 Temas

O aplicativo suporta temas claro e escuro, adaptando-se automaticamente à preferência do sistema ou permitindo que o usuário selecione manualmente através de um botão no cabeçalho.

## 🛠️ Acessibilidade

A aplicação segue as melhores práticas de acessibilidade, incluindo:
- Uso apropriado de elementos semânticos HTML
- Labels para todos os formulários
- Atributos ARIA quando necessário
- Contraste adequado de cores
- Navegação por teclado

## 📈 Melhorias Futuras

- Implementação de sistema de autenticação
- Suporte para múltiplos idiomas (i18n)
- Editor WYSIWYG para criação de posts
- Sistema de compartilhamento em redes sociais
- Melhorias em SEO
- Implementação de Storybook para documentação de componentes
- Aumentar a cobertura de testes para os hooks personalizados
- Melhorar a cobertura de testes para o serviço de API

## 👨‍💻 Autor

- **Glauber Ariel Magalhães**
- Twitter: [@devglaubermag](https://twitter.com/devglaubermag)
- Email: contato@glaubermag.dev.br

## 🙏 Agradecimentos

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) pela API de exemplo
- [Tailwind CSS](https://tailwindcss.com/) pela incrível framework de CSS
- [React Query](https://tanstack.com/query/latest) pelo gerenciamento de estado
