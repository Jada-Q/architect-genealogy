const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const fileUrl = 'file://' + path.resolve(__dirname, 'architects', 'graph.html');
  const errors = [];
  const log = (...a) => console.log(...a);

  // Desktop EN walkthrough
  const page = await browser.newPage({ viewport: { width: 1920, height: 1100 } });
  page.on('pageerror', e => errors.push(`PAGEERROR: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`CONSOLE: ${m.text()}`); });
  await page.goto(fileUrl);
  await page.waitForTimeout(2000);

  // Step 1: default state
  await page.screenshot({ path: 'architects/wt-1-default.png' });
  log('1 default OK');

  // Step 2: click obs card "1941"
  await page.click('.obs-card[data-obs="1941"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'architects/wt-2-obs-1941.png' });
  log('2 obs 1941 OK');

  // Step 3: click Pritzker filter
  await page.click('.filter-btn[data-filter="pritzker"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'architects/wt-3-pritzker.png' });
  log('3 Pritzker OK');

  // Step 4: switch to Japanese while Pritzker active
  await page.click('.lang-btn[data-lang="ja"]');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'architects/wt-4-ja-pritzker.png' });
  log('4 JA + Pritzker OK');

  // Step 5: click a node to open info card
  await page.evaluate(() => showArchitect(window.GENEALOGY.nodes.find(n => n.id === 'sejima')));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'architects/wt-5-info-sejima-ja.png' });
  log('5 info JA OK');

  // Step 6: switch to ZH
  await page.click('.lang-btn[data-lang="zh"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'architects/wt-6-zh.png' });
  log('6 ZH OK');

  // Mobile walkthrough
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  mobile.on('pageerror', e => errors.push(`MOBILE PAGEERROR: ${e.message}`));
  await mobile.goto(fileUrl);
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: 'architects/wt-mobile-1.png' });
  log('mobile-1 default');

  await mobile.click('.obs-card[data-obs="1941"]');
  await mobile.waitForTimeout(600);
  await mobile.screenshot({ path: 'architects/wt-mobile-2-obs.png' });
  log('mobile-2 obs');

  await mobile.evaluate(() => showArchitect(window.GENEALOGY.nodes.find(n => n.id === 'tange')));
  await mobile.waitForTimeout(1200);
  await mobile.screenshot({ path: 'architects/wt-mobile-3-info.png' });
  log('mobile-3 info');

  await browser.close();

  if (errors.length) console.log('\n!! ERRORS:', errors);
  else console.log('\n✓ no errors');
})();
