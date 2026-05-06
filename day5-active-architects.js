const fs = require('fs');
const path = require('path');

// 10 architects active 2000-2026, not yet in our set (or external)
const architects = [
  { id: 'aoki',         tries: [['en','Jun_Aoki'], ['ja','青木淳']],          label: '青木淳' },
  { id: 'tanijiri',     tries: [['ja','谷尻誠']],                              label: '谷尻誠' },
  { id: 'tezuka',       tries: [['ja','手塚貴晴'], ['ja','手塚貴晴・由比']],  label: '手塚貴晴+由比' },
  { id: 'tane',         tries: [['en','Tsuyoshi_Tane'], ['ja','田根剛']],     label: '田根剛' },
  { id: 'inui',         tries: [['en','Kumiko_Inui'], ['ja','乾久美子']],     label: '乾久美子' },
  { id: 'nishizawa_t',  tries: [['ja','西沢大良']],                            label: '西沢大良' },
  { id: 'nakamura',     tries: [['ja','中村拓志_(建築家)'], ['ja','中村拓志']], label: '中村拓志' },
  { id: 'chiba',        tries: [['ja','千葉学'], ['en','Manabu_Chiba']],      label: '千葉学' },
  { id: 'go_hasegawa',  tries: [['ja','長谷川豪']],                            label: '長谷川豪' },
  { id: 'shimada',      tries: [['ja','島田陽_(建築家)'], ['ja','島田陽']],   label: '島田陽' },
];

const WIKI_DIR = path.join(__dirname, 'architects', 'wiki');
fs.mkdirSync(WIKI_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function tryFetch(wiki, title) {
  const summaryUrl = `https://${wiki}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const htmlUrl = `https://${wiki}.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;
  const headers = { 'User-Agent': 'architect-genealogy/0.6' };
  const sumRes = await fetch(summaryUrl, { headers });
  if (!sumRes.ok) return { ok: false, status: sumRes.status };
  const summary = await sumRes.json();
  // disambiguation page check
  if (summary.type === 'disambiguation') return { ok: false, status: 'disambig' };
  await sleep(800);
  const htmlRes = await fetch(htmlUrl, { headers });
  if (!htmlRes.ok) return { ok: false, status: htmlRes.status };
  const html = await htmlRes.text();
  return { ok: true, summary, html, wiki };
}

(async () => {
  for (const a of architects) {
    const sumFile = path.join(WIKI_DIR, `${a.id}-summary.json`);
    const htmlFile = path.join(WIKI_DIR, `${a.id}.html`);
    if (fs.existsSync(sumFile) && fs.statSync(sumFile).size > 100) {
      console.log(`↷ ${a.id} skip (cached)`);
      continue;
    }
    let success = null;
    for (const [wiki, title] of a.tries) {
      await sleep(1500);
      const r = await tryFetch(wiki, title);
      if (r.ok) {
        success = { ...r, title };
        break;
      }
      console.log(`  ${a.id} [${wiki}] ${title} → ${r.status}`);
    }
    if (success) {
      fs.writeFileSync(sumFile, JSON.stringify(success.summary, null, 2));
      fs.writeFileSync(htmlFile, success.html);
      console.log(`✓ ${a.id.padEnd(13)} [${success.wiki}] ${success.summary.title}  (${(success.html.length/1024).toFixed(0)}KB)`);
    } else {
      console.log(`✗ ${a.id.padEnd(13)} no source`);
    }
  }
})();
