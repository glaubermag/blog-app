# Blog App - Teste Prático para Desenvolvedor Sênior

Uma aplicação moderna de blog construída com React, TypeScript, Tailwind CSS e React Query, demonstrando boas práticas de desenvolvimento e arquitetura de software.

## 🚀 Características

- **Arquitetura Moderna**
  - Componentização reutilizável
  - Gerenciamento de estado com React Query
  - Tipagem forte com TypeScript
  - Design System com Tailwind CSS
  - Roteamento com React Router v6

- **Performance e UX**
  - Carregamento progressivo de dados
  - Cache inteligente com React Query
  - Animações suaves e feedback visual
  - Design responsivo e acessível
  - Suporte a modo escuro

- **Boas Práticas**
  - Tratamento de erros robusto
  - Loading states otimizados
  - Validação de formulários
  - Testes de integração
  - Documentação clara

## 🛠️ Tecnologias

- **Frontend**
  - React 18.2.0
  - TypeScript 5.0.2
  - Tailwind CSS 3.3.0
  - React Query 4.35.0
  - React Router 6.14.0
  - Axios 1.4.0

- **Ferramentas de Desenvolvimento**
  - Vite 4.3.9
  - ESLint 8.45.0
  - Prettier 2.8.8
  - TypeScript ESLint 5.59.11

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/glaubermag/blog-app.git
cd blog-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em:
```
http://localhost:5173
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── CommentForm.tsx
│   ├── CommentList.tsx
│   ├── ErrorMessage.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   ├── PostCard.tsx
│   └── SearchBar.tsx
├── pages/             # Páginas da aplicação
│   ├── AuthorPostsPage.tsx
│   ├── PostDetailPage.tsx
│   └── PostsListPage.tsx
├── services/          # Serviços e integrações
│   └── api.ts
├── types/             # Definições de tipos
│   └── index.ts
├── App.tsx           # Componente raiz
└── main.tsx          # Ponto de entrada
```

## 🔧 Decisões Técnicas

### Arquitetura e Padrões
- **Componentização**: Componentes pequenos e reutilizáveis seguindo o princípio de responsabilidade única
- **Gerenciamento de Estado**: React Query para cache e sincronização de dados
- **Tipagem**: TypeScript para segurança e manutenibilidade
- **Estilização**: Tailwind CSS para design consistente e responsivo

### Performance
- **Cache**: Implementação de cache com React Query (staleTime e gcTime)
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Otimização**: Minimização de re-renders com React.memo e useMemo

### UX/UI
- **Feedback Visual**: Estados de loading e erro bem definidos
- **Acessibilidade**: Semântica HTML e ARIA labels
- **Responsividade**: Design adaptativo para todos os dispositivos
- **Modo Escuro**: Suporte nativo com Tailwind CSS

### Tratamento de Erros
- **Boundaries**: Tratamento de erros em nível de componente
- **Feedback**: Mensagens de erro claras e amigáveis
- **Retry Logic**: Lógica de retentativa inteligente para falhas de API

## 🧪 Testes

A aplicação inclui testes de integração para garantir a qualidade do código:

```bash
npm run test
```

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes
- `npm run preview`: Previa a build de produção localmente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

- **Glauber Ariel Magalhães**
- Twitter: [@devglaubermag](https://twitter.com/devglaubermag)
- Email: contato@glaubermag.dev.br

## 🙏 Agradecimentos

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) pela API de exemplo
- [Tailwind CSS](https://tailwindcss.com/) pela incrível framework de CSS
- [React Query](https://tanstack.com/query/latest) pelo gerenciamento de estado
