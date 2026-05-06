const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const firms = [
  { id: 'kuma',      name: '隈研吾 KKAA',         url: 'https://kkaa.co.jp/' },
  { id: 'ito',       name: '伊東豊雄',             url: 'http://www.toyo-ito.co.jp/' },
  { id: 'sanaa',     name: 'SANAA',                url: 'http://www.sanaa.co.jp/' },
  { id: 'fujimoto',  name: '藤本壮介',             url: 'https://sou-fujimoto.net/' },
  { id: 'ban',       name: '坂茂',                 url: 'https://shigerubanarchitects.com/' },
  { id: 'ishigami',  name: '石上純也',             url: 'https://jnyi.jp/' },
  { id: 'hirata',    name: '平田晃久',             url: 'https://www.hao.nu/' },
  { id: 'yamamoto',  name: '山本理顕',             url: 'https://www.riken-yamamoto.co.jp/' },
  { id: 'bowwow',    name: 'Atelier Bow-Wow',      url: 'https://www.bow-wow.jp/' },
];

const OUT_DIR = path.join(__dirname, 'architects', 'raw');
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const firm of firms) {
    const start = Date.now();
    const r = { id: firm.id, name: firm.name, url: firm.url };
    try {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/123.0 Safari/537.36',
        ignoreHTTPSErrors: true,
      });
      const page = await ctx.newPage();
      await page.goto(firm.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}

      r.title = await page.title();
      const html = await page.content();
      r.htmlSize = html.length;
      fs.writeFileSync(path.join(OUT_DIR, `${firm.id}.html`), html);

      await page.screenshot({ path: path.join(OUT_DIR, `${firm.id}.png`), fullPage: true });
      const stat = fs.statSync(path.join(OUT_DIR, `${firm.id}.png`));
      r.pngSize = stat.size;
      r.status = 'OK';
      await ctx.close();
    } catch (e) {
      r.status = 'FAIL';
      r.error = e.message.split('\n')[0].slice(0, 100);
    }
    r.ms = Date.now() - start;
    results.push(r);
    console.log(`${r.status === 'OK' ? '✓' : '✗'} ${firm.id.padEnd(10)} ${r.status === 'OK' ? `${(r.htmlSize/1024).toFixed(0)}KB html / ${(r.pngSize/1024/1024).toFixed(1)}MB png / ${r.ms}ms` : r.error}`);
  }

  fs.writeFileSync(
    path.join(__dirname, 'architects', 'day1-summary.json'),
    JSON.stringify(results, null, 2)
  );

  await browser.close();

  const ok = results.filter(r => r.status === 'OK').length;
  console.log(`\n完成: ${ok}/${firms.length} 成功`);
  console.log(`输出: ${OUT_DIR}`);
})();
