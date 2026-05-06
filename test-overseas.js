const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto('file://' + path.resolve(__dirname, 'architects', 'graph.html'));
  await page.waitForTimeout(2000);
  // default view
  await page.screenshot({ path: 'architects/test-default.png' });
  // click overseas obs card
  await page.click('.obs-card[data-obs="overseas-works"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'architects/test-overseas-obs.png' });
  await browser.close();
  console.log('done');
})();
