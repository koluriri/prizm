import { prefecture } from 'data/prefecture';

/* GAME mode */
const modes = ['easy', 'normal', 'hard', 'hell', 'station'] as const;
export type Mode = typeof modes[number];

export const modesDisplay: { [key in Mode]: string } = {
  easy: '初級（市町村）',
  normal: '中級（市町村の最初の2文字）',
  hard: '上級（市町村の頭文字）',
  hell: 'ゲキムズ（市町村の2文字目）',
  station: '駅モード',
};
export const modesConvert: { [key in Mode]: (t: string) => string } = {
  easy: (t) => t,
  normal: (t) => t.substr(0, 2),
  hard: (t) => t.charAt(0),
  hell: (t) => t.charAt(1),
  station: (t) => t,
};
export const modesScore: { [key in Mode]: (score: number) => number } = {
  easy: (score) => score * 0.75,
  normal: (score) => score,
  hard: (score) => score * 1.3,
  hell: (score) => score * 1.45,
  station: (score) => score * 0.9,
};

/* message */
export type MessageTypes = 'answer' | 'hint' | 'start' | 'score';
export type AnswerMessage = {
  key?: string | null;
  name: string;
  type: 'answer';
  value: string;
  matched: boolean;
};
export type GameMessage = {
  key?: string | null;
  type: 'hint' | 'start' | 'score' | 'remain';
  value: string;
};
export type MessageObject = AnswerMessage | GameMessage;
export type Messages = MessageObject[];

export const isAnswerMessage = (arg: unknown): arg is AnswerMessage => {
  const m = arg as AnswerMessage;

  return (
    m?.type === 'answer' &&
    typeof m?.name === 'string' &&
    typeof m?.matched === 'boolean'
  );
};
export const isGameMessage = (arg: unknown): arg is GameMessage => {
  const m = arg as GameMessage;

  return typeof m?.value === 'string';
};

/* prefecture */
export type PrefectureStr = typeof prefecture[number];
export type HintObj = {
  [key in PrefectureStr]: string | number;
};
export type DefinedQuestions = {
  [prefecture: string]: string[];
};

/* Game */
// export type DateTime = `${number}-${number}-${number} ${number}:${number}:${number}`;
export type DateTime = string;
export type Questions = string[];
export type GameStatus = 'active' | 'systemWon' | 'userWon' | 'finished';
export type GameObj = {
  answer: PrefectureStr;
  questions: Questions;
  mode: Mode;
  messages: Messages;
  users: string[];
  startBy: string;
  created: DateTime;
};

/* User */
export type UserObj = {
  userName: string;
  score?: number;
  remain?: number;
  joiningGame?: string;
};
export type Users = {
  [key: string]: UserObj;
};
export const localScoreKey = 'prizm-score';
export const localUserNameKey = 'prizm-username';
