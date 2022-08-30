import { isUserSummary, localUserSummary, UserSummary } from 'data/types';

export const getSummary = (): false | UserSummary => {
  const summary = JSON.parse(
    localStorage.getItem(localUserSummary) ?? '',
  ) as unknown;
  if (!isUserSummary(summary)) {
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
  key: keyof UserSummary,
  value: number | ((number: number) => number),
) => {
  const summary = getSummary();
  if (!summary) return false;

  summary[key] = typeof value === 'number' ? value : value(summary[key]);
  localStorage.setItem(localUserSummary, JSON.stringify(summary));

  return true;
};
