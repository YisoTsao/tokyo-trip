import type { MapDialogData } from "./types";
import toyamaEkimae from "../assets/maps/toyama-ekimae.webp";
import shirakawagoOgimachi from "../assets/maps/shirakawago-ogimachi.webp";
import kusakaruBus from "../assets/maps/kusakaru-bus.webp";

export const mapDialogs: MapDialogData[] = [
  {
    id: "shiramap",
    title: "白川郷巴士 上車位置",
    pins: [
      {
        icon: "🚉",
        rich: [
          { tag: "b", children: ["11/29 去程："] },
          "富山駅前，富山站南口站前廣場的巴士乘車處（地圖紅色標記）。",
        ],
      },
      {
        icon: "🏡",
        rich: [
          { tag: "b", children: ["11/29 回程："] },
          "白川郷巴士總站（荻町），在城山館旁、荻町橋北邊（地圖紅色標記）。",
        ],
      },
    ],
    pair: true,
    images: [
      {
        src: toyamaEkimae,
        alt: "富山駅前巴士乘車處位置圖",
        width: 672,
        height: 747,
      },
      {
        src: shirakawagoOgimachi,
        alt: "白川郷荻町巴士總站位置圖",
        width: 672,
        height: 747,
      },
    ],
  },
  {
    id: "busmap",
    title: "草輕巴士 上下車位置",
    pins: [
      {
        icon: "📍",
        rich: [
          { tag: "b", children: ["11/30 去草津："] },
          "在「旧軽井沢バス停」",
          { tag: "b", children: ["北軽井沢・草津温泉方面行き"] },
          "的站牌上車（右上小圖下方那支紅色站牌，在旧軽臨時交番旁、草輕交通站舍的斜對面）。上方那支是往輕井澤站的，不要站錯邊。",
        ],
      },
      {
        icon: "🚉",
        rich: [
          { tag: "b", children: ["從輕井澤站搭："] },
          "北口巴士站 2 號乘車處（旧軽井沢・北軽井沢・草津方面行き）。12/1 從草津回來在舊輕井澤下車，是對面那支（往輕井澤站方向）站牌。",
        ],
      },
    ],
    images: [
      {
        src: kusakaruBus,
        alt: "草輕交通巴士站位置圖：輕井澤站北口 2 號乘車處，以及旧軽井沢巴士站往草津方向的站牌",
        width: 1348,
        height: 1288,
      },
    ],
  },
];
