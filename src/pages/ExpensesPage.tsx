import { useState } from "react";
import { JournalLayout } from "../components/journal/JournalLayout";
import { SectionHeading, WashiTape, type Tone } from "../components/journal/ui";
import { STATUS_LABEL, expenseGroups, type ExpenseRow } from "../data/expenses";
import { useExpenses, type MyAmounts } from "../hooks/useExpenses";
import { Icon } from "../illustrations/journal/icons";
import { allRows, midpoint, spent, sum, yen, yenRange } from "../lib/expenses";

const TONES: Tone[] = ["sakura", "sage", "ginkgo", "maple"];

function AmountInput({ row, mine, onChange }: { row: ExpenseRow; mine: MyAmounts; onChange: (id: string, yen: number | null) => void }) {
  const own = mine[row.id];
  return (
    <input
      className="j-exp__input j-num"
      type="text"
      inputMode="numeric"
      placeholder={row.status === "blank" ? "填金額" : "實際"}
      aria-label={`${row.item} 我的金額（日圓）`}
      value={own === undefined ? "" : own.toLocaleString("en-US")}
      onChange={(e) => {
        const digits = e.target.value.replace(/[^\d]/g, "");
        onChange(row.id, digits ? Number(digits) : null);
      }}
    />
  );
}

function Estimate({ row }: { row: ExpenseRow }) {
  if (row.low === undefined || row.high === undefined) return <span className="j-exp__none">—</span>;
  return <span className="j-num">{yenRange(row.low, row.high)}</span>;
}

export function ExpensesPage() {
  const { mine, setAmount, reset } = useExpenses();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const total = sum(allRows(expenseGroups), mine);
  const paid = spent(allRows(expenseGroups), mine);

  const cats = [...new Set(allRows(expenseGroups).map((r) => r.cat))].map((cat) => ({
    cat,
    ...sum(
      allRows(expenseGroups).filter((r) => r.cat === cat),
      mine,
    ),
  }));

  async function download() {
    setBusy(true);
    setError("");
    try {
      const { downloadExpenseExcel } = await import("../lib/expenseExcel");
      await downloadExpenseExcel(expenseGroups, mine);
    } catch {
      setError("下載失敗，請重新整理後再試一次。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <JournalLayout>
      <header className="j-checkhead">
        <div>
          <span className="j-hero__kicker" aria-hidden="true">
            Travel budget
          </span>
          <h1 className="j-dayhead__title">旅費總覽</h1>
          <p className="j-dayhead__sub" style={{ marginTop: 6 }}>
            每人、日圓。「確定」是行程頁已寫的票價，「預估」是規劃用的金額（吃的抓範圍），「未填」像機票、住宿還沒有金額。在「我的金額」填入實際花費，合計會跟著更新，金額只存在這台裝置的瀏覽器。
          </p>
        </div>
        <div className="j-card j-exp-total">
          <span className="j-exp-total__label">
            <Icon name="wallet" size={18} />
            目前預估花費（每人）
          </span>
          <b className="j-exp-total__sum j-num">約 {yen(midpoint(total))}</b>
          <small>
            範圍 {yenRange(total.low, total.high)}
            {total.open ? `・不含 ${total.open} 項未填（機票、住宿等）` : ""}
          </small>
          <p className="j-exp-total__spent">
            總花費 <b className="j-num">{yen(paid.total)}</b>
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
        <SectionHeading kicker="By category" title="分類小計" id="exp-cats" />
        <ul className="j-expcats">
          {cats.map((c) => (
            <li key={c.cat} className="j-card j-card--plain">
              <span>{c.cat}</span>
              <b className="j-num">{c.high ? yenRange(c.low, c.high) : "—"}</b>
              {c.open > 0 && <small>{c.open} 項未填</small>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="花費明細">
        <SectionHeading kicker="Details" title="每日明細" sub="計程車為每車價格，可和同行的人分攤。" />
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
                          {r.item}
                          {r.note && <small>{r.note}</small>}
                        </th>
                        <td className="j-exp__cat">{r.cat}</td>
                        <td>
                          <span className={`j-expst j-expst--${r.status}`}>{STATUS_LABEL[r.status]}</span>
                        </td>
                        <td className="j-exp__num">
                          <Estimate row={r} />
                        </td>
                        <td className="j-exp__num">
                          <AmountInput row={r} mine={mine} onChange={setAmount} />
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
        <dl>
          <div>
            <dt>總預估</dt>
            <dd>
              <b className="j-num">約 {yen(midpoint(total))}</b>
              <small className="j-num">
                {yenRange(total.low, total.high)}
                {total.open ? `，不含 ${total.open} 項未填` : ""}
              </small>
            </dd>
          </div>
          <div>
            <dt>總花費</dt>
            <dd>
              <b className="j-num">{yen(paid.total)}</b>
              <small>{paid.count ? `已填 ${paid.count} 項的實際金額` : "在「我的金額」填入後會加總在這裡"}</small>
            </dd>
          </div>
        </dl>
      </section>

      <p className="j-exp-foot">
        <span>總預估不含未填項目，填了「我的金額」的項目改用你的金額；總花費只加總你填的金額。</span>
        <button
          type="button"
          className="j-btn j-btn--ghost"
          onClick={() => {
            if (window.confirm("要清除所有「我的金額」嗎？")) reset();
          }}
        >
          清除我的金額
        </button>
      </p>
    </JournalLayout>
  );
}
