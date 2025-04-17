import { test, expect } from '@playwright/test';

test.describe('Página de Posts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve carregar a lista de posts', async ({ page }) => {
    // Verifica se o título da página está visível
    await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

    // Verifica se os cards de post estão sendo exibidos
    const postCards = page.locator('[data-testid="post-card"]');
    await expect(postCards).toHaveCount(10);

    // Verifica se o primeiro post tem o título correto
    const firstPostTitle = postCards.first().locator('h2');
    await expect(firstPostTitle).toHaveText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  });

  test('deve navegar para a página de detalhes do post', async ({ page }) => {
    // Clica no primeiro post
    const firstPost = page.locator('[data-testid="post-card"]').first();
    await firstPost.click();

    // Verifica se foi redirecionado para a página de detalhes
    await expect(page).toHaveURL(/.*\/posts\/1/);

    // Verifica se o título do post está visível
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
    );
  });

  test('deve filtrar posts por título', async ({ page }) => {
    // Digita no campo de busca
    await page.getByPlaceholder('Buscar posts...').fill('qui est esse');

    // Aguarda a lista ser filtrada
    await page.waitForTimeout(500);

    // Verifica se apenas o post filtrado está visível
    const postCards = page.locator('[data-testid="post-card"]');
    await expect(postCards).toHaveCount(1);
    await expect(postCards.first().locator('h2')).toHaveText('qui est esse');
  });

  test('deve navegar entre as páginas', async ({ page }) => {
    // Verifica se a paginação está visível
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).toBeVisible();

    // Clica na segunda página
    await pagination.getByText('2').click();

    // Verifica se a URL foi atualizada
    await expect(page).toHaveURL(/.*\?page=2/);

    // Verifica se os posts da segunda página estão visíveis
    const postCards = page.locator('[data-testid="post-card"]');
    await expect(postCards).toHaveCount(10);
  });
}); 