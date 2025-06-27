export class CheckoutPage {
  checkCartUrl() {
    cy.url().should('eq', 'https://www.pttavm.com/my/tr/sepet');
  }

  checkProductName(expectedName) {
    cy.get('a.shopping-cart-item-info-name span').invoke('text').then(cartName => {
      expect(cartName.trim()).to.eq(expectedName);
    });
  }

  checkProductPrice(expectedPrice) {
    
      cy.get('span.font-semibold.text-sm').first().invoke('text').then(cartPrice => {
      cy.log('Sepetteki ilk fiyat:', cartPrice);
      expect(cartPrice.trim()).to.eq(expectedPrice);
    });
  }

  removeProductFromCart() {
    // Sadece görünür olan çöp kutusu ikonuna tıkla (ilk ürünü sil)
    cy.get('button:visible .eptticon-trash').closest('button').first().click();
    // Pop-up'ta 'Ürünü Sepetten Kaldır' butonunun varlığını kontrol et ve tıkla
    cy.get('button.remove div').contains('Ürünü Sepetten Kaldır').should('be.visible').click();
    // Sepetin boş olduğunu doğrula
    cy.get('span.text-center').should('contain', 'Sepetinizde ürün bulunmamaktadır.');
  }

  checkProductDetails() {
    cy.get('@selectedProductName').then((productName) => {
      this.checkProductName(productName);
    });
    cy.get('@selectedProductPrice').then((productPrice) => {
      this.checkProductPrice(productPrice);
    });
  }
} 