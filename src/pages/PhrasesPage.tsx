import { useEffect, useState } from "react";
import { Furigana, SpeakButton } from "../components/japanese";
import { JournalLayout } from "../components/journal/JournalLayout";
import { SectionHeading } from "../components/journal/ui";
import { basics, phraseGroups, type Line, type Scene } from "../data/phrases";
import { Icon } from "../illustrations/journal/icons";
import "../styles/phrases.css";

function Bubble({ line, them, showEn }: { line: Line; them: string; showEn: boolean }) {
  return (
    <li className={`p-line ${line.me ? "p-line--me" : "p-line--them"}`}>
      <span className="p-who">{line.me ? "我" : them}</span>
      <div className="p-bubble">
        <div className="p-ja-row">
          <p className="p-ja" lang="ja">
            <Furigana text={line.ja} />
          </p>
          <SpeakButton ja={line.ja} />
        </div>
        <p className="p-zh">{line.zh}</p>
        {showEn && (
          <p className="p-en" lang="en">
            {line.en}
          </p>
        )}
      </div>
    </li>
  );
}

function SceneCard({ scene, open, showEn }: { scene: Scene; open: boolean; showEn: boolean }) {
  return (
    <details className="j-card p-scene" id={`p-${scene.id}`} open={open}>
      <summary>
        <span className="p-scene__icon">
          <Icon name={scene.icon} size={22} />
        </span>
        <span className="p-scene__head">
          <b>{scene.title}</b>
          <small>{scene.where}</small>
        </span>
        <span className="p-scene__count j-num">{scene.lines.length} 句</span>
      </summary>
      <ol className="p-lines">
        {scene.lines.map((l, i) => (
          <Bubble key={i} line={l} them={scene.them} showEn={showEn} />
        ))}
      </ol>
      {scene.hear && (
        <div className="p-hear">
          <h4>可能會聽到</h4>
          <ul>
            {scene.hear.map(([ja, zh]) => (
              <li key={ja}>
                <span lang="ja">
                  <Furigana text={ja} />
                </span>
                <span>{zh}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {scene.tip && <p className="p-tip">💡 {scene.tip}</p>}
    </details>
  );
}

const KEY = "tokyo-trip-phrases-v1";
interface Prefs {
  filter: string;
  showEn: boolean;
}
function loadPrefs(): Prefs {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return { filter: typeof p.filter === "string" ? p.filter : "all", showEn: p.showEn !== false };
  } catch {
    return { filter: "all", showEn: true };
  }
}

export function PhrasesPage() {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [openAll, setOpenAll] = useState(false);
  const [openKey, setOpenKey] = useState(0);
  const { filter, showEn } = prefs;

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* private mode: the choice just isn't remembered */
    }
  }, [prefs]);

  const groups = filter === "all" ? phraseGroups : phraseGroups.filter((g) => g.id === filter);
  const total = phraseGroups.reduce((n, g) => n + g.scenes.length, 0);
  const toggleAll = () => {
    setOpenAll((o) => !o);
    setOpenKey((k) => k + 1);
  };

  return (
    <JournalLayout>
      <header className="j-checkhead">
        <div>
          <span className="j-hero__kicker" aria-hidden="true">
            Say it in Japanese
          </span>
          <h1 className="j-dayhead__title">旅途日語會話</h1>
          <p className="j-dayhead__sub" style={{ marginTop: 6 }}>
            照著每天的行程排好的 {total} 個情境，每句都有日文、中文和英文。漢字上方的小字是讀音，按 🔊 可以聽發音，也可以直接把手機給對方看。對方的回答是常見說法，月台、價錢、時間以現場為準。
          </p>
        </div>
      </header>

      <section className="j-card j-card--sticky j-tone-sakura p-basics" aria-labelledby="basics-title">
        <h2 className="j-callout__title" id="basics-title">
          <Icon name="pencil" size={20} />
          先背這幾句
        </h2>
        <ul>
          {basics.map((l) => (
            <li key={l.ja}>
              <div className="p-ja-row">
                <p className="p-ja" lang="ja">
                  <Furigana text={l.ja} />
                </p>
                <SpeakButton ja={l.ja} />
              </div>
              <p className="p-zh">
                {l.zh}
                {showEn && <span className="p-en" lang="en"> · {l.en}</span>}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="情境會話">
        <div className="p-toolbar">
          <div className="j-filters p-days" role="group" aria-label="選擇日期">
            <button type="button" className="j-chip" aria-pressed={filter === "all"} onClick={() => setPrefs((p) => ({ ...p, filter: "all" }))}>
              全部
            </button>
            {phraseGroups.map((g) => (
              <button key={g.id} type="button" className="j-chip" aria-pressed={filter === g.id} onClick={() => setPrefs((p) => ({ ...p, filter: g.id }))}>
                {g.chip}
              </button>
            ))}
          </div>
          <div className="j-filters p-opts" role="group" aria-label="顯示選項">
            <button type="button" className="j-chip" aria-pressed={showEn} onClick={() => setPrefs((p) => ({ ...p, showEn: !p.showEn }))}>
              顯示英文
            </button>
            <button type="button" className="j-chip" aria-pressed={openAll} onClick={toggleAll}>
              {openAll ? "全部收合" : "全部展開"}
            </button>
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.id} className="p-group" id={g.id}>
            <SectionHeading kicker={g.kicker} title={g.title} sub={g.sub} />
            <div className="p-scenes" key={openKey}>
              {g.scenes.map((s) => (
                <SceneCard key={s.id} scene={s} open={openAll} showEn={showEn} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </JournalLayout>
  );
}
