import type { DayStripItem, Flight, Lodge } from "./types";

export const trip = {
  eyebrow: "2026 · 11/26（四）– 12/2（三）· 7 天 6 夜",
  titleBefore: "初冬的",
  titleEm: "北陸・信州・東京",
  titleAfter: "小旅行",
  route: ["富山", "黑部峽谷", "立山黑部", "白川郷", "輕井澤", "草津", "東京"],
  notice:
    "陸路交通多為「規劃用時段」，不代表當天每一班車都一定搭得上。標示「參考班次」的時間，出發前請再到官方時刻表核對。費用為 2026 年查得的單人參考價。",
  foot: "以上時間皆為規劃參考 · 出發前請以各官方網站公告為準 · 祝旅途暖暖的 ♡",
};

export const flights: Flight[] = [
  {
    dir: "out",
    label: "去程・11/26・華航 CI370",
    route: "桃園 T2 13:45 → 富山 17:35",
  },
  {
    dir: "back",
    label: "回程・12/2・華航 CI221",
    route: "羽田 T3 14:15 → 松山 17:15",
  },
];

export const lodges: Lodge[] = [
  { when: "11/26–11/28 · 3 晚", name: "富山日航都市飯店" },
  { when: "11/29 · 1 晚", name: "輕井澤雙線飯店" },
  { when: "11/30 · 1 晚", name: "草津溫泉阿達雅日式旅館" },
  { when: "12/1 · 1 晚", name: "Villa Fontaine Grand 東京田町" },
];

export const dayStrip: DayStripItem[] = [
  { target: "day1", date: "11/26", place: "桃園→富山", stay: "住 富山" },
  { target: "day2", date: "11/27", place: "黑部峽谷", stay: "住 富山" },
  { target: "day3", date: "11/28", place: "立山黑部", stay: "住 富山" },
  { target: "day4", date: "11/29", place: "白川郷", stay: "住 輕井澤" },
  { target: "day5", date: "11/30", place: "輕井澤→草津", stay: "住 草津" },
  { target: "day6", date: "12/1", place: "草津→田町", stay: "住 東京" },
  { target: "day7", date: "12/2", place: "東京→松山", stay: "回家" },
  { target: "timetables", date: "★", place: "官方時刻表", stay: "收藏" },
];
