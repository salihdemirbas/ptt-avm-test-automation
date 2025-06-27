export class ProductDetailPage {
  productName = '';
  productPrice = '';
  favoriteProductName = '';

  saveProductName() {
    cy.get('h1.text-lg.font-medium.break-word').invoke('text').then(text => {
      this.productName = text.trim();
      cy.wrap(this.productName).as('selectedProductName');
    });
  }

  saveProductPrice() {
    cy.get('div[class*="text-eGreen-700"][class*="font-semibold"][class*="text-2xl"]').invoke('text').then(text => {
      this.productPrice = text.trim();
      cy.wrap(this.productPrice).as('selectedProductPrice');
    });
  }

  getProductName() {
    return this.productName;
  }

  getProductPrice() {
    return this.productPrice;
  }

  addToCart() {
    cy.get("#product-detail-add-to-cart").should('be.visible').click();
  }

  checkModalVisible() {
    cy.get(".common-modal").should('be.visible');
  }

  goToCart() {
    cy.get('a.user-login[href="/my/tr/sepet"]').click();
  }

  checkCartBadgeVisible() {
    cy.get('.absolute.w-4.h-4.items-center.justify-center.text-center.right-0.top-0.bg-eRed-900.text-white.text-xsi.rounded-full').should('be.visible').and('contain', '1');
  }

  checkFavoriteButtonVisible() {
    // Sayfanın tamamen yüklenmesini bekle
    cy.wait(2000);
    
    // Favori butonunun görünür olmasını bekle
    cy.get('button.user-login', { timeout: 15000 }).should('be.visible');
    
    // Favori ikonunun yüklenmesini bekle
    cy.get('button.user-login span .evoicon-fav-empty', { timeout: 15000 }).should('be.visible');
    
    // "Favorilere Ekle" metninin görünür olmasını bekle
    cy.get('button.user-login span + span', { timeout: 15000 }).contains('Favorilere Ekle').should('be.visible');
  }

  clickFavoriteButton() {
    cy.get('button.user-login', { timeout: 30000 }).contains('Favorilere Ekle').should('be.visible').click();
  }

  checkFavoriteAdded() {
    cy.get('.evoicon-fav-full', { timeout: 30000 }).should('be.visible');
    cy.contains('Favorilere Eklendi', { timeout: 30000 }).should('be.visible');
  }

  saveFavoriteProductName() {
    cy.get('h1.text-lg.font-medium.break-word').invoke('text').then(text => {
      this.favoriteProductName = text.trim();
      cy.wrap(this.favoriteProductName).as('selectedProductName');
    });
  }

  getFavoriteProductName() {
    return this.favoriteProductName;
  }

  checkFavoriteInListPage() {
    cy.get('@selectedProductName').then((productName) => {
      cy.get('h3.app-product-box-name-title').should('be.visible').and(($el) => {
        expect($el.text().trim()).to.eq(productName);
      });
    });
  }
} 