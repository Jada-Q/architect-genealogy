const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, 'architects', 'wiki');
const ids = ['ando','kuma','ito','sejima','nishizawa','fujimoto','ban','ishigami','hirata','yamamoto','bowwow','tange','maki','isozaki','kurokawa','hara','kikutake','taniguchi','nagayama','naito','maekawa','murano','sakakura','yoshimura','taniguchi_y','shinohara','hasegawa','fujimori','aoki','tanijiri','tezuka','tane','inui','nishizawa_t','nakamura','chiba','go_hasegawa','shimada'];

const thumbs = {};
const extracts = {};  // { id: { text, lang } }
for (const id of ids) {
  const file = path.join(WIKI_DIR, `${id}-summary.json`);
  if (!fs.existsSync(file)) {
    console.log(`✗ ${id}: no summary`);
    continue;
  }
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  if (j.thumbnail?.source) thumbs[id] = j.thumbnail.source;
  if (j.extract) {
    extracts[id] = {
      text: j.extract.slice(0, 280),
      lang: j.lang || 'en'
    };
  }
  const lang = j.lang || '?';
  console.log(`${j.thumbnail?.source ? '✓' : '⚠'} ${id.padEnd(13)} [${lang}] ${j.thumbnail?.source ? '(thumb)' : ''}`);
}

const out = `window.THUMBS = ${JSON.stringify(thumbs, null, 2)};
window.EXTRACTS = ${JSON.stringify(extracts, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'architects', 'thumbs.js'), out);
console.log(`\n${Object.keys(thumbs).length}/${ids.length} thumbnails saved → thumbs.js`);
