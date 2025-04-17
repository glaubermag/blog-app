import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { By, until } from 'selenium-webdriver';

describe('Página Inicial', () => {
  const TIMEOUT = 30000;
  const BASE_URL = process.env.VITE_APP_URL || 'http://localhost:5173/blog-app';

  beforeAll(async () => {
    if (!global.driver) {
      throw new Error('Driver não inicializado. Verifique se o setup.ts foi executado corretamente.');
    }
    await global.driver.get(BASE_URL);
  });

  afterAll(async () => {
    if (global.driver) {
      await global.driver.quit();
    }
  });

  const waitForElement = async (selector: string, timeout = TIMEOUT) => {
    const driver = global.driver;
    if (!driver) {
      throw new Error('Driver não inicializado');
    }

    try {
      console.log(`Aguardando elemento: ${selector}`);
      const element = await driver.wait(
        until.elementLocated(By.css(selector)),
        timeout,
        `Elemento ${selector} não encontrado após ${timeout}ms`
      );
      await driver.wait(
        until.elementIsVisible(element),
        timeout,
        `Elemento ${selector} não está visível após ${timeout}ms`
      );
      console.log(`Elemento encontrado: ${selector}`);
      return element;
    } catch (error) {
      console.error(`Erro ao aguardar elemento ${selector}:`, error);
      throw error;
    }
  };

  const waitForElements = async (selector: string, timeout = TIMEOUT) => {
    const driver = global.driver;
    if (!driver) {
      throw new Error('Driver não inicializado');
    }

    try {
      console.log(`Aguardando elementos: ${selector}`);
      const elements = await driver.wait(
        async () => {
          const found = await driver.findElements(By.css(selector));
          return found.length > 0 ? found : null;
        },
        timeout,
        `Elementos ${selector} não encontrados após ${timeout}ms`
      );
      if (!elements) {
        throw new Error(`Nenhum elemento encontrado para o seletor: ${selector}`);
      }
      console.log(`Elementos encontrados: ${selector} (${elements.length})`);
      return elements;
    } catch (error) {
      console.error(`Erro ao aguardar elementos ${selector}:`, error);
      throw error;
    }
  };

  it('deve carregar a página inicial corretamente', async () => {
    const title = await waitForElement('h1');
    const titleText = await title.getText();
    expect(titleText).toBeDefined();
  });

  it('deve exibir a lista de posts', async () => {
    const posts = await waitForElements('[data-testid="post-card"]');
    expect(posts.length).toBeGreaterThan(0);
  });
}); 