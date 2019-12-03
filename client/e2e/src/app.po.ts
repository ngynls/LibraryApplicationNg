import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getLoginText() {
    return element(by.tagName('mat-card-title')).getText() as Promise<string>;
  }
}
