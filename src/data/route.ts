// Schematic route map: positions are drawn for legibility, not to scale.
export interface RouteStop {
  id: string;
  name: string;
  x: number;
  y: number;
  /** label placement around the dot */
  label?: "left" | "right" | "above" | "below";
}

export interface RouteLeg {
  from: string;
  to: string;
  /** day label drawn on the leg */
  days: string;
  /** curve bend in px; sign picks the side */
  bend?: number;
  dashed?: boolean;
}

export const routeStops: RouteStop[] = [
  { id: "toyama", name: "富山", x: 150, y: 150, label: "left" },
  { id: "unazuki", name: "黑部峽谷", x: 232, y: 74, label: "above" },
  { id: "kurobe", name: "立山・黑部水壩", x: 262, y: 206, label: "below" },
  { id: "shirakawa", name: "白川郷", x: 92, y: 258, label: "below" },
  { id: "kusatsu", name: "草津", x: 440, y: 112, label: "above" },
  { id: "karuizawa", name: "輕井澤", x: 452, y: 214, label: "right" },
  { id: "tokyo", name: "東京", x: 560, y: 300, label: "below" },
];

export const routeLegs: RouteLeg[] = [
  { from: "toyama", to: "unazuki", days: "2", bend: -18 },
  { from: "toyama", to: "kurobe", days: "3", bend: 14 },
  { from: "toyama", to: "shirakawa", days: "4", bend: -16 },
  { from: "toyama", to: "karuizawa", days: "4", bend: -34 },
  { from: "karuizawa", to: "kusatsu", days: "5・6", bend: -22 },
  { from: "karuizawa", to: "tokyo", days: "6", bend: 18 },
];
