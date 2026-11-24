import type { ReactNode } from "react";

/** Inline reading markup used across the site's Japanese text: {漢字|かんじ}. */
export const RUBY = /\{([^|{}]+)\|([^{}]+)\}/g;

/** 「{漢字|かんじ}」 markup → <ruby> furigana. */
export function Furigana({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const mt of text.matchAll(RUBY)) {
    if (mt.index > last) out.push(text.slice(last, mt.index));
    out.push(
      <ruby key={mt.index}>
        {mt[1]}
        <rp>(</rp>
        <rt>{mt[2]}</rt>
        <rp>)</rp>
      </ruby>,
    );
    last = mt.index + mt[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain text without readings, e.g. for search. */
export const plain = (ja: string) => ja.replace(RUBY, "$1");

/** Read the kana, not the kanji, so the voice says exactly what the furigana shows. */
export const spoken = (ja: string) =>
  ja
    .replace(RUBY, "$2")
    .replace(/（[^）]*）/g, "")
    .replace(/[〜～＿_]+/g, "、");

export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

function jaVoice(synth: SpeechSynthesis) {
  return synth.getVoices().find((v) => v.lang.replace("_", "-").startsWith("ja"));
}

export function speak(ja: string, rate = 0.85) {
  if (!canSpeak) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(spoken(ja));
  u.lang = "ja-JP";
  u.rate = rate;
  const voice = jaVoice(synth);
  if (voice) u.voice = voice;
  synth.speak(u);
}

/**
 * Read several lines one after another, switching pitch between speakers
 * so a dialogue sounds like two people. Returns a function that stops playback.
 */
export function speakSequence(
  lines: { ja: string; voice?: 0 | 1 }[],
  { rate = 0.9, onDone }: { rate?: number; onDone?: () => void } = {},
) {
  if (!canSpeak) return () => {};
  const synth = window.speechSynthesis;
  synth.cancel();
  const voice = jaVoice(synth);
  let stopped = false;
  lines.forEach((l, i) => {
    const u = new SpeechSynthesisUtterance(spoken(l.ja));
    u.lang = "ja-JP";
    u.rate = rate;
    u.pitch = l.voice === 1 ? 0.75 : 1.2;
    if (voice) u.voice = voice;
    if (i === lines.length - 1) u.onend = () => !stopped && onDone?.();
    synth.speak(u);
  });
  return () => {
    stopped = true;
    synth.cancel();
  };
}

export function SpeakButton({ ja, label = "播放日文發音" }: { ja: string; label?: string }) {
  if (!canSpeak) return null;
  return (
    <button type="button" className="p-say" onClick={() => speak(ja)} aria-label={label}>
      <SpeakerIcon />
    </button>
  );
}

export function SpeakerIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.6a7.6 7.6 0 0 1 0 10.8" />
    </svg>
  );
}
