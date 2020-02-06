import { browser, by, element } from 'protractor';

export class LoginPage {

  navigateTo() {
    return browser.get('/login') as Promise<any>;
  }

  navigateToDashboard(){
    return browser.get('/dashboard') as Promise<any>;
  }

  getUsernameTextbox(){
    return element(by.name('username'));
  }

  getPasswordTextbox(){
    return element(by.name('password'));
  }

  getSnackbarText(){
    return element(by.className('mat-simple-snackbar')).element(by.tagName('span')).getText();
  }

  fillWithCredentials(credentials:any){
    element(by.name('username')).sendKeys(credentials.username);
    element(by.name('password')).sendKeys(credentials.password);
    element(by.className('mat-raised-button mat-primary')).click();
  }
}
