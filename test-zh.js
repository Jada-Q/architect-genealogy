const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(__dirname, 'architects', 'graph.html'));
  await page.waitForTimeout(1500);
  await page.click('.lang-btn[data-lang="zh"]');
  await page.waitForTimeout(500);
  await page.evaluate(() => showArchitect(window.GENEALOGY.nodes.find(n => n.id === 'tezuka')));
  await page.waitForTimeout(1500);
  // Screenshot only the info card area
  const info = await page.locator('#info').boundingBox();
  if (info) {
    await page.screenshot({ path: 'architects/test-zh-tezuka.png', clip: info });
  } else {
    await page.screenshot({ path: 'architects/test-zh-tezuka.png' });
  }
  await page.click('.obs-card[data-obs="women"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'architects/test-zh-women.png' });
  await browser.close();
  console.log('done');
})();
