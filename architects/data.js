// Architect Genealogy data v0.6
// 38 internal architects + 4 external mentors · 36 edges
// Source: English + Japanese Wikipedia (extracted 2026-05-06)
window.GENEALOGY = {
  nodes: [
    // ── External mentors (foreign / out-of-scope) ──
    { id: "corbusier", label: "Le Corbusier",   labelEn: "Le Corbusier",       external: true, born: 1887, died: 1965, note: "20世紀建築の巨匠、Maekawa/Sakakura 上司" },
    { id: "raymond",   label: "Antonin Raymond",labelEn: "Antonin Raymond",    external: true, born: 1888, died: 1976, note: "Wright弟子、日本で実務 Maekawa/Yoshimura 雇用" },
    { id: "gropius",   label: "Walter Gropius", labelEn: "Walter Gropius",     external: true, born: 1883, died: 1969, note: "Bauhaus、谷口吉生 Harvard 影響" },
    { id: "hejduk",    label: "John Hejduk",    labelEn: "John Hejduk",        external: true, born: 1929, died: 2000, note: "Cooper Union, NY Five, Ban 師承" },

    // ── Generation 0: 1900-1928 ──
    { id: "murano",    label: "村野藤吾",       labelEn: "Togo Murano",        born: 1891, died: 1984, founded: 1929, school: "Waseda U", note: "Osaka 拠点、sukiya様式" },
    { id: "yoshimura", label: "吉村順三",       labelEn: "Junzo Yoshimura",    born: 1908, died: 1997, founded: 1941, school: "Tokyo Fine Arts", note: "Antonin Raymond 弟子" },
    { id: "sakakura",  label: "坂倉準三",       labelEn: "Junzo Sakakura",     born: 1901, died: 1969, founded: 1939, school: "Tokyo Imperial U", note: "Le Corbusier アトリエ chef" },
    { id: "maekawa",   label: "前川國男",       labelEn: "Kunio Maekawa",      born: 1905, died: 1986, founded: 1935, school: "Tokyo Imperial U", note: "Le Corbusier + Raymond 両師" },
    { id: "taniguchi_y", label: "谷口吉郎",     labelEn: "Yoshirō Taniguchi",  born: 1904, died: 1979, founded: 1934, school: "Tokyo Imperial U", note: "現代和風建築、谷口吉生の父" },

    // ── Generation 1: 1913-1928 ──
    { id: "tange",     label: "丹下健三",       labelEn: "Kenzo Tange",        born: 1913, died: 2005, founded: 1946, school: "U Tokyo", pritzker: 1987 },
    { id: "kikutake",  label: "菊竹清訓",       labelEn: "Kiyonori Kikutake",  born: 1928, died: 2011, founded: 1953, school: "Waseda U" },
    { id: "shinohara", label: "篠原一男",       labelEn: "Kazuo Shinohara",    born: 1925, died: 2006, founded: 1954, school: "Tokyo Tech", note: "Shinohara School" },

    // ── Generation 2: 1928-1945 ──
    { id: "maki",      label: "槇文彦",         labelEn: "Fumihiko Maki",      born: 1928, died: 2024, founded: 1965, school: "U Tokyo / Cranbrook / Harvard GSD", pritzker: 1993 },
    { id: "kurokawa",  label: "黒川紀章",       labelEn: "Kisho Kurokawa",     born: 1934, died: 2007, founded: 1962, school: "Kyoto U / U Tokyo" },
    { id: "isozaki",   label: "磯崎新",         labelEn: "Arata Isozaki",      born: 1931, died: 2022, founded: 1963, school: "U Tokyo", pritzker: 2019 },
    { id: "hara",      label: "原広司",         labelEn: "Hiroshi Hara",       born: 1936, died: 2025, founded: 1970, school: "U Tokyo" },
    { id: "ando",      label: "安藤忠雄",       labelEn: "Tadao Ando",         born: 1941,             founded: 1968, school: "self-taught", pritzker: 1995 },
    { id: "ito",       label: "伊東豊雄",       labelEn: "Toyo Ito",           born: 1941,             founded: 1979, school: "U Tokyo", pritzker: 2013 },
    { id: "hasegawa",  label: "長谷川逸子",     labelEn: "Itsuko Hasegawa",    born: 1941,             founded: 1976, school: "Kanto Gakuin → Tokyo Tech", note: "女性建築家先駆者" },
    { id: "yamamoto",  label: "山本理顕",       labelEn: "Riken Yamamoto",     born: 1945,             founded: 1973, school: "Nihon U → Geidai → U Tokyo", pritzker: 2024 },
    { id: "fujimori",  label: "藤森照信",       labelEn: "Terunobu Fujimori",  born: 1946,             founded: 1991, school: "Tohoku → U Tokyo" },
    { id: "taniguchi", label: "谷口吉生",       labelEn: "Yoshio Taniguchi",   born: 1937,             founded: 1975, school: "Keio / Harvard GSD" },
    { id: "naito",     label: "内藤廣",         labelEn: "Hiroshi Naito",      born: 1950,             founded: 1981, school: "Waseda U" },

    // ── Generation 3: 1950s-60s ──
    { id: "kuma",      label: "隈研吾",         labelEn: "Kengo Kuma",         born: 1954,             founded: 1990, school: "U Tokyo" },
    { id: "aoki",      label: "青木淳",         labelEn: "Jun Aoki",           born: 1956,             founded: 1991, school: "U Tokyo", note: "Louis Vuitton 系列、磯崎新弟子" },
    { id: "sejima",    label: "妹島和世",       labelEn: "Kazuyo Sejima",      born: 1956,             founded: 1987, school: "Japan Women's U", pritzker: 2010 },
    { id: "ban",       label: "坂茂",           labelEn: "Shigeru Ban",        born: 1957,             founded: 1985, school: "SCI-Arc / Cooper Union", pritzker: 2014 },
    { id: "chiba",     label: "千葉学",         labelEn: "Manabu Chiba",       born: 1960,             founded: 2001, school: "U Tokyo", note: "Ando 研究室助手" },
    { id: "tezuka",    label: "手塚貴晴+由比",  labelEn: "Tezuka Architects",  born: 1964,             founded: 1994, school: "Musashi Tech / U Penn", note: "ふじようちえん" },
    { id: "nishizawa_t", label: "西沢大良",     labelEn: "Taira Nishizawa",    born: 1964,             founded: 1993, school: "Tokyo Tech", note: "西沢立衛の兄" },
    { id: "nishizawa", label: "西沢立衛",       labelEn: "Ryue Nishizawa",     born: 1966,             founded: 1997, school: "Yokohama National U", pritzker: 2010 },
    { id: "inui",      label: "乾久美子",       labelEn: "Kumiko Inui",        born: 1969,             founded: 2000, school: "Geidai / Yale", note: "横浜国大教授" },
    { id: "bowwow",    label: "Atelier Bow-Wow",labelEn: "Atelier Bow-Wow",                            founded: 1992, school: "Tokyo Tech" },

    // ── Generation 4: 1970s+ ──
    { id: "fujimoto",  label: "藤本壮介",       labelEn: "Sou Fujimoto",       born: 1971,             founded: 2000, school: "U Tokyo" },
    { id: "hirata",    label: "平田晃久",       labelEn: "Akihisa Hirata",     born: 1971,             founded: 2005, school: "Kyoto U" },
    { id: "shimada",   label: "島田陽",         labelEn: "Yo Shimada",         born: 1972,             founded: 1997, school: "Kyoto City U Arts", note: "Tato Architects, Kobe" },
    { id: "tanijiri",  label: "谷尻誠",         labelEn: "Makoto Tanijiri",    born: 1974,             founded: 2000, school: "Anabuki Vocational", note: "Suppose Design Office, Hiroshima" },
    { id: "nakamura",  label: "中村拓志",       labelEn: "Hiroshi Nakamura",   born: 1974,             founded: 2002, school: "Meiji U", note: "NAP, Optical Glass House" },
    { id: "ishigami",  label: "石上純也",       labelEn: "Junya Ishigami",     born: 1974,             founded: 2004, school: "Geidai" },
    { id: "nagayama",  label: "永山祐子",       labelEn: "Yuko Nagayama",      born: 1975,             founded: 2002, school: "Showa Women's U" },
    { id: "go_hasegawa", label: "長谷川豪",     labelEn: "Go Hasegawa",        born: 1977,             founded: 2005, school: "Tokyo Tech (Tsukamoto lab)" },
    { id: "tane",      label: "田根剛",         labelEn: "Tsuyoshi Tane",      born: 1979,             founded: 2017, school: "Hokkaido Tokai U", note: "Atelier Tsuyoshi Tane, Paris" }
  ],
  edges: [
    // ── 海外巨匠 → 戦前世代 ──
    { source: "corbusier", target: "maekawa",   type: "worked_at",     note: "Paris アトリエ 1928-1930" },
    { source: "corbusier", target: "sakakura",  type: "worked_at",     note: "Paris アトリエ chef" },
    { source: "raymond",   target: "maekawa",   type: "worked_at",     note: "1930-1935 在日本" },
    { source: "raymond",   target: "yoshimura", type: "worked_at",     note: "1928-、卒業後 full-time" },
    // ── 戦前 → 丹下 ──
    { source: "maekawa",   target: "tange",     type: "worked_at",     note: "戦前、Mayekawa Associates" },
    // ── 丹下系骨架 ──
    { source: "tange",     target: "maki",      type: "studied_under", note: "U Tokyo Tange教授" },
    { source: "tange",     target: "isozaki",   type: "worked_at",     note: "Tange事務所、〜1963 独立" },
    { source: "tange",     target: "kurokawa",  type: "studied_under", note: "U Tokyo 修士、Tange指導" },
    { source: "tange",     target: "taniguchi", type: "worked_at",     note: "Tange事務所 1964-1972" },
    // ── 父子 ──
    { source: "taniguchi_y", target: "taniguchi", type: "studied_under", note: "父→子（建築家）" },
    // ── 磯崎 → 青木 ──
    { source: "isozaki",   target: "aoki",      type: "worked_at",     note: "磯崎新アトリエ 1982-1991" },
    // ── 青木系 ──
    { source: "aoki",      target: "inui",      type: "worked_at",     note: "青木淳事務所 1996-2000" },
    { source: "aoki",      target: "nagayama",  type: "worked_at",     note: "Jun Aoki & Assoc 1998-2002" },
    // ── 篠原系 ──
    { source: "shinohara", target: "ito",       type: "studied_under", note: "Shinohara School、思想的影響" },
    { source: "shinohara", target: "hasegawa",  type: "studied_under", note: "1971-1978、Tokyo Tech 篠原研" },
    // ── 菊竹系 ──
    { source: "kikutake",  target: "ito",       type: "worked_at",     note: "1965-1969" },
    { source: "kikutake",  target: "hasegawa",  type: "worked_at",     note: "1964-1969" },
    { source: "kikutake",  target: "naito",     type: "worked_at",     note: "1979-1981" },
    // ── 原系 ──
    { source: "hara",      target: "yamamoto",  type: "studied_under", note: "U Tokyo 博士課程" },
    // ── 伊東系（次世代） ──
    { source: "ito",       target: "sejima",    type: "worked_at",     note: "Toyo Ito & Assoc 1981-1987" },
    { source: "ito",       target: "nishizawa", type: "worked_at",     note: "Toyo Ito & Assoc" },
    { source: "ito",       target: "hirata",    type: "worked_at",     note: "Toyo Ito & Assoc" },
    // ── 妹島系 ──
    { source: "sejima",    target: "nishizawa", type: "worked_at",     note: "K. Sejima → SANAA 共同設立" },
    { source: "sejima",    target: "ishigami",  type: "worked_at",     note: "SANAA 2000-2004" },
    // ── 安藤系（small branch） ──
    { source: "ando",      target: "chiba",     type: "studied_under", note: "U Tokyo 安藤研究室助手" },
    // ── 隈系 ──
    { source: "kuma",      target: "nakamura",  type: "worked_at",     note: "隈研吾事務所 1999-2002" },
    // ── 西沢兄弟 + 田根に向かうインターン ──
    { source: "nishizawa_t", target: "nishizawa", type: "siblings",   note: "兄弟（兄→弟）" },
    { source: "nishizawa_t", target: "go_hasegawa", type: "worked_at", note: "西沢大良事務所 2002-2005" },
    { source: "bowwow",    target: "go_hasegawa", type: "studied_under", note: "Tokyo Tech 塚本研 修士" },
    // ── 田根 (intern at multiple) ──
    { source: "ban",       target: "tane",      type: "worked_at",     note: "在学中インターン" },
    { source: "sejima",    target: "tane",      type: "worked_at",     note: "SANAA インターン" },
    { source: "fujimoto",  target: "tane",      type: "worked_at",     note: "在学中インターン" },
    // ── Hejduk 系 ──
    { source: "hejduk",    target: "ban",       type: "studied_under", note: "Cooper Union 〜1984" },
    { source: "gropius",   target: "taniguchi", type: "worked_at",     note: "Harvard 後、短期" },
    // ── 藤森系（思想影響）──
    { source: "fujimori",  target: "bowwow",    type: "studied_under", note: "ROJO/Made in Tokyo 影響" }
  ],
  meta: {
    version: "0.6",
    extracted: "2026-05-06",
    source: "Wikipedia EN + JA",
    notes: "+ 10 active 2000-2026 architects (青木淳/谷尻誠/手塚/田根剛/乾久美子/西沢大良/中村拓志/千葉学/長谷川豪/島田陽)"
  }
};
