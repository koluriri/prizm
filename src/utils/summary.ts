import { isUserSummaryObj, localUserSummary, UserSummaryObj } from 'data/types';

export const getSummary = (): false | UserSummaryObj => {
  const summary = JSON.parse(
    localStorage.getItem(localUserSummary) ?? '',
  ) as unknown;
  if (!isUserSummaryObj(summary)) {
    alert('エラー: 勝敗を記録できません');

    return false;
  }

  return summary;
};

export const updateSummary = (newSummary: { [key: string]: number }) => {
  const summary = getSummary();
  if (summary) {
    localStorage.setItem(
      localUserSummary,
      JSON.stringify({ ...summary, ...newSummary }),
    );
  }
};

export const updateSummaryFromKey = (
  key: keyof UserSummaryObj,
  value: number | ((number: number) => number),
) => {
  const summary = getSummary();
  if (!summary) return false;

  summary[key] = typeof value === 'number' ? value : value(summary[key]);
  localStorage.setItem(localUserSummary, JSON.stringify(summary));

  return true;
};
