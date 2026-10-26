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
    note: "乘車日前一個月，週日座位容易滿",
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
    date: "2026-11-28",
    what: "立山黑部當天早上查官網營運資訊",
    note: "季末，天候可能停駛",
    doneWhen: ["c13"],
  },
];
