const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // İleride event'ler eklemek istersen buraya yazabilirsin
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true
  }
});