/**
 * Per-person expense sheet, in yen.
 * fixed = a fare already stated on the itinerary pages; est = planning estimate (a single amount for
 * transport and lockers, a low–high range for food and optional entry fees);
 * blank = not given yet (flights, stays, shopping), filled in by the traveller on the page.
 * Row ids are localStorage keys for the traveller's own amounts: never rename them.
 */
export type ExpenseStatus = "fixed" | "est" | "blank";

export interface ExpenseRow {
  id: string;
  cat: "機票" | "住宿" | "交通" | "門票" | "飲食" | "雜支" | "購物" | "其他";
  item: string;
  note?: string;
  low?: number;
  high?: number;
  status: ExpenseStatus;
}

export interface ExpenseGroup {
  id: string;
  date: string;
  title: string;
  rows: ExpenseRow[];
}

const fixed = (id: string, cat: ExpenseRow["cat"], item: string, yen: number, note?: string): ExpenseRow => ({
  id,
  cat,
  item,
  note,
  low: yen,
  high: yen,
  status: "fixed",
});
const est = (id: string, cat: ExpenseRow["cat"], item: string, low: number, high: number, note?: string): ExpenseRow => ({
  id,
  cat,
  item,
  note,
  low,
  high,
  status: "est",
});
const blank = (id: string, cat: ExpenseRow["cat"], item: string, note?: string): ExpenseRow => ({ id, cat, item, note, status: "blank" });

export const expenseGroups: ExpenseGroup[] = [
  {
    id: "base",
    date: "行前",
    title: "機票與住宿",
    rows: [
      blank("e-fl-out", "機票", "華航 CI370 桃園 → 富山", "11/26 去程"),
      blank("e-fl-back", "機票", "華航 CI221 羽田 → 松山", "12/2 回程"),
      blank("e-st-toyama", "住宿", "富山日航都市飯店（3 晚）", "11/26–11/28"),
      blank("e-st-karuizawa", "住宿", "輕井澤雙線飯店（1 晚）", "11/29"),
      blank("e-st-kusatsu", "住宿", "草津溫泉阿達雅日式旅館（1 晚）", "11/30；若含晚餐，Day 5 晚餐可填 0"),
      blank("e-st-tamachi", "住宿", "Villa Fontaine Grand 東京田町（1 晚）", "12/1"),
    ],
  },
  {
    id: "d1",
    date: "11/26",
    title: "Day 1 桃園 → 富山",
    rows: [
      fixed("e1-bus", "交通", "富山機場 → 富山站 免費直達巴士", 0, "台北航班旅客專用；沒搭上改搭一般巴士 ¥470"),
      est("e1-dinner", "飲食", "富山站周邊晚餐", 1500, 3000, "白蝦、迴轉壽司或黑拉麵"),
      est("e1-konbini", "飲食", "便利商店（隔天早餐、飲料）", 500, 1000),
    ],
  },
  {
    id: "d2",
    date: "11/27",
    title: "Day 2 黑部峽谷",
    rows: [
      fixed("e2-shinkansen", "交通", "北陸新幹線 富山 → 黑部宇奈月溫泉", 1470, "自由席"),
      fixed("e2-chitetsu", "交通", "富山地鐵 新黑部 → 宇奈月溫泉", 740),
      est("e2-trolley", "交通", "黑部峽谷觀光小火車 宇奈月 ⇄ 欅平（來回）", 3960, 3960, "普通車單程 ¥1,980 估計，特別車廂另加；以官網為準"),
      est("e2-lunch", "飲食", "宇奈月溫泉街午餐", 1200, 2000),
      est("e2-snack", "飲食", "點心、咖啡", 300, 800, "足湯免費"),
      fixed("e2-return", "交通", "宇奈月溫泉 → 富山（回程）", 2210, "同去程：富山地鐵 ¥740＋新幹線 ¥1,470"),
      est("e2-dinner", "飲食", "富山晚餐", 2000, 4000, "天婦羅、迴轉壽司"),
    ],
  },
  {
    id: "d3",
    date: "11/28",
    title: "Day 3 立山黑部",
    rows: [
      est("e3-breakfast", "飲食", "早餐", 500, 1000, "飯店含早則免"),
      fixed("e3-tateyama-go", "交通", "富山地鐵立山線 電鐵富山 → 立山", 1420),
      fixed("e3-alpen", "交通", "立山 ⇄ 黑部湖 來回票", 16480, "含立山纜車、高原巴士、空中纜車等"),
      est("e3-lunch", "飲食", "山上午餐（室堂或黑部水壩）", 1200, 2000),
      est("e3-snack", "飲食", "熱飲、點心", 300, 800),
      fixed("e3-tateyama-back", "交通", "富山地鐵立山線 立山 → 電鐵富山", 1420, "票價同去程"),
      est("e3-dinner", "飲食", "富山市區晚餐", 1500, 3000),
    ],
  },
  {
    id: "d4",
    date: "11/29",
    title: "Day 4 白川郷 → 輕井澤",
    rows: [
      est("e4-breakfast", "飲食", "早餐", 0, 1000, "飯店含早則免"),
      est("e4-locker", "雜支", "富山站投幣置物櫃（大型）", 700, 700),
      fixed("e4-bus-go", "交通", "高速巴士 富山駅前 → 白川郷", 2400, "全車預約制"),
      fixed("e4-shuttle", "交通", "荻町城跡展望台接駁巴士（單程）", 200, "也可步行上山"),
      est("e4-houses", "門票", "合掌屋參觀", 400, 1400, "和田家／神田家 ¥400、民家園 ¥600，擇一至二"),
      est("e4-lunch", "飲食", "白川郷午餐", 1500, 3000, "飛驒牛丼、朴葉味噌"),
      est("e4-snack", "飲食", "點心（可樂餅、五平餅、咖啡）", 300, 800),
      fixed("e4-bus-back", "交通", "高速巴士 白川郷 → 富山駅前", 2400, "全車預約制"),
      est("e4-bento", "飲食", "晚餐便當（鱒壽司、白蝦天丼）", 1200, 2000),
      est("e4-shinkansen", "交通", "北陸新幹線はくたか 富山 → 輕井澤 指定席", 9000, 9000, "行程頁估 ¥8,500–9,500，取中間；以 JR 售票為準"),
      est("e4-taxi", "交通", "輕井澤站 → 飯店計程車", 1200, 1200, "每車，行程頁估 ¥1,000–1,500；飯店有接駁可省"),
    ],
  },
  {
    id: "d5",
    date: "11/30",
    title: "Day 5 輕井澤 → 草津",
    rows: [
      est("e5-breakfast", "飲食", "早餐", 0, 1000, "飯店含早則免"),
      est("e5-taxi1", "交通", "飯店 → 輕井澤站 計程車", 1000, 1000, "每車"),
      est("e5-locker", "雜支", "輕井澤站投幣置物櫃", 700, 700),
      est("e5-lunch", "飲食", "王子購物廣場午餐", 1000, 2000),
      est("e5-taxi2", "交通", "輕井澤站 → 舊輕井澤 計程車", 1200, 1200, "每車"),
      est("e5-cafe", "飲食", "舊輕井澤咖啡、點心", 500, 1200),
      fixed("e5-bus", "交通", "草輕交通巴士 舊輕井澤 → 草津溫泉", 2240, "免預約"),
      est("e5-snack", "飲食", "溫泉饅頭、溫泉蛋", 300, 600),
      est("e5-onsen", "門票", "外湯泡湯", 0, 2000, "白旗之湯免費；大瀧乃湯、西之河原付費"),
      est("e5-dinner", "飲食", "晚餐", 0, 3000, "旅館含晚餐則免；或舞茸天婦羅蕎麥麵"),
    ],
  },
  {
    id: "d6",
    date: "12/1",
    title: "Day 6 草津 → 東京",
    rows: [
      est("e6-breakfast", "飲食", "早餐", 0, 1500, "旅館含早則免"),
      fixed("e6-bus", "交通", "草輕交通巴士 草津溫泉 → 舊輕井澤", 2240, "免預約"),
      est("e6-lunch", "飲食", "舊輕井澤午餐或鐵路便當", 1000, 2000),
      est("e6-taxi", "交通", "舊輕井澤 → 輕井澤站 計程車", 1000, 1000, "每車；也可搭路線巴士"),
      est("e6-shinkansen", "交通", "北陸新幹線 Asama 616 輕井澤 → 東京／田町 指定席", 6000, 6000, "行程頁寫「以查詢為準」，先抓 ¥6,000"),
      est("e6-jr", "交通", "JR 田町 ⇄ 銀座或澀谷（來回）", 420, 420),
      est("e6-dinner", "飲食", "東京晚餐", 2000, 4000),
      blank("e6-shopping", "購物", "銀座／澀谷購物", "依個人"),
    ],
  },
  {
    id: "d7",
    date: "12/2",
    title: "Day 7 東京 → 松山",
    rows: [
      est("e7-breakfast", "飲食", "早餐", 500, 1000),
      blank("e7-shopping", "購物", "藥妝、零食補貨", "依個人"),
      est("e7-airport", "交通", "田町 → 羽田機場 T3", 650, 650, "JR＋東京單軌電車；走品川＋京急會再便宜一點"),
      est("e7-lunch", "飲食", "機場午餐、飲料", 1000, 2000),
    ],
  },
  {
    id: "misc",
    date: "其他",
    title: "其他",
    rows: [
      blank("e-esim", "其他", "網卡 / eSIM"),
      blank("e-insurance", "其他", "旅遊平安險、不便險"),
      blank("e-souvenir", "購物", "伴手禮", "依個人"),
    ],
  },
];

export const STATUS_LABEL: Record<ExpenseStatus, string> = {
  fixed: "確定",
  est: "預估",
  blank: "未填",
};
