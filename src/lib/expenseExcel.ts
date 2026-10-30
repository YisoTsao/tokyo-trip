import type { Borders, Fill, Font, Worksheet } from "exceljs";
import { CATEGORIES, CATEGORY_ORDER, STATUS_LABEL, type ExpenseGroup, type ExpenseStatus } from "../data/expenses";
import { TWD_PER_JPY, toTwd, type Currency, type MyAmounts } from "../hooks/useExpenses";

/** How the traveller typed a row: its currency and the number in that currency. */
export type EnteredOf = (row: ExpenseGroup["rows"][number]) => { cur: Currency; value?: number };

// Journal palette as ARGB, matching tokens.css.
const C = {
  ink: "FF4A3B36",
  inkSoft: "FF6B5A53",
  rose: "FF97566B",
  sakura: "FFFCE6EC",
  paper: "FFFFF9F2",
  paper2: "FFF7EDE2",
  line: "FFEAD8CD",
  lineStrong: "FFD6BCAE",
  sage: "FFE9EFE5",
  sageInk: "FF4F6549",
  ginkgo: "FFF8EDCF",
  maple: "FFF9E6DA",
  mapleInk: "FF9A4B2B",
  white: "FFFFFFFF",
};
const FONT = "Microsoft JhengHei";
const YEN = '"¥"#,##0;-"¥"#,##0;"¥"0';

const fill = (argb: string): Fill => ({ type: "pattern", pattern: "solid", fgColor: { argb } });
const font = (extra: Partial<Font> = {}): Partial<Font> => ({ name: FONT, size: 11, color: { argb: C.ink }, ...extra });
const hair: Borders = {
  top: { style: "hair", color: { argb: C.lineStrong } },
  bottom: { style: "hair", color: { argb: C.lineStrong } },
  left: { style: "hair", color: { argb: C.line } },
  right: { style: "hair", color: { argb: C.line } },
  diagonal: {},
};
const STATUS_LOOK: Record<ExpenseStatus, [string, string]> = {
  fixed: [C.sage, C.sageInk],
  est: [C.ginkgo, C.mapleInk],
  blank: [C.paper2, C.inkSoft],
};

const COLS = [
  { key: "date", header: "日期", width: 9 },
  { key: "cat", header: "大類", width: 8 },
  { key: "sub", header: "細項", width: 10 },
  { key: "item", header: "項目", width: 42 },
  { key: "note", header: "說明", width: 40 },
  { key: "status", header: "狀態", width: 8 },
  { key: "low", header: "預估下限", width: 12 },
  { key: "high", header: "預估上限", width: 12 },
  { key: "mine", header: "我的金額(日圓)", width: 14 },
  { key: "cLow", header: "計入下限", width: 12 },
  { key: "cHigh", header: "計入上限", width: 12 },
  { key: "input", header: "輸入金額", width: 12 },
  { key: "cur", header: "幣別", width: 8 },
];
const LAST = "M";
const RATE = "$E$3";

function styleRow(ws: Worksheet, r: number, bg: string, f: Partial<Font>, height?: number) {
  const row = ws.getRow(r);
  if (height) row.height = height;
  for (let c = 1; c <= COLS.length; c++) {
    const cell = row.getCell(c);
    cell.fill = fill(bg);
    cell.font = f;
    cell.border = hair;
    cell.alignment = { vertical: "middle", wrapText: true, horizontal: c === 13 || c === 6 || c <= 3 ? "center" : c >= 7 ? "right" : "left" };
    if (c >= 7 && c <= 11) cell.numFmt = YEN;
    if (c === 12) cell.numFmt = "#,##0";
  }
}

function detailSheet(ws: Worksheet, groups: ExpenseGroup[], mine: MyAmounts, enteredOf: EnteredOf) {
  ws.columns = COLS.map((c) => ({ key: c.key, width: c.width }));
  ws.properties.defaultRowHeight = 20;

  ws.mergeCells(`A1:${LAST}1`);
  ws.getCell("A1").value = "初冬北陸信州 7日旅・花費表";
  ws.getCell("A1").font = font({ size: 18, bold: true, color: { argb: C.rose } });
  ws.getCell("A1").alignment = { vertical: "middle" };
  ws.getRow(1).height = 34;
  ws.mergeCells(`A2:${LAST}2`);
  ws.getCell("A2").value =
    "2026/11/26–12/2・每人・日圓。確定＝行程頁已寫的票價；預估＝規劃用金額（吃的抓範圍）；未填＝還沒有金額。在「輸入金額」填數字並選「幣別」（日幣或台幣），台幣依下方匯率換算成日圓，計入欄與合計會自動更新。";
  ws.getCell("A2").font = font({ size: 10, color: { argb: C.inkSoft } });
  ws.getCell("A2").alignment = { vertical: "middle", wrapText: true };
  ws.getRow(2).height = 30;
  ws.mergeCells("A3:D3");
  ws.getCell("A3").value = "匯率：1 日圓 =";
  ws.getCell("A3").font = font({ size: 10, bold: true, color: { argb: C.inkSoft } });
  ws.getCell("A3").alignment = { vertical: "middle", horizontal: "right" };
  ws.getCell("E3").value = TWD_PER_JPY;
  ws.getCell("E3").numFmt = '0.00" 台幣"';
  ws.getCell("E3").font = font({ size: 10, bold: true, color: { argb: C.mapleInk } });
  ws.getCell("E3").fill = fill(C.maple);

  const head = 4;
  ws.getRow(head).values = COLS.map((c) => c.header);
  styleRow(ws, head, C.rose, font({ bold: true, color: { argb: C.white } }), 24);
  ws.views = [{ state: "frozen", ySplit: head }];

  let r = head + 1;
  const subtotals: number[] = [];
  const catTotals: Record<string, [number, number, number]> = {};
  let tLow = 0;
  let tHigh = 0;
  for (const g of groups) {
    ws.mergeCells(`A${r}:${LAST}${r}`);
    ws.getCell(`A${r}`).value = g.title;
    styleRow(ws, r, C.sakura, font({ bold: true, size: 12, color: { argb: C.rose } }), 24);
    ws.getCell(`A${r}`).alignment = { vertical: "middle", horizontal: "left", indent: 1 };
    r++;
    const first = r;
    let gLow = 0;
    let gHigh = 0;
    for (const row of g.rows) {
      const own = mine[row.id];
      const { cur, value } = enteredOf(row);
      ws.getRow(r).values = [g.date, row.cat, row.sub, row.item, row.note ?? "", STATUS_LABEL[row.status], row.low ?? null, row.high ?? null];
      // Type the amount in 輸入金額 and pick 幣別; 我的金額 is the yen figure the totals use.
      ws.getCell(`L${r}`).value = value ?? null;
      ws.getCell(`M${r}`).value = cur === "TWD" ? "台幣" : "日幣";
      ws.getCell(`I${r}`).value = { formula: `IF(L${r}="","",IF(M${r}="台幣",ROUND(L${r}/${RATE},0),L${r}))`, result: own ?? "" };
      // Filled amount wins; otherwise the estimate (blank rows count as 0).
      const lo = own ?? row.low ?? 0;
      const hi = own ?? row.high ?? 0;
      ws.getCell(`J${r}`).value = { formula: `IF(I${r}<>"",I${r},N(G${r}))`, result: lo };
      ws.getCell(`K${r}`).value = { formula: `IF(I${r}<>"",I${r},N(H${r}))`, result: hi };
      gLow += lo;
      gHigh += hi;
      for (const key of new Set<string>([row.cat, row.sub])) {
        catTotals[key] ??= [0, 0, 0];
        catTotals[key][0] += lo;
        catTotals[key][1] += hi;
        if (row.status === "blank" && own === undefined) catTotals[key][2]++;
      }
      styleRow(ws, r, r % 2 ? C.white : C.paper, font());
      const [bg, fg] = STATUS_LOOK[row.status];
      ws.getCell(`F${r}`).fill = fill(bg);
      ws.getCell(`F${r}`).font = font({ bold: true, size: 10, color: { argb: fg } });
      ws.getCell(`E${r}`).font = font({ size: 10, color: { argb: C.inkSoft } });
      ws.getCell(`L${r}`).fill = fill(C.maple);
      ws.getCell(`M${r}`).fill = fill(C.maple);
      ws.getCell(`M${r}`).dataValidation = { type: "list", allowBlank: false, formulae: ['"日幣,台幣"'] };
      r++;
    }
    ws.mergeCells(`A${r}:I${r}`);
    ws.getCell(`A${r}`).value = `${g.title} 小計`;
    ws.getCell(`J${r}`).value = { formula: `SUM(J${first}:J${r - 1})`, result: gLow };
    ws.getCell(`K${r}`).value = { formula: `SUM(K${first}:K${r - 1})`, result: gHigh };
    tLow += gLow;
    tHigh += gHigh;
    styleRow(ws, r, C.paper2, font({ bold: true }));
    ws.getCell(`A${r}`).alignment = { vertical: "middle", horizontal: "right" };
    subtotals.push(r);
    r++;
  }

  r++;
  ws.mergeCells(`A${r}:I${r}`);
  ws.getCell(`A${r}`).value = "每人合計（未填項目以 0 計）";
  ws.getCell(`J${r}`).value = { formula: subtotals.map((s) => `J${s}`).join("+"), result: tLow };
  ws.getCell(`K${r}`).value = { formula: subtotals.map((s) => `K${s}`).join("+"), result: tHigh };
  styleRow(ws, r, C.rose, font({ bold: true, size: 12, color: { argb: C.white } }), 28);
  ws.getCell(`A${r}`).alignment = { vertical: "middle", horizontal: "right" };
  const totalRow = r;

  // The two numbers the page leads with: one planning figure and what has been spent so far.
  const paid = groups.flatMap((g) => g.rows).reduce((n, row) => n + (mine[row.id] ?? 0), 0);
  const estimate = Math.round((tLow + tHigh) / 200) * 100;
  const finals: [string, string, number][] = [
    ["總預估（每人，取上下限中間值）", `ROUND((J${totalRow}+K${totalRow})/2,-2)`, estimate],
    ["總花費（我的金額加總）", `SUM(I${head + 1}:I${totalRow - 2})`, paid],
  ];
  for (const [label, formula, result] of finals) {
    r++;
    ws.mergeCells(`A${r}:I${r}`);
    ws.mergeCells(`J${r}:K${r}`);
    ws.mergeCells(`L${r}:M${r}`);
    ws.getCell(`A${r}`).value = label;
    ws.getCell(`J${r}`).value = { formula, result };
    ws.getCell(`L${r}`).value = { formula: `ROUND(J${r}*${RATE},0)`, result: toTwd(result) };
    styleRow(ws, r, C.maple, font({ bold: true, size: 13, color: { argb: C.mapleInk } }), 30);
    ws.getCell(`A${r}`).alignment = { vertical: "middle", horizontal: "right" };
    ws.getCell(`J${r}`).alignment = { vertical: "middle", horizontal: "center" };
    ws.getCell(`L${r}`).alignment = { vertical: "middle", horizontal: "center" };
    ws.getCell(`L${r}`).numFmt = '"NT$"#,##0';
  }

  ws.pageSetup = {
    orientation: "landscape",
    paperSize: 9,
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 },
    printTitlesRow: `${head}:${head}`,
  };
  ws.headerFooter = { oddFooter: "&C&9初冬北陸信州 7日旅・花費表　第 &P / &N 頁" };
  return { firstData: head + 1, lastData: totalRow - 2, catTotals };
}

function summarySheet(ws: Worksheet, range: { firstData: number; lastData: number; catTotals: Record<string, [number, number, number]> }) {
  ws.columns = [{ width: 16 }, { width: 15 }, { width: 15 }, { width: 13 }];
  ws.mergeCells("A1:D1");
  ws.getCell("A1").value = "分類統計（每人・日圓）";
  ws.getCell("A1").font = font({ size: 16, bold: true, color: { argb: C.rose } });
  ws.getRow(1).height = 30;

  ws.getRow(3).values = ["類別", "計入下限", "計入上限", "未填項數"];
  ws.views = [{ state: "frozen", ySplit: 3 }];
  const style = (r: number, bg: string, f: Partial<Font>) => {
    for (let c = 1; c <= 4; c++) {
      const cell = ws.getRow(r).getCell(c);
      cell.fill = fill(bg);
      cell.font = f;
      cell.border = hair;
      cell.alignment = { vertical: "middle", horizontal: c === 1 ? "center" : "right" };
      if (c === 2 || c === 3) cell.numFmt = YEN;
    }
    ws.getRow(r).height = 22;
  };
  style(3, C.rose, font({ bold: true, color: { argb: C.white } }));

  const col = (c: string) => `明細!$${c}$${range.firstData}:$${c}$${range.lastData}`;
  let r = 4;
  const sums = [0, 0, 0];
  const majors: number[] = [];
  for (const cat of CATEGORY_ORDER) {
    // Main category first, then its subcategories indented underneath.
    for (const [key, keyCol, isMajor] of [[cat, "B", true] as const, ...CATEGORIES[cat].map((s) => [s, "C", false] as const)]) {
      if (!isMajor && CATEGORIES[cat].length === 1) continue;
      const [lo, hi, open] = range.catTotals[key] ?? [0, 0, 0];
      if (isMajor) {
        sums[0] += lo;
        sums[1] += hi;
        sums[2] += open;
        majors.push(r);
      }
      ws.getRow(r).values = [isMajor ? key : `　${key}`];
      const k = `"${key}"`;
      ws.getCell(`B${r}`).value = { formula: `SUMIF(${col(keyCol)},${k},${col("J")})`, result: lo };
      ws.getCell(`C${r}`).value = { formula: `SUMIF(${col(keyCol)},${k},${col("K")})`, result: hi };
      ws.getCell(`D${r}`).value = {
        formula: `COUNTIFS(${col(keyCol)},${k},${col("I")},"",${col("F")},"${STATUS_LABEL.blank}")`,
        result: open,
      };
      style(r, isMajor ? C.sakura : C.white, isMajor ? font({ bold: true, color: { argb: C.rose } }) : font({ size: 10 }));
      ws.getCell(`A${r}`).alignment = { vertical: "middle", horizontal: "left", indent: isMajor ? 0 : 1 };
      r++;
    }
  }
  ws.getRow(r).values = ["合計"];
  ws.getCell(`B${r}`).value = { formula: majors.map((m) => `B${m}`).join("+"), result: sums[0] };
  ws.getCell(`C${r}`).value = { formula: majors.map((m) => `C${m}`).join("+"), result: sums[1] };
  ws.getCell(`D${r}`).value = { formula: majors.map((m) => `D${m}`).join("+"), result: sums[2] };
  style(r, C.paper2, font({ bold: true }));
}

export async function downloadExpenseExcel(groups: ExpenseGroup[], mine: MyAmounts, enteredOf: EnteredOf) {
  // Loaded on demand so the ~1 MB library never slows the first page load.
  const { default: ExcelJS } = await import("exceljs");
  const wb = new ExcelJS.Workbook();
  wb.creator = "初冬北陸信州 7日旅";
  wb.created = new Date();
  const range = detailSheet(wb.addWorksheet("明細", { properties: { tabColor: { argb: "FFF5B8C7" } } }), groups, mine, enteredOf);
  summarySheet(wb.addWorksheet("分類統計", { properties: { tabColor: { argb: "FFA8B9A3" } } }), range);
  wb.calcProperties.fullCalcOnLoad = true;

  const buf = await wb.xlsx.writeBuffer();
  const url = URL.createObjectURL(new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "初冬北陸信州7日旅_花費表.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
