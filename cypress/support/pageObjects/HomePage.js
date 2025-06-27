export class HomePage {
  login(email, password) {
    cy.get("#main-page-login").click();
    cy.get(".main-user.overflow-y-auto.text-eGrey-900.user-show").should('be.visible');
    cy.get("[for='login-email']").next().type(email);
    cy.get("[for='login-password']").next().type(password);
    cy.get("#main-page-side-bar-login").click();
    cy.get(".main-user.overflow-y-auto.text-eGrey-900.user-show .eptticon-close").click();
  }

  searchProduct(productName) {
    cy.get("#search-main-input").type(productName);
    cy.get(".search-main-buttons-item-search").click();
  }
} 