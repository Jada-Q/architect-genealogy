const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const desktop = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  desktop.on('pageerror', e => errors.push('DESKTOP: ' + e.message));
  await desktop.goto('https://architect-genealogy.vercel.app');
  await desktop.waitForTimeout(3000);
  await desktop.screenshot({ path: 'architects/live-desktop.png' });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  mobile.on('pageerror', e => errors.push('MOBILE: ' + e.message));
  await mobile.goto('https://architect-genealogy.vercel.app');
  await mobile.waitForTimeout(3000);
  await mobile.screenshot({ path: 'architects/live-mobile.png' });

  await browser.close();
  if (errors.length) console.log('errors:', errors);
  else console.log('✓ live site no errors');
})();
