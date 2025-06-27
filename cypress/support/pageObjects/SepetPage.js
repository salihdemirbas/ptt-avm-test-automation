export class SepetPage {
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

  selectProduct() {
    cy.get(".product-box-list-grid a:nth-child(4) .app-product-box").should('exist').click();
  }

  addToCart() {
    cy.get("#product-detail-add-to-cart").should('be.visible').click();
    cy.get(".common-modal").should('be.visible');
  }

  goToCart() {
    cy.get('a.user-login[href="/my/tr/sepet"]').click();
  }

  checkCartUrl() {
    cy.url().should('eq', 'https://www.pttavm.com/my/tr/sepet');
  }
} 