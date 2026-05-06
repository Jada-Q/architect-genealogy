// i18n dictionary for Architect Genealogy
// Japanese architect names (label) are already in CJK in data.js — only translations
// for non-Japanese mentors and UI strings live here.
window.I18N = {
  zh: {
    htmlLang: 'zh',
    title: '日本建筑师师承与代表作',
    subtitleSuffix: '· 师承 + 代表作（Wikipedia EN/JA）· 2026-05-06',
    statsNodes: '节点', statsArchs: '建筑师', statsMentors: 'mentor', statsEdges: '师承',
    statsWorks: '件作品', statsCovered: 'architects covered',
    paneTimeline: 'Genealogy Timeline', paneMap: '代表作 Map',
    statsChrono: '建筑师（按出生年）', statsArchsRaw: 'architects',

    lineageLabel: 'Lineage:',
    lineage: {
      tange: '丹下系',
      shinohara: '篠原+菊竹+伊東系',
      hara: '原広司系',
      aoki: '青木系',
      ban: 'Hejduk→坂',
      fujimori: '藤森→Bow-Wow',
      kuma: '隈→中村',
      ando: '安藤→千葉',
      independent: '独立',
    },
    filter: {
      all: '全部',
      pritzker: '⭐ Pritzker',
    },
    legend: { worked: 'worked_at（实习/任职）', studied: 'studied_under（师从）', pritzker: 'Pritzker 获奖者' },
    cardHint: '点节点 / marker 联动 · 拖拽 · 滚轮缩放',
    topHubs: 'Top 5 Hubs (degree)',

    info: {
      lineageSuffix: '系',
      born: '生卒年', founded: '事务所创立', school: '学校', pritzker: 'Pritzker',
      mentor: '师承', students: '弟子', works: '代表作', noWorks: 'Wikipedia 数据待补',
      workImage: '代表作图片', note: '注', degree: 'degree', ageSuffix: '岁',
    },

    obs: {
      '1941':         { p: '1941 同年',        t: '黄金一代',           d: '一年内 3 位 Pritzker 量级建筑师同时出生', x: '伊東豊雄 ・ 安藤忠雄 ・ 長谷川逸子' },
      '1925-1934':    { p: '1925-1934 · 10 年', t: '大师集中年',         d: '10 年间出生 5 位日本建筑界半部史核心人物', x: '篠原 1925 ・菊竹 1928 ・槇 1928 ・磯崎 1931 ・黒川 1934' },
      'foreign-gap':  { p: '~25 年代际差',     t: '海外巨匠 vs 日本本土', d: 'Modernism 比日本本土早一代，前川/坂倉去欧洲带回来', x: 'Gropius 1883 ・Corbusier 1887 ・Raymond 1888 → 丹下 1913' },
      'utokyo':       { p: '学派',             t: '东大独占',           d: 'U Tokyo 系节点 13 个，覆盖三代师承',     x: '前川・丹下・槇・磯崎・黒川・伊東・隈・山本・藤本・藤森' },
      'women':        { p: '性别 timeline',    t: '女性建筑师',         d: '4 位代表女性建筑师，跨越 34 年，妹島是首位 Pritzker 女性', x: '長谷川 1941 ・妹島 1956 ・乾久美子 1969 ・永山 1975' },
      'metabolism':   { p: '1960 运动',        t: 'Metabolism 派',     d: '1960 东京世界设计大会发起的代谢运动核心 5 人', x: '丹下・菊竹・黒川・槇・磯崎' },
      'corbusier-chain': { p: '3 世代影响',    t: 'Corbusier 影响链',   d: 'Le Corbusier → 前川/坂倉 → 丹下 → 槇/磯崎/黒川/谷口（间接 6 人）', x: '海外巨匠通过 2 个中转节点辐射 8 位日本建筑师' },
      'overseas':     { p: '出洋归国',         t: '海外修业组',         d: '8 位建筑师赴欧美学习/工作后回日本立业',     x: '前川・坂倉・吉村・槇・谷口・坂・隈・藤本' },
      'pritzker-age': { p: '44 ↔ 88 岁',      t: 'Pritzker 受赏年龄差', d: '最年轻 44（西沢）vs 最年长 88（磯崎）— 跨度 44 年', x: '点击看获奖年代连线（zigzag = 延迟认可模式）' },
      'waseda':       { p: '早稲田大学',       t: '早大派',             d: '3 位独立于东大主流的建筑师，全部 Waseda 出身', x: '村野藤吾 ・菊竹清訓 ・内藤廣' },
      'tokyotech':    { p: '東京工業大学',     t: '东工大派（实验）',     d: '篠原一男教授为中心的理论实验派',           x: '篠原（教授）・長谷川（修士）・Bow-Wow（学部+博士）' },
      'overseas-works': { p: '海外作品',       t: '海外進出組',         d: '日本建筑师在海外建成的代表作品（含 14 件）', x: '安藤（威尼斯/Fort Worth/St. Louis）・坂（Metz/Aspen）・SANAA（NY/Lausanne）・磯崎（LA/Milan）・田根（Estonia）・槇（Toronto/NYC）・Kuma（Dundee）' },
    }
  },

  en: {
    htmlLang: 'en',
    title: 'Architect Genealogy — Japan',
    subtitleSuffix: '· Lineage + Notable works (Wikipedia EN/JA) · 2026-05-06',
    statsNodes: 'nodes', statsArchs: 'architects', statsMentors: 'mentors', statsEdges: 'edges',
    statsWorks: 'works', statsCovered: 'architects covered',
    paneTimeline: 'Genealogy Timeline', paneMap: 'Notable Works Map',
    statsChrono: 'architects (chronological)', statsArchsRaw: 'architects',

    lineageLabel: 'Lineage:',
    lineage: {
      tange: 'Tange line',
      shinohara: 'Shinohara + Kikutake + Ito',
      hara: 'Hara line',
      aoki: 'Aoki line',
      ban: 'Hejduk → Ban',
      fujimori: 'Fujimori → Bow-Wow',
      kuma: 'Kuma → Nakamura',
      ando: 'Ando → Chiba',
      independent: 'Independent',
    },
    filter: {
      all: 'All',
      pritzker: '⭐ Pritzker only',
    },
    legend: { worked: 'worked_at', studied: 'studied_under', pritzker: 'Pritzker laureate' },
    cardHint: 'Click node / marker — linked highlight · drag · scroll to zoom',
    topHubs: 'Top 5 Hubs (degree)',

    info: {
      lineageSuffix: ' line',
      born: 'Born–Died', founded: 'Office founded', school: 'School', pritzker: 'Pritzker',
      mentor: 'Mentor', students: 'Disciples', works: 'Notable works', noWorks: 'No Wikipedia data yet',
      workImage: 'Work image', note: 'Note', degree: 'degree', ageSuffix: 'y/o',
    },

    obs: {
      '1941':         { p: 'Born 1941',          t: 'Golden Cohort',                d: 'Three Pritzker-class architects born in the same year', x: 'Toyo Ito · Tadao Ando · Itsuko Hasegawa' },
      '1925-1934':    { p: '1925-1934 · 10 yrs',  t: 'Master Cluster',               d: '5 architects who shape half of post-war Japan, born within 10 years', x: 'Shinohara 1925 · Kikutake 1928 · Maki 1928 · Isozaki 1931 · Kurokawa 1934' },
      'foreign-gap':  { p: '~25-year lag',        t: 'Western Masters vs Japan',     d: 'Modernism reached Japan one generation late; Maekawa/Sakakura imported it', x: 'Gropius 1883 · Corbusier 1887 · Raymond 1888 → Tange 1913' },
      'utokyo':       { p: 'School',              t: 'U Tokyo Dominance',            d: '13 U Tokyo alumni span three generations of mentorship', x: 'Maekawa · Tange · Maki · Isozaki · Kurokawa · Ito · Kuma · Yamamoto · Fujimoto · Fujimori' },
      'women':        { p: 'Gender timeline',     t: 'Women Architects',             d: '4 prominent women architects across 34 years; Sejima — first female Pritzker', x: 'Hasegawa 1941 · Sejima 1956 · Inui 1969 · Nagayama 1975' },
      'metabolism':   { p: '1960 movement',       t: 'Metabolism Group',             d: 'The 5 founders of the Metabolism movement at the 1960 World Design Conference', x: 'Tange · Kikutake · Kurokawa · Maki · Isozaki' },
      'corbusier-chain': { p: '3 generations',    t: 'Corbusier Chain',              d: 'Le Corbusier → Maekawa/Sakakura → Tange → Maki/Isozaki/Kurokawa/Taniguchi (indirect 6)', x: 'Foreign masters reach 8 Japanese architects via 2 intermediaries' },
      'overseas':     { p: 'Studied abroad',      t: 'Returnee Cohort',              d: '8 architects studied/worked overseas before establishing in Japan', x: 'Maekawa · Sakakura · Yoshimura · Maki · Taniguchi · Ban · Kuma · Fujimoto' },
      'pritzker-age': { p: 'Age 44 ↔ 88',         t: 'Pritzker Age Gap',             d: 'Youngest 44 (Nishizawa) vs oldest 88 (Isozaki) — 44-year span', x: 'Click to see award-year path (zigzag = delayed recognition pattern)' },
      'waseda':       { p: 'Waseda University',   t: 'Waseda School',                d: '3 architects outside the U Tokyo mainstream, all Waseda alumni', x: 'Murano · Kikutake · Naito' },
      'tokyotech':    { p: 'Tokyo Tech',          t: 'Tokyo Tech (Experimental)',    d: 'Theoretical experimental line centered around Prof. Shinohara', x: 'Shinohara (prof.) · Hasegawa (M.A.) · Bow-Wow (B+PhD)' },
      'overseas-works': { p: 'Overseas works',    t: 'Global Footprint',             d: 'Japanese architects with iconic works built outside Japan (14 sites)', x: 'Ando (Venice/Fort Worth/St. Louis) · Ban (Metz/Aspen) · SANAA (NY/Lausanne) · Isozaki (LA/Milan) · Tane (Estonia) · Maki (Toronto/NYC) · Kuma (Dundee)' },
    }
  },

  ja: {
    htmlLang: 'ja',
    title: '日本建築家系譜と代表作',
    subtitleSuffix: '· 師承 + 代表作（Wikipedia EN/JA）· 2026-05-06',
    statsNodes: 'ノード', statsArchs: '建築家', statsMentors: 'メンター', statsEdges: '師承',
    statsWorks: '件の作品', statsCovered: '人カバー',
    paneTimeline: '系譜タイムライン', paneMap: '代表作マップ',
    statsChrono: '建築家（出生年順）', statsArchsRaw: '建築家',

    lineageLabel: '系統:',
    lineage: {
      tange: '丹下系',
      shinohara: '篠原+菊竹+伊東系',
      hara: '原広司系',
      aoki: '青木系',
      ban: 'Hejduk→坂',
      fujimori: '藤森→Bow-Wow',
      kuma: '隈→中村',
      ando: '安藤→千葉',
      independent: '独立',
    },
    filter: {
      all: 'すべて',
      pritzker: '⭐ プリツカー賞',
    },
    legend: { worked: '勤務 (worked_at)', studied: '師事 (studied_under)', pritzker: 'プリツカー賞受賞者' },
    cardHint: 'ノード/markerクリック — 連動 · ドラッグ · スクロールズーム',
    topHubs: 'Top 5 ハブ (degree)',

    info: {
      lineageSuffix: '',
      born: '生没年', founded: '事務所創立', school: '学校', pritzker: 'プリツカー賞',
      mentor: '師承', students: '弟子', works: '代表作', noWorks: 'Wikipedia データ未掲載',
      workImage: '代表作画像', note: '備考', degree: 'degree', ageSuffix: '歳',
    },

    obs: {
      '1941':         { p: '1941年生',         t: '黄金世代',           d: '同年に3人のプリツカー級建築家が誕生',     x: '伊東豊雄 ・ 安藤忠雄 ・ 長谷川逸子' },
      '1925-1934':    { p: '1925-1934 · 10年', t: '巨匠集中年',         d: '10年間に戦後日本建築の半分を担う5人が誕生', x: '篠原 1925 ・菊竹 1928 ・槇 1928 ・磯崎 1931 ・黒川 1934' },
      'foreign-gap':  { p: '~25年の世代差',    t: '海外巨匠 vs 日本本土', d: 'モダニズムは一世代遅れ、前川/坂倉が欧州から持ち帰る', x: 'Gropius 1883 ・Corbusier 1887 ・Raymond 1888 → 丹下 1913' },
      'utokyo':       { p: '学派',             t: '東大の独占',         d: '東大系13人、3世代の師承を貫く',           x: '前川・丹下・槇・磯崎・黒川・伊東・隈・山本・藤本・藤森' },
      'women':        { p: '性別 timeline',    t: '女性建築家',         d: '34年に渡る代表的な女性建築家4人。妹島が女性初のプリツカー賞', x: '長谷川 1941 ・妹島 1956 ・乾久美子 1969 ・永山 1975' },
      'metabolism':   { p: '1960 運動',        t: 'メタボリズム派',     d: '1960年世界デザイン会議で結成、メタボリズム運動の5人', x: '丹下・菊竹・黒川・槇・磯崎' },
      'corbusier-chain': { p: '3世代の影響',    t: 'コルビュジエの影響鎖', d: 'Le Corbusier → 前川/坂倉 → 丹下 → 槇/磯崎/黒川/谷口（間接6人）', x: '海外巨匠が2人の中継ノードを介して日本人建築家8人へ波及' },
      'overseas':     { p: '海外修業',         t: '海外帰国組',         d: '欧米で学業/勤務後、帰国して開業した8人',     x: '前川・坂倉・吉村・槇・谷口・坂・隈・藤本' },
      'pritzker-age': { p: '44歳 ↔ 88歳',     t: 'プリツカー受賞年齢差', d: '最年少 44（西沢）vs 最高齢 88（磯崎）— 44年の幅', x: 'クリックで受賞年代の連結パスを表示（zigzag = 遅延認可）' },
      'waseda':       { p: '早稲田大学',       t: '早大派',             d: '東大主流の外、早稲田出身3人',                x: '村野藤吾 ・菊竹清訓 ・内藤廣' },
      'tokyotech':    { p: '東京工業大学',     t: '東工大派（実験）',     d: '篠原一男教授中心の理論実験派',                 x: '篠原（教授）・長谷川（修士）・Bow-Wow（学部+博士）' },
      'overseas-works': { p: '海外作品',       t: '海外進出組',         d: '日本人建築家による海外の代表作（14件）',     x: '安藤（Venice/Fort Worth/St. Louis）・坂（Metz/Aspen）・SANAA（NY/Lausanne）・磯崎（LA/Milan）・田根（Estonia）・槇（Toronto/NYC）・隈（Dundee）' },
    }
  }
};

// Mentor (external) name translations
window.MENTOR_NAMES = {
  corbusier: { zh: 'Le Corbusier', en: 'Le Corbusier', ja: 'ル・コルビュジエ' },
  raymond:   { zh: 'Antonin Raymond', en: 'Antonin Raymond', ja: 'アントニン・レーモンド' },
  gropius:   { zh: 'Walter Gropius', en: 'Walter Gropius', ja: 'ヴァルター・グロピウス' },
  hejduk:    { zh: 'John Hejduk', en: 'John Hejduk', ja: 'ジョン・ヘイダック' },
  aoki:      { zh: '青木淳', en: 'Jun Aoki', ja: '青木淳' }
};
