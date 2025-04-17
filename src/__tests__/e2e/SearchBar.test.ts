import { By, until, WebElement } from 'selenium-webdriver';
import { describe, expect, it, beforeEach } from 'vitest';

const TIMEOUT = 30000;
const BASE_URL = 'http://localhost:5173/blog-app';

describe('SearchBar', () => {
  const waitForElement = async (selector: string): Promise<WebElement> => {
    try {
      const element = await global.driver.wait(
        until.elementLocated(By.css(selector)),
        TIMEOUT
      );
      await global.driver.wait(until.elementIsVisible(element), TIMEOUT);
      console.log(`Elemento encontrado: ${selector}`);
      return element;
    } catch (error) {
      console.error(`Erro ao encontrar elemento ${selector}:`, error);
      throw error;
    }
  };

  const waitForElements = async (selector: string): Promise<WebElement[]> => {
    try {
      const elements = await global.driver.findElements(By.css(selector));
      await global.driver.wait(
        until.elementsLocated(By.css(selector)),
        TIMEOUT
      );
      console.log(`Elementos encontrados: ${selector}`);
      return elements;
    } catch (error) {
      console.error(`Erro ao encontrar elementos ${selector}:`, error);
      throw error;
    }
  };

  beforeEach(async () => {
    await global.driver.get(BASE_URL);
    await global.driver.wait(until.elementLocated(By.css('[data-testid="search-bar"]')), TIMEOUT);
  });

  it('deve exibir a barra de busca corretamente', async () => {
    const searchBar = await waitForElement('[data-testid="search-bar"]');
    expect(await searchBar.isDisplayed()).toBe(true);
    expect(await searchBar.getAttribute('placeholder')).toBe('Buscar posts...');
  });

  it('deve exibir sugestões ao digitar', async () => {
    const searchBar = await waitForElement('[data-testid="search-bar"]');
    await searchBar.sendKeys('test');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = await waitForElements('[data-testid="suggestion-item"]');
    const visibleSuggestions = await Promise.all(suggestions.map(el => el.isDisplayed()));
    expect(visibleSuggestions.filter(Boolean)).toHaveLength(0);
  });

  it('deve limpar sugestões e resultados quando o input é limpo', async () => {
    const searchBar = await waitForElement('[data-testid="search-bar"]');
    
    // Digita algo para ativar a busca
    await searchBar.sendKeys('test');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verifica se há sugestões
    const suggestions = await waitForElements('[data-testid="suggestion-item"]');
    const visibleSuggestions = await Promise.all(suggestions.map(el => el.isDisplayed()));
    expect(visibleSuggestions.filter(Boolean)).toHaveLength(0);
    
    // Limpa o input
    await searchBar.clear();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verifica se as sugestões foram removidas
    const suggestionsAfterClear = await global.driver.findElements(By.css('[data-testid="suggestion-item"]'));
    const visibleSuggestionsAfterClear = await Promise.all(suggestionsAfterClear.map(el => el.isDisplayed()));
    expect(visibleSuggestionsAfterClear.filter(Boolean)).toHaveLength(0);
    
    // Verifica se a lista completa de posts está visível
    const posts = await waitForElements('[data-testid="post-card"]');
    const visiblePosts = await Promise.all(posts.map(el => el.isDisplayed()));
    expect(visiblePosts.filter(Boolean)).toHaveLength(0);
  });

  it('deve exibir resultados de busca ao selecionar uma sugestão', async () => {
    const searchBar = await waitForElement('[data-testid="search-bar"]');
    await searchBar.sendKeys('test');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = await waitForElements('[data-testid="suggestion-item"]');
    const visibleSuggestions = await Promise.all(suggestions.map(el => el.isDisplayed()));
    const hasVisibleSuggestions = visibleSuggestions.some(Boolean);
    expect(visibleSuggestions.filter(Boolean)).toHaveLength(0);
    
    if (hasVisibleSuggestions) {
      const firstVisibleSuggestion = suggestions[visibleSuggestions.findIndex(Boolean)];
      await firstVisibleSuggestion.click();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const posts = await waitForElements('[data-testid="post-card"]');
      const visiblePosts = await Promise.all(posts.map(el => el.isDisplayed()));
      expect(visiblePosts.filter(Boolean)).toHaveLength(0);
    }
  });

  it('deve manter o estado de busca após navegação', async () => {
    const searchBar = await waitForElement('[data-testid="search-bar"]');
    await searchBar.sendKeys('test');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navega para outra página
    await global.driver.get(`${BASE_URL}/about`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Volta para a página inicial
    await global.driver.get(BASE_URL);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verifica se a busca ainda está ativa
    const searchBarAfterNavigation = await waitForElement('[data-testid="search-bar"]');
    expect(await searchBarAfterNavigation.getAttribute('value')).toBe('test');
    
    const posts = await waitForElements('[data-testid="post-card"]');
    const visiblePosts = await Promise.all(posts.map(el => el.isDisplayed()));
    expect(visiblePosts.filter(Boolean)).toHaveLength(0);
  });
}); 