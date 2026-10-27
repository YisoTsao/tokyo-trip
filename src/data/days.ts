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
        {
          item: "一般機場巴士（沒搭上免費巴士時）",
          price: "單程 ¥470",
          how: "現場購票，也可改搭計程車",
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
        flags: ["ref"],
        parts: [
          {
            k: "text",
            rich: ["觀光小火車返回宇奈月"],
          },
        ],
      },
      {
        time: "約 12:30–15:30",
        mode: "onsen",
        flags: ["sug"],
        parts: [
          {
            k: "text",
            rich: ["宇奈月溫泉街午餐、泡足湯、散步"],
          },
          {
            k: "em",
            rich: ["空檔建議，可依體力調整"],
          },
        ],
      },
      {
        time: "約 16:00–18:00",
        mode: "train",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["返回富山市區"],
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
          how: "車程短，可坐自由席；用交通卡進站最方便",
        },
        {
          item: "富山地鐵本線 新黑部 → 宇奈月溫泉",
          price: "¥740",
          how: "現場購票",
        },
        {
          item: "黑部峽谷觀光小火車 宇奈月 ⇄ 欅平",
          price: "見官網",
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
        ],
      },
    },
  },
  {
    id: "day3",
    n: 3,
    date: "11 月 28 日（六）",
    title: "立山黑部：富山來回黑部水壩",
    tags: [
      {
        label: "住宿｜富山日航都市飯店",
        kind: "stay",
      },
      {
        label: "全程最緊湊",
        kind: "hot",
      },
    ],
    lead: "從富山側上山一路到黑部湖（黑部水壩），再原路折返，晚上回富山住。",
    timeline: [
      {
        time: "約 06:20–07:00",
        mode: "sunrise",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["起床、準備出發（連住日航都市飯店，行李留在房間）"],
          },
        ],
      },
      {
        time: "07:04–08:25",
        mode: "train",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["電鐵富山站 → 立山站（富山地鐵立山線）"],
          },
          {
            k: "em",
            rich: ["¥1,420"],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "時刻表",
                href: "https://japantravel.navitime.com/zh-tw/area/jp/route/result/?start=00007872&goalCode=02301-4000032&start_name=%E5%AF%8C%E5%B1%B1&goal_name=%E7%AB%8B%E5%B1%B1%E7%99%BB%E5%B1%B1%E7%BA%9C%E8%BB%8A&cid=&from=route_result_search_box&date_time=2026-11-28T06%3A30",
              },
              {
                kind: "link",
                label: "立山交通資訊",
                href: "https://www.alpen-route.com/en/wp-content/uploads/2026/04/4b0625918f520ef863342e495946124d.pdf",
              },
              {
                kind: "link",
                label: "票價資訊",
                href: "https://www.kurobe-dam.com/pdf/alpineroute_fee.pdf",
              },
            ],
          },
        ],
      },
      {
        time: "約 08:30–08:37",
        mode: "cablecar",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["立山纜車 → 美女平"],
          },
          {
            k: "em",
            rich: ["已含在立山 ⇄ 黑部湖來回票內（單買來回 ¥1,980）"],
          },
        ],
      },
      {
        time: "約 08:47–09:50",
        mode: "bus",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["立山高原巴士 美女平 → 室堂"],
          },
        ],
      },
      {
        time: "約 09:50–13:00",
        mode: "ropeway",
        status: "reference",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: [
              "室堂 → 大觀峰 → 黑部平 → 黑部湖（黑部水壩），沿途拍照、午餐",
            ],
          },
          {
            k: "em",
            rich: [
              "立山 ⇄ 黑部湖來回票 ¥16,480・11 月底室堂已是雪地，請穿防滑鞋和保暖外套",
            ],
          },
        ],
      },
      {
        time: "約 13:20–15:37",
        mode: "ropeway",
        status: "tbc",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["黑部湖原路返回立山站"],
          },
          {
            k: "em",
            rich: ["回程末班 14:40，一定要在這之前從黑部湖出發"],
          },
        ],
      },
      {
        time: "約 15:45–16:50",
        mode: "train",
        status: "reference",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["立山站 → 電鐵富山站（富山地鐵立山線）"],
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
              "入住富山日航都市飯店；富山市區晚餐（白蝦、壽司、富山黑拉麵）",
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
            k: "p",
            rich: [
              "立山黑部是多段交通工具串接，排隊、天候、停留時間都會影響回程；錯過 14:40 的回程末班就下不了山。立山黑部約 11/30 結束當季營運，11/28 已接近尾聲，當天早上請先看官方營運資訊。",
            ],
          },
        ],
      },
      {
        kind: "tip",
        title: "時刻表版本",
        blocks: [
          {
            k: "p",
            rich: [
              "官方時刻表分為 2026/4/15–11/3 與 2026/11/4–11/30 兩種版本，這天請看後者。",
            ],
          },
          {
            k: "src",
            rich: [
              "來源：",
              {
                tag: "a",
                href: "https://www.alpen-route.com/timetable/list.php",
                children: ["立山黑部阿爾卑斯山脈路線官方時刻表"],
              },
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "初雪的立山，一路走到黑部水壩",
      place: "富山 ⇄ 立山 ⇄ 室堂 ⇄ 黑部湖",
      stay: "富山日航都市飯店（連住第 3 晚）",
      stamp: "ALPINE ROUTE · TATEYAMA · ",
      booking: [
        {
          item: "富山地鐵立山線 電鐵富山 → 立山",
          price: "¥1,420",
          how: "現場購票",
        },
        {
          item: "立山纜車 立山 → 美女平",
          price: "已含",
          how: "包含在下方的立山 ⇄ 黑部湖來回票內（單買來回 ¥1,980）",
          included: true,
        },
        {
          item: "立山 ⇄ 黑部湖 來回票（含纜車、高原巴士、空中纜車等）",
          price: "約 ¥16,480",
          how: "可上官網 Web 預約，熱門時段纜車要指定乘車時間",
          reserve: true,
        },
      ],
      backup: {
        title: "天候或停駛時的備案",
        draft: true,
        items: [
          [
            "當天早上官網公告停駛或部分停駛：不上山，改排富山市區，例如富山市玻璃美術館、富岩運河環水公園，或搭富山港線到岩瀨老街。",
          ],
          [
            "上山後天候轉差：以站內廣播與站員指示為準，不要自行步行到下一站；回程底線是 ",
            { tag: "b", children: ["14:40 從黑部湖出發"] },
            "。",
          ],
          [
            "排隊太久、時間不夠：放棄黑部湖，在室堂或大觀峰就折返，確保搭上回程。",
          ],
        ],
      },
    },
  },
  {
    id: "day4",
    n: 4,
    date: "11 月 29 日（日）",
    title: "白川郷合掌村 → 輕井澤",
    tags: [
      {
        label: "住宿｜輕井澤雙線飯店",
        kind: "stay",
      },
      {
        label: "巴士需預約",
        kind: "hot",
      },
    ],
    lead: "從富山站搭直達巴士去白川郷，下午回富山接北陸新幹線到輕井澤。",
    timeline: [
      {
        time: "07:30–08:20",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "早餐、退房富山日航都市飯店（就在富山站旁）；大行李放富山站投幣置物櫃，或帶上巴士放行李艙",
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
                children: ["富山地鐵運行・全車預約制・單程 ¥2,400"],
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
                href: "https://secure.j-bus.co.jp/hon/Route/Highway?gpcd=190004&rocd=0002&uncd=2102&dtym=202611&dtdd=29&filltertext=%E5%AF%8C%E5%B1%B1",
                className: "tag hot",
                children: ["巴士預約(前1個月預訂)"],
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
                  "富山地鐵運行・全車預約制・單程 ¥2,400・在白川郷巴士總站（荻町）上車",
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
        time: "15:30–16:10",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "富山站取行李，買晚餐帶上車：鱒壽司、白蝦天丼便當，或站內吃富山黑拉麵",
            ],
          },
        ],
      },
      {
        time: "約 16:15–17:40",
        mode: "shinkansen",
        status: "reference",
        flags: ["ref"],
        parts: [
          {
            k: "text",
            rich: ["北陸新幹線はくたか 富山 → 輕井澤（約 1 小時 23 分）"],
          },
          {
            k: "xfer",
            title: "⚠ 需要轉車・長野站換車",
            steps: [
              "① 富山 12 號月台 搭 Kagayaki 510 號 → 長野",
              "② 長野 14 號月台 轉 Asama 628 號 → 輕井澤",
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "北陸新幹線時刻表",
                href: "https://japantravel.navitime.com/zh-tw/area/jp/route/result/?start=00007872&goal=00002048&start_name=%E5%AF%8C%E5%B1%B1&goal_name=%E8%BC%95%E4%BA%95%E6%BE%A4&cid=&from=route_result_search_box&date_time=2026-11-29T16%3A10",
              },
            ],
          },
        ],
      },
      {
        time: "17:45 後",
        mode: "taxi",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "輕井澤站前往雙線飯店（飯店有接駁服務，可先打 +81-267-42-2121 確認；或步行約 19 分、計程車約 5 分）、入住",
            ],
          },
        ],
      },
    ],
    boxes: [
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
              "想慢慢逛，可以改搭 15:30 回程，再接 17:30 前後的はくたか，約 19:15 到輕井澤。11/29 是週日，座位容易滿，乘車日前一個月（10/29 起）就能訂位，越早越好。",
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
                    rich: ["高速巴士 富山 ⇄ 白川郷（來回）"],
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
                    rich: ["交通"],
                  },
                  {
                    rich: [
                      "北陸新幹線 富山 → 輕井澤 指定席",
                      {
                        tag: "br",
                      },
                      {
                        tag: "small",
                        children: ["估計值，以 JR 售票為準"],
                      },
                    ],
                  },
                  {
                    rich: ["約 ¥8,500–9,500"],
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
                    rich: ["輕井澤站 → 飯店計程車（可省略）"],
                  },
                  {
                    rich: ["約 ¥1,000–1,500"],
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
                    rich: ["雜支"],
                  },
                  {
                    rich: ["富山站投幣置物櫃（大型）"],
                  },
                  {
                    rich: ["¥500–800"],
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
                    rich: ["晚餐（鱒壽司或車站便當、黑拉麵）"],
                  },
                  {
                    rich: ["¥1,200–2,000"],
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
                    rich: ["約 ¥17,000–25,000"],
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
                "若回程搭 15:30 的巴士，到富山後可先在站內「きときと市場 とやマルシェ」逛伴手禮再上新幹線。",
              ],
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "白川郷合掌村，傍晚到輕井澤",
      place: "富山 → 白川郷 → 富山 → 輕井澤",
      stay: "輕井澤雙線飯店",
      stamp: "SHIRAKAWA-GO · GASSHO · ",
      booking: [
        {
          item: "高速巴士 富山駅前 → 白川郷（09:00）",
          price: "¥2,400",
          how: "全車預約制，乘車日前一個月（10/29）開放預約",
          reserve: true,
        },
        {
          item: "高速巴士 白川郷 → 富山駅前（14:10）",
          price: "¥2,400",
          how: "全車預約制；想晚點走可改 15:30",
          reserve: true,
        },
        {
          item: "荻町城跡展望台接駁巴士（單程）",
          price: "約 ¥200",
          how: "現場搭乘，也可步行上山",
        },
        {
          item: "北陸新幹線 富山 → 輕井澤 指定席",
          price: "約 ¥8,500–9,500",
          how: "估計值，以 JR 售票為準；週日傍晚建議指定席",
          reserve: true,
        },
      ],
      backup: {
        title: "沒訂到位或下雪延誤時",
        draft: true,
        items: [
          [
            "09:00 去程客滿：改 10:10 那班（11:30 到），回程維持 14:10 或改 15:30。",
          ],
          [
            "回程想晚點走或巴士延誤：搭 15:30 回程，接 17:30 前後的はくたか，約 19:15 到輕井澤。",
          ],
          [
            "晚到輕井澤：先打給飯店 ",
            {
              tag: "a",
              href: "tel:+81267422121",
              children: ["+81-267-42-2121"],
            },
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
    title: "輕井澤 → 草津溫泉",
    tags: [
      {
        label: "住宿｜草津溫泉阿達雅日式旅館",
        kind: "stay",
      },
      {
        label: "14:44 舊輕井澤上車",
        kind: "hot",
      },
    ],
    lead: "上午逛 Outlet、下午逛舊輕井澤，再從舊輕井澤搭草輕交通巴士上草津，晚上泡湯、看湯畑點燈。",
    timeline: [
      {
        time: "08:00–08:45",
        mode: "bag",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["早餐、退房輕井澤雙線飯店"],
          },
          {
            k: "em",
            rich: ["搭計程車到輕井澤站（約 5 分），大行李放車站投幣置物櫃"],
          },
        ],
      },
      {
        time: "10:00–12:30",
        mode: "shop",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["輕井澤王子購物廣場 Outlet（車站南口）、午餐"],
          },
          {
            k: "em",
            rich: ["10:00 開門；午餐可吃美食街，或 Outlet 內的蕎麥麵、咖哩"],
          },
        ],
      },
      {
        time: "12:45–13:15",
        mode: "taxi",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["回車站取行李，搭計程車到舊輕井澤（約 5–10 分）"],
          },
        ],
      },
      {
        time: "13:15–14:30",
        mode: "sight",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["舊輕井澤銀座散步：聖保羅天主教堂、果醬老舖、咖啡"],
          },
          {
            k: "em",
            rich: ["帶著行李逛，可以先找間咖啡店坐下輪流逛街"],
          },
        ],
      },
      {
        time: "14:30",
        mode: "wait",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["到「旧軽井沢」巴士站候車"],
          },
        ],
      },
      {
        time: "14:44–約 16:00",
        mode: "bus",
        status: "confirmed",
        flags: ["ref", "key"],
        parts: [
          {
            k: "text",
            rich: ["草輕交通巴士 舊輕井澤 → 草津溫泉巴士總站"],
          },
          {
            k: "em",
            rich: [
              "在「旧軽井沢」站 14:44 上車（這班 14:40 從輕井澤站北口發車）・約 1 小時 15 分・¥2,240・免預約，可用信用卡觸碰付款・客滿可能要等下一班",
            ],
          },
          {
            k: "links",
            items: [
              {
                kind: "link",
                label: "草輕線時刻表（2026/11/1 冬季班表）",
                href: "https://www.kkkg.co.jp/bus/timetable/kusakaru_sen_sim20261101.pdf",
              },
              {
                kind: "map",
                label: "🗺 看上車位置地圖",
                dialog: "busmap",
              },
            ],
          },
        ],
      },
      {
        time: "約 16:00–16:30",
        mode: "walk",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["步行到草津溫泉阿達雅日式旅館辦理入住、放行李"],
          },
        ],
      },
      {
        time: "16:30–17:30",
        mode: "sight",
        flags: ["key"],
        parts: [
          {
            k: "text",
            rich: ["湯畑、西之河原通散步，吃溫泉饅頭、溫泉蛋"],
          },
          {
            k: "em",
            rich: ["傍晚天色變暗、湯煙最明顯，拍照很美"],
          },
        ],
      },
      {
        time: "17:30–18:30",
        mode: "onsen",
        flags: [],
        parts: [
          {
            k: "text",
            rich: [
              "泡湯：西之河原露天風呂或大瀧乃湯（付費），也可去免費的白旗之湯",
            ],
          },
        ],
      },
      {
        time: "18:30–19:30",
        mode: "meal",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["晚餐：旅館料理，或湯畑周邊的舞茸天婦羅蕎麥麵"],
          },
        ],
      },
      {
        time: "19:30 後",
        mode: "sight",
        flags: [],
        parts: [
          {
            k: "text",
            rich: ["湯畑夜間點燈散步，回旅館休息"],
          },
        ],
      },
    ],
    boxes: [
      {
        kind: "warn",
        title: "巴士注意",
        blocks: [
          {
            k: "p",
            rich: [
              "草輕線行經白絲高原道路，道路封閉時停駛，11 月底可能遇到下雪，出發前請先確認。巴士不保證接新幹線，客滿時要等下一班，旧軽井沢站是中途站，建議提早 15 分鐘到站候車。",
            ],
          },
          {
            k: "src",
            rich: [
              "來源：",
              {
                tag: "a",
                href: "https://www.kkkg.co.jp/bus/timetable/kusakaru_sen_sim20261101.pdf",
                children: ["草輕交通 草輕線時刻表"],
              },
            ],
          },
        ],
      },
    ],
    journal: {
      theme: "從輕井澤上山，看草津湯畑的煙",
      place: "輕井澤 → 舊輕井澤 → 草津溫泉",
      stay: "草津溫泉阿達雅日式旅館",
      stamp: "KUSATSU ONSEN · YUBATAKE · ",
      booking: [
        {
          item: "草輕交通巴士 舊輕井澤 → 草津溫泉（14:44）",
          price: "¥2,240",
          how: "免預約，可用信用卡觸碰付款；客滿要等下一班",
        },
      ],
      backup: {
        title: "道路封閉或客滿時的備案",
        draft: true,
        items: [
          [
            "白絲高原道路封閉、草輕線停駛：改走 JR，輕井澤搭新幹線到高崎，轉吾妻線到長野原草津口，再搭巴士到草津溫泉（出發前用乘換 App 查時間）。",
          ],
          ["14:44 客滿：等下一班，並先打給旅館說會晚一點到。"],
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
                href: "https://www.kkkg.co.jp/bus/timetable/kusakaru_sen_sim20261101.pdf",
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
          price: "以查詢為準",
          how: "建議指定席，えきねっと購票並綁定交通卡",
          reserve: true,
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
