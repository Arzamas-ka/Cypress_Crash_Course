// <reference types="cypress" />

describe('suite', () => {

  it('visit Habr.com', () => {
    cy.visit('https://habr.com/ru/');
  })

  it('has a correct title', () => {
    cy.contains('Habr');
  })

  // mocha
  it('the title should exist', () => {
    cy.contains('Habr').should('have.css', 'color');
  })

  it('has <div className="tabs-menu"></div> element', () => {
    cy.get('.tabs-menu').should('exist');
  })

  it('data- attribute', () => {
    cy.get('[data-type=2]').should('exist');
  })

  it('click on the Logo', () => {
    cy.get('.logo').click();
  })

  it('has viewport 1000x660', () => {
    cy.viewport(1000, 660)
  })

  it('Войти', () => {
    cy.visit('https://habr.com/ru/');
    cy.contains('Войти').click();
    cy.contains('E-mail').should('exist');
  })

  it('check url', () => {
    cy.visit('https://habr.com/ru/');
    cy.contains('Войти').click();
    cy.get('[title="Зарегистрироваться с помощью Google"').click();

    cy.url('https://accounts.google.com/o/oauth2/auth/identifier?response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&openid.realm&access_type=offline&include_granted_scopes=true&redirect_uri=storagerelay%3A%2F%2Fhttps%2Faccount.habr.com%3Fid%3Dauth120664&client_id=472084966048-ut99mpprfh1n8ees0r26kr1183u1q4r0.apps.googleusercontent.com&ss_domain=https%3A%2F%2Faccount.habr.com&gsiwebsdk=shim&state=f1249b832a4babbcb6c14405bcc307eb&flowName=GeneralOAuthFlow')

    cy.url().should('include', '/login/');
    cy.url().then((value) => {
      cy.log('Show value: ', value)
    })
    cy.go('back')
  });

  it('While Log in it should has correct error message', async () => {
    cy.visit('https://habr.com/ru/');
    cy.contains('Войти').click();

    cy.contains('E-mail').type('email');
    cy.contains('Пароль').type('password');

    cy.contains('Войти').click()

    await cy.contains('Введите корректный e-mail').should('exist')
  })

  it('set value to LocalStorage', () => {
    const value = 'e460e542-d07f-419d-a5cb-b1bc83282f58';

    cy.visit('https://habr.com/ru/');

    cy.then(() => {
      window.localStorage.setItem('neuro-habr', value)
    })
  })
})