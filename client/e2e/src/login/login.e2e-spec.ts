import { LoginPage } from './login.po';
import { browser , protractor} from 'protractor';

describe('Login Page E2E Tests', () => {
  let page: LoginPage;
  let EC=protractor.ExpectedConditions;

  const incorrectCredentials={
    username: 'notadmin',
    password: 'notadmin'
  };

  const wrongPasswordCredentials={
    username: 'admin',
    password: 'admin'
  };

  const correctCredentials={
    username: 'admin',
    password: 'admin1234'
  };

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should display a material snackbar with error message during a login event when account does not exist', () => {
    page.navigateTo();
    page.fillWithCredentials(incorrectCredentials);
    expect(page.getSnackbarText()).toEqual('Username is not registered');
  });

  it('should display a material snackbar with error message during a login event with wrong password', () => {
    page.navigateTo();
    page.fillWithCredentials(wrongPasswordCredentials);
    expect(page.getSnackbarText()).toEqual('Wrong password');
  });

  it('should redirect to the dashboard page during a login event with correct credentials', ()=>{
    page.navigateTo();
    page.fillWithCredentials(correctCredentials);
    browser.wait(EC.urlContains('dashboard'),5000);
    expect(browser.driver.getCurrentUrl()).toContain('/dashboard');
    expect(page.getSnackbarText()).toEqual('You are now logged in!');
  });

});
