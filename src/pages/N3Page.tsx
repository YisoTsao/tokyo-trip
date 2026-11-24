import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Furigana, SpeakButton, SpeakerIcon, canSpeak, plain, speakSequence } from "../components/japanese";
import { JournalLayout } from "../components/journal/JournalLayout";
import { SectionHeading } from "../components/journal/ui";
import { dialogueCount, dialogueGroups } from "../data/n3/dialogues";
import { grammarCount, grammarGroups } from "../data/n3/grammar";
import { kanjiCount, kanjiGroups } from "../data/n3/kanji";
import { listenKinds, listening } from "../data/n3/listening";
import { mockCount, mockSections } from "../data/n3/mock";
import { readings } from "../data/n3/reading";
import type { Dialogue, GrammarPoint, Kanji, ListenItem, Question, Reading } from "../data/n3/types";
import { vocabCount, vocabGroups } from "../data/n3/vocab";
import "../styles/phrases.css";
import "../styles/n3.css";

const TABS = [
  { id: "overview", label: "總覽" },
  { id: "grammar", label: "文法" },
  { id: "vocab", label: "單字" },
  { id: "kanji", label: "漢字" },
  { id: "talk", label: "會話" },
  { id: "reading", label: "讀解" },
  { id: "listening", label: "聽解" },
  { id: "mock", label: "模擬題" },
] as const;
type TabId = (typeof TABS)[number]["id"];

/* ------------------------------------------------------------ preferences */

const KEY = "tokyo-trip-n3-v1";
interface Prefs {
  ruby: boolean;
  hideZh: boolean;
}
function loadPrefs(): Prefs {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return { ruby: p.ruby !== false, hideZh: p.hideZh === true };
  } catch {
    return { ruby: true, hideZh: false };
  }
}

/* ------------------------------------------------------------ shared bits */

function Ja({ text, className = "p-ja" }: { text: string; className?: string }) {
  return (
    <p className={className} lang="ja">
      <Furigana text={text} />
    </p>
  );
}

function JaRow({ ja }: { ja: string }) {
  return (
    <div className="p-ja-row">
      <Ja text={ja} />
      <SpeakButton ja={ja} />
    </div>
  );
}

/** Text that may be hidden for self-testing; tap to reveal. */
function Hideable({ hide, children, className }: { hide: boolean; children: ReactNode; className?: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => setShown(false), [hide]);
  if (!hide || shown)
    return <span className={className}>{children}</span>;
  return (
    <button type="button" className={`n3-cover ${className ?? ""}`} onClick={() => setShown(true)}>
      點一下看意思
    </button>
  );
}

function Quiz({ q, n, onAnswer }: { q: Question; n?: number; onAnswer?: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  return (
    <div className="n3-quiz">
      {q.q && (
        <div className="n3-quiz__q" lang="ja">
          {n !== undefined && <span className="n3-quiz__n j-num">{n}</span>}
          <span>
            <Furigana text={q.q} />
          </span>
        </div>
      )}
      <ol className="n3-quiz__choices">
        {q.choices.map((c, i) => {
          const state = !done ? "" : i === q.a ? "is-right" : i === picked ? "is-wrong" : "is-dim";
          return (
            <li key={i}>
              <button
                type="button"
                className={`n3-choice ${state}`}
                disabled={done}
                onClick={() => {
                  setPicked(i);
                  onAnswer?.(i === q.a);
                }}
              >
                <span className="n3-choice__no j-num">{i + 1}</span>
                <span lang="ja">
                  <Furigana text={c} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {done && (
        <div className={`n3-quiz__why ${picked === q.a ? "is-right" : "is-wrong"}`} role="status">
          <b>{picked === q.a ? "答對了！" : `正確答案是 ${q.a + 1}`}</b>
          <span>
            <Furigana text={q.why} />
          </span>
          <button type="button" className="n3-link" onClick={() => setPicked(null)}>
            再做一次
          </button>
        </div>
      )}
    </div>
  );
}

function Chips<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="j-filters p-days" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" className="j-chip" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="n3-search">
      <span className="j-sr">搜尋</span>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="M15 15l5 5" />
      </svg>
      <input type="search" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

const norm = (s: string) => plain(s).replace(/[〜～\s]/g, "").toLowerCase();
const hit = (q: string, ...fields: (string | undefined)[]) => {
  const n = norm(q);
  if (!n) return true;
  return fields.some((f) => f && (norm(f).includes(n) || f.replace(/[{}|]/g, "").includes(q.trim())));
};

/* ------------------------------------------------------------ overview */

const EXAM = [
  { part: "言語知識（文字・語彙）", min: 30, items: "漢字讀法 8・表記 6・文脈規定 11・近義替換 5・用法 5" },
  { part: "言語知識（文法）・讀解", min: 70, items: "文法形式 13・句子重組 5・文章文法 5／短文 4・中文 6・長文 4・情報檢索 2" },
  { part: "聽解", min: 40, items: "課題理解 6・重點理解 6・概要理解 3・說話表現 4・即時應答 9" },
];

function Overview() {
  const cards: { to: TabId; title: string; n: string; text: string }[] = [
    { to: "grammar", title: "文法", n: `${grammarCount} 個句型`, text: "依功能分 13 類：時間、原因、條件、推測、授受、使役被動、敬語…每個都有接續、例句和易混淆比較。" },
    { to: "vocab", title: "單字", n: `${vocabCount} 個`, text: "自他動詞對照、常考動詞、形容詞、副詞、擬聲擬態語、外來語與主題單字，可遮住中文自我測驗。" },
    { to: "kanji", title: "漢字", n: `${kanjiCount} 字`, text: "N3 常見漢字，附音讀、訓讀和兩個例詞。" },
    { to: "talk", title: "會話", n: `${dialogueCount} 個情境`, text: "職場、學校、日常、朋友四大類，可以一句一句聽或整段播放，並整理出對話裡的文法。" },
    { to: "reading", title: "讀解", n: `${readings.length} 篇`, text: "通知、電子郵件、隨筆、說明文、意見文和海報，照考試題型出題並附解析。" },
    { to: "listening", title: "聽解", n: `${listening.length} 題`, text: "五種聽解題型都有，按播放用語音朗讀，作答後再看逐字稿。" },
    { to: "mock", title: "模擬題", n: `${mockCount} 題`, text: "文字語彙五大題型＋文法三大題型，即時對答案、算分數。" },
  ];
  return (
    <>
      <section className="j-card n3-exam" aria-labelledby="exam-title">
        <h2 className="j-callout__title" id="exam-title">
          N3 考什麼
        </h2>
        <p className="n3-muted">
          N3 是「能大致聽懂、讀懂日常生活中的日文」的程度，約需 300 小時學習。考試分三節，題數以官方公告為準。
        </p>
        <div className="n3-table" role="table" aria-label="考試科目">
          {EXAM.map((e) => (
            <div key={e.part} className="n3-table__row" role="row">
              <b role="cell">{e.part}</b>
              <span role="cell" className="j-num">
                {e.min} 分鐘
              </span>
              <small role="cell">{e.items}</small>
            </div>
          ))}
        </div>
        <ul className="n3-facts">
          <li>
            <b>計分</b>：言語知識（文字・語彙・文法）、讀解、聽解各 60 分，總分 180。
          </li>
          <li>
            <b>及格</b>：總分 95 分以上，且三個分項各 19 分以上（任何一項低於 19 分就不及格）。
          </li>
          <li>
            <b>考試日期</b>：每年 7 月與 12 月的第一個星期日，台灣由語言訓練測驗中心（LTTC）辦理報名。
          </li>
        </ul>
      </section>

      <SectionHeading kicker="Study map" title="這一頁有什麼" />
      <div className="n3-cards">
        {cards.map((c) => (
          <Link key={c.to} to={`/n3/${c.to}`} className="j-card n3-cardlink">
            <span className="n3-cardlink__head">
              <b>{c.title}</b>
              <small className="j-num">{c.n}</small>
            </span>
            <span className="n3-muted">{c.text}</span>
          </Link>
        ))}
      </div>

      <section className="j-card j-card--sticky j-tone-ginkgo n3-tips" aria-labelledby="tips-title">
        <h2 className="j-callout__title" id="tips-title">
          讀書建議
        </h2>
        <ol>
          <li>
            <b>先文法、後讀解</b>：N3 文法是讀解和聽解的基礎。每天 5–8 個句型，唸出例句，兩週可以過完一輪。
          </li>
          <li>
            <b>自他動詞成對背</b>：「開く／開ける」「決まる／決める」幾乎每次都考，連同助詞「が／を」一起記。
          </li>
          <li>
            <b>漢字讀法注意長音和促音</b>：「営業 えいぎょう」「決定 けってい」是最常見的陷阱。
          </li>
          <li>
            <b>聽解看最後一句</b>：課題理解的答案常在對話後段被修正，聽到「やっぱり」「じゃあ」「〜てから」要特別注意。
          </li>
          <li>
            <b>讀解先看問題</b>：先讀題目再回頭找段落，主旨題的答案多半在最後一段。
          </li>
          <li>
            <b>關掉假名練習</b>：右上角可以隱藏所有假名注音，熟了之後試著不看讀音唸出來。
          </li>
        </ol>
      </section>
    </>
  );
}

/* ------------------------------------------------------------ grammar */

function GrammarCard({ g, open, hideZh }: { g: GrammarPoint; open: boolean; hideZh: boolean }) {
  return (
    <details className="j-card p-scene n3-gram" open={open}>
      <summary>
        <span className="p-scene__head">
          <b lang="ja">
            <Furigana text={g.p} />
          </b>
          <small>
            <Hideable hide={hideZh}>{g.zh}</Hideable>
          </small>
        </span>
      </summary>
      <div className="n3-gram__body">
        <p className="n3-form">
          <span>接續</span>
          {g.form}
        </p>
        <ul className="n3-examples">
          {g.ex.map(([ja, zh]) => (
            <li key={ja}>
              <JaRow ja={ja} />
              <p className="p-zh">{zh}</p>
            </li>
          ))}
        </ul>
        {g.note && (
          <p className="p-tip n3-note">
            💡 <Furigana text={g.note} />
          </p>
        )}
      </div>
    </details>
  );
}

function GrammarTab({ hideZh }: { hideZh: boolean }) {
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const [openKey, setOpenKey] = useState(0);
  const groups = grammarGroups
    .filter((gr) => group === "all" || gr.id === group)
    .map((gr) => ({ ...gr, points: gr.points.filter((p) => hit(q, p.p, p.zh, p.form, p.note, ...p.ex.flat())) }))
    .filter((gr) => gr.points.length);
  const searching = q.trim() !== "";
  return (
    <>
      <div className="p-toolbar">
        <SearchBox value={q} onChange={setQ} placeholder="搜尋句型或中文，例如 うちに、聽說" />
        <Chips label="文法分類" value={group} onChange={setGroup} options={[{ id: "all", label: "全部" }, ...grammarGroups.map((g) => ({ id: g.id, label: g.title }))]} />
        <div className="j-filters p-opts">
          <button
            type="button"
            className="j-chip"
            aria-pressed={openAll}
            onClick={() => {
              setOpenAll((o) => !o);
              setOpenKey((k) => k + 1);
            }}
          >
            {openAll ? "全部收合" : "全部展開"}
          </button>
        </div>
      </div>
      {groups.length === 0 && <p className="n3-empty">找不到符合「{q}」的句型。</p>}
      {groups.map((gr) => (
        <div key={gr.id} className="p-group">
          <SectionHeading kicker={`${gr.points.length} 個句型`} title={gr.title} sub={gr.sub} />
          <div className="p-scenes" key={`${openKey}-${searching}`}>
            {gr.points.map((p) => (
              <GrammarCard key={p.p} g={p} open={openAll || searching} hideZh={hideZh} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ vocab */

function VocabTab({ hideZh }: { hideZh: boolean }) {
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");
  const groups = vocabGroups
    .filter((gr) => group === "all" || gr.id === group)
    .map((gr) => ({ ...gr, words: gr.words.filter(([ja, zh]) => hit(q, ja, zh)) }))
    .filter((gr) => gr.words.length);
  return (
    <>
      <div className="p-toolbar">
        <SearchBox value={q} onChange={setQ} placeholder="搜尋日文、讀音或中文" />
        <Chips label="單字分類" value={group} onChange={setGroup} options={[{ id: "all", label: "全部" }, ...vocabGroups.map((g) => ({ id: g.id, label: g.title }))]} />
      </div>
      {groups.length === 0 && <p className="n3-empty">找不到符合「{q}」的單字。</p>}
      {groups.map((gr) => (
        <div key={gr.id} className="p-group">
          <SectionHeading kicker={`${gr.words.length} 個`} title={gr.title} sub={gr.sub} />
          <ul className="n3-words">
            {gr.words.map(([ja, zh]) => (
              <li key={ja} className="j-card n3-word">
                <div className="p-ja-row">
                  <Ja text={ja} />
                  <SpeakButton ja={ja.replace(/／/g, "、")} />
                </div>
                <Hideable hide={hideZh} className="p-zh">
                  <Furigana text={zh} />
                </Hideable>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ kanji */

function KanjiTile({ k, hideZh }: { k: Kanji; hideZh: boolean }) {
  return (
    <details className="j-card n3-kanji">
      <summary>
        <span className="n3-kanji__char" lang="ja">
          {k.k}
        </span>
        <span className="n3-kanji__zh">
          <Hideable hide={hideZh}>{k.zh}</Hideable>
        </span>
      </summary>
      <div className="n3-kanji__body">
        <dl>
          <dt>音</dt>
          <dd lang="ja">{k.on || "—"}</dd>
          <dt>訓</dt>
          <dd lang="ja">{k.kun || "—"}</dd>
        </dl>
        <ul>
          {k.ex.map(([ja, zh]) => (
            <li key={ja}>
              <div className="p-ja-row">
                <Ja text={ja} />
                <SpeakButton ja={ja} />
              </div>
              <p className="p-zh">{zh}</p>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function KanjiTab({ hideZh }: { hideZh: boolean }) {
  const [group, setGroup] = useState("all");
  const groups = kanjiGroups.filter((gr) => group === "all" || gr.id === group);
  return (
    <>
      <div className="p-toolbar">
        <Chips label="漢字分類" value={group} onChange={setGroup} options={[{ id: "all", label: "全部" }, ...kanjiGroups.map((g) => ({ id: g.id, label: g.title }))]} />
      </div>
      <p className="n3-muted n3-lead">點漢字看音讀、訓讀和例詞。音讀用片假名、訓讀用平假名，括號裡是送假名。</p>
      {groups.map((gr) => (
        <div key={gr.id} className="p-group">
          <SectionHeading kicker={`${gr.kanji.length} 字`} title={gr.title} />
          <div className="n3-kanjigrid">
            {gr.kanji.map((k) => (
              <KanjiTile key={k.k} k={k} hideZh={hideZh} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ dialogues */

function PlayAll({ lines, label = "播放整段" }: { lines: { ja: string; voice?: 0 | 1 }[]; label?: string }) {
  const [playing, setPlaying] = useState(false);
  const stop = useRef<() => void>(() => {});
  useEffect(() => () => stop.current(), []);
  if (!canSpeak) return null;
  return (
    <button
      type="button"
      className="j-chip n3-play"
      aria-pressed={playing}
      onClick={() => {
        if (playing) {
          stop.current();
          setPlaying(false);
          return;
        }
        setPlaying(true);
        stop.current = speakSequence(lines, { onDone: () => setPlaying(false) });
      }}
    >
      <SpeakerIcon size={16} />
      {playing ? "停止" : label}
    </button>
  );
}

function DialogueCard({ d, open, hideZh }: { d: Dialogue; open: boolean; hideZh: boolean }) {
  return (
    <details className="j-card p-scene" open={open}>
      <summary>
        <span className="p-scene__head">
          <b>{d.title}</b>
          <small>{d.where}</small>
        </span>
        <span className="p-scene__count j-num">{d.lines.length} 句</span>
      </summary>
      <div className="n3-playrow">
        <PlayAll lines={d.lines.map((l) => ({ ja: l.ja, voice: l.me ? 0 : 1 }))} />
      </div>
      <ol className="p-lines">
        {d.lines.map((l, i) => (
          <li key={i} className={`p-line ${l.me ? "p-line--me" : "p-line--them"}`}>
            <span className="p-who">{l.who}</span>
            <div className="p-bubble">
              <JaRow ja={l.ja} />
              <Hideable hide={hideZh} className="p-zh">
                {l.zh}
              </Hideable>
            </div>
          </li>
        ))}
      </ol>
      {d.points && (
        <div className="p-hear">
          <h4>這段對話的重點</h4>
          <ul className="n3-points">
            {d.points.map(([p, zh]) => (
              <li key={p}>
                <span lang="ja">
                  <Furigana text={p} />
                </span>
                <span>{zh}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </details>
  );
}

function TalkTab({ hideZh }: { hideZh: boolean }) {
  const [group, setGroup] = useState("all");
  const [openAll, setOpenAll] = useState(false);
  const [openKey, setOpenKey] = useState(0);
  const groups = dialogueGroups.filter((gr) => group === "all" || gr.id === group);
  return (
    <>
      <div className="p-toolbar">
        <Chips label="會話分類" value={group} onChange={setGroup} options={[{ id: "all", label: "全部" }, ...dialogueGroups.map((g) => ({ id: g.id, label: g.title }))]} />
        <div className="j-filters p-opts">
          <button
            type="button"
            className="j-chip"
            aria-pressed={openAll}
            onClick={() => {
              setOpenAll((o) => !o);
              setOpenKey((k) => k + 1);
            }}
          >
            {openAll ? "全部收合" : "全部展開"}
          </button>
        </div>
      </div>
      {groups.map((gr) => (
        <div key={gr.id} className="p-group">
          <SectionHeading kicker={`${gr.scenes.length} 個情境`} title={gr.title} sub={gr.sub} />
          <div className="p-scenes" key={openKey}>
            {gr.scenes.map((d) => (
              <DialogueCard key={d.id} d={d} open={openAll} hideZh={hideZh} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ reading */

function Passage({ r }: { r: Reading }) {
  const rows = r.text.filter((t) => t.startsWith("|"));
  const paras = r.text.filter((t) => !t.startsWith("|"));
  const tableAt = r.text.findIndex((t) => t.startsWith("|"));
  const table = rows.length > 0 && (
    <div className="n3-ptable" role="table">
      {rows.map((row, i) => (
        <div key={i} className={`n3-ptable__row ${i === 0 ? "is-head" : ""}`} role="row">
          {row
            .slice(1)
            .split("|")
            .map((c, j) => (
              <span key={j} role={i === 0 ? "columnheader" : "cell"} lang="ja">
                <Furigana text={c} />
              </span>
            ))}
        </div>
      ))}
    </div>
  );
  return (
    <div className="n3-passage" lang="ja">
      {tableAt === 0 && table}
      {paras.map((t, i) => (
        <p key={i}>
          <Furigana text={t} />
        </p>
      ))}
      {tableAt > 0 && table}
    </div>
  );
}

function ReadingCard({ r }: { r: Reading }) {
  return (
    <article className="j-card n3-reading">
      <header>
        <span className="n3-kind">{r.kind}</span>
        <h3 lang="ja">
          <Furigana text={r.title} />
        </h3>
      </header>
      <Passage r={r} />
      {r.words && (
        <ul className="n3-glossary">
          {r.words.map(([ja, zh]) => (
            <li key={ja}>
              <span lang="ja">
                <Furigana text={ja} />
              </span>
              {zh}
            </li>
          ))}
        </ul>
      )}
      <div className="n3-qs">
        {r.questions.map((q, i) => (
          <Quiz key={i} q={q} n={i + 1} />
        ))}
      </div>
    </article>
  );
}

function ReadingTab() {
  return (
    <>
      <p className="n3-muted n3-lead">先看題目再讀文章。讀完可以到右上角關掉假名，再讀一次練習速度。</p>
      <div className="n3-stack">
        {readings.map((r) => (
          <ReadingCard key={r.id} r={r} />
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------ listening */

function ListenCard({ item, n }: { item: ListenItem; n: number }) {
  const seq = [
    ...(item.setup ? [{ ja: item.setup, voice: 0 as const }] : []),
    ...item.lines.map((l) => ({ ja: l.ja, voice: l.voice })),
    ...(item.lines.length && item.setup ? [{ ja: item.question, voice: 0 as const }] : []),
  ];
  const situation = item.kind === "hatsuwa";
  return (
    <article className="j-card n3-listen">
      <header className="n3-listen__head">
        <span className="n3-quiz__n j-num">{n}</span>
        {situation ? (
          <span lang="ja" className="n3-listen__setup">
            <Furigana text={item.setup} />
          </span>
        ) : (
          <PlayAll lines={seq} label="播放題目" />
        )}
      </header>
      {situation && <p className="n3-muted">{item.questionZh}</p>}
      {!situation && !canSpeak && <p className="n3-muted">這個瀏覽器不支援語音，請直接看逐字稿。</p>}
      <Quiz
        q={{
          q: situation ? "" : item.kind === "sokuji" ? "（聽完那句話，選出最自然的回應）" : item.question,
          choices: item.choices,
          a: item.a,
          why: item.why,
        }}
      />
      {situation && canSpeak && (
        <div className="n3-playrow">
          {item.choices.map((c, i) => (
            <button key={i} type="button" className="j-chip" onClick={() => speakSequence([{ ja: c }])}>
              <SpeakerIcon size={14} /> 聽選項 {i + 1}
            </button>
          ))}
        </div>
      )}
      {item.lines.length > 0 && (
        <details className="n3-script">
          <summary>看逐字稿</summary>
          {item.setup && (
            <p className="n3-script__setup" lang="ja">
              <Furigana text={item.setup} />
            </p>
          )}
          <ul>
            {item.lines.map((l, i) => (
              <li key={i}>
                <b>{l.who}</b>
                <div>
                  <Ja text={l.ja} />
                  <p className="p-zh">{l.zh}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="p-zh">題目：{item.questionZh}</p>
        </details>
      )}
    </article>
  );
}

function ListeningTab() {
  let n = 0;
  return (
    <>
      <p className="n3-muted n3-lead">
        按「播放題目」會用手機或電腦內建的日文語音朗讀，兩個人的聲音用高低音區分。先別看逐字稿，聽完作答再對照。
      </p>
      {listenKinds.map((k) => {
        const items = listening.filter((l) => l.kind === k.id);
        return (
          <div key={k.id} className="p-group">
            <SectionHeading kicker={`${items.length} 題`} title={k.title} sub={k.how} />
            <div className="n3-stack">
              {items.map((it) => (
                <ListenCard key={it.id} item={it} n={++n} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------ mock test */

function MockTab() {
  const [score, setScore] = useState<Record<string, boolean>>({});
  const [round, setRound] = useState(0);
  const answered = Object.keys(score).length;
  const right = Object.values(score).filter(Boolean).length;
  return (
    <>
      <div className="j-card n3-score" role="status">
        <span>
          已作答 <b className="j-num">{answered}</b> / {mockCount}
        </span>
        <span>
          答對 <b className="j-num">{right}</b>
          {answered > 0 && <small className="j-num">（{Math.round((right / answered) * 100)}%）</small>}
        </span>
        <button
          type="button"
          className="j-chip"
          onClick={() => {
            setScore({});
            setRound((r) => r + 1);
          }}
        >
          重新作答
        </button>
      </div>
      {mockSections.map((s) => (
        <div key={`${s.id}-${round}`} className="p-group">
          <SectionHeading title={s.title} sub={s.how} />
          <div className="j-card n3-qs n3-qs--card">
            {s.questions.map((q, i) => (
              <Quiz key={i} q={q} n={i + 1} onAnswer={(ok) => setScore((m) => ({ ...m, [`${s.id}-${i}`]: ok }))} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ page */

export function N3Page() {
  const { tab = "overview" } = useParams();
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* private mode */
    }
  }, [prefs]);
  const current = TABS.find((t) => t.id === tab);
  const tabsRef = useRef<HTMLElement>(null);
  // Keep the sub-tabs pinned right under the site nav, whose height changes when it wraps on phones.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".j-navbar");
    if (!nav || typeof ResizeObserver === "undefined") return;
    const set = () => document.documentElement.style.setProperty("--n3-nav-h", `${Math.round(nav.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    tabsRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [tab]);

  const body = useMemo(() => {
    switch (tab as TabId) {
      case "grammar":
        return <GrammarTab hideZh={prefs.hideZh} />;
      case "vocab":
        return <VocabTab hideZh={prefs.hideZh} />;
      case "kanji":
        return <KanjiTab hideZh={prefs.hideZh} />;
      case "talk":
        return <TalkTab hideZh={prefs.hideZh} />;
      case "reading":
        return <ReadingTab />;
      case "listening":
        return <ListeningTab />;
      case "mock":
        return <MockTab />;
      default:
        return <Overview />;
    }
  }, [tab, prefs.hideZh]);

  if (!current) return <Navigate to="/n3" replace />;

  return (
    <JournalLayout>
      <div className={prefs.ruby ? "n3" : "n3 n3--noruby"}>
        <header className="j-checkhead">
          <div>
            <span className="j-hero__kicker" aria-hidden="true">
              JLPT N3
            </span>
            <h1 className="j-dayhead__title">日檢 N3 學習本</h1>
            <p className="j-dayhead__sub" style={{ marginTop: 6 }}>
              文法、單字、漢字、會話、讀解、聽解和模擬題，照 N3 考試範圍整理。漢字上方的小字是讀音，按 🔊 可以聽發音。
            </p>
          </div>
        </header>

        <nav className="n3-tabs" aria-label="N3 分頁" ref={tabsRef}>
          {TABS.map((t) => (
            <Link key={t.id} to={t.id === "overview" ? "/n3" : `/n3/${t.id}`} className="j-chip" aria-current={t.id === tab ? "page" : undefined}>
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="n3-opts" role="group" aria-label="顯示選項">
          <button type="button" className="j-chip" aria-pressed={prefs.ruby} onClick={() => setPrefs((p) => ({ ...p, ruby: !p.ruby }))}>
            顯示假名
          </button>
          <button type="button" className="j-chip" aria-pressed={prefs.hideZh} onClick={() => setPrefs((p) => ({ ...p, hideZh: !p.hideZh }))}>
            遮住中文
          </button>
        </div>

        <section aria-label={current.label}>{body}</section>
      </div>
    </JournalLayout>
  );
}
