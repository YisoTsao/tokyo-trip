import { useState } from "react";
import { CheckRow, SheetCard, type Filter } from "../components/journal/JournalChecklist";
import { JournalLayout } from "../components/journal/JournalLayout";
import { ReminderList, Ring, progressOf } from "../components/journal/Progress";
import { SectionHeading } from "../components/journal/ui";
import { checklist } from "../data/checklist";
import { highPriority } from "../data/checklistMeta";
import type { CheckItem } from "../data/types";
import { useChecklist } from "../hooks/useChecklist";
import { Icon } from "../illustrations/journal/icons";
import { sheetItems } from "../components/Checklist";

const allItems: Record<string, CheckItem> = Object.fromEntries(checklist.flatMap(sheetItems).map((i) => [i.id, i]));
/** Which leg an item belongs to, so a check like 「已預訂」 still says what it is in the priority list. */
const legTitle: Record<string, string> = Object.fromEntries(
  checklist.flatMap((s) => (s.rows ?? []).flatMap((r) => ("checks" in r ? r.checks.map((c) => [c.id, `${r.when} ${r.title}`]) : []))),
);

export function JournalChecklistPage() {
  const { checked, toggle, reset } = useChecklist();
  const [filter, setFilter] = useState<Filter>({ undoneOnly: false, mustOnly: false });
  const { total, done, pct } = progressOf(checked);

  return (
    <JournalLayout>
      <header className="j-checkhead">
        <div>
          <span className="j-hero__kicker" aria-hidden="true">
            Before we go
          </span>
          <h1 className="j-dayhead__title">出發前的預訂與行李</h1>
          <p className="j-dayhead__sub" style={{ marginTop: 6 }}>
            勾選會記在這台裝置的瀏覽器裡，換手機或電腦不會同步。新幹線建議用 JR 東日本「えきねっと」購買新幹線eチケット，再綁定交通卡（Suica 等），進站直接刷卡即可。
          </p>
        </div>
        <div className="j-card j-ring">
          <Ring pct={pct} />
          <div>
            <div className="j-ring__pct j-num">{pct}%</div>
            <div className="j-num" style={{ fontSize: 13, color: "var(--c-ink-soft)" }}>
              已完成 {done} / {total} 項
            </div>
          </div>
        </div>
      </header>

      <div className="j-split">
        <section className="j-card j-callout j-callout--warn" aria-labelledby="hp-title">
          <h2 className="j-callout__title" id="hp-title">
            <Icon name="warning" size={20} />
            最優先：山區交通與營運確認
          </h2>
          <p className="j-callout__src">立山黑部、黑部峽谷小火車與草輕線都受季末與天候影響，先處理這幾項。</p>
          <div className="j-checklist-col">
            {highPriority.map((id) => (
              <div key={id} className="j-hp">
                <small>{legTitle[id]}</small>
                <CheckRow item={allItems[id]} checked={checked} onChange={toggle} idPrefix="hp-" />
              </div>
            ))}
          </div>
        </section>
        <section className="j-card j-card--sticky j-tone-ginkgo" aria-labelledby="rem-title">
          <h2 className="j-callout__title" id="rem-title" style={{ marginBottom: 12 }}>
            <Icon name="clock" size={20} />
            出發前提醒
          </h2>
          <ReminderList checked={checked} limit={6} />
        </section>
      </div>

      <section aria-label="清單">
        <SectionHeading kicker="Checklist" title="分類清單" sub="必要：沒做會影響行程；建議：做了比較順；選配：看個人需要。" />
        <div className="j-filters" role="group" aria-label="篩選">
          <button type="button" className="j-chip" aria-pressed={filter.undoneOnly} onClick={() => setFilter((f) => ({ ...f, undoneOnly: !f.undoneOnly }))}>
            只看未完成
          </button>
          <button type="button" className="j-chip" aria-pressed={filter.mustOnly} onClick={() => setFilter((f) => ({ ...f, mustOnly: !f.mustOnly }))}>
            只看必要
          </button>
        </div>
        <div className="j-sheets">
          {checklist.map((s) => (
            <SheetCard key={s.id} sheet={s} checked={checked} onChange={toggle} filter={filter} />
          ))}
        </div>
      </section>

      <p style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          className="j-btn j-btn--ghost"
          id="reset"
          onClick={() => {
            if (window.confirm("要取消全部勾選嗎？")) reset();
          }}
        >
          全部取消勾選
        </button>
      </p>
    </JournalLayout>
  );
}
