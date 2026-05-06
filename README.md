# Architects of Japan — A 110-year Family Tree

An interactive genealogy of 38 Japanese architects, mapping master-disciple connections from Le Corbusier's 1928 atelier to today's youngest practices.

**Live**:
- [📖 Scrolling essay](https://architect-genealogy.vercel.app/story) (3-min read · EN / 中文 / 日本語)
- [🔧 Interactive network](https://architect-genealogy.vercel.app) (full data tool)

---

## What this is

Two views of the same dataset:

1. **Story** (`/story`) — a 6-chapter scrolling essay that walks readers through the lineage of Japanese architecture. Editorial typography (Cormorant Garamond + Noto Serif SC), trilingual.

2. **Network tool** (`/`) — a chronological timeline + world map with 11 historical observation cards, lineage filters, Pritzker chronology overlay, and per-architect info cards with Wikipedia thumbnails.

## Data

- **38 architects** — from 村野藤吾 (b.1891) to 田根剛 (b.1979)
- **5 external mentors** — Le Corbusier, Antonin Raymond, Walter Gropius, John Hejduk, Jun Aoki
- **36 master-disciple edges** — `worked_at` / `studied_under` / `siblings`
- **54 verified works** — with coordinates from Wikipedia infoboxes (14 overseas)
- **8 Pritzker laureates** with award year + age at recognition

All data sourced from English and Japanese Wikipedia REST APIs. Coordinates extracted from `summary.coordinates` field.

## Tech stack

- Vanilla HTML / CSS / ES6 modules — no framework
- [D3.js v7](https://d3js.org/) for force layouts and timeline
- [Leaflet](https://leafletjs.com/) for maps with [CARTO](https://carto.com/) basemap
- Wikipedia REST API for source data
- Hosted on [Vercel](https://vercel.com/)

## Repo structure

```
.
├── architects/                 # site root (deployed to Vercel as /)
│   ├── graph.html              # main interactive tool
│   ├── story.html              # scrolling essay
│   ├── data.js                 # nodes + edges
│   ├── works.js                # 54 buildings with coordinates
│   ├── thumbs.js               # Wikipedia thumbnail URLs
│   ├── i18n.js                 # ZH/EN/JA dictionaries
│   ├── bio/                    # extracted biographical text
│   ├── works.json              # source-of-truth works data
│   └── genealogy.json          # source-of-truth genealogy
│
├── day*-*.js                   # Wikipedia fetch & extract scripts
├── extract-thumbs.js           # builds thumbs.js from cached summaries
├── screenshot-graph.js         # E2E screenshot tests
├── walkthrough.js              # full UX walkthrough test
├── deploy/                     # Vercel deploy folder (mirror of architects/)
│
├── package.json
└── vercel.json                 # cleanUrls config
```

## Run locally

```bash
npm install
npx playwright install chromium   # for screenshot/test scripts

# Serve the site (any static server)
cd architects
python3 -m http.server 8000
open http://localhost:8000/graph.html
```

## Re-fetch data from Wikipedia

```bash
node day2-wiki-fetch.js          # fetch architect summaries + HTML
node day2-extract-bio.js         # extract bios from HTML
node day3-fetch-works.js         # fetch building coordinates
node day6-overseas-works.js      # fetch overseas works
node extract-thumbs.js           # rebuild thumbs.js
```

Each script has rate-limit handling (1.5–2 s sleep between requests, retry on 429).

## Acknowledgments

- Wikipedia editors of the EN and JA sites — primary source for all data
- [MoMA's "Inventing Abstraction"](https://www.moma.org/interactives/exhibitions/2012/inventingabstraction/) — visual inspiration for the network view
- [The Pudding](https://pudding.cool/) — narrative scrolling format
- [Distill.pub](https://distill.pub/) — typography and information design

## License

MIT — see [LICENSE](LICENSE)

---

Built in Tokyo · 2026-05
