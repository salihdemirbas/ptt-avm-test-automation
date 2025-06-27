export class ListPage {
  selectFourthProduct() {
    cy.get(".product-box-list-grid a:nth-child(4) .app-product-box").should('exist').click();
  }

  checkSearchUrl() {
    cy.url().should('include', 'arama?q');
  }
} 