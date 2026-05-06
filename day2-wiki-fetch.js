const fs = require('fs');
const path = require('path');

const architects = [
  { id: 'ando',      wikiTitle: 'Tadao_Ando',         label: '安藤忠雄' },
  { id: 'kuma',      wikiTitle: 'Kengo_Kuma',         label: '隈研吾' },
  { id: 'ito',       wikiTitle: 'Toyo_Ito',           label: '伊東豊雄' },
  { id: 'sejima',    wikiTitle: 'Kazuyo_Sejima',      label: '妹島和世 (SANAA)' },
  { id: 'nishizawa', wikiTitle: 'Ryue_Nishizawa',     label: '西沢立衛 (SANAA)' },
  { id: 'fujimoto',  wikiTitle: 'Sou_Fujimoto',       label: '藤本壮介' },
  { id: 'ban',       wikiTitle: 'Shigeru_Ban',        label: '坂茂' },
  { id: 'ishigami',  wikiTitle: 'Junya_Ishigami',     label: '石上純也' },
  { id: 'hirata',    wikiTitle: 'Akihisa_Hirata',     label: '平田晃久' },
  { id: 'yamamoto',  wikiTitle: 'Riken_Yamamoto',     label: '山本理顕' },
  { id: 'bowwow',    wikiTitle: 'Atelier_Bow-Wow',    label: 'Atelier Bow-Wow' },
  // C2 expansion (2026-05-06)
  { id: 'tange',     wikiTitle: 'Kenzo_Tange',        label: '丹下健三' },
  { id: 'maki',      wikiTitle: 'Fumihiko_Maki',      label: '槇文彦' },
  { id: 'isozaki',   wikiTitle: 'Arata_Isozaki',      label: '磯崎新' },
  { id: 'kurokawa',  wikiTitle: 'Kisho_Kurokawa',     label: '黒川紀章' },
  { id: 'hara',      wikiTitle: 'Hiroshi_Hara',       label: '原広司' },
  { id: 'kikutake',  wikiTitle: 'Kiyonori_Kikutake',  label: '菊竹清訓' },
  { id: 'taniguchi', wikiTitle: 'Yoshio_Taniguchi',   label: '谷口吉生' },
  { id: 'nagayama',  wikiTitle: 'Yuko_Nagayama',      label: '永山祐子' },
  { id: 'naito',     wikiTitle: 'Hiroshi_Naito',      label: '内藤廣' },
  { id: 'tanijiri',  wikiTitle: 'Makoto_Tanijiri',    label: '谷尻誠' },
  // E1+ expansion (2026-05-06): +10 historic and contemporary masters
  { id: 'maekawa',   wikiTitle: 'Kunio_Maekawa',      label: '前川國男' },
  { id: 'murano',    wikiTitle: 'Togo_Murano',        label: '村野藤吾' },
  { id: 'sakakura',  wikiTitle: 'Junzo_Sakakura',     label: '坂倉準三' },
  { id: 'yoshimura', wikiTitle: 'Junzo_Yoshimura',    label: '吉村順三' },
  { id: 'taniguchi_y', wikiTitle: 'Yoshirō_Taniguchi',label: '谷口吉郎' },
  { id: 'shinohara', wikiTitle: 'Kazuo_Shinohara',    label: '篠原一男' },
  { id: 'hasegawa',  wikiTitle: 'Itsuko_Hasegawa',    label: '長谷川逸子' },
  { id: 'fujimori',  wikiTitle: 'Terunobu_Fujimori',  label: '藤森照信' },
  { id: 'tezuka',    wikiTitle: 'Tezuka_Architects',  label: '手塚貴晴+由比' },
  { id: 'go_hasegawa', wikiTitle: 'Go_Hasegawa',      label: '長谷川豪' },
];

const OUT_DIR = path.join(__dirname, 'architects', 'wiki');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function fetchWiki(title) {
  const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const htmlUrl = `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;

  const summaryRes = await fetch(summaryUrl);
  if (!summaryRes.ok) throw new Error(`summary ${summaryRes.status}`);
  const summary = await summaryRes.json();

  const htmlRes = await fetch(htmlUrl);
  if (!htmlRes.ok) throw new Error(`html ${htmlRes.status}`);
  const html = await htmlRes.text();

  return { summary, html };
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const results = [];
  for (const a of architects) {
    const outFile = path.join(OUT_DIR, `${a.id}.html`);
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 10000) {
      console.log(`↷ ${a.id.padEnd(11)} skip (already fetched)`);
      results.push({ id: a.id, label: a.label, status: 'SKIP' });
      continue;
    }
    await sleep(1500);
    const start = Date.now();
    try {
      const { summary, html } = await fetchWiki(a.wikiTitle);

      fs.writeFileSync(path.join(OUT_DIR, `${a.id}-summary.json`), JSON.stringify(summary, null, 2));
      fs.writeFileSync(path.join(OUT_DIR, `${a.id}.html`), html);

      const r = {
        id: a.id,
        label: a.label,
        wikiTitle: a.wikiTitle,
        summaryExtract: summary.extract?.slice(0, 200),
        htmlSize: html.length,
        ms: Date.now() - start,
        status: 'OK',
      };
      results.push(r);
      console.log(`✓ ${a.id.padEnd(11)} ${(html.length/1024).toFixed(0)}KB / ${r.ms}ms`);
    } catch (e) {
      results.push({ id: a.id, label: a.label, status: 'FAIL', error: e.message });
      console.log(`✗ ${a.id.padEnd(11)} ${e.message}`);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'architects', 'wiki-summary.json'), JSON.stringify(results, null, 2));
  const ok = results.filter(r => r.status === 'OK').length;
  console.log(`\n完成: ${ok}/${architects.length} 成功`);
})();
