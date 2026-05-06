const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('→ 访问 daisetz.jp...');
  await page.goto('https://www.daisetz.jp', { waitUntil: 'networkidle' });

  const title = await page.title();
  console.log(`✓ 标题: ${title}`);

  await page.screenshot({ path: 'daisetz.png', fullPage: true });
  console.log('✓ 截图已存: daisetz.png');

  await browser.close();
  console.log('完成。');
})();
