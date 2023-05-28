import { prefecture } from 'assets/data/prefecture';
import { ReactNode } from 'react';
import { MdOutlineTrain } from 'react-icons/md';
import {
  TbMoodHappy,
  TbMoodSad,
  TbMoodSadDizzy,
  TbMoodWrrr,
  TbMoodXd,
  TbSkull,
  TbQuestionCircle,
} from 'react-icons/tb';

/* GAME mode */
const modes = [
  'easy',
  'normal',
  'hard',
  'random',
  'station',
  'hell',
  'veryhell',
  'veryveryhell',
] as const;
export type Mode = typeof modes[number];

export const modesDisplay: { [key in Mode]: ReactNode } = {
  easy: (
    <span className="mode-with-icon">
      <TbMoodXd />
      <span>初級</span>
    </span>
  ),
  normal: (
    <span className="mode-with-icon">
      <TbMoodHappy />
      <span>中級</span>
    </span>
  ),
  hard: (
    <span className="mode-with-icon">
      <TbMoodSad />
      <span>上級</span>
    </span>
  ),
  random: (
    <span className="mode-with-icon">
      <TbQuestionCircle />
      <span>おまかせ</span>
    </span>
  ),
  station: (
    <span className="mode-with-icon">
      <MdOutlineTrain />
      <span>駅</span>
    </span>
  ),
  hell: (
    <span className="mode-with-icon">
      <TbMoodWrrr />
      <span>ゲキムズ</span>
    </span>
  ),
  veryhell: (
    <span className="mode-with-icon">
      <TbMoodSadDizzy />
      <span>超ムズ</span>
    </span>
  ),
  veryveryhell: (
    <span className="mode-with-icon">
      <TbSkull />
      <span>超激ムズ</span>
    </span>
  ),
};
export const modesDisplayWithEmoji: { [key in Mode]: string } = {
  easy: '初級🔰',
  normal: '中級❤️‍🔥',
  hard: '上級😈',
  random: 'おまかせ',
  hell: 'ゲキムズ👹',
  veryhell: '超ムズ👹👹',
  veryveryhell: '超激ムズ☠️☠️',
  station: '駅モード🚉',
};
export const modesCaption: { [key in Mode]: string } = {
  easy: '市町村が出題されます: ●●●',
  normal: '市町村の冒頭2文字が出題されます: ●●○',
  hard: '市町村の頭文字が出題されます: ●○○',
  hell: '市町村の2文字目が出題されます: ○●○',
  veryhell: '市町村の最後の字が出題されます: ○○●',
  veryveryhell: '市町村からランダムな1文字を出題: ○○○→●',
  station: '駅が出題されます',
  random: 'モードがランダムで選択されます',
};
export const modesDetail: { [key in Mode]: string } = {
  easy: '初級:市町村',
  normal: '中級:市町村の冒頭2文字',
  hard: '上級:市町村の頭文字',
  hell: 'ゲキムズ:市町村の2文字目',
  veryhell: '超ムズ:市町村の最後の字',
  veryveryhell: '超激ムズ:市町村の任意の字',
  station: '駅モード',
  random: 'おまかせ',
};
export const modesConvert: { [key in Mode]: (t: string) => string } = {
  easy: (t) => t,
  normal: (t) => t.substr(0, 2),
  hard: (t) => t.charAt(0),
  hell: (t) => t.charAt(1),
  veryhell: (t) => {
    if (t.length <= 2) return t.charAt(0);

    return t.charAt(t.length - 2);
  },
  veryveryhell: (t) => {
    if (t.length <= 2) return t.charAt(0);

    const slicedString = t.slice(0, -1);
    const randomIndex = Math.floor(Math.random() * slicedString.length);

    return slicedString.charAt(randomIndex);
  },
  station: (t) => t,
  random: (t) => t,
};
export const modesScore: { [key in Mode]: (score: number) => number } = {
  easy: (score) => score * 0.75,
  normal: (score) => score,
  hard: (score) => score * 1.3,
  hell: (score) => score * 1.45,
  veryhell: (score) => score * 3,
  veryveryhell: (score) => score * 4.5,
  station: (score) => score * 0.9,
  random: (score) => score,
};

/* Game */
export type Questions = string[];
export type GameStatus = 'active' | 'systemWon' | 'userWon' | 'finished';
export type GameObj = {
  answer: PrefectureStr;
  questions: Questions;
  mode: Mode;
  messages: Messages;
  users: string[];
  startBy: string;
  color: string;
  created: number;
};
export type FinishGameFunction = (
  isDeleted?: boolean,
  isUnset?: boolean,
) => void;
export const gameTimerSeconds = 1.5;

/* message */
export type MessageTypes = 'answer' | 'hint' | 'start' | 'score';
export type MessageNotice =
  | 'a_score'
  | 'b_update_fastest'
  | 'c_update_streak'
  | 'd_update_max_streak';
export type MessageNoticeObj = { [key in MessageNotice]?: number };
export type AnswerMessage = {
  key?: string | null;
  name: string;
  type: 'answer';
  value: string;
  matched: boolean;
};
export type GameMessage = {
  key?: string | null;
  type: 'hint' | 'start' | 'score' | 'remain' | 'end';
  value: string;
  notice?: MessageNoticeObj;
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

/* User */
export type UserDevice = 'mobile' | 'tablet' | 'desktop';
export type UserObj = {
  userName: string;
  pingStamp: number;
  color: string;
  device: UserDevice;
  score?: number;
  remain?: number;
  joiningGame?: string;
};
export type Users = {
  [key: string]: UserObj;
};
export const localScoreKey = 'prizm-score';
export const localUserNameKey = 'prizm-username';
export const localUserColorKey = 'prizm-usercolor';
export const localUserSummary = 'prizm-summary';
export const initialRemain = 3;

export type UserSummaryObj = {
  playCount: number;
  wonCount: number;
  lastPlay: number;
  lastWon: number;
  currentStreak: number;
  maxStreak: number;
  averageSpeed: number;
  fastestSpeed: number;
  lastSpeed: number;
};
export type UserSummaryObjOnStore = UserSummaryObj & MessageNoticeObj;
export const isUserSummaryObj = (arg: unknown): arg is UserSummaryObj => {
  const m = arg as UserSummaryObj;

  return (
    typeof m?.playCount === 'number' &&
    typeof m?.wonCount === 'number' &&
    typeof m?.lastPlay === 'number' &&
    typeof m?.lastWon === 'number' &&
    typeof m?.currentStreak === 'number' &&
    typeof m?.maxStreak === 'number' &&
    typeof m?.averageSpeed === 'number' &&
    typeof m?.fastestSpeed === 'number'
  );
};
