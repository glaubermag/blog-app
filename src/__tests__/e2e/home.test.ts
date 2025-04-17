import { test, expect } from '@playwright/test';

test.describe('Página Inicial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve carregar a página inicial corretamente', async ({ page }) => {
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toBeDefined();
  });

  test('deve exibir a lista de posts', async ({ page }) => {
    const posts = page.getByTestId('post-card');
    await expect(posts).toHaveCount(10);
  });

  test('deve exibir o cabeçalho com links de navegação', async ({ page }) => {
    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
    
    const navLinks = header.getByRole('link');
    await expect(navLinks).toHaveCount(3);
    await expect(navLinks.nth(0)).toHaveText('Posts');
    await expect(navLinks.nth(1)).toHaveText('Autores');
    await expect(navLinks.nth(2)).toHaveText('Sobre');
  });

  test('deve exibir o rodapé com informações de copyright', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('© 2024 Blog App');
  });
}); 