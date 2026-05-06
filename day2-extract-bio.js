const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, 'architects', 'wiki');
const OUT_DIR = path.join(__dirname, 'architects', 'bio');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ids = ['ando','kuma','ito','sejima','nishizawa','fujimoto','ban','ishigami','hirata','yamamoto','bowwow','tange','maki','isozaki','kurokawa','hara','kikutake','taniguchi','nagayama','naito','maekawa','murano','sakakura','yoshimura','taniguchi_y','shinohara','hasegawa','fujimori','aoki','tanijiri','tezuka','tane','inui','nishizawa_t','nakamura','chiba','go_hasegawa','shimada'];

function stripHtml(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<sup[\s\S]*?<\/sup>/gi, '')
    .replace(/<table[\s\S]*?<\/table>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x[0-9a-f]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSections(html, headings) {
  const out = [];
  for (const h of headings) {
    const re = new RegExp(`<h[12][^>]*>[^<]*${h}[^<]*</h[12]>([\\s\\S]*?)(?=<h[12]\\b|$)`, 'i');
    const m = html.match(re);
    if (m) out.push(`### ${h}\n${stripHtml(m[1]).slice(0, 3000)}`);
  }
  return out.join('\n\n');
}

const HEADINGS = ['Early life', 'Education', 'Career', 'Biography', 'Life', 'History', '略歴', '経歴', '来歴', '人物', '生涯'];

for (const id of ids) {
  const file = path.join(WIKI_DIR, `${id}.html`);
  if (!fs.existsSync(file)) {
    console.log(`✗ ${id}: file missing`);
    continue;
  }
  const raw = fs.readFileSync(file, 'utf-8');

  let bio;
  if (id === 'bowwow') {
    // wikitext, not html — clean differently
    bio = raw
      .replace(/\{\{[\s\S]*?\}\}/g, '')
      .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
      .replace(/'''/g, '')
      .replace(/''/g, '')
      .replace(/<ref[\s\S]*?<\/ref>/gi, '')
      .replace(/<ref[^/]*\/>/gi, '')
      .replace(/={2,}\s*([^=]+?)\s*={2,}/g, '\n### $1\n')
      .replace(/\n{3,}/g, '\n\n')
      .slice(0, 5000)
      .trim();
  } else {
    bio = extractSections(raw, HEADINGS);
    if (!bio) {
      // fallback: grab first 3000 chars of cleaned body
      bio = stripHtml(raw).slice(0, 3000);
    }
  }

  const lead = (() => {
    const m = raw.match(/<p>([\s\S]*?)<\/p>/);
    return m ? stripHtml(m[1]).slice(0, 800) : '';
  })();

  const content = `# ${id}\n\n## Lead\n${lead}\n\n## Bio\n${bio}\n`;
  fs.writeFileSync(path.join(OUT_DIR, `${id}.md`), content);
  console.log(`✓ ${id.padEnd(11)} ${(content.length/1024).toFixed(1)}KB`);
}
