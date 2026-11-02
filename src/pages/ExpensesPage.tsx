import { useState } from "react";
import { MapDialogProvider } from "../components/MapDialogs";
import { RideDialog, type RideList } from "../components/journal/RideDialog";
import { rideOf } from "../data/rides";
import { JournalLayout } from "../components/journal/JournalLayout";
import { SectionHeading, WashiTape, type Tone } from "../components/journal/ui";
import { CATEGORIES, CATEGORY_ORDER, STATUS_LABEL, type ExpenseRow } from "../data/expenses";
import { TRIP_API, useSyncState, useTrip } from "../data/live";
import { TWD_PER_JPY, toTwd, toYen, useExpenses, type Currency } from "../hooks/useExpenses";
import { Icon } from "../illustrations/journal/icons";
import { allRows, midpoint, ntd, spent, sum, yen, yenRange } from "../lib/expenses";

const TONES: Tone[] = ["sakura", "sage", "ginkgo", "maple"];

/** The parts of the bottom total that can be switched off to see what the rest adds up to. */
const PARTS = [
  { key: "food", label: "飲食", has: (r: ExpenseRow) => r.cat === "飲食" },
  { key: "stay", label: "住宿", has: (r: ExpenseRow) => r.cat === "住宿" },
  { key: "flight", label: "機票", has: (r: ExpenseRow) => r.sub === "飛機" },
  { key: "transport", label: "其它交通", has: (r: ExpenseRow) => r.cat === "交通" && r.sub !== "飛機" },
  { key: "other", label: "其它費用", has: (r: ExpenseRow) => r.cat === "其他" },
] as const;
type PartKey = (typeof PARTS)[number]["key"];

type Expenses = ReturnType<typeof useExpenses>;

function AmountInput({ row, exp }: { row: ExpenseRow; exp: Expenses }) {
  const cur = exp.currencyOf(row);
  const value = exp.entered(row);
  const label = cur === "TWD" ? "台幣" : "日圓";
  const split = exp.splitOf(row);
  return (
    <div className="j-amount">
      <div className="j-cur" role="group" aria-label={`${row.item} 幣別`}>
        {(["JPY", "TWD"] as Currency[]).map((c) => (
          <button key={c} type="button" aria-pressed={cur === c} onClick={() => cur !== c && exp.setCurrency(row, c)}>
            {c === "JPY" ? "¥" : "NT$"}
          </button>
        ))}
      </div>
      <input
        className="j-exp__input j-num"
        type="text"
        inputMode="numeric"
        placeholder={split > 1 ? "實付總額" : row.status === "blank" ? "填金額" : "實際"}
        aria-label={`${row.item} 我的金額（${label}${split > 1 ? `，${split} 人的總額` : ""}）`}
        value={value === undefined ? "" : value.toLocaleString("en-US")}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^\d]/g, "");
          exp.setAmount(row, digits ? Number(digits) : null);
        }}
      />
      {value !== undefined && split > 1 ? (
        <small className="j-amount__conv j-num">
          ÷ {split} 人 = 每人 {cur === "TWD" ? `${ntd(Math.round(value / split))} ≈ ${yen(exp.mine[row.id])}` : yen(exp.mine[row.id])}
        </small>
      ) : (
        cur === "TWD" && value !== undefined && <small className="j-amount__conv j-num">≈ {yen(toYen(value))}</small>
      )}
    </div>
  );
}

function Estimate({ row }: { row: ExpenseRow }) {
  if (row.low === undefined || row.high === undefined) return <span className="j-exp__none">—</span>;
  if (row.split > 1)
    return (
      <span className="j-num">
        {yenRange(row.low, row.high)}
        <small className="j-amount__conv">
          總額 {row.twd !== undefined ? ntd(row.twd) : yen(row.total ?? row.low * row.split)} ÷ {row.split}
        </small>
      </span>
    );
  if (row.twd !== undefined)
    return (
      <span className="j-num">
        {ntd(row.twd)}
        <small className="j-amount__conv"> ≈ {yen(row.low)}</small>
      </span>
    );
  return <span className="j-num">{yenRange(row.low, row.high)}</span>;
}

function SyncNote() {
  const { state } = useSyncState();
  if (!TRIP_API || state === "idle") return null;
  const text = { saving: "存進 Notion 中…", saved: "已存進 Notion。", error: "沒能存進 Notion，金額先留在這台裝置，下次開啟頁面會再送一次。" }[state];
  return (
    <span className={`j-exp-sync j-exp-sync--${state}`} role="status">
      {" "}
      {text}
    </span>
  );
}

/** A subcategory's yen amount with its NT$ equivalent underneath. */
function SubAmount({ range }: { range: ReturnType<typeof sum> }) {
  if (!range.high) return <span className="j-num">{range.open ? "未填" : "—"}</span>;
  const twd = range.low === range.high ? ntd(toTwd(range.low)) : `${ntd(toTwd(range.low))}–${ntd(toTwd(range.high)).replace("NT$", "")}`;
  return (
    <span className="j-num j-expcat__amt">
      {yenRange(range.low, range.high)}
      <small>≈ {twd}</small>
    </span>
  );
}

function PartSum({ range }: { range: ReturnType<typeof sum> }) {
  return <small className="j-num">{range.high ? yen(midpoint(range)) : range.open ? "未填" : "—"}</small>;
}

export function ExpensesPage() {
  const exp = useExpenses();
  const { expenseGroups } = useTrip();
  const { mine, reset } = exp;
  const [busy, setBusy] = useState(false);
  const [ride, setRide] = useState<RideList | null>(null);
  const [off, setOff] = useState<Partial<Record<PartKey, boolean>>>({});
  const [error, setError] = useState("");
  const total = sum(allRows(expenseGroups), mine);
  const paid = spent(allRows(expenseGroups), mine);

  const rows = allRows(expenseGroups);
  const kept = rows.filter((r) => PARTS.some((p) => !off[p.key] && p.has(r)));
  const keptTotal = sum(kept, mine);
  const keptPaid = spent(kept, mine);
  const cats = CATEGORY_ORDER.map((cat) => ({
    cat,
    ...sum(
      rows.filter((r) => r.cat === cat),
      mine,
    ),
    subs: CATEGORIES[cat]
      .map((sub) => ({ sub, rows: rows.filter((r) => r.sub === sub) }))
      .filter((s) => s.rows.length > 0)
      .map((s) => ({ ...s, ...sum(s.rows, mine) })),
  }));

  async function download() {
    setBusy(true);
    setError("");
    try {
      const { downloadExpenseExcel } = await import("../lib/expenseExcel");
      await downloadExpenseExcel(expenseGroups, mine, (row) => ({ cur: exp.currencyOf(row), value: exp.entered(row) }));
    } catch {
      setError("下載失敗，請重新整理後再試一次。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <MapDialogProvider journal>
    <JournalLayout>
      <header className="j-checkhead">
        <div>
          <span className="j-hero__kicker" aria-hidden="true">
            Travel budget
          </span>
          <h1 className="j-dayhead__title">旅費總覽</h1>
          <p className="j-dayhead__sub" style={{ marginTop: 6 }}>
            每人、日圓。「確定」是行程頁已寫的票價，「預估」是規劃用的金額（吃的以最高金額估），「未填」像機票還沒有金額。在「我的金額」填入實際花費，每列可切換日幣（¥）或台幣（NT$），台幣以 1 日圓 = {TWD_PER_JPY} 台幣換算成日圓加總。機票和住宿填兩人的實付總額，每人算一半。填好的金額會存進 Notion 的旅費表。
            <SyncNote />
          </p>
        </div>
        <div className="j-card j-exp-total">
          <span className="j-exp-total__label">
            <Icon name="wallet" size={18} />
            目前預估花費（每人）
          </span>
          <b className="j-exp-total__sum j-num">約 {yen(midpoint(total))}</b>
          <span className="j-exp-total__twd j-num">≈ {ntd(toTwd(midpoint(total)))}</span>
          <small>
            範圍 {yenRange(total.low, total.high)}
            {total.open ? `・不含 ${total.open} 項未填（機票、住宿等）` : ""}
          </small>
          <p className="j-exp-total__spent">
            總花費 <b className="j-num">{yen(paid.total)}</b>
            <span className="j-num">≈ {ntd(toTwd(paid.total))}</span>
            <small>{paid.count ? `已填 ${paid.count} 項` : "還沒填實際金額"}</small>
          </p>
          <button type="button" className="j-btn" onClick={download} disabled={busy}>
            <Icon name="download" size={18} />
            {busy ? "準備檔案中…" : "下載 Excel"}
          </button>
          {error && (
            <p className="j-exp-total__error" role="alert">
              {error}
            </p>
          )}
        </div>
      </header>

      <section aria-labelledby="exp-cats">
        <SectionHeading kicker="By category" title="四大類小計" id="exp-cats" sub="交通含飛機、新幹線、電車、巴士，點各項可看搭乘時間和票券；飲食含正餐、點心和飲料，都以最高金額估算。飲料以一天約 3 瓶自販機飲料加 1 杯咖啡估算。" />
        <ul className="j-expcats">
          {cats.map((c) => (
            <li key={c.cat} className={`j-card j-expcat j-expcat--${CATEGORY_ORDER.indexOf(c.cat)}`}>
              <div className="j-expcat__head">
                <h3>{c.cat}</h3>
                <b className="j-num">{c.high ? (c.low === c.high ? yen(c.low) : `約 ${yen(midpoint(c))}`) : "—"}</b>
              </div>
              {c.high > 0 && <span className="j-expcat__twd j-num">≈ {ntd(toTwd(c.low === c.high ? c.low : midpoint(c)))}</span>}
              <small className="j-expcat__range j-num">
                {c.high && c.low !== c.high ? yenRange(c.low, c.high) : ""}
                {c.open > 0 ? `${c.high && c.low !== c.high ? "・" : ""}${c.open} 項未填` : ""}
              </small>
              {c.subs.length > 1 && (
                <ul className="j-expcat__subs">
                  {c.subs.map((s) => (
                    <li key={s.sub}>
                      {c.cat === "交通" ? (
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          aria-label={`${s.sub}：看搭乘時間與票券`}
                          onClick={() => setRide({ title: s.sub, rows: s.rows })}
                        >
                          <span>{s.sub}</span>
                          <SubAmount range={s} />
                        </button>
                      ) : (
                        <>
                          <span>{s.sub}</span>
                          <SubAmount range={s} />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="花費明細">
        <SectionHeading kicker="Details" title="每日明細" sub="點交通項目可以看搭乘時間和票券。" />
        <div className="j-sheets">
          {expenseGroups.map((g, gi) => {
            const sub = sum(g.rows, mine);
            return (
              <section key={g.id} className="j-card j-exp" aria-labelledby={`exp-${g.id}`}>
                <WashiTape tone={TONES[gi % TONES.length]} style={{ top: -11, left: 22, transform: `rotate(${gi % 2 ? 3 : -4}deg)`, width: 70 }} />
                <div className="j-exp__head">
                  <h2 id={`exp-${g.id}`}>
                    <span className="j-exp__date j-num">{g.date}</span>
                    {g.title.replace(/^Day \d /, "")}
                  </h2>
                  <p className="j-exp__sub">
                    小計 <b className="j-num">{sub.high || !sub.open ? yenRange(sub.low, sub.high) : "—"}</b>
                    {sub.open > 0 && <small>（{sub.open} 項未填）</small>}
                  </p>
                </div>
                <table className="j-exp__table">
                  <colgroup>
                    <col />
                    <col className="c-cat" />
                    <col className="c-st" />
                    <col className="c-est" />
                    <col className="c-mine" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">項目</th>
                      <th scope="col">類別</th>
                      <th scope="col">狀態</th>
                      <th scope="col" className="j-exp__num">
                        預估
                      </th>
                      <th scope="col" className="j-exp__num">
                        我的金額
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map((r) => (
                      <tr key={r.id} className={mine[r.id] !== undefined ? "j-exp__row--mine" : undefined}>
                        <th scope="row">
                          {r.cat === "交通" && rideOf(r.id) ? (
                            <button type="button" className="j-exp__ride" aria-haspopup="dialog" onClick={() => setRide({ title: r.item, rows: [r] })}>
                              {r.item}
                              <Icon name="clock" size={14} />
                            </button>
                          ) : (
                            r.item
                          )}
                          {r.note && <small>{r.note}</small>}
                        </th>
                        <td className="j-exp__cat">{r.sub}</td>
                        <td>
                          <span className={`j-expst j-expst--${r.status}`}>{STATUS_LABEL[r.status]}</span>
                        </td>
                        <td className="j-exp__num">
                          <Estimate row={r} />
                        </td>
                        <td className="j-exp__num">
                          <AmountInput row={r} exp={exp} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>
      </section>

      <section className="j-card j-card--ticket j-exp-summary" aria-labelledby="exp-summary">
        <h2 id="exp-summary">
          <Icon name="wallet" size={20} />
          總計（每人）
        </h2>
        <ul className="j-exp-switches" aria-label="要算進總計的項目">
          {PARTS.map((p) => (
            <li key={p.key}>
              <label className="j-switch">
                <input type="checkbox" role="switch" checked={!off[p.key]} onChange={(e) => setOff({ ...off, [p.key]: !e.target.checked })} />
                <span className="j-switch__track" aria-hidden="true" />
                {p.label}
                <PartSum range={sum(rows.filter(p.has), mine)} />
              </label>
            </li>
          ))}
        </ul>
        <dl>
          <div>
            <dt>總預估</dt>
            <dd>
              <b className="j-num">約 {yen(midpoint(keptTotal))}</b>
              <span className="j-exp-summary__twd j-num">≈ {ntd(toTwd(midpoint(keptTotal)))}</span>
              <small className="j-num">
                {yenRange(keptTotal.low, keptTotal.high)}
                {keptTotal.open ? `，不含 ${keptTotal.open} 項未填` : ""}
              </small>
            </dd>
          </div>
          <div>
            <dt>總花費</dt>
            <dd>
              <b className="j-num">{yen(keptPaid.total)}</b>
              <span className="j-exp-summary__twd j-num">≈ {ntd(toTwd(keptPaid.total))}</span>
              <small>{keptPaid.count ? `已填 ${keptPaid.count} 項的實際金額` : "在「我的金額」填入後會加總在這裡"}</small>
            </dd>
          </div>
        </dl>
      </section>

      <p className="j-exp-foot">
        <span>總預估不含未填項目，填了「我的金額」的項目改用你的金額；總花費只加總你填的金額。清除只會清掉這台裝置還沒存進 Notion 的金額。</span>
        <button
          type="button"
          className="j-btn j-btn--ghost"
          onClick={() => {
            if (window.confirm("要清除這台裝置暫存的金額嗎？已存進 Notion 的金額不會被刪。")) reset();
          }}
        >
          清除本機暫存
        </button>
      </p>
      <RideDialog list={ride} onClose={() => setRide(null)} />
    </JournalLayout>
    </MapDialogProvider>
  );
}
