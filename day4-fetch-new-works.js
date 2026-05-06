const fs = require('fs');
const path = require('path');

// Top works for the 8 new architects (try EN Wiki, fall back to JA)
const candidates = [
  { archId: 'maekawa', tries: [
    ['en', 'Tokyo_Bunka_Kaikan'],
    ['ja', '東京文化会館'],
    ['ja', '神奈川県立音楽堂'],
    ['ja', '国際文化会館'],
  ]},
  { archId: 'murano', tries: [
    ['en', 'Nissay_Theatre'],
    ['ja', '日生劇場'],
    ['en', 'Memorial_Cathedral_for_World_Peace'],
    ['ja', '世界平和記念聖堂'],
  ]},
  { archId: 'sakakura', tries: [
    ['en', 'Museum_of_Modern_Art,_Kamakura'],
    ['ja', '神奈川県立近代美術館'],
    ['ja', '神奈川県立近代美術館_鎌倉館'],
  ]},
  { archId: 'yoshimura', tries: [
    ['en', 'International_House_of_Japan'],
    ['ja', '国際文化会館'],
    ['ja', '軽井沢の山荘'],
  ]},
  { archId: 'taniguchi_y', tries: [
    ['ja', '帝国劇場'],
    ['en', 'Imperial_Theatre,_Tokyo'],
    ['ja', '東京国立博物館東洋館'],
  ]},
  { archId: 'shinohara', tries: [
    ['en', 'Tokyo_Institute_of_Technology'],
    ['ja', '東京工業大学'],
    ['ja', 'ハウス・イン・ヨコハマ'],
  ]},
  { archId: 'hasegawa', tries: [
    ['ja', '湘南台文化センター'],
    ['en', 'Shōnandai_Cultural_Center'],
    ['ja', 'りゅーとぴあ_新潟市民芸術文化会館'],
    ['ja', '新潟市民芸術文化会館'],
  ]},
  { archId: 'fujimori', tries: [
    ['ja', '神長官守矢史料館'],
    ['en', 'Jinchōkan_Moriya_Historical_Museum'],
    ['ja', '高過庵'],
    ['ja', 'ラムネ温泉館'],
  ]},
];

const OUT_DIR = path.join(__dirname, 'architects', 'works-extra');
fs.mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchSummary(wiki, title) {
  const url = `https://${wiki}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'architect-genealogy/0.5 (research)' }
  });
  if (!res.ok) return { ok: false, status: res.status };
  const json = await res.json();
  return { ok: true, json };
}

(async () => {
  const newWorks = [];
  for (const c of candidates) {
    let count = 0;  // try to get up to 2 works per architect
    for (const [wiki, title] of c.tries) {
      if (count >= 2) break;
      await sleep(1800);
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
      console.log(`✓ ${c.archId} / [${wiki}] ${j.title} → ${j.coordinates.lat.toFixed(3)}, ${j.coordinates.lon.toFixed(3)}`);
      count++;
    }
  }

  const existing = JSON.parse(fs.readFileSync(path.join(__dirname, 'architects', 'works.json'), 'utf-8'));
  const merged = [...existing, ...newWorks];
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.json'), JSON.stringify(merged, null, 2));
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.js'),
    'window.WORKS = ' + JSON.stringify(merged, null, 2) + ';');
  console.log(`\n新增 ${newWorks.length} 件 → 合计 ${merged.length}`);
})();
