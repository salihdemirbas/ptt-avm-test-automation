import { HomePage } from '../support/pageObjects/HomePage';
import { ListPage } from '../support/pageObjects/ListPage';
import { ProductDetailPage } from '../support/pageObjects/ProductDetailPage';
import { FavoritePage } from '../support/pageObjects/FavoritePage';


describe('PTT Urun Favori Kontrol', () => {
  const homePage = new HomePage();
  const listPage = new ListPage();
  const productDetailPage = new ProductDetailPage();
  const favoritePage = new FavoritePage();
 
  // Her test öncesi sayfa yüklenmesini bekle
  beforeEach(() => {
    cy.waitForPageLoad();
  });

  it('Favori Ekleme ve Silme', { retries: 2 }, () => {
    cy.visit('https://www.pttavm.com/');
    cy.waitForPageLoad();
    
    homePage.login('salih.demirbas.test@outlook.com', 'Salih.test123');
    cy.waitForPageLoad();
    
    homePage.searchProduct('telefon');
    cy.waitForPageLoad();
    
    listPage.checkSearchUrl();
    listPage.selectFourthProduct();
    cy.waitForPageLoad();
    
    productDetailPage.saveFavoriteProductName();
    productDetailPage.checkFavoriteButtonVisible();
    productDetailPage.clickFavoriteButton();
    productDetailPage.checkFavoriteAdded();
    
    cy.visit('https://www.pttavm.com/my/listelerim');
    cy.waitForPageLoad();
    
    favoritePage.checkFavoriteInListPage();     
    favoritePage.removeFavoriteProduct();
    favoritePage.checkFavoriteListEmpty();
  });
});