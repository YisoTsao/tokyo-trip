import type { TimetableLink } from "./types";

export const timetables: TimetableLink[] = [
  {
    href: "https://www.alpen-route.com/timetable/list.php",
    icon: "alpen",
    days: [3],
    title: "立山黑部阿爾卑斯山脈路線",
    desc: "確認 11/28 各段交通與末班車。請看 11/4–11/30 版本。",
    go: "官方時刻表 ›",
  },
  {
    href: "https://www.kurotetu.co.jp/timetable/",
    icon: "kurotetu",
    days: [2],
    title: "黑部峽谷觀光小火車",
    desc: "確認 11/27 宇奈月出發班次、回程及部分路段營運狀況。",
    go: "官方時刻表 ›",
    alt: "票價：kurotetu.co.jp/fare",
  },
  {
    href: "https://www.nouhibus.co.jp/route_bus/shirakawago/",
    icon: "nouhi",
    days: [4],
    title: "白川郷高速巴士",
    desc: "富山駅前 ⇄ 白川郷班次、票價（單程 ¥2,400）與預約方式。",
    go: "濃飛巴士官方時刻表 ›",
  },
  {
    href: "https://www.chitetsu.co.jp/?page_id=22436",
    icon: "chitetsu",
    days: [2, 3, 4],
    title: "富山地方鐵道",
    desc: "立山線（電鐵富山 ⇄ 立山）、本線（往宇奈月溫泉）與高速巴士預約。",
    go: "富山地鐵官方網站 ›",
    alt: "高速巴士預約專線 076-433-4890",
  },
  {
    href: "https://www.kkkg.co.jp/bus/timetable/kusakaru_sen_sim20261101.pdf",
    icon: "kusakaru",
    days: [5, 6],
    title: "草輕交通 草輕線",
    desc: "11/30 輕井澤站 ⇄ 草津溫泉巴士，2026/11/1 起冬季班表，單程 ¥2,240。",
    go: "草輕線時刻表 PDF ›",
  },
  {
    href: "https://tokyo-haneda.com/access/train/index.html",
    icon: "haneda",
    days: [7],
    title: "羽田機場交通",
    desc: "12/2 從品川（京急）或濱松町（單軌電車）到第 3 航廈。",
    go: "羽田機場官方交通資訊 ›",
  },
];
