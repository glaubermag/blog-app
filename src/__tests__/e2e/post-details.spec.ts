import { test, expect } from '@playwright/test';

test.describe('Página de Detalhes do Post', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts/1');
  });

  test('deve exibir os detalhes do post', async ({ page }) => {
    // Verifica se o título do post está visível
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
    );

    // Verifica se o corpo do post está visível
    await expect(page.getByText('quia et suscipit')).toBeVisible();

    // Verifica se o nome do autor está visível
    await expect(page.getByText('Leanne Graham')).toBeVisible();

    // Verifica se o email do autor está visível
    await expect(page.getByText('Sincere@april.biz')).toBeVisible();
  });

  test('deve exibir os comentários do post', async ({ page }) => {
    // Verifica se a seção de comentários está visível
    await expect(page.getByRole('heading', { name: 'Comentários' })).toBeVisible();

    // Verifica se os comentários estão sendo exibidos
    const comments = page.locator('[data-testid="comment"]');
    await expect(comments).toHaveCount(5);

    // Verifica se o primeiro comentário tem o conteúdo correto
    const firstComment = comments.first();
    await expect(firstComment.getByText('laudantium enim quasi')).toBeVisible();
  });

  test('deve navegar de volta para a lista de posts', async ({ page }) => {
    // Clica no link "Voltar para Posts"
    await page.getByRole('link', { name: 'Voltar para Posts' }).click();

    // Verifica se foi redirecionado para a página de listagem
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();
  });
}); 