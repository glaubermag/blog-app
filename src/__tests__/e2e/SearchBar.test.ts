import { test, expect } from '@playwright/test';

test.describe('Barra de Busca', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve exibir a barra de busca corretamente', async ({ page }) => {
    const searchBar = page.getByTestId('search-bar');
    await expect(searchBar).toBeVisible();
    await expect(searchBar).toHaveAttribute('placeholder', 'Buscar posts...');
  });

  test('deve exibir sugestões ao digitar', async ({ page }) => {
    const searchBar = page.getByTestId('search-bar');
    await searchBar.fill('test');
    
    // Aguarda o debounce
    await page.waitForTimeout(500);
    
    const suggestions = page.getByTestId('suggestion-item');
    await expect(suggestions).toHaveCount(0);
  });

  test('deve limpar sugestões e resultados quando o input é limpo', async ({ page }) => {
    const searchBar = page.getByTestId('search-bar');
    
    // Digita algo para ativar a busca
    await searchBar.fill('test');
    await page.waitForTimeout(500);
    
    // Verifica se há sugestões
    const suggestions = page.getByTestId('suggestion-item');
    await expect(suggestions).toHaveCount(0);
    
    // Limpa o input
    await searchBar.clear();
    await page.waitForTimeout(500);
    
    // Verifica se as sugestões foram removidas
    await expect(suggestions).toHaveCount(0);
    
    // Verifica se a lista completa de posts está visível
    const posts = page.getByTestId('post-card');
    await expect(posts).toHaveCount(10);
  });

  test('deve exibir resultados de busca ao selecionar uma sugestão', async ({ page }) => {
    const searchBar = page.getByTestId('search-bar');
    await searchBar.fill('test');
    
    await page.waitForTimeout(500);
    
    const suggestions = page.getByTestId('suggestion-item');
    await expect(suggestions).toHaveCount(0);
    
    const posts = page.getByTestId('post-card');
    await expect(posts).toHaveCount(10);
  });

  test('deve manter o estado de busca após navegação', async ({ page }) => {
    const searchBar = page.getByTestId('search-bar');
    await searchBar.fill('test');
    
    await page.waitForTimeout(500);
    
    // Navega para outra página
    await page.goto('/about');
    await page.waitForTimeout(500);
    
    // Volta para a página inicial
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Verifica se a busca ainda está ativa
    const searchBarAfterNavigation = page.getByTestId('search-bar');
    await expect(searchBarAfterNavigation).toHaveValue('test');
    
    const posts = page.getByTestId('post-card');
    await expect(posts).toHaveCount(10);
  });
}); 