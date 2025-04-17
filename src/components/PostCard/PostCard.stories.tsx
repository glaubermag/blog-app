import type { Meta, StoryObj } from '@storybook/react';
import PostCard from './PostCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { within, userEvent } from '@storybook/testing-library';

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente PostCard é responsável por exibir um resumo de um post, incluindo:
- Título do post
- Resumo do conteúdo
- Informações do autor
- Data de publicação
- Número de comentários

### Uso
\`\`\`tsx
<PostCard
  post={{
    id: 1,
    title: "Título do Post",
    body: "Conteúdo do post...",
    userId: 1
  }}
  author={{
    id: 1,
    name: "Nome do Autor",
    email: "autor@email.com"
  }}
/>
\`\`\`

### Props
| Prop | Tipo | Descrição |
|------|------|-----------|
| post | Post | Objeto contendo informações do post |
| author | User | Objeto contendo informações do autor |
| isLoading | boolean | Indica se o post está carregando |
| error | string | Mensagem de erro, se houver |

### Acessibilidade
- O componente é totalmente navegável por teclado
- Fornece feedback para leitores de tela
- Mantém a hierarquia de cabeçalhos
- Usa atributos ARIA apropriados

### Performance
- Usa virtualização para listas longas
- Implementa lazy loading para imagens
- Otimiza re-renderizações com React.memo

### Boas Práticas
1. Sempre forneça um autor válido
2. Use títulos descritivos
3. Mantenha o conteúdo resumido
4. Trate estados de loading e erro
`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    post: {
      id: 1,
      title: "Título do Post",
      body: "Este é um exemplo de conteúdo do post. Aqui você pode ver como o texto é truncado quando é muito longo...",
      userId: 1
    },
    author: {
      id: 1,
      name: "Nome do Autor",
      email: "autor@email.com",
      company: {
        name: "Empresa do Autor"
      }
    }
  },
};

export const LongTitle: Story = {
  args: {
    post: {
      id: 2,
      title: "Este é um título muito longo que deve ser truncado quando excede o tamanho máximo permitido",
      body: "Conteúdo do post...",
      userId: 1
    },
    author: {
      id: 1,
      name: "Nome do Autor",
      email: "autor@email.com",
      company: {
        name: "Empresa do Autor"
      }
    }
  },
};

export const WithoutAuthor: Story = {
  args: {
    post: {
      id: 3,
      title: "Post sem autor",
      body: "Este post não tem informações do autor...",
      userId: 1
    },
    author: null
  },
};

export const Loading: Story = {
  args: {
    post: null,
    author: null,
    isLoading: true
  },
};

export const Error: Story = {
  args: {
    post: null,
    author: null,
    error: "Erro ao carregar o post"
  },
};

export const WithHTMLContent: Story = {
  args: {
    post: {
      id: 4,
      title: "Post com conteúdo HTML",
      body: "<p>Este é um post com <strong>conteúdo HTML</strong> formatado.</p><ul><li>Item 1</li><li>Item 2</li></ul>",
      userId: 1
    },
    author: {
      id: 1,
      name: "Nome do Autor",
      email: "autor@email.com",
      company: {
        name: "Empresa do Autor"
      }
    }
  },
};

export const WithManyComments: Story = {
  args: {
    post: {
      id: 5,
      title: "Post com muitos comentários",
      body: "Este post tem muitos comentários...",
      userId: 1,
      comments: Array(50).fill({
        id: 1,
        name: "Usuário",
        email: "usuario@email.com",
        body: "Comentário..."
      })
    },
    author: {
      id: 1,
      name: "Nome do Autor",
      email: "autor@email.com",
      company: {
        name: "Empresa do Autor"
      }
    }
  },
};

export const DarkTheme: Story = {
  args: {
    post: {
      id: 6,
      title: "Post em tema escuro",
      body: "Este post é exibido em tema escuro...",
      userId: 1
    },
    author: {
      id: 1,
      name: "Nome do Autor",
      email: "autor@email.com",
      company: {
        name: "Empresa do Autor"
      }
    }
  },
  parameters: {
    themes: {
      defaultTheme: 'dark'
    }
  }
};

export const WithInteractions: Story = {
  args: {
    post: {
      id: 7,
      title: "Post com interações",
      body: "Este post tem interações...",
      userId: 1
    },
    author: {
      id: 1,
      name: "Nome do Autor",
      email: "autor@email.com",
      company: {
        name: "Empresa do Autor"
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await userEvent.hover(canvas.getByRole('article'));
    
    await userEvent.click(canvas.getByRole('link', { name: /nome do autor/i }));
    
    await userEvent.click(canvas.getByRole('link', { name: /ler mais/i }));
  }
}; 