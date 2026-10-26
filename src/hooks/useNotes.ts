import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "./useLocalStorage";

// Same key and shape as the original page ({ day1: "...", ... }), so existing notes keep loading.
const KEY = "tokyo-trip-notes-v1";
let notes = readJSON<Record<string, string>>(KEY) as Record<string, string>;

/** One day's free-text note, saved 400 ms after typing stops, with a short-lived save message. */
export function useNote(id: string) {
  const [text, setText] = useState(() => notes[id] || "");
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

  function update(value: string) {
    setText(value);
    notes = { ...notes, [id]: value };
    clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      setState(writeJSON(KEY, notes) ? "已儲存" : "這個瀏覽器無法儲存");
      clearTimeout(clearTimer.current);
      clearTimer.current = window.setTimeout(() => setState(""), 1500);
    }, 400);
  }

  return { text, state, update, initiallyFilled: !!(notes[id] || "").trim() };
}
