// JLPT N3 study material. Japanese strings mark readings inline as {漢字|かな};
// the page renders them as <ruby> furigana and reads the kana aloud.

/** [japanese, 中文] */
export type Ex = [string, string];

export interface GrammarPoint {
  /** the pattern itself, e.g. 〜うちに */
  p: string;
  /** 中文意思 */
  zh: string;
  /** 接續 */
  form: string;
  ex: Ex[];
  /** 用法提醒、易混淆比較 */
  note?: string;
}

export interface GrammarGroup {
  id: string;
  title: string;
  sub?: string;
  points: GrammarPoint[];
}

/** [word with furigana, 中文, optional 補充] */
export type Word = [string, string, string?];

export interface VocabGroup {
  id: string;
  title: string;
  sub?: string;
  words: Word[];
}

export interface Kanji {
  k: string;
  /** 音讀（片假名） */
  on: string;
  /** 訓讀（平假名） */
  kun: string;
  zh: string;
  ex: Ex[];
}

export interface KanjiGroup {
  id: string;
  title: string;
  kanji: Kanji[];
}

export interface DialogueLine {
  /** speaker label shown above the bubble */
  who: string;
  /** right-hand bubble */
  me?: boolean;
  ja: string;
  zh: string;
}

export interface Dialogue {
  id: string;
  title: string;
  where: string;
  lines: DialogueLine[];
  /** grammar / expressions worth noticing: [pattern, 說明] */
  points?: [string, string][];
}

export interface DialogueGroup {
  id: string;
  title: string;
  sub?: string;
  scenes: Dialogue[];
}

export interface Question {
  q: string;
  choices: string[];
  /** index into choices */
  a: number;
  why: string;
}

export interface Reading {
  id: string;
  kind: string;
  title: string;
  /** paragraphs; a paragraph starting with "|" is a table row, cells split by "|" */
  text: string[];
  questions: Question[];
  /** 重要單字 */
  words?: Word[];
}

export interface ListenItem {
  id: string;
  kind: string;
  /** situation read before the dialogue */
  setup: string;
  /** voice 0 = higher (女), 1 = lower (男) */
  lines: { who: string; voice: 0 | 1; ja: string; zh: string }[];
  question: string;
  questionZh: string;
  choices: string[];
  a: number;
  why: string;
}

export interface MockSection {
  id: string;
  title: string;
  how: string;
  questions: Question[];
}
