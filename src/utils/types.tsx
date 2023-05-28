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
  TbBolt,
  TbMountain,
  TbArrowsRandom,
  TbBuildingCastle,
  TbCar,
  TbBulb,
  TbBuildingBank,
  TbGrill,
  TbCookieMan,
  TbApple,
  TbSchool,
  TbConfetti,
  TbTrees,
} from 'react-icons/tb';
import IconSpa from 'assets/icon/spa';

/* GAME mode */
const modes = [
  'easy',
  'normal',
  'hard',
  'random',
  'hell',
  'veryhell',
  'veryveryhell',
  'station',
  'mountain',
  'castle',
  'reststop',
  'museum',
  'festival',
  'cuisine',
  'attraction',
  'powerplant',
  'spa',
  'specialty',
  'goods',
  'quiz',
  'mixed',
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
      <TbBolt />
      <span>おまかせ</span>
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
  station: (
    <span className="mode-with-icon">
      <MdOutlineTrain />
      <span>駅</span>
    </span>
  ),
  mountain: (
    <span className="mode-with-icon">
      <TbMountain />
      <span>山</span>
    </span>
  ),
  castle: (
    <span className="mode-with-icon">
      <TbBuildingCastle />
      <span>城</span>
    </span>
  ),
  reststop: (
    <span className="mode-with-icon">
      <TbCar />
      <span>道の駅</span>
    </span>
  ),
  goods: (
    <span className="mode-with-icon">
      <TbCookieMan />
      <span>名産品</span>
    </span>
  ),
  specialty: (
    <span className="mode-with-icon">
      <TbApple />
      <span>特産品</span>
    </span>
  ),
  quiz: (
    <span className="mode-with-icon">
      <TbSchool />
      <span>雑学</span>
    </span>
  ),
  cuisine: (
    <span className="mode-with-icon">
      <TbGrill />
      <span>郷土料理</span>
    </span>
  ),
  attraction: (
    <span className="mode-with-icon">
      <TbTrees />
      <span>名所</span>
    </span>
  ),
  museum: (
    <span className="mode-with-icon">
      <TbBuildingBank />
      <span>博物館・美術館</span>
    </span>
  ),
  spa: (
    <span className="mode-with-icon">
      <IconSpa />
      <span>温泉</span>
    </span>
  ),
  festival: (
    <span className="mode-with-icon">
      <TbConfetti />
      <span>お祭り</span>
    </span>
  ),
  powerplant: (
    <span className="mode-with-icon">
      <TbBulb />
      <span>発電所</span>
    </span>
  ),
  mixed: (
    <span className="mode-with-icon">
      <TbArrowsRandom />
      <span>ごちゃまぜ</span>
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
  mountain: '山モード⛰',
  castle: '城モード🏯',
  reststop: '道の駅🚗',
  museum: '博物館・美術館🖼',
  festival: 'お祭り👘',
  cuisine: '郷土料理🥘',
  attraction: '名所🚠',
  powerplant: '発電所🔌💡',
  spa: '温泉♨️',
  specialty: '特産品🪆',
  goods: '名産品🍎',
  quiz: '雑学🎓',
  mixed: 'ごちゃまぜ🌀',
};
export const modesCaption: { [key in Mode]: string } = {
  easy: '市町村が出題されます: ●●●',
  normal: '市町村の冒頭2文字が出題されます: ●●○',
  hard: '市町村の頭文字が出題されます: ●○○',
  hell: '市町村の2文字目が出題されます: ○●○',
  veryhell: '市町村の最後の字が出題されます: ○○●',
  veryveryhell: '市町村からランダムな1文字を出題: ○○○→●',
  station: '駅が出題されます',
  mountain: '山が出題されます',
  castle: '城が出題されます',
  reststop: '道の駅(東京,神奈川はPA/SAを含む)',
  museum: '博物館・美術館が出題されます',
  festival: 'お祭りが出題されます',
  cuisine: '郷土料理が出題されます',
  attraction: '名所が出題されます',
  powerplant: '発電所が出題されます',
  spa: '温泉が出題されます',
  specialty: '特産品が出題されます',
  goods: '名産品が出題されます',
  quiz: '雑学が出題されます',
  random: 'モードがランダムで選択されます',
  mixed: '1問ごとに違うモードになります',
};
export const modesDetail: { [key in Mode]: string } = {
  easy: '初級:市町村',
  normal: '中級:市町村の冒頭2文字',
  hard: '上級:市町村の頭文字',
  hell: 'ゲキムズ:市町村の2文字目',
  veryhell: '超ムズ:市町村の最後の字',
  veryveryhell: '超激ムズ:市町村の任意の字',
  station: '駅モード',
  mountain: '山モード',
  castle: '城モード',
  reststop: '道の駅・PA',
  museum: '博物館・美術館',
  festival: 'お祭り',
  cuisine: '郷土料理',
  attraction: '名所',
  powerplant: '発電所',
  spa: '温泉モード',
  specialty: '特産品',
  goods: '名産品',
  quiz: '雑学モード',
  random: 'おまかせ',
  mixed: 'ごちゃまぜ',
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
  mountain: (t) => t,
  castle: (t) => t,
  reststop: (t) => t,
  museum: (t) => t,
  festival: (t) => t,
  cuisine: (t) => t,
  attraction: (t) => t,
  powerplant: (t) => t,
  spa: (t) => t,
  specialty: (t) => t,
  goods: (t) => t,
  quiz: (t) => t,
  random: (t) => t,
  mixed: (t) => t,
};
export const modesScore: { [key in Mode]: (score: number) => number } = {
  easy: (score) => score * 0.75,
  normal: (score) => score,
  hard: (score) => score * 1.3,
  hell: (score) => score * 1.45,
  veryhell: (score) => score * 3,
  veryveryhell: (score) => score * 4.5,
  station: (score) => score,
  mountain: (score) => score,
  castle: (score) => score,
  reststop: (score) => score,
  museum: (score) => score,
  festival: (score) => score,
  cuisine: (score) => score,
  attraction: (score) => score,
  powerplant: (score) => score,
  spa: (score) => score,
  specialty: (score) => score,
  goods: (score) => score,
  quiz: (score) => score,
  random: (score) => score,
  mixed: (score) => score * 0.75,
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
