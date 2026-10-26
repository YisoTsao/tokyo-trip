import type { Hotel } from "./types";

const due = (text: string) => ({
  tag: "span" as const,
  className: "due",
  children: [text],
});

export const hotels: Hotel[] = [
  {
    date: "11/26–11/28 · 第 1–3 晚",
    name: "富山日航都市飯店",
    jp: "ホテルJALシティ富山",
    rows: [
      {
        label: "地址",
        value: ["〒930-0007 富山縣富山市宝町 1-4-1（1 Chome-4-1 Takaramachi）"],
      },
      {
        label: "電話",
        value: [
          { tag: "a", href: "tel:+81764432580", children: ["+81-76-443-2580"] },
        ],
      },
      { label: "免費取消", value: [due("2026/11/19 23:59 前")] },
    ],
  },
  {
    date: "11/29 · 第 4 晚",
    name: "日本輕井澤雙線飯店",
    jp: "トゥインラインホテルカルイザワジャパン",
    rows: [
      { label: "地址", value: ["〒389-0100 長野縣北佐久郡輕井澤町 1151-11"] },
      {
        label: "電話",
        value: [
          { tag: "a", href: "tel:+81267422121", children: ["+81-267-42-2121"] },
        ],
      },
      { label: "服務", value: ["提供接駁服務（晚到前先打電話確認）"] },
      { label: "免費取消", value: [due("2026/11/22 23:59 前")] },
    ],
  },
  {
    date: "11/30 · 第 5 晚",
    name: "草津溫泉阿達雅日式旅館",
    rows: [
      { label: "地址", value: ["群馬縣吾妻郡草津町草津 464-285"] },
      {
        label: "免費取消",
        value: [
          due("2026/11/24 23:59 前"),
          { tag: "br" },
          { tag: "small", children: ["11/25 當天起不可免費取消"] },
        ],
      },
    ],
  },
  {
    date: "12/1 · 第 6 晚",
    name: "Villa Fontaine Grand 東京田町",
    jp: "ヴィラフォンテーヌグランド東京田町",
    rows: [
      { label: "地址", value: ["〒108-0023 東京都港區芝浦 4-2-8"] },
      { label: "交通", value: ["JR 田町站約 400 公尺，步行約 5 分"] },
      { label: "入退房", value: ["15:00 入住・11:00 退房"] },
      {
        label: "免費取消",
        value: [
          due("2026/11/28 23:59 前"),
          { tag: "br" },
          { tag: "small", children: ["11/29 當天起不可免費取消"] },
        ],
      },
    ],
  },
];
