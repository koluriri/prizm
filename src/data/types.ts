import { prefecture } from 'data/prefecture';

/* GAME mode */
const modes = ['easy', 'normal', 'hard', 'hell', 'station', 'cape'] as const;
export type Mode = typeof modes[number];

export const modesConvert: { [key in Mode]: (t: string) => string } = {
  easy: (t) => t,
  normal: (t) => t.substr(0, 2),
  hard: (t) => t.charAt(0),
  hell: (t) => t.charAt(1),
  station: (t) => t,
  cape: (t) => t,
};
export const modesDisplay: { [key in Mode]: string } = {
  easy: '初級（市町村）',
  normal: '中級（市町村の最初の2文字）',
  hard: '上級（市町村の頭文字）',
  hell: 'ゲキムズ（市町村の2文字目）',
  station: '駅モード',
  cape: '岬モード',
};

/* message */
export type MessageTypes = 'answer' | 'hint' | 'start' | 'score';
export type AnswerMessage = {
  id: number;
  name: string;
  type: 'answer';
  value: string;
  matched: boolean;
};
export type GameMessage = {
  id: number;
  type: 'hint' | 'start' | 'score';
  value: string;
};
export type MessageObject = AnswerMessage | GameMessage;
export type Messages = MessageObject[];

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
  status: GameStatus;
  messages: Messages;
  users: string[];
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
