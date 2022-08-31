import { hint, area } from 'assets/data/prefecture';
import { PrefectureStr } from 'utils/types';

const getHint = (progress: number, pref: PrefectureStr | undefined): string => {
  if (!pref) return '';

  if (Math.floor(progress) === 83) return `地方は\n『${area[hint[pref][3]]}』`;
  if (Math.floor(progress) === 66)
    return `県庁所在地の頭文字は\n『${hint[pref][2]}』`;
  // if (Math.floor(progress) === 50) return `総面積は\n『${hint[pref][1]}km2』`;
  // if (Math.floor(progress) === 33) return `人口は\n約${hint[pref][0]}万人`;

  return '';
};

export default getHint;
