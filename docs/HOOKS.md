# Hooks Personalizados

Este documento descreve os hooks personalizados utilizados no projeto, suas funcionalidades e exemplos de uso.

## useAccessibilityAnnouncement

Hook para gerenciar anúncios de acessibilidade para leitores de tela.

### Uso

```typescript
const { announcement, priority, announce, clearAnnouncement } = useAccessibilityAnnouncement();

// Anunciar uma mensagem
announce('Post carregado com sucesso', 'polite');

// Anunciar uma mensagem importante
announce('Erro ao carregar o post', 'assertive');

// Limpar o anúncio atual
clearAnnouncement();
```

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| announcement | string | Mensagem atual do anúncio |
| priority | 'polite' \| 'assertive' | Prioridade do anúncio |
| announce | (message: string, priority?: 'polite' \| 'assertive') => void | Função para anunciar uma mensagem |
| clearAnnouncement | () => void | Função para limpar o anúncio atual |

### Exemplo de Implementação

```typescript
import { useState, useCallback } from 'react';

type Priority = 'polite' | 'assertive';

interface UseAccessibilityAnnouncementReturn {
  announcement: string;
  priority: Priority;
  announce: (message: string, priority?: Priority) => void;
  clearAnnouncement: () => void;
}

export const useAccessibilityAnnouncement = (): UseAccessibilityAnnouncementReturn => {
  const [announcement, setAnnouncement] = useState('');
  const [priority, setPriority] = useState<Priority>('polite');

  const announce = useCallback((message: string, newPriority: Priority = 'polite') => {
    setAnnouncement(message);
    setPriority(newPriority);
  }, []);

  const clearAnnouncement = useCallback(() => {
    setAnnouncement('');
  }, []);

  return {
    announcement,
    priority,
    announce,
    clearAnnouncement,
  };
};
```

## useTheme

Hook para gerenciar o tema da aplicação (claro/escuro).

### Uso

```typescript
const { isDarkMode, toggleTheme } = useTheme();

// Verificar se está no modo escuro
console.log(isDarkMode); // true ou false

// Alternar entre temas
toggleTheme();
```

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| isDarkMode | boolean | Indica se o tema atual é escuro |
| toggleTheme | () => void | Função para alternar entre temas |

## useToast

Hook para exibir notificações toast na aplicação.

### Uso

```typescript
const { showToast } = useToast();

// Mostrar uma notificação de sucesso
showToast('Post salvo com sucesso', 'success');

// Mostrar uma notificação de erro
showToast('Erro ao salvar o post', 'error');

// Mostrar uma notificação informativa
showToast('Post atualizado', 'info');
```

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| showToast | (message: string, type?: 'success' \| 'error' \| 'info') => void | Função para exibir uma notificação |

## useSearch

Hook para gerenciar a funcionalidade de busca.

### Uso

```typescript
const { query, setQuery, results, isLoading, error } = useSearch();

// Atualizar a query de busca
setQuery('react');

// Acessar resultados
console.log(results);

// Verificar estado de carregamento
console.log(isLoading);

// Verificar erros
console.log(error);
```

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| query | string | Termo de busca atual |
| setQuery | (query: string) => void | Função para atualizar o termo de busca |
| results | SearchResult[] | Resultados da busca |
| isLoading | boolean | Indica se a busca está em andamento |
| error | string \| null | Mensagem de erro, se houver |

## Boas Práticas

1. **Nomenclatura**
   - Use o prefixo `use` para todos os hooks
   - Nomes devem ser descritivos e indicar a funcionalidade
   - Evite nomes genéricos como `useData` ou `useState`

2. **Tipagem**
   - Use TypeScript para tipar todos os hooks
   - Documente os tipos de retorno e parâmetros
   - Use interfaces para tipos complexos

3. **Performance**
   - Use `useCallback` para funções
   - Use `useMemo` para valores computados
   - Evite cálculos pesados dentro dos hooks

4. **Testes**
   - Crie testes para todos os hooks
   - Teste diferentes cenários e estados
   - Verifique o comportamento com diferentes inputs

5. **Documentação**
   - Documente o propósito do hook
   - Forneça exemplos de uso
   - Liste todas as props e tipos
   - Inclua boas práticas e advertências

## Exemplos de Uso em Componentes

### PostCard

```typescript
const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  const { announce } = useAccessibilityAnnouncement();

  useEffect(() => {
    if (post) {
      announce(`Post ${post.title} carregado`, 'polite');
    }
  }, [post, announce]);

  return (
    // JSX do componente
  );
};
```

### ThemeToggle

```typescript
const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { announce } = useAccessibilityAnnouncement();

  const handleToggle = () => {
    toggleTheme();
    announce(`Tema alterado para ${isDarkMode ? 'claro' : 'escuro'}`, 'polite');
  };

  return (
    <button onClick={handleToggle}>
      {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
    </button>
  );
};
``` 