const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1100 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  await page.goto('file://' + path.resolve(__dirname, 'architects', 'graph.html'));
  await page.waitForTimeout(2000);
  const hubsHTML = await page.evaluate(() => document.getElementById('top-hubs')?.innerHTML || 'NOT FOUND');
  console.log('top-hubs innerHTML:', hubsHTML.slice(0, 300));
  console.log('Errors:', errors);
  await browser.close();
})();
