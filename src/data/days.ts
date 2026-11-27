// Generated from the original index.html; edit freely, this is now the source of truth.
import type { Day } from "./types";

export const days: Day[] = [
  {
    id: "day1",
    n: 1,
    date: "11 月 26 日（四）",
    title: "桃園 → 富山（直飛）",
    tags: [
      {
        label: "住宿｜富山日航都市飯店",
        kind: "stay",
      },
      {
        label: "晚上抵達",
      },
    ],
    lead: "直飛富山機場，搭機場巴士進市區，晚上在富山站附近吃飯、休息。",
    timeline: [
      {
        time: "13:45–17:35",
        mode: "plane",
        status: "confirmed",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["華航 CI370 桃園機場第 2 航廈 → 富山機場"],
          },
          {
            k: "em",
            rich: ["建議 11:45 前抵達桃園機場報到"],
          },
        ],
      },
      {
        time: "17:35–18:30",
        mode: "walk",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["入境、領行李（富山機場小，通常很快）"],
          },
        ],
      },
      {
        time: "約 18:30–19:00",
        mode: "bus",
        status: "tbc",
        flags: ["ref"],
        parts: [
          {
            k: "text",
            rich: ["搭台北航班旅客專用免費直達巴士到富山站北口"],
          },
          {
            k: "em",
            rich: [
              "國際線入境大廳出口附近上車・約 30 分・配合台北航班抵達發車，班次以現場公告為準",
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "免費巴士公告",
                href: "https://www.toyama-airport.jp/8222",
              },
              {
                kind: "link",
                label: "一般機場巴士",
                href: "https://www.toyama-airport.jp/access/bus",
              },
            ],
          },
        ],
      },
      {
        time: "約 19:00–19:30",
        mode: "walk",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["步行到富山日航都市飯店辦理入住、放行李（連住 3 晚）"],
          },
        ],
      },
      {
        time: "約 19:30–21:00",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["富山站周邊晚餐：白蝦、迴轉壽司或富山黑拉麵"],
          },
        ],
      },
      {
        time: "晚上",
        mode: "shop",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["便利商店採買隔天早餐，早點休息（Day 2 05:30 起床）"],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "note",
        title: "當天注意",
        blocks: [
          {
            k: "ul",
            items: [
              [
                "免費直達巴士只限台北航班旅客；若沒搭上，可改搭一般機場巴士（單程 ¥470）或計程車。",
              ],
              ["富山日航都市飯店離富山站很近，Day 2 一早從富山站出發很方便。"],
              [
                "航班日期依你給的行程推定：CI370 為 11/26 去程、CI221 為 12/2 回程，請再對照電子機票。",
              ],
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "降落富山，初冬旅程的第一晚",
      place: "桃園 → 富山",
      stay: "富山日航都市飯店（連住 3 晚）",
      stamp: "TAOYUAN → TOYAMA · ",
      booking: [
        {
          item: "華航 CI370 桃園 T2 → 富山",
          how: "行前 24 小時線上報到、確認行李額度",
          reserve: true,
        },
        {
          item: "機場免費直達巴士 → 富山站北口",
          price: "免費",
          how: "台北航班旅客專用，現場搭乘",
        },
      ],
      backup: {
        title: "延誤或沒搭上巴士時",
        draft: true,
        items: [
          [
            "航班延誤、錯過免費直達巴士：改搭一般機場巴士（¥470）或計程車到富山站。",
          ],
          [
            "太晚抵達、餐廳已打烊：先在富山站周邊便利商店解決晚餐，隔天再吃白蝦。",
          ],
        ],
      },
    },
  },
  {
    id: "day2",
    n: 2,
    date: "11 月 27 日（五）",
    title: "黑部峽谷觀光小火車",
    tags: [
      {
        label: "住宿｜富山日航都市飯店",
        kind: "stay",
      },
      {
        label: "部分路段營運",
      },
    ],
    lead: "以黑部峽谷為當日主行程，避免再塞其他遠距離景點。",
    timeline: [
      {
        time: "05:30–06:30",
        mode: "sunrise",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["起床、早餐"],
          },
        ],
      },
      {
        time: "約 06:37–06:50",
        mode: "shinkansen",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["富山站搭北陸新幹線到黑部宇奈月溫泉站"],
          },
          {
            k: "em",
            rich: ["¥1,470"],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "時刻表",
                href: "https://www.jreast.co.jp/aas/20191128_h_tyhoon_multtc_01.pdf",
              },
            ],
          },
        ],
      },
      {
        time: "約 07:31–07:59",
        mode: "train",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["新黑部站轉富山地鐵本線到宇奈月溫泉站"],
          },
          {
            k: "em",
            rich: ["往宇奈月溫泉・¥740"],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "時刻表",
                href: "https://japantravel.navitime.com/zh-tw/area/jp/route/result/?start=00009634&goal=00000527&start_name=%E6%96%B0%E9%BB%91%E9%83%A8&goal_name=%E5%AE%87%E5%A5%88%E6%9C%88%E6%BA%AB%E6%B3%89&cid=&from=route_result_search_box&date_time=2026-11-27T06%3A30",
              },
            ],
          },
        ],
      },
      {
        time: "08:17–09:33",
        mode: "trolley",
        status: "tbc",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["觀光小火車 宇奈月 → 欅平"],
          },
          {
            k: "em",
            rich: ["來回票兩人 ¥11,120（每人 ¥5,560）"],
          },
        ],
      },
      {
        time: "09:35–11:00",
        mode: "sight",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["在欅平平台看風景"],
          },
        ],
      },
      {
        time: "11:04–12:23",
        mode: "trolley",
        status: "tbc",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["觀光小火車 欅平 → 宇奈月"],
          },
          {
            k: "em",
            rich: ["來回票兩人 ¥11,120（去程已付）"],
          },
        ],
      },
      {
        time: "約 12:30–15:00",
        mode: "onsen",
        flags: ["sug"],
        parts: [
          {
            k: "text",
            rich: ["宇奈月溫泉街午餐、泡足湯、散步"],
          },
          {
            k: "em",
            rich: ["15:00 前回到宇奈月溫泉站"],
          },
        ],
      },
      {
        time: "15:10–15:32",
        mode: "train",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["富山地鐵本線 宇奈月溫泉 → 新黑部"],
          },
          {
            k: "em",
            rich: ["往電鐵富山・¥740（IC ¥670）"],
          },
          {
            k: "xfer",
            title: "新黑部轉乘",
            steps: ["出站走約 140 m 到對面的 JR 黑部宇奈月溫泉站", "轉乘時間約 10 分鐘"],
          },
        ],
      },
      {
        time: "15:42–15:54",
        mode: "shinkansen",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["北陸新幹線 Hakutaka 565 號 黑部宇奈月溫泉 → 富山"],
          },
          {
            k: "em",
            rich: ["2 號月台・自由席 ¥1,470（全程合計 ¥2,210，IC ¥2,140）"],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "路線",
                href: "https://japantravel.navitime.com/zh-tw/area/jp/route/result/?start=00000527&goal=00007872&start_name=%E5%AE%87%E5%A5%88%E6%9C%88%E6%BA%AB%E6%B3%89&goal_name=%E5%AF%8C%E5%B1%B1&cid=&from=route_result_search_box&date_time=2026-11-27T14%3A00",
              },
            ],
          },
        ],
      },
      {
        time: "約 16:05–17:15",
        mode: "sight",
        flags: ["sug"],
        parts: [
          {
            k: "text",
            rich: ["富岩運河環水公園看夕陽：天門橋、運河邊散步，順便喝環水公園星巴克"],
          },
          {
            k: "em",
            rich: ["飯店往北走約 10 分鐘・免費；11 月底約 16:40 日落，天門橋晚上會點燈"],
          },
        ],
      },
      {
        time: "約 17:30–19:00",
        mode: "sight",
        flags: ["sug"],
        parts: [
          {
            k: "text",
            rich: ["富山市玻璃美術館（TOYAMA キラリ）"],
          },
          {
            k: "em",
            rich: ["11/27 是週五，營業到 20:00（入館到 19:30）・常設展約 ¥200；從富山站搭路面電車到「西町」約 10 分鐘。想省力就改去市役所展望塔（免費）看夜景"],
          },
        ],
      },
      {
        time: "晚上",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["富山晚餐、休息"],
          },
          {
            k: "text",
            rich: ["天婦羅 富山白蝦亭、富山迴轉壽司 富山車站前店"],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "note",
        title: "班次說明",
        blocks: [
          {
            k: "p",
            rich: [
              "官方 10/1–11/23 與 11/24 之後的班次可能不同，11/27 出發前請確認 08:17 往程與 11:04 回程是否仍有開。官方也提醒，從富山地方鐵道轉乘小火車至少預留 20 分鐘。",
            ],
          },
          {
            k: "src",
            rich: [
              "來源：",
              {
                tag: "a",
                href: "https://www.kurotetu.co.jp/timetable/",
                children: ["黑部峽谷鐵道官方時刻表"],
              },
            ],
          },
        ],
      },
      {
        kind: "warn",
        title: "提醒",
        blocks: [
          {
            k: "p",
            rich: [
              "2026 年黑部峽谷鐵道是部分路段營運，不能假設所有步道與設施都開放。出發前請以官方網站確認可抵達的終點、回程班次及預約方式。",
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "搭小火車，鑽進黑部峽谷",
      place: "富山 → 宇奈月溫泉 → 欅平",
      stay: "富山日航都市飯店",
      stamp: "KUROBE GORGE · UNAZUKI · ",
      booking: [
        {
          item: "北陸新幹線 富山 → 黑部宇奈月溫泉",
          price: "¥1,470",
          how: "車程短，可坐自由席；用交通卡進站最方便。回程同價：15:42 Hakutaka 565 號",
        },
        {
          item: "富山地鐵本線 新黑部 → 宇奈月溫泉",
          price: "¥740",
          how: "現場購票。回程同價：宇奈月溫泉 15:10 → 新黑部 15:32",
        },
        {
          item: "黑部峽谷觀光小火車 宇奈月 ⇄ 欅平",
          price: "來回兩人 ¥11,120",
          how: "官網可預約座位；11/24 後班次請再確認",
          reserve: true,
        },
      ],
      backup: {
        title: "班次變動或停駛時的備案",
        draft: true,
        items: [
          [
            "11/24 後 08:17 或 11:04 沒有開：改搭官網公布的可行班次，回程以末班為底線，宇奈月溫泉街的時間跟著縮短。",
          ],
          [
            "小火車因天候停駛：留在宇奈月溫泉街泡足湯、散步，或提早回富山逛富山站周邊。",
          ],
          [
            "錯過 15:10 那班：14:40 有富山地鐵特急 Kurobe 26 號往新魚津，轉愛之風富山鐵道 15:51 到富山（¥1,980）；或 15:42 富山地鐵往新魚津，轉愛之風 17:09 到富山（¥1,680）。",
          ],
        ],
      },
    },
  },
  {
    id: "day3",
    n: 3,
    date: "11 月 28 日（六）",
    title: "白川郷合掌村：富山來回",
    tags: [
      {
        label: "住宿｜富山日航都市飯店",
        kind: "stay",
      },
      {
        label: "巴士要改訂到這天",
        kind: "hot",
      },
    ],
    lead: "立山側高原巴士 11/28–30 停駛，原本 11/29 的白川郷提前到今天。從富山站搭直達巴士去白川郷，下午回富山，晚上連住日航都市飯店，不用退房。",
    timeline: [
      {
        time: "07:30–08:30",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "早餐（連住日航都市飯店，不用退房，大行李留在房間）",
            ],
          },
        ],
      },
      {
        time: "08:40",
        mode: "wait",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["富山駅前高速巴士乘車處候車（富山站南口站前廣場）"],
          },
          {
            k: "links",
            items: [
              {
                kind: "map",
                label: "🗺 看上車位置地圖",
                dialog: "shiramap",
              },
            ],
          },
        ],
      },
      {
        time: "09:00–10:20",
        mode: "bus",
        status: "tbc",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: [
              "高速巴士 富山駅前 → 白川郷（荻町），約 1 小時 20 分",
              {
                tag: "em",
                children: [
                  "富山地鐵運行・全車預約制・單程 ¥2,400・原訂 11/29 的票要改到 11/28",
                ],
              },
              " ",
              {
                tag: "a",
                href: "https://www.nouhibus.co.jp/route_bus/shirakawago/#timetable",
                className: "tag hot",
                children: ["巴士時刻表 "],
              },
              " ",
              {
                tag: "a",
                href: "https://secure.j-bus.co.jp/hon/Route/Highway?gpcd=190004&rocd=0002&uncd=2102&dtym=202611&dtdd=28&filltertext=%E5%AF%8C%E5%B1%B1",
                className: "tag hot",
                children: ["改訂 11/28 巴士"],
              },
            ],
          },
        ],
      },
      {
        time: "10:20–11:00",
        mode: "walk",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "步行或搭接駁巴士上荻町城跡展望台，拍合掌村全景，再步行下山（約 15–20 分）",
            ],
          },
        ],
      },
      {
        time: "11:00–12:00",
        mode: "sight",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "合掌屋參觀：和田家、明善寺、神田家（各約 ¥400，挑一兩間即可）",
            ],
          },
        ],
      },
      {
        time: "12:00–13:00",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "午餐：飛驒牛丼、朴葉味噌定食或蕎麥麵；點心吃飛驒牛可樂餅、五平餅",
            ],
          },
        ],
      },
      {
        time: "13:00–13:55",
        mode: "shop",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["出合橋吊橋、合掌造民家園（¥600），買伴手禮後回巴士總站"],
          },
        ],
      },
      {
        time: "14:10–15:30",
        mode: "bus",
        status: "tbc",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: [
              "高速巴士 白川郷 → 富山駅前",
              {
                tag: "em",
                children: [
                  "富山地鐵運行・全車預約制・單程 ¥2,400・在白川郷巴士總站（荻町）上車・今天不用趕新幹線，也可以改訂 15:30 那班",
                ],
              },
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "map",
                label: "🗺 看上車位置地圖",
                dialog: "shiramap",
              },
            ],
          },
        ],
      },
      {
        time: "晚上",
        mode: "hotel",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "回富山日航都市飯店（連住第 3 晚）；富山市區晚餐（白蝦、壽司、富山黑拉麵）。今晚先整理好行李，明天 05:40 起床、06:22 搭新幹線",
            ],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "warn",
        title: "今天就要處理：巴士改到 11/28",
        blocks: [
          {
            k: "p",
            rich: [
              "原本訂的是 11/29 的 09:00 去程與 14:10 回程，全車預約制。請在預約網站（或富山地鐵高速巴士預約專線 ",
              { tag: "a", href: "tel:+81764334890", children: ["076-433-4890"] },
              "）把兩段改成 11/28，或先訂 11/28 的新票再取消 11/29 的舊票，避免舊票取消了新票卻沒位子。11/28 是週六，若 09:00 已滿就改 10:10（11:30 到）。",
            ],
          },
        ],
      },
      {
        kind: "note",
        title: "白川郷巴士時刻（富山線）",
        blocks: [
          {
            k: "table",
            head: [
              {
                rich: ["方向"],
              },
              {
                rich: ["班次"],
              },
              {
                rich: ["備註"],
              },
            ],
            rows: [
              {
                cells: [
                  {
                    rich: ["富山駅前 → 白川郷"],
                  },
                  {
                    rich: [
                      "09:00 → 10:20",
                      {
                        tag: "br",
                      },
                      "10:10 → 11:30",
                      {
                        tag: "br",
                      },
                      "12:00 → 13:20",
                    ],
                  },
                  {
                    rich: ["前兩班富山地鐵、預約制"],
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["白川郷 → 富山駅前"],
                  },
                  {
                    rich: [
                      "14:10 → 15:30",
                      {
                        tag: "br",
                      },
                      "15:30 → 16:50",
                    ],
                  },
                  {
                    rich: ["富山地鐵、預約制"],
                  },
                ],
              },
            ],
          },
          {
            k: "p",
            rich: [
              "今天晚上住富山、不用接新幹線，想慢慢逛可以改搭 15:30 回程，16:50 回到富山站。",
            ],
          },
          {
            k: "src",
            rich: [
              "來源：",
              {
                tag: "a",
                href: "https://www.nouhibus.co.jp/route_bus/shirakawago/",
                children: ["濃飛巴士 高山～白川郷～富山線"],
              },
              "（時刻依 2025/12/1 改正版，出發前請再確認）",
            ],
          },
        ],
      },
      {
        kind: "note",
        title: "當日費用（每人參考）",
        blocks: [
          {
            k: "table",
            head: [
              {
                rich: ["項目"],
              },
              {
                rich: ["說明"],
              },
              {
                rich: ["金額"],
                align: "right",
              },
            ],
            rows: [
              {
                cells: [
                  {
                    rich: ["交通"],
                  },
                  {
                    rich: ["高速巴士 富山 ⇄ 白川郷（來回，改訂到 11/28）"],
                  },
                  {
                    rich: ["¥4,800"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["交通"],
                  },
                  {
                    rich: ["展望台接駁巴士（單程，也可步行上山）"],
                  },
                  {
                    rich: ["約 ¥200"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["門票"],
                  },
                  {
                    rich: ["和田家／神田家 ¥400、民家園 ¥600，擇一至二"],
                  },
                  {
                    rich: ["¥400–1,400"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["飲食"],
                  },
                  {
                    rich: ["早餐（飯店含早則免）"],
                  },
                  {
                    rich: ["¥0–1,000"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["飲食"],
                  },
                  {
                    rich: ["白川郷午餐"],
                  },
                  {
                    rich: ["¥1,500–3,000"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["飲食"],
                  },
                  {
                    rich: ["點心（可樂餅、五平餅、咖啡）"],
                  },
                  {
                    rich: ["¥300–800"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["飲食"],
                  },
                  {
                    rich: ["富山市區晚餐"],
                  },
                  {
                    rich: ["¥2,000–4,000"],
                    className: "y",
                  },
                ],
              },
              {
                cells: [
                  {
                    rich: ["合計"],
                  },
                  {
                    rich: ["依選擇而定"],
                  },
                  {
                    rich: ["約 ¥9,000–15,000"],
                    className: "y",
                  },
                ],
                sum: true,
              },
            ],
          },
          {
            k: "src",
            rich: [
              "巴士票價與時刻：濃飛巴士官網；門票與餐費為一般行情，可能調整。",
            ],
          },
        ],
      },
      {
        kind: "tip",
        title: "還能排什麼",
        blocks: [
          {
            k: "ul",
            items: [
              ["白川郷點燈只在 1–2 月，11 月底沒有。"],
              [
                "五箇山（相倉、菅沼）也是世界遺產合掌村，但從白川郷轉過去再回富山班次很少，這天不建議加排。",
              ],
              [
                "回到富山後可以在站內「きときと市場 とやマルシェ」逛伴手禮，順便買明天早上新幹線上吃的早餐。",
              ],
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "白川郷合掌村，晚上回富山",
      place: "富山 ⇄ 白川郷",
      stay: "富山日航都市飯店（連住第 3 晚）",
      stamp: "SHIRAKAWA-GO · GASSHO · ",
      booking: [
        {
          item: "高速巴士 富山駅前 → 白川郷（09:00）",
          price: "¥2,400",
          how: "原訂 11/29，要改到 11/28（全車預約制）",
          reserve: true,
        },
        {
          item: "高速巴士 白川郷 → 富山駅前（14:10）",
          price: "¥2,400",
          how: "原訂 11/29，要改到 11/28（全車預約制）；也可改 15:30",
          reserve: true,
        },
      ],
      backup: {
        title: "11/28 巴士訂不到位時",
        draft: true,
        items: [
          [
            "09:00 去程客滿：改 10:10 那班（11:30 到），回程改 15:30（16:50 回富山）。",
          ],
          [
            "富山線全滿：搭北陸新幹線到金澤（約 20 分），改搭金澤 ⇄ 白川郷的高速巴士（也是預約制，先上網看空位）。",
          ],
          [
            "都訂不到：記得取消 11/29 的舊票（那天要去扇澤），改排富山市區：玻璃美術館、富岩運河環水公園，或搭富山港線到岩瀨老街。",
          ],
        ],
      },
    },
  },
  {
    id: "day4",
    n: 4,
    date: "11 月 29 日（日）",
    title: "富山 → 輕井澤，下午逛 Outlet 與舊輕井澤",
    tags: [
      {
        label: "住宿｜輕井澤雙線飯店",
        kind: "stay",
      },
      {
        label: "新幹線直達，不用轉車",
        kind: "hot",
      },
    ],
    lead: "白川郷已提前到 11/28，這天直接從富山搭北陸新幹線到輕井澤。原本 11/30 的 Outlet 和舊輕井澤散步移到今天下午，因為 11/30 要整天去室堂。",
    timeline: [
      {
        time: "07:30–09:15",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "早餐、退房富山日航都市飯店（就在富山站旁），站內「きときと市場 とやマルシェ」買鱒壽司或白蝦便當當午餐",
            ],
          },
        ],
      },
      {
        time: "09:40–約 11:15",
        mode: "shinkansen",
        status: "reference",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["北陸新幹線 はくたか 558 號 富山 → 輕井澤（直達，不用在長野轉車）"],
          },
          {
            k: "em",
            rich: [
              "原訂 16:15 富山 → 輕井澤的票改成這班；想多睡也可以改 11:21 的はくたか 560 號（約 13:00 到）",
            ],
          },
        ],
      },
      {
        time: "11:20–11:45",
        mode: "taxi",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "輕井澤站把大行李寄投幣置物櫃，或先打給雙線飯店（+81-267-42-2121）問能不能先寄放",
            ],
          },
        ],
      },
      {
        time: "11:45–14:30",
        mode: "shop",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["輕井澤王子購物廣場 Outlet（車站南口）、午餐"],
          },
          {
            k: "em",
            rich: ["午餐可吃美食街，或 Outlet 內的蕎麥麵、咖哩"],
          },
        ],
      },
      {
        time: "14:30–14:45",
        mode: "taxi",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["從車站北口搭計程車或巴士到舊輕井澤（約 5–10 分）"],
          },
        ],
      },
      {
        time: "14:45–16:30",
        mode: "sight",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["舊輕井澤銀座散步：聖保羅天主教堂、果醬老舖、咖啡；體力夠可走到雲場池"],
          },
          {
            k: "em",
            rich: ["11 月底下午 4 點半左右天就黑了，雲場池建議先去"],
          },
        ],
      },
      {
        time: "17:00 後",
        mode: "hotel",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "回車站取行李，到雙線飯店入住（飯店有接駁，或步行約 19 分、計程車約 5 分）。晚餐吃站前或飯店附近，早點睡：明天 06:15 起床",
            ],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "warn",
        title: "要先改的票：11/29 新幹線",
        blocks: [
          {
            k: "p",
            rich: [
              "原本訂的是 16:15 富山 → 輕井澤（長野轉車）。改成早上的はくたか（富山 → 輕井澤直達）就能多出一個下午逛輕井澤。えきねっと的新幹線 e 票在出發前可以上網改班次；不改也能照原本 16:15 那班走，只是下午的行程就要取消。",
            ],
          },
        ],
      },
      {
        kind: "note",
        title: "當日費用（每人參考）",
        blocks: [
          {
            k: "table",
            head: [
              { rich: ["項目"] },
              { rich: ["說明"] },
              { rich: ["金額"], align: "right" },
            ],
            rows: [
              {
                cells: [
                  { rich: ["交通"] },
                  {
                    rich: [
                      "北陸新幹線 富山 → 輕井澤 指定席",
                      { tag: "br" },
                      { tag: "small", children: ["已訂，改班次"] },
                    ],
                  },
                  { rich: ["¥10,010"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["往返舊輕井澤、飯店的計程車（可省略）"] },
                  { rich: ["約 ¥2,000–3,000"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["雜支"] },
                  { rich: ["輕井澤站投幣置物櫃（大型）"] },
                  { rich: ["¥700–900"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["飲食"] },
                  { rich: ["早餐、午餐（便當或 Outlet）、咖啡"] },
                  { rich: ["¥2,500–4,000"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["飲食"] },
                  { rich: ["晚餐"] },
                  { rich: ["¥2,000–3,500"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["合計"] },
                  { rich: ["購物另計"] },
                  { rich: ["約 ¥17,000–21,000"], className: "y" },
                ],
                sum: true,
              },
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "搭新幹線到輕井澤，下午 Outlet 與舊輕井澤",
      place: "富山 → 輕井澤 → 舊輕井澤",
      stay: "輕井澤雙線飯店",
      stamp: "KARUIZAWA · SHINKANSEN · ",
      booking: [
        {
          item: "北陸新幹線 富山 → 輕井澤 指定席",
          price: "¥10,010",
          how: "已訂 16:15；建議改成 09:40 はくたか 558 號（えきねっと出發前可改）",
          reserve: true,
          booked: true,
        },
      ],
      backup: {
        title: "改不到早上班次時",
        draft: true,
        items: [
          [
            "早上的指定席滿了：改搭自由席（はくたか有自由席車廂），或照原本 16:15 那班走，上午在富山市區逛玻璃美術館、環水公園。",
          ],
          [
            "晚到輕井澤：先打給飯店 ",
            { tag: "a", href: "tel:+81267422121", children: ["+81-267-42-2121"] },
            " 確認接駁。",
          ],
        ],
      },
    },
  },
  {
    id: "day5",
    n: 5,
    date: "11 月 30 日（一）",
    title: "立山黑部收季日：輕井澤 → 扇澤 ⇄ 室堂 → 草津",
    tags: [
      {
        label: "住宿｜草津溫泉阿達雅日式旅館",
        kind: "stay",
      },
      {
        label: "全程最緊湊・晚上才到草津",
        kind: "hot",
      },
    ],
    lead: "立山高原巴士 11/28–30 停駛，改從長野側扇澤上山。11/30 是阿爾卑斯路線今年最後一天，只能日歸。一早從輕井澤搭新幹線到長野，轉巴士到扇澤，經黑部水壩到室堂再原路折返；傍晚回長野，經高崎、吾妻線到草津，約 20:00–21:15 才會到旅館。",
    timeline: [
      {
        time: "06:15–06:50",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "起床、退房輕井澤雙線飯店，搭計程車到輕井澤站（約 5 分）；前一晚先叫好車或問飯店接駁",
            ],
          },
        ],
      },
      {
        time: "07:03–07:33",
        mode: "shinkansen",
        status: "reference",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["北陸新幹線 699 號 輕井澤 → 長野（平日運行，11/30 是週一）"],
          },
          {
            k: "em",
            rich: [
              "要新買票。下一班 07:33 はくたか 551 號（08:05 到長野）就改坐 08:15 的巴士",
            ],
          },
        ],
      },
      {
        time: "07:33–07:45",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "長野站把大行李寄投幣置物櫃（傍晚回長野站拿），快步到東口巴士總站",
            ],
          },
          {
            k: "em",
            rich: ["只有約 15 分鐘，來不及就別勉強，改坐 08:15 那班"],
          },
        ],
      },
      {
        time: "07:50–09:25",
        mode: "bus",
        status: "reference",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: [
              "アルピコ交通 特急巴士 長野駅東口 → 扇澤（這班直達，約 1 小時 35 分）",
              {
                tag: "em",
                children: [
                  "免預約・自由席・客滿就上不了車・下一班 08:15 → 10:00・這條線 11/30 是今年最後一天",
                ],
              },
              " ",
              {
                tag: "a",
                href: "https://www.alpico.co.jp/traffic/express/nagano_omachi/",
                className: "tag hot",
                children: ["巴士時刻表 "],
              },
            ],
          },
        ],
      },
      {
        time: "約 09:30–11:00",
        mode: "ropeway",
        status: "reference",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: [
              "扇澤 →（關電隧道電氣巴士）黑部水壩 → 步行過水壩 → 黑部湖 →（黑部纜車）黑部平 →（立山空中纜車）大觀峰 →（立山隧道電氣巴士）室堂",
            ],
          },
          {
            k: "em",
            rich: [
              "扇澤站買 扇澤 ⇄ 室堂 來回票 ¥12,300・各段時間未經官方 PDF 核對，以當天站內時刻為準",
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "官方時刻表（扇澤出發）",
                href: "https://www.alpen-route.com/timetable/",
              },
              {
                kind: "link",
                label: "營運公告",
                href: "https://www.alpen-route.com/_wp/information",
              },
            ],
          },
        ],
      },
      {
        time: "約 11:00–12:45",
        mode: "sight",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: [
              "室堂雪地、在室堂ターミナル吃午餐；回程在大觀峰、黑部平稍作停留看景",
            ],
          },
          {
            k: "em",
            rich: [
              "11 月底室堂已是雪地，請穿防滑鞋和保暖外套；屋頂展望台等部分設施已冬季關閉",
            ],
          },
        ],
      },
      {
        time: "約 12:45–14:15",
        mode: "ropeway",
        status: "tbc",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["室堂原路返回扇澤（大觀峰 → 黑部平 → 黑部湖 → 黑部水壩 → 扇澤）"],
          },
          {
            k: "em",
            rich: [
              "今天還要趕到草津，12:45 前後就要往回走。室堂最後一班 15:30（官方公告，之後沒有替代交通）",
            ],
          },
        ],
      },
      {
        time: "14:40–16:30",
        mode: "bus",
        status: "reference",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: [
              "アルピコ交通 特急巴士 扇澤 → 長野駅東口",
              {
                tag: "em",
                children: ["免預約・下一班 15:40 → 17:30（還趕得上草津末班巴士，但很緊）"],
              },
            ],
          },
        ],
      },
      {
        time: "16:30–17:00",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["長野站取行李，買晚餐便當帶上車（旅館晚餐應該趕不上）"],
          },
        ],
      },
      {
        time: "約 17:00–17:50",
        mode: "shinkansen",
        status: "reference",
        flags: ["ref"],
        parts: [
          {
            k: "text",
            rich: ["北陸新幹線 長野 → 高崎（はくたか或あさま，約 50 分）"],
          },
          {
            k: "em",
            rich: ["班次出發前用乘換 App 確認"],
          },
        ],
      },
      {
        time: "約 18:00–19:30",
        mode: "train",
        status: "tbc",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["JR 吾妻線 高崎 → 長野原草津口（約 1 小時 20 分，班次約 1 小時一班）"],
          },
          {
            k: "em",
            rich: ["時刻未能從官方查到，請用乘換 App 查好；目標是趕上 19:37 或 20:48 的 JR 巴士"],
          },
        ],
      },
      {
        time: "19:37–20:02",
        mode: "bus",
        status: "reference",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: [
              "JR 巴士 長野原草津口駅 → 草津溫泉巴士總站（約 25 分）",
              {
                tag: "em",
                children: ["末班 20:48 → 21:13・錯過末班就搭計程車（約 25 分）"],
              },
            ],
          },
        ],
      },
      {
        time: "約 20:00–21:15",
        mode: "hotel",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "步行到草津溫泉阿達雅日式旅館入住；體力還夠就去湯畑看夜間點燈",
            ],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "warn",
        title: "這一天的關鍵風險",
        blocks: [
          {
            k: "ul",
            items: [
              [
                "11/30 是阿爾卑斯路線今年最後一天，也是長野 ⇄ 扇澤巴士最後一天，只能日歸。立山高原巴士（富山側）停駛，所以從扇澤進、",
                { tag: "b", children: ["原路折返扇澤"] },
                "，不能穿越到立山站。",
              ],
              [
                "室堂最後一班 ",
                { tag: "b", children: ["15:30"] },
                " 發，但這天要趕到草津，實際上 12:45 前後就要從室堂往回走。",
              ],
              [
                "草輕巴士（輕井澤 → 草津）冬季末班約 15:40 從輕井澤站發車，這天一定趕不上，所以晚上改走 ",
                { tag: "b", children: ["長野 → 高崎 → 吾妻線 → JR 巴士"] },
                "。JR 巴士末班 20:48 從長野原草津口開。",
              ],
              [
                "扇澤一帶已有積雪，天候差時可能部分停駛。當天早上 06:00 前後官網會發公告，出門前先看。",
              ],
            ],
          },
          {
            k: "src",
            rich: [
              "來源：",
              {
                tag: "a",
                href: "https://www.alpen-route.com/_wp/information",
                children: ["立山黑部阿爾卑斯山脈路線 官方公告"],
              },
              "、",
              {
                tag: "a",
                href: "https://www.alpico.co.jp/traffic/express/nagano_omachi/",
                children: ["アルピコ交通 長野－大町・扇沢線"],
              },
              "、",
              {
                tag: "a",
                href: "https://www.kkkg.co.jp/bus/timetable/kusakaru_sen_sim.pdf?v=20261101",
                children: ["草輕交通 冬季時刻"],
              },
              "、",
              {
                tag: "a",
                href: "https://www.navitime.co.jp/bus/diagram/timelist?departure=00026039&arrival=00415568&line=00079689",
                children: ["JR 巴士 長野原草津口 → 草津溫泉"],
              },
            ],
          },
        ],
      },
      {
        kind: "warn",
        title: "要先處理：旅館與車票",
        blocks: [
          {
            k: "ul",
            items: [
              [
                "打給草津阿達雅旅館說會 ",
                { tag: "b", children: ["20:00–21:30 才到"] },
                "，問晚餐能不能取消或改簡餐、最晚幾點能辦入住。這晚已過免費取消期限，不要取消。",
              ],
              [
                "新買：輕井澤 → 長野（早上 07:03）、長野 → 高崎（傍晚）新幹線票，吾妻線用 IC 卡或現場買票。",
              ],
              ["長野 ⇄ 扇澤巴士、扇澤 ⇄ 室堂來回票都在現場買，不用預約。"],
            ],
          },
        ],
      },
      {
        kind: "note",
        title: "長野 ⇄ 扇澤巴士時刻（アルピコ交通 特急巴士）",
        blocks: [
          {
            k: "table",
            head: [{ rich: ["方向"] }, { rich: ["班次"] }, { rich: ["備註"] }],
            rows: [
              {
                cells: [
                  { rich: ["長野駅東口 → 扇澤"] },
                  {
                    rich: [
                      "07:50 → 09:25",
                      { tag: "br" },
                      "08:15 → 10:00",
                      { tag: "br" },
                      "08:50 → 10:35",
                    ],
                  },
                  { rich: ["07:50 是直達班次"] },
                ],
              },
              {
                cells: [
                  { rich: ["扇澤 → 長野駅東口"] },
                  {
                    rich: [
                      "13:40 → 15:30",
                      { tag: "br" },
                      "14:40 → 16:30",
                      { tag: "br" },
                      "15:40 → 17:30",
                      { tag: "br" },
                      "17:00 → 18:50（末班）",
                    ],
                  },
                  { rich: ["要去草津的話，最晚坐 15:40"] },
                ],
              },
            ],
          },
          {
            k: "src",
            rich: [
              "來源：",
              {
                tag: "a",
                href: "https://www.alpico.co.jp/traffic/express/nagano_omachi/",
                children: ["アルピコ交通 長野－大町・扇沢線"],
              },
              "（春夏秋時刻 2026/4/15–11/30，12/1 起停駛）",
            ],
          },
        ],
      },
      {
        kind: "note",
        title: "當日費用（每人參考）",
        blocks: [
          {
            k: "table",
            head: [
              { rich: ["項目"] },
              { rich: ["說明"] },
              { rich: ["金額"], align: "right" },
            ],
            rows: [
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["北陸新幹線 輕井澤 → 長野"] },
                  { rich: ["約 ¥3,000–4,000"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["アルピコ特急巴士 長野 ⇄ 扇澤（來回）"] },
                  { rich: ["約 ¥6,000"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["扇澤 ⇄ 室堂 來回票（官方 2026 票價）"] },
                  { rich: ["¥12,300"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["北陸新幹線 長野 → 高崎"] },
                  { rich: ["約 ¥6,000–7,500"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["JR 吾妻線 高崎 → 長野原草津口、JR 巴士到草津溫泉"] },
                  { rich: ["約 ¥2,500–3,000"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["交通"] },
                  { rich: ["輕井澤飯店 → 車站計程車"] },
                  { rich: ["約 ¥1,000–1,500"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["雜支"] },
                  { rich: ["長野站投幣置物櫃（大型）"] },
                  { rich: ["¥700–900"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["飲食"] },
                  { rich: ["早餐、室堂午餐、晚餐便當、點心"] },
                  { rich: ["¥4,000–6,000"], className: "y" },
                ],
              },
              {
                cells: [
                  { rich: ["合計"] },
                  { rich: ["依選擇而定"] },
                  { rich: ["約 ¥35,000–41,000"], className: "y" },
                ],
                sum: true,
              },
            ],
          },
          {
            k: "src",
            rich: [
              "扇澤 ⇄ 室堂票價：",
              {
                tag: "a",
                href: "https://www.alpen-route.com/access_new/fare/person/index.php",
                children: ["官方票價頁"],
              },
              "；巴士與 JR 金額為估算，以實際購票為準。",
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "收季日的雪中室堂，夜裡到草津",
      place: "輕井澤 → 長野 → 扇澤 ⇄ 室堂 → 長野 → 高崎 → 草津溫泉",
      stay: "草津溫泉阿達雅日式旅館",
      stamp: "ALPINE ROUTE · OGIZAWA · ",
      booking: [
        {
          item: "北陸新幹線 輕井澤 → 長野（07:03）",
          price: "約 ¥3,000–4,000",
          how: "新買；自由席也可",
          reserve: true,
        },
        {
          item: "アルピコ交通 特急巴士 長野 ⇄ 扇澤",
          price: "約 ¥6,000（來回）",
          how: "免預約、自由席，提早排隊",
        },
        {
          item: "扇澤 ⇄ 室堂 來回票",
          price: "¥12,300",
          how: "扇澤站售票口購買",
        },
        {
          item: "北陸新幹線 長野 → 高崎",
          price: "約 ¥6,000–7,500",
          how: "新買；看當天回到長野的時間再買也行",
          reserve: true,
        },
        {
          item: "JR 吾妻線 高崎 → 長野原草津口 ＋ JR 巴士",
          price: "約 ¥2,500–3,000",
          how: "IC 卡或現場買票",
        },
      ],
      backup: {
        title: "天候、排隊或停駛時的備案",
        draft: true,
        items: [
          [
            "早上官網公告扇澤側也停駛：不去室堂，上午在輕井澤多逛，下午照原本的方式搭草輕巴士去草津（冬季末班約 15:40 從輕井澤站發車，先查時刻表）。",
          ],
          [
            "排隊太久、時間不夠：到黑部水壩或黑部平就折返，不一定要到室堂。底線是扇澤 15:40 的巴士。",
          ],
          [
            "錯過 07:03 新幹線：搭 07:33 はくたか 551 號，坐 08:15 巴士（10:00 到扇澤），室堂停留縮短。",
          ],
          [
            "錯過 JR 巴士末班 20:48：在長野原草津口搭計程車到草津（約 25 分），並先打給旅館。",
          ],
        ],
      },
    },
  },
  {
    id: "day6",
    n: 6,
    date: "12 月 1 日（二）",
    title: "草津 → 輕井澤 → 田町，東京購物",
    tags: [
      {
        label: "住宿｜Villa Fontaine Grand 東京田町",
        kind: "stay",
      },
      {
        label: "巴士＋新幹線",
        kind: "hot",
      },
    ],
    lead: "上午從草津搭巴士下山到輕井澤，轉新幹線到田町，下午開始東京購物。",
    timeline: [
      {
        time: "08:00–09:30",
        mode: "onsen",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["早餐、早上再泡一次湯，或到湯畑看早晨湯煙"],
          },
        ],
      },
      {
        time: "10:00–10:30",
        mode: "wait",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["退房，步行到草津溫泉巴士總站候車"],
          },
        ],
      },
      {
        time: "10:50–約 12:00",
        mode: "bus",
        status: "confirmed",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["草輕交通巴士 草津溫泉 → 舊輕井澤"],
          },
          {
            k: "em",
            rich: [
              "在「旧軽井沢」站下車・約 1 小時 10 分・免預約・路況可能延誤",
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "草輕線時刻表",
                href: "https://www.kkkg.co.jp/bus/timetable/kusakaru_sen_sim.pdf?v=20261101",
              },
              {
                kind: "map",
                label: "🗺 看下車位置地圖",
                dialog: "busmap",
              },
            ],
          },
        ],
      },
      {
        time: "約 12:00–12:30",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["舊輕井澤銀座散步、簡單吃午餐"],
          },
          {
            k: "em",
            rich: ["時間不長，想吃得悠閒可改在輕井澤站買鐵路便當上車吃"],
          },
        ],
      },
      {
        time: "12:30–12:50",
        mode: "taxi",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["搭計程車（約 5 分）或路線巴士到輕井澤站，前往新幹線月台"],
          },
        ],
      },
      {
        time: "13:00–約 14:30",
        mode: "shinkansen",
        status: "confirmed",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["北陸新幹線 輕井澤 → 田町（東京都）"],
          },
          {
            k: "xfer",
            title: "⚠ 需要轉車・東京站換車",
            steps: [
              "① 輕井澤 1・2 號月台 搭 Asama 616 號（往東京，中段・後段車廂）→ 東京，約 1 小時 12 分",
              "② 東京站轉 JR 京濱東北線或山手線 → 田町",
            ],
          },
          {
            k: "em",
            rich: [
              "Navitime 查詢時間 12/1 12:20・實際抵達時間與票價以查詢結果為準",
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "北陸新幹線時刻表（輕井澤 → 田町）",
                href: "https://japantravel.navitime.com/zh-tw/area/jp/route/result/?start=00002048&goal=00006495&start_name=%E8%BC%95%E4%BA%95%E6%BE%A4&goal_name=%E7%94%B0%E7%94%BA(%E6%9D%B1%E4%BA%AC%E9%83%BD)&cid=&from=route_result_search_box&date_time=2026-12-01T12%3A20",
              },
            ],
          },
        ],
      },
      {
        time: "14:30–15:30",
        mode: "walk",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "從田町站步行約 5 分到 Villa Fontaine Grand 東京田町，辦理入住（15:00 起）、放行李",
            ],
          },
        ],
      },
      {
        time: "15:30–18:30",
        mode: "shop",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["挑一區購物：銀座（田町搭 JR 約 8 分）或澀谷（約 15 分）"],
          },
        ],
      },
      {
        time: "18:30–20:00",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["晚餐"],
          },
        ],
      },
      {
        time: "20:00 後",
        mode: "hotel",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["自由活動、整理行李"],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "warn",
        title: "轉乘提醒",
        blocks: [
          {
            k: "p",
            rich: [
              "巴士約 12:00 到舊輕井澤，到 13:00 的 Asama 616 只有約 1 小時，路況延誤時就直接搭計程車去車站，午餐改買鐵路便當。田町旁就是濱松町，隔天搭東京單軌電車去羽田很方便。",
            ],
          },
        ],
      },
      {
        kind: "tip",
        title: "換區小提示",
        blocks: [
          {
            k: "p",
            rich: [
              "這天只剩一個下午，建議只挑一區。偏好精品與百貨選銀座；想逛潮牌、藥妝選澀谷或新宿；以動漫、電玩、模型為主可改去秋葉原或池袋。",
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "下山回輕井澤，下午換成東京",
      place: "草津 → 舊輕井澤 → 輕井澤 → 田町",
      stay: "Villa Fontaine Grand 東京田町",
      stamp: "KARUIZAWA → TOKYO · ",
      booking: [
        {
          item: "草輕交通巴士 草津溫泉 → 舊輕井澤（10:50）",
          price: "¥2,240",
          how: "免預約；路況可能延誤",
        },
        {
          item: "北陸新幹線 Asama 616 號 輕井澤 → 東京（13:00）",
          price: "¥5,600",
          how: "已確定；指定席",
          reserve: true,
          booked: true,
        },
      ],
      backup: {
        title: "巴士延誤時的備案",
        draft: true,
        items: [
          [
            "巴士延誤：在舊輕井澤直接搭計程車去輕井澤站，午餐改買鐵路便當上車吃。",
          ],
          [
            "趕不上 Asama 616：改搭下一班往東京的北陸新幹線，指定席可在えきねっと改票。",
          ],
        ],
      },
    },
  },
  {
    id: "day7",
    n: 7,
    date: "12 月 2 日（三）",
    title: "東京 → 羽田機場 → 松山",
    tags: [
      {
        label: "回程｜羽田 T3 14:15 起飛",
        kind: "stay",
      },
    ],
    lead: "改從羽田回松山，上午還能在東京補買一點東西。",
    timeline: [
      {
        time: "07:30–08:30",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["早餐、整理行李"],
          },
        ],
      },
      {
        time: "08:30–10:00",
        mode: "shop",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["飯店附近最後補貨：藥妝、便利商店零食"],
          },
          {
            k: "em",
            rich: ["空檔建議，行李多就直接出發"],
          },
        ],
      },
      {
        time: "約 10:00–10:30",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["退房（11:00 前），從田町步行或搭 JR 一站到濱松町"],
          },
        ],
      },
      {
        time: "約 10:45–11:30",
        mode: "train",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["前往羽田機場第 3 航廈"],
          },
          {
            k: "em",
            rich: ["品川搭京急約 15 分；濱松町搭東京單軌電車約 20 分"],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "羽田機場交通",
                href: "https://tokyo-haneda.com/access/train/index.html",
              },
            ],
          },
        ],
      },
      {
        time: "約 11:45–12:45",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["華航櫃檯報到、托運行李（建議起飛前 2.5 小時抵達）"],
          },
        ],
      },
      {
        time: "12:45–13:45",
        mode: "wait",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["安檢、出境、免稅店、候機"],
          },
        ],
      },
      {
        time: "14:15–17:15",
        mode: "plane",
        status: "confirmed",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["華航 CI221 羽田第 3 航廈 → 台北松山機場"],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "tip",
        title: "從田町去羽田",
        blocks: [
          {
            k: "p",
            rich: [
              "田町到濱松町只有一站，在濱松町轉東京單軌電車約 20 分到第 3 航廈。也可以從田町搭 JR 到品川轉京急，約 15 分。",
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "最後一個早上，從羽田飛回家",
      place: "田町 → 羽田機場 T3 → 台北松山",
      stay: "回家",
      stamp: "HANEDA → SONGSHAN · ",
      booking: [
        {
          item: "京急（品川）或東京單軌電車（濱松町）→ 羽田 T3",
          how: "刷交通卡即可，先確認餘額",
        },
        {
          item: "華航 CI221 羽田 T3 → 松山",
          how: "行前 24 小時線上報到",
          reserve: true,
        },
      ],
      backup: {
        title: "電車誤點時的備案",
        draft: true,
        items: [
          ["單軌電車誤點：改從品川搭京急；京急誤點則反過來走濱松町。"],
          [
            "報到以起飛前 2.5 小時、約 11:45 抵達 T3 為目標，時間很趕就跳過早上的補貨。",
          ],
        ],
      },
    },
  },
];
