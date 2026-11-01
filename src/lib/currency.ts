/** Fixed planning rate: NT$ per ¥1. */
export const TWD_PER_JPY = 0.21;
export const toYen = (twd: number) => Math.round(twd / TWD_PER_JPY);
export const toTwd = (jpy: number) => Math.round(jpy * TWD_PER_JPY);
