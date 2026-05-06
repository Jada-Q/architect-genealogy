const fs = require('fs');
const path = require('path');

// 3 candidate works per architect (EN Wikipedia titles).
// Script will fetch each, keep only ones with verified coordinates.
const candidates = {
  tange: [
    'Hiroshima_Peace_Memorial_Museum',
    'Yoyogi_National_Gymnasium',
    'Tokyo_Metropolitan_Government_Building',
  ],
  kikutake: [
    'Sky_House',
    'Edo-Tokyo_Museum',
    'Hotel_Tokoen',
  ],
  maki: [
    'Hillside_Terrace',
    '4_World_Trade_Center',
    'Makuhari_Messe',
  ],
  isozaki: [
    'Art_Tower_Mito',
    'Museum_of_Contemporary_Art,_Los_Angeles',
    'Allianz_Tower,_Milan',
  ],
  kurokawa: [
    'Nakagin_Capsule_Tower',
    'National_Art_Center,_Tokyo',
    'Nagoya_City_Art_Museum',
  ],
  hara: [
    'Umeda_Sky_Building',
    'Kyoto_Station',
    'Sapporo_Dome',
  ],
  ando: [
    'Church_of_the_Light',
    'Chichu_Art_Museum',
    'Omotesando_Hills',
  ],
  ito: [
    'Sendai_Mediatheque',
    "Tama_Art_University_Library",
    'TOD%27s_Omotesando_Building',
  ],
  yamamoto: [
    'Future_University_Hakodate',
    'Yokosuka_Museum_of_Art',
  ],
  taniguchi: [
    'Museum_of_Modern_Art',
    'D.T._Suzuki_Museum',
    'Gallery_of_Hōryū-ji_Treasures',
  ],
  naito: [
    'Toba_Sea-Folk_Museum',
    'Asahikawa_Station',
  ],
  kuma: [
    'Japan_National_Stadium',
    'V%26A_Dundee',
    'Asakusa_Culture_Tourist_Information_Center',
  ],
  sejima: [
    '21st_Century_Museum_of_Contemporary_Art,_Kanazawa',
    'New_Museum',
    'Rolex_Learning_Center',
  ],
  ban: [
    'Centre_Pompidou-Metz',
    'Aspen_Art_Museum',
    'Christchurch_Cardboard_Cathedral',
  ],
  bowwow: [
    // Atelier Bow-Wow has few buildings with EN Wiki pages
  ],
  nishizawa: [
    'Teshima_Art_Museum',
    'Moriyama_House',
  ],
  fujimoto: [
    'Serpentine_Pavilion',
    'House_NA',
    'Musashino_Art_University_Museum_%26_Library',
  ],
  hirata: [
    // Few EN wiki pages
  ],
  ishigami: [
    // Mostly no individual Wiki pages
  ],
  nagayama: [
    'Tokyu_Kabukichō_Tower',
  ],
};

const OUT_DIR = path.join(__dirname, 'architects', 'works');
fs.mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'architect-genealogy/0.3 (research)' }
  });
  if (!res.ok) return { ok: false, status: res.status };
  const json = await res.json();
  return { ok: true, json };
}

(async () => {
  const all = [];
  let n = 0, total = Object.values(candidates).flat().length;

  for (const [archId, titles] of Object.entries(candidates)) {
    for (const title of titles) {
      n++;
      const cached = path.join(OUT_DIR, `${title.replace(/[^a-z0-9_-]/gi, '_')}.json`);
      let result;
      if (fs.existsSync(cached)) {
        result = { ok: true, json: JSON.parse(fs.readFileSync(cached, 'utf-8')) };
      } else {
        await sleep(1500);
        result = await fetchSummary(title);
        if (result.ok) fs.writeFileSync(cached, JSON.stringify(result.json, null, 2));
      }
      if (!result.ok) {
        console.log(`✗ [${n}/${total}] ${archId} / ${title} → ${result.status}`);
        continue;
      }
      const j = result.json;
      const coords = j.coordinates;
      if (!coords) {
        console.log(`⚠ [${n}/${total}] ${archId} / ${j.title} → no coords`);
        continue;
      }
      const work = {
        archId,
        name: j.title,
        nameJa: j.titles?.display || j.title,
        wikiTitle: title,
        lat: coords.lat,
        lng: coords.lon,
        thumb: j.thumbnail?.source,
        extract: j.extract?.slice(0, 200),
      };
      all.push(work);
      console.log(`✓ [${n}/${total}] ${archId} / ${j.title} → ${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}`);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'architects', 'works.json'), JSON.stringify(all, null, 2));
  console.log(`\n保存 ${all.length} / ${total} 件作品 → works.json`);
})();
