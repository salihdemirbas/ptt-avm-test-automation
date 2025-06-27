import { HomePage } from '../support/pageObjects/HomePage';
import { ListPage } from '../support/pageObjects/ListPage';
import { ProductDetailPage } from '../support/pageObjects/ProductDetailPage';
import { FavoritePage } from '../support/pageObjects/FavoritePage';


describe('PTT Urun Favori Kontrol', () => {
  const homePage = new HomePage();
  const listPage = new ListPage();
  const productDetailPage = new ProductDetailPage();
  const favoritePage = new FavoritePage();
 

  it('Favori Ekleme ve Silme', () => {
    cy.visit('https://www.pttavm.com/');
    homePage.login('salih.demirbas.test@outlook.com', 'Salih.test123');
    homePage.searchProduct('telefon');
    listPage.checkSearchUrl();
    listPage.selectFourthProduct();
    productDetailPage.saveFavoriteProductName();
    productDetailPage.checkFavoriteButtonVisible();
    productDetailPage.clickFavoriteButton();
    productDetailPage.checkFavoriteAdded();
    cy.visit('https://www.pttavm.com/my/listelerim');
    favoritePage.checkFavoriteInListPage();     
    favoritePage.removeFavoriteProduct();
    favoritePage.checkFavoriteListEmpty();
  
  
  });
});