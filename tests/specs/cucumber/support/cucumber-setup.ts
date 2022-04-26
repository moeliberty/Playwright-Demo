import { Before, BeforeAll, AfterAll, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, ChromiumBrowser, firefox, FirefoxBrowser, webkit, WebKitBrowser } from "@playwright/test";
import { CustomWorld } from "./custom-world";
import { config } from './config';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
    switch (config.browser) {
        case 'firefox':
            global.browser = await firefox.launch(config.browserOptions);
            break;
        case 'webkit':
            global.browser = await webkit.launch(config.browserOptions);
            break;
        default:
            global.browser = await chromium.launch(config.browserOptions);
    }
});

AfterAll(async function () {
  await global.browser.close();
});

// Create a new test context and page per scenario
Before(async function (this: CustomWorld) {
  this.context = await global.browser.newContext({
    viewport: { width: 1200, height: 800 },
  });
  this.page = await this.context.newPage();
});

// Cleanup after each scenario
After(async function (this: CustomWorld) {
  await this.page.close();
  await this.context.close();
});
