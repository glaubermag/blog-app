# Blog App

Uma aplicação de blog desenvolvida com React, TypeScript e Tailwind CSS, que consome a API do JSONPlaceholder.

## Funcionalidades

- Lista de posts com paginação
- Busca de posts
- Visualização detalhada de posts
- Comentários em posts
- Perfil de autores com seus posts
- Design responsivo e moderno

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

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

4. Acesse a aplicação em `http://localhost:5173`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e chamadas de API
  ├── hooks/         # Hooks customizados
  ├── types/         # Definições de tipos TypeScript
  ├── layouts/       # Layouts da aplicação
  └── utils/         # Funções utilitárias
```

## API

A aplicação consome a API do JSONPlaceholder:
- Posts: https://jsonplaceholder.typicode.com/posts
- Usuários: https://jsonplaceholder.typicode.com/users
- Comentários: https://jsonplaceholder.typicode.com/comments

## Licença

MIT
