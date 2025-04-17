# Padrões de Código

Este documento descreve os padrões e convenções de código utilizados no projeto.

## Estrutura de Arquivos

```
src/
  ├── components/         # Componentes reutilizáveis
  │   ├── layout/         # Componentes de layout
  │   └── ...             # Outros componentes
  ├── contexts/           # Contextos React
  ├── hooks/              # Custom hooks
  ├── layouts/            # Layouts reutilizáveis
  ├── pages/              # Componentes de página
  ├── services/           # Serviços e APIs
  ├── types/              # Definições de tipos
  └── __tests__/          # Testes
```

## Convenções de Nomenclatura

### Arquivos
- Use PascalCase para nomes de arquivos de componentes React
- Use camelCase para nomes de arquivos de utilitários e hooks
- Use kebab-case para nomes de arquivos de estilos e assets

### Componentes
- Use PascalCase para nomes de componentes
- Use prefixos descritivos para componentes relacionados (ex: PostCard, PostList, PostDetail)
- Use sufixos descritivos para tipos específicos (ex: Button, ButtonGroup, ButtonIcon)

### Funções e Variáveis
- Use camelCase para nomes de funções e variáveis
- Use verbos para funções (ex: fetchData, handleClick)
- Use substantivos para variáveis (ex: userData, isLoading)

## Componentes React

### Estrutura de Componentes
```typescript
import React from 'react';
import PropTypes from 'prop-types';

interface ComponentProps {
  // Props do componente
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Lógica do componente

  return (
    // JSX
  );
};

export default Component;
```

### Hooks
- Use hooks personalizados para lógica reutilizável
- Prefira hooks nativos do React quando possível
- Mantenha os hooks pequenos e focados em uma única responsabilidade

### Props
- Use TypeScript para tipagem de props
- Documente props obrigatórias e opcionais
- Use valores padrão para props opcionais

## Estilização

### TailwindCSS
- Use classes utilitárias do TailwindCSS
- Mantenha a consistência nas classes
- Use @apply para estilos reutilizáveis
- Evite estilos inline quando possível

### Responsividade
- Use breakpoints do TailwindCSS
- Implemente mobile-first
- Teste em diferentes tamanhos de tela

## Testes

### Estrutura de Testes
```typescript
describe('Component', () => {
  it('should do something', () => {
    // Teste
  });
});
```

### Tipos de Testes
- Testes unitários para componentes e funções
- Testes de integração para fluxos
- Testes E2E para cenários completos
- Testes de acessibilidade

## Acessibilidade

### ARIA
- Use atributos ARIA apropriados
- Mantenha a hierarquia de cabeçalhos
- Forneça textos alternativos para imagens
- Garanta navegação por teclado

### Semântica
- Use elementos HTML semânticos
- Mantenha a estrutura lógica do documento
- Forneça feedback adequado para interações

## Performance

### Otimizações
- Use React.memo para componentes puros
- Implemente lazy loading
- Use virtualização para listas longas
- Otimize imagens e assets

### Caching
- Use React Query para gerenciamento de estado
- Implemente cache adequado
- Prefetch dados quando possível

## Documentação

### Componentes
- Documente props e tipos
- Forneça exemplos de uso
- Mantenha o README atualizado

### Commits
- Use conventional commits
- Mantenha mensagens claras e descritivas
- Referencie issues quando relevante

## Boas Práticas

### Código Limpo
- Mantenha funções pequenas e focadas
- Evite código duplicado
- Use nomes descritivos
- Comente apenas quando necessário

### Segurança
- Valide inputs
- Sanitize dados
- Use HTTPS
- Implemente CORS adequadamente

### Manutenibilidade
- Mantenha o código organizado
- Atualize dependências regularmente
- Remova código não utilizado
- Mantenha testes atualizados 