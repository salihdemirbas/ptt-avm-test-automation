import { HomePage } from '../support/pageObjects/HomePage';
import { ListPage } from '../support/pageObjects/ListPage';
import { ProductDetailPage } from '../support/pageObjects/ProductDetailPage';
import { CheckoutPage } from '../support/pageObjects/CheckoutPage';

describe('PTT Sepet Kontrol', () => {
  const homePage = new HomePage();
  const listPage = new ListPage();
  const productDetailPage = new ProductDetailPage();
  const checkoutPage = new CheckoutPage();

  it('Alışveriş akışı', () => {
    cy.visit('https://www.pttavm.com/');
    homePage.login('salih.demirbas.test@outlook.com', 'Salih.test123');
    homePage.searchProduct('telefon');
    listPage.checkSearchUrl();
    listPage.selectFourthProduct();
    productDetailPage.saveProductName();
    productDetailPage.saveProductPrice();
    productDetailPage.addToCart();
    productDetailPage.checkCartBadgeVisible();
    productDetailPage.checkModalVisible();
    productDetailPage.goToCart();
    checkoutPage.checkCartUrl();
    checkoutPage.checkProductDetails();
    checkoutPage.removeProductFromCart();
  });
});