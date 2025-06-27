export class FavoritePage {
    
  checkFavoriteInListPage() {
    cy.get('@selectedProductName').then((productName) => {
      cy.get('h3.app-product-box-name-title').should('be.visible').and(($el) => {
        expect($el.text().trim()).to.eq(productName);
      });
    });
  }

  checkFavoriteAddedOnDetail() {
    cy.get('button.user-login .evoicon-fav-full').should('be.visible');
    cy.get('button.user-login').contains('Favorilere Eklendi').should('be.visible');
  }

  removeFavoriteProduct() {
    cy.get('div.app-product-box-remove svg').should('be.visible').click();
  }

  checkFavoriteListEmpty() {
    cy.get('span').contains('Bu listede ürün bulunamadı.').should('be.visible');
  }
} 