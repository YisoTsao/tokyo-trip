// Which itinerary legs and tickets belong to each transport row of the 旅費 table, for the
// "every ride" dialog on the expenses page. Legs are matched by the time written on the day page
// and tickets by the start of their name, so rewording a leg's text does not break the link.
import { days } from "./days";
import type { BookingInfo, TimelineItem } from "./types";

interface RideRef {
  day: number;
  /** TimelineItem.time of each leg */
  times?: string[];
  /** BookingInfo.item prefixes */
  tickets?: string[];
}

const RIDES: Record<string, RideRef> = {
  "e-fl-out": { day: 1, times: ["13:45–17:35"], tickets: ["華航 CI370"] },
  "e1-bus": { day: 1, times: ["約 18:30–19:00"], tickets: ["機場免費直達巴士"] },
  "e2-shinkansen": { day: 2, times: ["約 06:37–06:50"], tickets: ["北陸新幹線 富山 → 黑部宇奈月溫泉"] },
  "e2-chitetsu": { day: 2, times: ["約 07:31–07:59"], tickets: ["富山地鐵本線"] },
  "e2-trolley": { day: 2, times: ["08:17–09:33", "11:04–12:23"], tickets: ["黑部峽谷觀光小火車"] },
  "e2-return": { day: 2, times: ["15:10–15:32", "15:42–15:54"], tickets: ["富山地鐵本線", "北陸新幹線 富山 → 黑部宇奈月溫泉"] },
  "e3-tateyama-go": { day: 3, times: ["07:04–08:25"], tickets: ["富山地鐵立山線"] },
  "e3-alpen": { day: 3, times: ["約 08:30–08:37", "約 08:47–09:50", "約 09:50–13:00", "約 13:20–15:37"], tickets: ["立山纜車", "立山 ⇄ 黑部湖"] },
  "e3-tateyama-back": { day: 3, times: ["約 15:45–16:50"], tickets: ["富山地鐵立山線"] },
  "e4-bus-go": { day: 4, times: ["09:00–10:20"], tickets: ["高速巴士 富山駅前 → 白川郷"] },
  "e4-bus-back": { day: 4, times: ["14:10–15:30"], tickets: ["高速巴士 白川郷 → 富山駅前"] },
  "e4-shinkansen": { day: 4, times: ["約 16:15–17:40"], tickets: ["北陸新幹線 富山 → 輕井澤"] },
  "e5-bus": { day: 5, times: ["14:44–約 16:00"], tickets: ["草輕交通巴士 舊輕井澤 → 草津溫泉"] },
  "e6-bus": { day: 6, times: ["10:50–約 12:00"], tickets: ["草輕交通巴士 草津溫泉 → 舊輕井澤"] },
  "e6-shinkansen": { day: 6, times: ["13:00–約 14:30"], tickets: ["北陸新幹線 Asama 616"] },
  "e7-airport": { day: 7, times: ["約 10:45–11:30"], tickets: ["京急"] },
  "e-fl-back": { day: 7, times: ["14:15–17:15"], tickets: ["華航 CI221"] },
};

export interface Ride {
  dayN: number;
  date: string;
  legs: TimelineItem[];
  tickets: BookingInfo[];
}

/** The itinerary legs and tickets behind one expense row, or undefined when the row has none. */
export function rideOf(expenseId: string): Ride | undefined {
  const ref = RIDES[expenseId];
  const day = ref && days.find((d) => d.n === ref.day);
  if (!ref || !day) return undefined;
  const legs = (ref.times ?? []).flatMap((t) => day.timeline.filter((it) => it.time === t));
  const tickets = (ref.tickets ?? []).flatMap((p) => (day.journal?.booking ?? []).filter((b) => b.item.startsWith(p)));
  if (!legs.length && !tickets.length) return undefined;
  return { dayN: day.n, date: day.date, legs, tickets };
}
