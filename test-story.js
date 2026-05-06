const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const fileUrl = 'file://' + path.resolve(__dirname, 'architects', 'story.html');

  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktop.on('pageerror', e => errors.push('DESKTOP: ' + e.message));
  await desktop.goto(fileUrl);
  await desktop.waitForTimeout(2000);
  await desktop.screenshot({ path: 'architects/story-hero.png' });

  // scroll to scenes
  for (const scene of ['origin','tange','counter','global','pritzker','cta']) {
    await desktop.evaluate(s => document.querySelector(`[data-scene="${s}"]`).scrollIntoView({behavior:'instant',block:'start'}), scene);
    await desktop.waitForTimeout(2200);
    await desktop.screenshot({ path: `architects/story-${scene}.png` });
  }

  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await mobile.goto(fileUrl);
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: 'architects/story-mobile-hero.png' });
  await mobile.evaluate(() => document.querySelector('[data-scene="tange"]').scrollIntoView());
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: 'architects/story-mobile-tange.png' });

  await browser.close();
  if (errors.length) console.log('errors:', errors);
  else console.log('✓ no errors, 8 screenshots');
})();
