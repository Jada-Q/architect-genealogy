const fs = require('fs');
const path = require('path');

// Buildings to try filling gaps for 4 architects.
// Each entry: archId + array of [wiki, title] candidates (tried in order).
const candidates = [
  // hirata 平田晃久
  { archId: 'hirata', tries: [
    ['en', 'Ōta_City_Museum_of_Art_and_Library'],
    ['ja', '太田市美術館・図書館'],
    ['en', 'Tree-ness_House'],
  ]},
  // ishigami 石上純也
  { archId: 'ishigami', tries: [
    ['en', 'Kanagawa_Institute_of_Technology'],
    ['ja', '神奈川工科大学'],
    ['en', 'Art_Biotop_Water_Garden'],
  ]},
  // nagayama 永山祐子
  { archId: 'nagayama', tries: [
    ['en', 'Tokyu_Kabukichō_Tower'],
    ['ja', '東急歌舞伎町タワー'],
    ['ja', '歌舞伎町タワー'],
  ]},
  // bowwow Atelier Bow-Wow — try JP for their projects
  { archId: 'bowwow', tries: [
    ['ja', 'アトリエ・ワン'],
    ['en', 'Atelier_Bow-Wow'],  // already fetched, has no coords
  ]},
  // additional retry for ones that 404'd in EN — try JP
  { archId: 'maki',     tries: [['ja', 'ヒルサイドテラス']] },
  { archId: 'kikutake', tries: [['ja', 'スカイハウス_(住宅)'], ['ja', 'スカイハウス']] },
  { archId: 'ban',      tries: [['ja', 'ポンピドゥー・センター・メス'], ['en', 'Centre_Pompidou-Metz']] },
];

const OUT_DIR = path.join(__dirname, 'architects', 'works-extra');
fs.mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchSummary(wiki, title) {
  const url = `https://${wiki}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'architect-genealogy/0.4 (research)' }
  });
  if (!res.ok) return { ok: false, status: res.status };
  const json = await res.json();
  return { ok: true, json };
}

(async () => {
  const newWorks = [];
  for (const c of candidates) {
    let added = false;
    for (const [wiki, title] of c.tries) {
      if (added) break;
      await sleep(1500);
      const r = await fetchSummary(wiki, title);
      if (!r.ok) {
        console.log(`✗ ${c.archId} / [${wiki}] ${title} → ${r.status}`);
        continue;
      }
      const j = r.json;
      if (!j.coordinates) {
        console.log(`⚠ ${c.archId} / [${wiki}] ${j.title || title} → no coords`);
        continue;
      }
      const work = {
        archId: c.archId,
        name: j.title,
        nameJa: j.titles?.display || j.title,
        wikiTitle: title,
        wikiLang: wiki,
        lat: j.coordinates.lat,
        lng: j.coordinates.lon,
        thumb: j.thumbnail?.source,
        extract: j.extract?.slice(0, 200),
      };
      newWorks.push(work);
      console.log(`✓ ${c.archId} / [${wiki}] ${j.title} → ${j.coordinates.lat.toFixed(3)}, ${j.coordinates.lon.toFixed(3)}`);
      added = true;
    }
    if (!added) console.log(`  → ${c.archId}: no work added\n`);
  }

  // merge with existing works.json
  const existing = JSON.parse(fs.readFileSync(path.join(__dirname, 'architects', 'works.json'), 'utf-8'));
  const merged = [...existing, ...newWorks];
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.json'), JSON.stringify(merged, null, 2));

  // regenerate works.js
  const js = 'window.WORKS = ' + JSON.stringify(merged, null, 2) + ';';
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.js'), js);

  console.log(`\n新增 ${newWorks.length} 件 → 合计 ${merged.length}`);
})();
