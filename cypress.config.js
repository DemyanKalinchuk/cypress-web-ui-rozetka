const { defineConfig } = require('cypress');
try { require('dotenv').config(); } catch (e) {}

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.WEB_BASE_URL || 'https://rozetka.com.ua/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        log(message) {
          const fs = require('fs');
          const path = require('path');
          const dir = path.join('test-results');
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          const file = path.join(dir, 'combined.log');
          const line = `[${new Date().toISOString()}] ${message}\n`;
          try { fs.appendFileSync(file, line); } catch (e) { console.error('log append failed:', e); }
          return null;
        }
      });
      return config;
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'test-results/mochawesome',
    reportFilename: 'report',
    charts: true,
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  retries: { runMode: 1, openMode: 0 },
  viewportWidth: 1440,
  viewportHeight: 900,
  video: false,
  env: {
    DATA_CY_STRICT: true
  }
});