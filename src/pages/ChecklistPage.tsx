import { ChecklistSheet } from "../components/Checklist";
import { PageNav } from "../components/PageNav";
import { checklist } from "../data/checklist";
import { useChecklist } from "../hooks/useChecklist";

export function ChecklistPage() {
  const { checked, toggle, reset } = useChecklist();

  return (
    <>
      <div className="scroll-bar" aria-hidden="true"></div>
      <div className="trip">
        <div className="wrap">
          <PageNav />
          <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p className="eyebrow">2026 · 11/26（四）– 12/2（三）</p>
            <h1 style={{ fontSize: "clamp(24px,5vw,34px)" }}>
              出發前的<span style={{ color: "var(--maple)" }}>預訂與行李</span>
              清單
            </h1>
            <p className="notice">
              勾選會記在這台裝置的瀏覽器裡，換手機或電腦不會同步。新幹線建議用
              JR 東日本「えきねっと」購買新幹線eチケット，再綁定交通卡（Suica
              等），進站直接刷卡即可。
            </p>
          </header>
          {checklist.map((s) => (
            <ChecklistSheet
              key={s.id}
              sheet={s}
              checked={checked}
              onChange={toggle}
            />
          ))}
          <div className="resetrow">
            <button type="button" className="reset" id="reset" onClick={reset}>
              全部取消勾選
            </button>
          </div>
          <p className="foot">票價與時刻為規劃參考 · 以各官方網站公告為準</p>
        </div>
      </div>
    </>
  );
}
