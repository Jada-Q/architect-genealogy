const fs = require('fs');
const path = require('path');

// 8 iconic overseas works for top architects
const candidates = [
  { archId: 'ando',       tries: [['en','Punta_della_Dogana'], ['en','Pinault_Collection_(Punta_della_Dogana)']] },
  { archId: 'ando',       tries: [['en','Modern_Art_Museum_of_Fort_Worth']] },
  { archId: 'maki',       tries: [['en','Aga_Khan_Museum']] },
  { archId: 'sejima',     tries: [['en','Louvre-Lens']] },
  { archId: 'tane',       tries: [['en','Estonian_National_Museum']] },
  { archId: 'isozaki',    tries: [['en','Allianz_Tower,_Milan'], ['en','Allianz_Tower'], ['en','Generali_Tower'], ['en','CityLife_(Milan)']] },
  { archId: 'fujimoto',   tries: [['en','House_of_Music_Hungary'], ['en','House_of_Music,_Budapest']] },
  { archId: 'ando',       tries: [['en','Pulitzer_Arts_Foundation']] },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchSummary(wiki, title) {
  const url = `https://${wiki}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'architect-genealogy/0.7' } });
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
        overseas: true,
      });
      console.log(`✓ ${c.archId} / ${j.title} → ${j.coordinates.lat.toFixed(3)}, ${j.coordinates.lon.toFixed(3)}`);
      added = true;
    }
  }

  const existing = JSON.parse(fs.readFileSync(path.join(__dirname, 'architects', 'works.json'), 'utf-8'));
  // mark existing non-Japan works as overseas too
  const isOverseas = (w) => {
    if (w.overseas) return true;
    return !(w.lat > 24 && w.lat < 46 && w.lng > 122 && w.lng < 146);  // outside Japan bbox
  };
  existing.forEach(w => { if (isOverseas(w)) w.overseas = true; });
  const merged = [...existing, ...newWorks];
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.json'), JSON.stringify(merged, null, 2));
  fs.writeFileSync(path.join(__dirname, 'architects', 'works.js'), 'window.WORKS = ' + JSON.stringify(merged, null, 2) + ';');
  const overseasCount = merged.filter(w => w.overseas).length;
  console.log(`\n+${newWorks.length} → 合计 ${merged.length}（其中海外 ${overseasCount}）`);
})();
