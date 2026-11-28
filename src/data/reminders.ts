// Dated to-dos before departure. Every entry comes from the itinerary, hotel or checklist data.
export interface Reminder {
  /** ISO date, Japan time */
  date: string;
  what: string;
  note?: string;
  /** checklist ids that mark this as done */
  doneWhen?: string[];
}

export const reminders: Reminder[] = [
  {
    date: "2026-10-29",
    what: "白川郷高速巴士開放預約（去程 09:00、回程 14:10）",
    note: "已訂好來回票",
    doneWhen: ["c14", "c16"],
  },
  {
    date: "2026-11-19",
    what: "富山日航都市飯店 免費取消期限",
    note: "23:59 前",
  },
  {
    date: "2026-11-19",
    what: "看富山、立山天氣預報",
    note: "出發前一週",
    doneWhen: ["c37"],
  },
  { date: "2026-11-22", what: "輕井澤雙線飯店 免費取消期限", note: "23:59 前" },
  {
    date: "2026-11-24",
    what: "草津溫泉阿達雅日式旅館 免費取消期限",
    note: "23:59 前，11/25 起收費",
  },
  {
    date: "2026-11-25",
    what: "華航 CI370 線上報到",
    note: "起飛前 24 小時",
    doneWhen: ["c2"],
  },
  {
    date: "2026-11-28",
    what: "Villa Fontaine Grand 東京田町 免費取消期限",
    note: "23:59 前，11/29 起收費",
  },
  {
    date: "2026-11-27",
    what: "白川郷高速巴士改到 11/28（去程 09:00、回程 14:10）",
    note: "立山高原巴士 11/28–30 停駛，行程對調",
  },
  {
    date: "2026-11-27",
    what: "11/29 新幹線 富山 → 輕井澤 改成約 10:20–10:40 出發、長野轉あさま",
    note: "えきねっと出發前可改",
  },
  {
    date: "2026-11-29",
    what: "打給草津阿達雅旅館：11/30 約 20:00–21:30 才到",
    note: "問晚餐與最晚入住時間",
  },
  {
    date: "2026-11-30",
    what: "立山黑部當天早上查官網營運資訊（扇澤側）",
    note: "季末，室堂最後一班 15:30",
    doneWhen: ["c13"],
  },
];
