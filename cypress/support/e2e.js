// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Global timeout ayarları
Cypress.config('defaultCommandTimeout', 15000);
Cypress.config('requestTimeout', 15000);
Cypress.config('responseTimeout', 15000);

// Retry ayarları
Cypress.config('retries', {
  runMode: 2,
  openMode: 1
});

// Sayfa yüklenme bekleme süresi
Cypress.config('pageLoadTimeout', 60000);

// Global hata yakalama
Cypress.on('fail', (error, runnable) => {
  console.log('Test hatası:', error.message);
  // Screenshot al
  cy.screenshot(`error-${runnable.title.replace(/\s+/g, '-')}`);
  throw error;
});

// Uncaught exception yakalama
Cypress.on('uncaught:exception', (err, runnable) => {
  // Sayfa yeniden yüklenme hatalarını görmezden gel
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});