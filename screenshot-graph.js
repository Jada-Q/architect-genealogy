const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const fileUrl = 'file://' + path.resolve(__dirname, 'architects', 'graph.html');

  const desktop = await browser.newPage({ viewport: { width: 1920, height: 1100 } });
  await desktop.goto(fileUrl);
  await desktop.waitForTimeout(2000);
  await desktop.screenshot({ path: 'architects/preview-desktop-en.png' });

  await desktop.click('.lang-btn[data-lang="ja"]');
  await desktop.waitForTimeout(500);
  await desktop.screenshot({ path: 'architects/preview-desktop-ja.png' });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await mobile.goto(fileUrl);
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: 'architects/preview-mobile-en.png' });

  await mobile.click('.lang-btn[data-lang="ja"]');
  await mobile.waitForTimeout(500);
  await mobile.screenshot({ path: 'architects/preview-mobile-ja.png' });

  await browser.close();
  console.log('截图: desktop+mobile × EN+JA');
})();
