import { test, expect } from '@playwright/test';

test.describe('Página de Autores', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/authors');
  });

  test('deve carregar a lista de autores', async ({ page }) => {
    // Verifica se o título da página está visível
    await expect(page.getByRole('heading', { name: 'Autores' })).toBeVisible();

    // Verifica se os cards de autor estão sendo exibidos
    const authorCards = page.locator('[data-testid="author-card"]');
    await expect(authorCards).toHaveCount(9);

    // Verifica se o primeiro autor tem o nome correto
    const firstAuthorName = authorCards.first().locator('h2');
    await expect(firstAuthorName).toHaveText('Leanne Graham');
  });

  test('deve filtrar autores por nome', async ({ page }) => {
    // Digita no campo de busca
    await page.getByPlaceholder('Buscar autores...').fill('Leanne');

    // Aguarda a lista ser filtrada
    await page.waitForTimeout(500);

    // Verifica se apenas o autor filtrado está visível
    const authorCards = page.locator('[data-testid="author-card"]');
    await expect(authorCards).toHaveCount(1);
    await expect(authorCards.first().locator('h2')).toHaveText('Leanne Graham');
  });

  test('deve navegar para a página de detalhes do autor', async ({ page }) => {
    // Clica no primeiro autor
    const firstAuthor = page.locator('[data-testid="author-card"]').first();
    await firstAuthor.click();

    // Verifica se foi redirecionado para a página de detalhes
    await expect(page).toHaveURL(/.*\/author\/1/);

    // Verifica se o nome do autor está visível
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Leanne Graham');
  });

  test('deve exibir mensagem de erro quando não encontrar autores', async ({ page }) => {
    // Digita um termo de busca que não existe
    await page.getByPlaceholder('Buscar autores...').fill('xyz123');

    // Aguarda a lista ser filtrada
    await page.waitForTimeout(500);

    // Verifica se a mensagem de erro está visível
    await expect(page.getByText('Nenhum autor encontrado com o termo "xyz123"')).toBeVisible();
  });

  test('deve exibir estatísticas do autor na página de detalhes', async ({ page }) => {
    // Navega para a página de detalhes do autor
    await page.goto('/author/1');

    // Verifica se as estatísticas estão visíveis
    await expect(page.getByText('Total de Posts')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByText('Website')).toBeVisible();
  });

  test('deve exibir mensagem de erro quando autor não existe', async ({ page }) => {
    // Navega para um ID de autor que não existe
    await page.goto('/author/999');

    // Verifica se a mensagem de erro está visível
    await expect(page.getByText('Autor não encontrado')).toBeVisible();
  });

  test('deve manter a busca ao navegar entre páginas', async ({ page }) => {
    // Digita no campo de busca
    await page.getByPlaceholder('Buscar autores...').fill('Leanne');

    // Aguarda a lista ser filtrada
    await page.waitForTimeout(500);

    // Navega para a página de detalhes
    const firstAuthor = page.locator('[data-testid="author-card"]').first();
    await firstAuthor.click();

    // Volta para a lista de autores
    await page.getByRole('link', { name: '← Voltar para a lista' }).click();

    // Verifica se a busca foi mantida
    await expect(page.getByPlaceholder('Buscar autores...')).toHaveValue('Leanne');
    const authorCards = page.locator('[data-testid="author-card"]');
    await expect(authorCards).toHaveCount(1);
  });
}); 