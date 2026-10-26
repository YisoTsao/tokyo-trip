import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "../hooks/useLocalStorage";

// Same key and shape as the original page ({ day1: "...", ... }), so existing notes keep loading.
const KEY = "tokyo-trip-notes-v1";
let notes: Record<string, string> = readJSON<Record<string, string>>(
  KEY,
) as Record<string, string>;

export function NotePad({ id, n }: { id: string; n: number }) {
  const [text, setText] = useState(() => notes[id] || "");
  const [open, setOpen] = useState(() => !!(notes[id] || "").trim());
  const [state, setState] = useState("");
  const saveTimer = useRef<number>(undefined);
  const clearTimer = useRef<number>(undefined);

  useEffect(
    () => () => {
      clearTimeout(saveTimer.current);
      clearTimeout(clearTimer.current);
    },
    [],
  );

  function onInput(value: string) {
    setText(value);
    notes = { ...notes, [id]: value };
    clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      setState(writeJSON(KEY, notes) ? "已儲存" : "這個瀏覽器無法儲存");
      clearTimeout(clearTimer.current);
      clearTimer.current = window.setTimeout(() => setState(""), 1500);
    }, 400);
  }

  return (
    <details
      className={`note-pad${text.trim() ? " has-note" : ""}`}
      data-note={id}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        <span>我的筆記</span>
        <small className="note-state">{state}</small>
      </summary>
      <label className="sr" htmlFor={`note-${id}`}>
        Day {n} 筆記
      </label>
      <textarea
        id={`note-${id}`}
        rows={3}
        placeholder="臨時想到的事記在這裡，例如：要買的伴手禮、店家營業時間、集合地點…"
        value={text}
        onChange={(e) => onInput(e.target.value)}
      />
      <p className="note-hint">
        自動儲存在這台裝置的瀏覽器裡，換裝置不會同步。
      </p>
    </details>
  );
}
