const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const dir = path.join(__dirname, 'docs', 'screenshots');
  fs.mkdirSync(dir, { recursive: true });

  // Story hero (desktop)
  const story = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  await story.goto('https://architect-genealogy.vercel.app/story');
  await story.waitForTimeout(2500);
  await story.screenshot({ path: path.join(dir, 'story-hero.png') });

  // Story Tange scene
  await story.evaluate(() => document.querySelector('[data-scene="tange"]').scrollIntoView({behavior:'instant'}));
  await story.waitForTimeout(2200);
  await story.screenshot({ path: path.join(dir, 'story-tange.png') });

  // Network tool full view
  const net = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  await net.goto('https://architect-genealogy.vercel.app');
  await net.waitForTimeout(2500);
  await net.screenshot({ path: path.join(dir, 'network-tool.png') });

  // Mobile story
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await mob.goto('https://architect-genealogy.vercel.app/story');
  await mob.waitForTimeout(2200);
  await mob.screenshot({ path: path.join(dir, 'story-mobile.png') });

  await browser.close();
  console.log('saved 4 screenshots to docs/screenshots/');
})();
