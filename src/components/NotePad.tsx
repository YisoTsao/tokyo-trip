import { useState } from "react";
import { useNote } from "../hooks/useNotes";

export function NotePad({ id, n }: { id: string; n: number }) {
  const { text, state, update, initiallyFilled } = useNote(id);
  const [open, setOpen] = useState(initiallyFilled);

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
        onChange={(e) => update(e.target.value)}
      />
      <p className="note-hint">
        自動儲存在這台裝置的瀏覽器裡，換裝置不會同步。
      </p>
    </details>
  );
}
