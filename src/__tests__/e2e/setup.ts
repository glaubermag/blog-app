import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/firefox';
import { afterAll, beforeAll } from 'vitest';

declare global {
  var driver: WebDriver;
}

beforeAll(async () => {
  try {
    const options = new Options();
    options.addArguments('--headless');
    options.addArguments('--width=1920');
    options.addArguments('--height=1080');
    options.addArguments('--start-maximized');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-infobars');
    options.addArguments('--disable-notifications');
    options.addArguments('--disable-popup-blocking');
    
    const driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
    
    await driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 30000,
      script: 30000,
    });
    
    global.driver = driver;
    console.log('Driver global inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar o driver global:', error);
    throw error;
  }
});

afterAll(async () => {
  if (global.driver) {
    try {
      await global.driver.quit();
      console.log('Driver global finalizado com sucesso');
    } catch (error) {
      console.error('Erro ao finalizar o driver global:', error);
    }
  }
}); 