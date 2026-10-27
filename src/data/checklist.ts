// Generated from the original checklist.html. Checkbox ids are storage keys: never rename them.
import type { ChecklistSheet } from "./types";

export const checklist: ChecklistSheet[] = [
  {
    id: "trans",
    title: "車票與交通預訂",
    layout: "legs",
    rows: [
      {
        group: "交通・航班",
      },
      {
        when: "11/26",
        whenNote: "13:45",
        kind: "航班",
        title: "華航 CI370 桃園 T2 → 富山",
        note: "行前 24 小時線上報到、確認行李額度",
        kindClass: "fl",
        checks: [
          {
            id: "c1",
            label: "已訂票",
          },
          {
            id: "c2",
            label: "已線上報到",
          },
        ],
      },
      {
        when: "11/26",
        whenNote: "約 18:30",
        kind: "巴士",
        title: "富山機場 → 富山站北口",
        note: "台北航班旅客專用免費直達巴士，現場搭乘；沒搭到改搭機場巴士 ¥470",
        free: true,
        checks: [],
      },
      {
        when: "12/2",
        whenNote: "14:15",
        kind: "航班",
        title: "華航 CI221 羽田 T3 → 台北松山",
        note: "行前 24 小時線上報到",
        kindClass: "fl",
        checks: [
          {
            id: "c3",
            label: "已訂票",
          },
          {
            id: "c4",
            label: "已線上報到",
          },
        ],
      },
      {
        group: "11/27 黑部峽谷",
      },
      {
        when: "11/27",
        whenNote: "06:37",
        kind: "新幹線",
        title: "北陸新幹線 富山 → 黑部宇奈月溫泉",
        note: "¥1,470・車程短，可坐自由席；用交通卡進站最方便",
        kindClass: "sk",
        checks: [
          {
            id: "c5",
            label: "已預訂（或決定坐自由席）",
          },
          {
            id: "c6",
            label: "已綁定交通卡",
            note: "えきねっと新幹線eチケット",
          },
        ],
      },
      {
        when: "11/27",
        whenNote: "07:31",
        kind: "鐵道",
        title: "富山地鐵本線 新黑部 → 宇奈月溫泉",
        note: "¥740・現場購票",
        free: true,
        checks: [],
      },
      {
        when: "11/27",
        whenNote: "08:17 / 11:04",
        kind: "鐵道",
        title: "黑部峽谷觀光小火車 宇奈月 ⇄ 欅平",
        note: "官網可預約座位；11/24 後班次請再確認",
        checks: [
          {
            id: "c7",
            label: "已預訂去程",
          },
          {
            id: "c8",
            label: "已預訂回程",
          },
        ],
      },
      {
        when: "11/27",
        whenNote: "下午",
        kind: "新幹線",
        title: "回程 黑部宇奈月溫泉 → 富山",
        note: "新幹線或富山地鐵擇一；新幹線同樣可綁交通卡",
        kindClass: "sk",
        checks: [
          {
            id: "c9",
            label: "已決定回程方式",
          },
          {
            id: "c10",
            label: "已綁定交通卡（若搭新幹線）",
          },
        ],
      },
      {
        group: "11/28 立山黑部",
      },
      {
        when: "11/28",
        whenNote: "07:04",
        kind: "鐵道",
        title: "富山地鐵立山線 電鐵富山 → 立山",
        note: "¥1,420・現場購票",
        free: true,
        checks: [],
      },
      {
        when: "11/28",
        whenNote: "08:30",
        kind: "山岳交通",
        title: "立山 ⇄ 黑部湖 來回票（含纜車、高原巴士、空中纜車等）",
        note: "約 ¥16,480・可上官網 Web 預約，熱門時段纜車要指定乘車時間",
        checks: [
          {
            id: "c11",
            label: "已預訂來回票",
          },
          {
            id: "c12",
            label: "已確認回程末班 14:40",
          },
        ],
      },
      {
        when: "11/28",
        whenNote: "當天早上",
        kind: "山岳交通",
        title: "立山黑部營運狀況",
        note: "季末（約 11/30 收季），天候可能停駛",
        checks: [
          {
            id: "c13",
            label: "出發前已查官網營運資訊",
          },
        ],
      },
      {
        group: "11/29 白川郷 → 輕井澤",
      },
      {
        when: "11/29",
        whenNote: "09:00",
        kind: "巴士",
        title: "高速巴士 富山駅前 → 白川郷",
        note: "全車預約制・¥2,400・乘車日前一個月（10/29）開放預約",
        checks: [
          {
            id: "c14",
            label: "已預訂",
          },
          {
            id: "c15",
            label: "已存電子票或取票",
          },
        ],
      },
      {
        when: "11/29",
        whenNote: "14:10",
        kind: "巴士",
        title: "高速巴士 白川郷 → 富山駅前",
        note: "全車預約制・¥2,400；想晚點走可改 15:30",
        checks: [
          {
            id: "c16",
            label: "已預訂",
          },
          {
            id: "c17",
            label: "已存電子票或取票",
          },
        ],
      },
      {
        when: "11/29",
        whenNote: "約 16:15",
        kind: "新幹線",
        title: "北陸新幹線はくたか 富山 → 輕井澤",
        note: "約 16:15–17:40・⚠ 長野站轉車：Kagayaki 510 號 → Asama 628 號・週日傍晚建議指定席",
        kindClass: "sk",
        checks: [
          {
            id: "c18",
            label: "已預訂指定席",
          },
          {
            id: "c19",
            label: "已綁定交通卡",
            note: "えきねっと新幹線eチケット",
          },
        ],
      },
      {
        group: "11/30 草津 – 12/2 東京",
      },
      {
        when: "11/30",
        whenNote: "14:44",
        kind: "巴士",
        title: "草輕交通巴士 舊輕井澤 → 草津溫泉",
        note: "「旧軽井沢」站 14:44 上車・¥2,240・免預約，客滿要等下一班",
        free: true,
        checks: [
          {
            id: "c65",
            label: "已查好當天班次與道路狀況",
          },
        ],
      },
      {
        when: "12/1",
        whenNote: "10:50",
        kind: "巴士",
        title: "草輕交通巴士 草津溫泉 → 舊輕井澤",
        note: "約 12:00 在旧軽井沢下車・免預約・再搭計程車到輕井澤站",
        free: true,
        checks: [
          {
            id: "c69",
            label: "已確認當天班次",
          },
        ],
      },
      {
        when: "12/1",
        whenNote: "13:00",
        kind: "新幹線",
        title: "北陸新幹線 輕井澤 → 田町（Asama 616 號）",
        note: "13:00 發・1・2 號月台、中段・後段車廂・東京站轉 JR 到田町",
        kindClass: "sk",
        checks: [
          {
            id: "c70",
            label: "已預訂指定席",
          },
          {
            id: "c71",
            label: "已綁定交通卡",
            note: "えきねっと新幹線eチケット",
          },
        ],
      },
      {
        when: "12/2",
        whenNote: "約 10:45",
        kind: "鐵道",
        title: "東京市區 → 羽田機場 T3",
        note: "京急（品川）或東京單軌電車（濱松町），刷交通卡即可",
        free: true,
        checks: [
          {
            id: "c22",
            label: "交通卡餘額足夠",
          },
        ],
      },
    ],
  },
  {
    id: "stay",
    title: "住宿預訂",
    layout: "legs",
    rows: [
      {
        when: "11/26",
        whenNote: "2 晚",
        kind: "住宿",
        title: "富山日航都市飯店（第 1、2 晚）",
        note: "與第 3 晚同一間，確認 3 晚是否同一筆訂單、不用換房",
        checks: [
          {
            id: "c23",
            label: "已訂房",
          },
        ],
      },
      {
        when: "11/28",
        whenNote: "1 晚",
        kind: "住宿",
        title: "富山日航都市飯店（第 3 晚）",
        note: "免費取消期限 2026/11/19 23:59・+81-76-443-2580",
        checks: [
          {
            id: "c24",
            label: "已訂房",
          },
          {
            id: "c25",
            label: "已確認連住不用換房",
          },
        ],
      },
      {
        when: "11/29",
        whenNote: "1 晚",
        kind: "住宿",
        title: "輕井澤雙線飯店",
        note: "免費取消期限 2026/11/22 23:59・+81-267-42-2121・可預約接駁",
        checks: [
          {
            id: "c26",
            label: "已訂房",
          },
          {
            id: "c27",
            label: "已告知晚到、預約接駁",
          },
        ],
      },
      {
        when: "11/30",
        whenNote: "1 晚",
        kind: "住宿",
        title: "草津溫泉阿達雅日式旅館",
        note: "免費取消期限 2026/11/24 23:59（11/25 當天起收費）・約 16:00 抵達",
        checks: [
          {
            id: "c68",
            label: "已訂房",
          },
        ],
      },
      {
        when: "12/1",
        whenNote: "1 晚",
        kind: "住宿",
        title: "Villa Fontaine Grand 東京田町",
        note: "免費取消期限 2026/11/28 23:59（11/29 當天起收費）・15:00 入住",
        checks: [
          {
            id: "c28",
            label: "已訂房",
          },
        ],
      },
    ],
  },
  {
    id: "before",
    title: "出發前要辦的事",
    layout: "pack",
    groups: [
      {
        title: "入境與網路",
        items: [
          {
            id: "c29",
            label: "Visit Japan Web 填好入境與海關資料",
            note: "出發前完成，存好 QR code",
          },
          {
            id: "c30",
            label: "網卡或 eSIM 已購買並確認天數",
          },
          {
            id: "c31",
            label: "旅遊平安險、不便險已投保",
          },
        ],
      },
      {
        title: "錢與卡",
        items: [
          {
            id: "c32",
            label: "信用卡開通海外交易、確認額度",
          },
          {
            id: "c33",
            label: "交通卡（Suica / ICOCA）已在手機或實體卡加值",
          },
          {
            id: "c34",
            label: "換好日圓現金",
            note: "巴士、小店、寄物櫃常只收現金",
          },
        ],
      },
      {
        title: "行前確認",
        items: [
          {
            id: "c35",
            label: "下載離線地圖、乘換 App（Japan Transit / NAVITIME）",
          },
          {
            id: "c36",
            label: "把所有訂位確認信截圖存手機",
          },
          {
            id: "c37",
            label: "出發前一週看富山、立山天氣預報",
          },
        ],
      },
    ],
  },
  {
    id: "pack",
    title: "出國行李清單",
    layout: "pack",
    tip: {
      title: "小提醒",
      items: [
        "液體、膠狀、噴霧類請遵守航空規定，隨身行李每瓶 100ml 以下。",
        "貴重物品、證件、電子產品和行動電源放隨身行李。",
        "出發前一天再檢查一次。",
      ],
    },
    groups: [
      {
        title: "立山・草津冬季裝備",
        items: [
          {
            id: "k1",
            label: "防水防滑鞋或雪靴",
            note: "室堂 11 月底已積雪",
          },
          {
            id: "k2",
            label: "羽絨外套或防風外套",
          },
          {
            id: "k3",
            label: "發熱衣褲",
          },
          {
            id: "k4",
            label: "毛帽、手套、圍巾",
          },
          {
            id: "k5",
            label: "暖暖包",
            note: "可到日本便利商店再買",
          },
          {
            id: "k6",
            label: "墨鏡",
            note: "雪地反光",
          },
          {
            id: "k7",
            label: "泡湯用小毛巾",
            note: "草津共同浴場不一定提供",
          },
        ],
        wide: true,
      },
      {
        title: "證件與文件",
        items: [
          {
            id: "k8",
            label: "護照正本",
            note: "效期需涵蓋回程日",
          },
          {
            id: "k9",
            label: "護照影本",
            note: "與正本分開放",
          },
          {
            id: "k10",
            label: "2 吋大頭照",
            note: "護照遺失補辦用",
          },
          {
            id: "k11",
            label: "機票訂位行程表",
          },
          {
            id: "k12",
            label: "住宿訂房確認單",
          },
          {
            id: "k13",
            label: "身分證、健保卡",
            note: "回台用",
          },
        ],
      },
      {
        title: "金流支付",
        items: [
          {
            id: "k14",
            label: "日圓現金與零錢包",
            note: "巴士、小店、寄物櫃常只收現金",
          },
          {
            id: "k15",
            label: "海外刷卡信用卡兩張以上",
          },
          {
            id: "k16",
            label: "外幣提款卡",
            note: "已開通海外提款",
          },
          {
            id: "k17",
            label: "交通卡（Suica / ICOCA）",
          },
          {
            id: "k18",
            label: "新台幣少量",
            note: "回松山搭車用",
          },
        ],
      },
      {
        title: "通訊與電力",
        items: [
          {
            id: "k19",
            label: "手機",
          },
          {
            id: "k20",
            label: "網卡 / eSIM",
          },
          {
            id: "k21",
            label: "行動電源",
            note: "不可託運，放隨身行李",
          },
          {
            id: "k22",
            label: "各種充電線",
            note: "手機、平板、相機",
          },
          {
            id: "k23",
            label: "多孔 USB 充電頭",
            note: "日本插座與台灣相同，不用轉接頭和變壓器",
          },
          {
            id: "k24",
            label: "相機與記憶卡",
          },
        ],
      },
      {
        title: "衣物鞋襪",
        items: [
          {
            id: "k25",
            label: "外套",
            note: "依天氣準備",
          },
          {
            id: "k26",
            label: "上衣",
            note: "依天數",
          },
          {
            id: "k27",
            label: "褲子 / 裙子",
          },
          {
            id: "k28",
            label: "內衣 / 內褲",
          },
          {
            id: "k29",
            label: "襪子",
          },
          {
            id: "k30",
            label: "睡衣",
          },
          {
            id: "k31",
            label: "舒適好走的鞋",
          },
          {
            id: "k32",
            label: "拖鞋",
            note: "飯店、溫泉旅館用",
          },
        ],
      },
      {
        title: "保養與化妝",
        items: [
          {
            id: "k33",
            label: "臉部乳液 / 精華液",
          },
          {
            id: "k34",
            label: "保濕乳液、護唇膏、護手霜",
            note: "初冬很乾燥",
          },
          {
            id: "k35",
            label: "防曬乳",
            note: "雪地也會曬傷",
          },
          {
            id: "k36",
            label: "彩妝品",
          },
          {
            id: "k37",
            label: "卸妝棉 / 卸妝油",
          },
          {
            id: "k38",
            label: "洗面乳",
          },
          {
            id: "k39",
            label: "鏡子",
            note: "部分飯店沒有",
          },
        ],
      },
      {
        title: "個人衛生",
        items: [
          {
            id: "k40",
            label: "牙刷 / 牙膏",
          },
          {
            id: "k41",
            label: "洗髮精 / 沐浴乳 / 潤髮乳",
            note: "旅行瓶",
          },
          {
            id: "k42",
            label: "梳子",
          },
          {
            id: "k43",
            label: "指甲剪",
          },
          {
            id: "k44",
            label: "刮鬍刀",
          },
          {
            id: "k45",
            label: "生理用品",
          },
          {
            id: "k46",
            label: "隱形眼鏡 / 藥水",
          },
        ],
      },
      {
        title: "藥品與救急",
        items: [
          {
            id: "k47",
            label: "個人處方藥",
            note: "長期用藥",
          },
          {
            id: "k48",
            label: "止痛藥 / 退燒藥",
          },
          {
            id: "k49",
            label: "綜合感冒藥",
          },
          {
            id: "k50",
            label: "腸胃藥 / 止瀉藥",
          },
          {
            id: "k51",
            label: "暈車藥",
            note: "白川郷、草津山路巴士",
          },
          {
            id: "k52",
            label: "OK 繃 / 小外傷藥",
          },
          {
            id: "k53",
            label: "口罩",
          },
        ],
      },
      {
        title: "生活雜項",
        items: [
          {
            id: "k54",
            label: "濕紙巾 / 衛生紙",
          },
          {
            id: "k55",
            label: "摺疊傘 / 輕便雨衣",
          },
          {
            id: "k56",
            label: "環保購物袋",
          },
          {
            id: "k57",
            label: "摺疊備用行李袋",
            note: "裝戰利品",
          },
          {
            id: "k58",
            label: "行李秤",
            note: "回程避免超重",
          },
          {
            id: "k59",
            label: "原子筆",
            note: "填寫文件用",
          },
        ],
      },
      {
        title: "飛行與收納",
        items: [
          {
            id: "k60",
            label: "頸枕",
          },
          {
            id: "k61",
            label: "眼罩 / 耳塞",
          },
          {
            id: "k62",
            label: "空水瓶",
            note: "過安檢後再裝水",
          },
          {
            id: "k63",
            label: "夾鏈袋",
            note: "液體 100ml 以下登機用",
          },
          {
            id: "k64",
            label: "壓縮袋",
            note: "節省行李空間",
          },
        ],
      },
    ],
  },
];
