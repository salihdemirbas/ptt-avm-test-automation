// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Güvenilir element bulma command'ı
Cypress.Commands.add('waitForElement', (selector, options = {}) => {
  const defaultOptions = {
    timeout: 15000,
    retries: 3,
    interval: 1000,
    ...options
  };

  return new Cypress.Promise((resolve, reject) => {
    let attempts = 0;
    
    const tryToFind = () => {
      attempts++;
      
      cy.get('body').then($body => {
        if ($body.find(selector).length > 0) {
          cy.get(selector, { timeout: 5000 }).should('be.visible');
          resolve();
        } else if (attempts < defaultOptions.retries) {
          cy.wait(defaultOptions.interval);
          tryToFind();
        } else {
          reject(new Error(`Element ${selector} not found after ${defaultOptions.retries} attempts`));
        }
      });
    };
    
    tryToFind();
  });
});

// Sayfa yüklenme bekleme command'ı
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.wait(2000); // Ek bekleme süresi
});

// Güvenli tıklama command'ı
Cypress.Commands.add('safeClick', (selector, options = {}) => {
  const defaultOptions = {
    timeout: 15000,
    force: false,
    ...options
  };

  return cy.get(selector, { timeout: defaultOptions.timeout })
    .should('be.visible')
    .should('not.be.disabled')
    .click({ force: defaultOptions.force });
});

// Favori butonu için özel command
Cypress.Commands.add('waitForFavoriteButton', () => {
  cy.waitForPageLoad();
  cy.waitForElement('button.user-login');
  cy.waitForElement('button.user-login span .evoicon-fav-empty');
  cy.waitForElement('button.user-login span + span');
});