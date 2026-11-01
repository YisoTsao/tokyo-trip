// Generated from the original checklist.html. Checkbox ids are storage keys: never rename them.
// 車票與交通預訂 and 住宿預訂 come from the Notion 交通與住宿預訂 table (see data/live.ts); the rest is written here.
import type { CheckItem, ChecklistLeg, ChecklistRow, ChecklistSheet } from "./types";

export interface NotionBooking extends Omit<ChecklistLeg, "checks"> {
  sheet: string;
  group?: string;
  checks: (CheckItem & { done?: boolean })[];
}

/** Checks already ticked in Notion: shown as done unless this browser unticked them. */
export function doneOf(notionBookings: NotionBooking[]): Record<string, 1> {
  return Object.fromEntries(notionBookings.flatMap((b) => b.checks.filter((c) => c.done).map((c) => [c.id, 1] as const)));
}

function legsOf(notionBookings: NotionBooking[], sheet: string): ChecklistRow[] {
  const rows: ChecklistRow[] = [];
  let group: string | undefined;
  for (const { sheet: s, group: g, checks, ...leg } of notionBookings) {
    if (s !== sheet) continue;
    if (g && g !== group) rows.push({ group: g });
    group = g;
    rows.push({ ...leg, checks: checks.map(({ done: _done, ...c }) => c) });
  }
  return rows;
}

export function buildChecklist(notionBookings: NotionBooking[]): ChecklistSheet[] {
  return [
    { id: "trans", title: "車票與交通預訂", layout: "legs", rows: legsOf(notionBookings, "trans") },
    { id: "stay", title: "住宿預訂", layout: "legs", rows: legsOf(notionBookings, "stay") },
    ...writtenSheets,
  ];
}

const writtenSheets: ChecklistSheet[] = [
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
