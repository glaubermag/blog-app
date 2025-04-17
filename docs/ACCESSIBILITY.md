# Acessibilidade no Blog App

Este documento descreve as diretrizes e melhores práticas de acessibilidade implementadas no Blog App.

## Índice
1. [Visão Geral](#visão-geral)
2. [Diretrizes de Implementação](#diretrizes-de-implementação)
3. [Componentes Acessíveis](#componentes-acessíveis)
4. [Testes de Acessibilidade](#testes-de-acessibilidade)
5. [Recursos e Ferramentas](#recursos-e-ferramentas)

## Visão Geral

O Blog App foi desenvolvido seguindo as diretrizes WCAG 2.1 (Web Content Accessibility Guidelines) para garantir que todos os usuários, incluindo aqueles com deficiências, possam acessar e interagir com o conteúdo de forma eficaz.

### Níveis de Conformidade
- **Nível A**: Requisitos básicos de acessibilidade
- **Nível AA**: Requisitos adicionais para melhor experiência
- **Nível AAA**: Requisitos avançados para máxima acessibilidade

## Diretrizes de Implementação

### 1. Estrutura Semântica
- Use elementos HTML semânticos apropriados (`<article>`, `<nav>`, `<header>`, etc.)
- Mantenha uma hierarquia de cabeçalhos lógica
- Use listas (`<ul>`, `<ol>`) para grupos de itens relacionados

### 2. Navegação por Teclado
- Todos os elementos interativos devem ser focáveis
- Implemente ordem de tabulação lógica
- Forneça indicadores visuais de foco
- Suporte atalhos de teclado comuns

### 3. Feedback para Leitores de Tela
- Use atributos ARIA apropriados
- Forneça textos alternativos para imagens
- Implemente anúncios dinâmicos com `aria-live`
- Use `aria-label` e `aria-describedby` quando necessário

### 4. Contraste e Legibilidade
- Mantenha relação de contraste mínima de 4.5:1 para texto normal
- Use tamanhos de fonte responsivos
- Evite texto justificado
- Forneça espaçamento adequado entre linhas

### 5. Estados e Feedback
- Indique claramente estados de carregamento
- Forneça feedback para ações do usuário
- Implemente mensagens de erro acessíveis
- Use cores como complemento, não como único indicador

## Componentes Acessíveis

### PostCard
```tsx
<article 
  role="article"
  aria-label={`Post: ${title}`}
  tabIndex={0}
>
  <h2 aria-level={2}>{title}</h2>
  <p aria-label={`Conteúdo: ${content}`}>{content}</p>
</article>
```

### SearchBar
```tsx
<input
  type="search"
  aria-label="Buscar posts"
  role="searchbox"
/>
```

### ThemeToggle
```tsx
<button
  aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
  role="switch"
  aria-checked={isDark}
>
  {isDark ? '🌞' : '🌙'}
</button>
```

## Testes de Acessibilidade

### Testes Automatizados
- Jest Axe para verificação de violações
- Testes de navegação por teclado
- Testes de contraste de cores
- Testes de leitores de tela

### Testes Manuais
- Navegação apenas com teclado
- Verificação com leitores de tela
- Testes de zoom e redimensionamento
- Verificação de contraste

## Recursos e Ferramentas

### Ferramentas de Desenvolvimento
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Documentação
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)

### Leitores de Tela
- [NVDA](https://www.nvaccess.org/)
- [VoiceOver](https://www.apple.com/accessibility/vision/)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/)

## Próximos Passos

1. Implementar testes de contraste de cores automatizados
2. Adicionar mais exemplos de uso no Storybook
3. Melhorar feedback para leitores de tela
4. Expandir testes de navegação por teclado
5. Criar guia de estilo acessível 