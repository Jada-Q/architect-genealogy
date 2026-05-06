const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://architect-genealogy.vercel.app/story');
  await page.waitForTimeout(3000);
  await page.click('#lang-switch button[data-lang="zh"]');
  await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector('[data-scene="origin"]').scrollIntoView());
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'architects/test-story-zh-origin.png' });
  await browser.close();
  console.log('done');
})();
