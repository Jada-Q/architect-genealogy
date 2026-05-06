const fs = require('fs');
const path = require('path');

// Top works for the 10 new architects
const candidates = [
  { archId: 'aoki',         tries: [['ja','青森県立美術館'], ['ja','京都市京セラ美術館']] },
  { archId: 'tezuka',       tries: [['ja','ふじようちえん']] },
  { archId: 'tane',         tries: [['ja','エストニア国立博物館'], ['ja','弘前れんが倉庫美術館']] },
  { archId: 'inui',         tries: [['ja','エンクロス']] },
  { archId: 'nakamura',     tries: [['ja','リボンチャペル']] },
  { archId: 'tanijiri',     tries: [['ja','ONOMICHI_U2']] },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchSummary(wiki, title) {
  const url = `https://${wiki}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'architect-genealogy/0.6' } });
  if (!res.ok) return { ok: false, status: res.status };
  return { ok: true, json: await res.json() };
}

(async () => {
  const newWorks = [];
  for (const c of candidates) {
    let added = false;
    for (const [wiki, title] of c.tries) {
      if (added) break;
      await sleep(1500);
      const r = await fetchSummary(wiki, title);
      if (!r.ok) { console.log(`✗ ${c.archId} ${title} → ${r.status}`); continue; }
      const j = r.json;
      if (!j.coordinates) { console.log(`⚠ ${c.archId} ${j.title || title} → no coords`); continue; }
      newWorks.push({
        archId: c.archId,
        name: j.title,
        nameJa: j.titles?.display || j.title,
        wikiTitle: title,
        wikiLang: wiki,
        lat: j.coordinates.lat,
        lng: j.coordinates.lon,
        thumb: j.thumbnail?.source,
        extract: j.extract?.slice(0, 200),
      });
      console.log(`✓ ${c.archId} / ${j.title} → ${j.coordinates.lat.toFixed(3)}, ${j.coordinates.lon.toFixed(3)}`);
      added = true;
    }
  }

  const existing = JSON.parse(fs.readFileSync(path.join(__dirname, 'architects', 'works.json'), 'utf-8'));
  const merged = [...existing, ...newWorks];
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.json'), JSON.stringify(merged, null, 2));
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.js'), 'window.WORKS = ' + JSON.stringify(merged, null, 2) + ';');
  console.log(`\n+${newWorks.length} → 合計 ${merged.length}`);
})();
