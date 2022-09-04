import {
  gameTimerSeconds,
  isUserSummaryObj,
  localUserSummary,
  MessageNoticeObj,
  UserSummaryObj,
} from 'utils/types';

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

export const getNoticesWhenMatched = (lastWon: number): MessageNoticeObj => {
  const notice: MessageNoticeObj = {};

  const summary = getSummary();
  if (summary) {
    const currentStreak = summary.currentStreak + 1;
    const maxStreak =
      currentStreak > summary.maxStreak ? currentStreak : summary.maxStreak;

    if (currentStreak > 1) notice.c_update_streak = currentStreak;
    if (currentStreak > summary.maxStreak)
      notice.d_update_max_streak = currentStreak;

    const speed =
      Math.round(((Date.now() - lastWon) / 1000 - gameTimerSeconds * 3) * 10) /
      10;
    const averageSpeed =
      summary.averageSpeed === 0
        ? speed
        : Math.round(
            ((summary.averageSpeed * (summary.playCount - 1) + speed) /
              summary.playCount) *
              10,
          ) / 10;
    const fastestSpeed =
      speed < summary.fastestSpeed || summary.fastestSpeed === 0
        ? speed
        : summary.fastestSpeed;

    if (
      speed < summary.fastestSpeed ||
      (summary.fastestSpeed === 0 && summary.playCount > 1)
    )
      notice.b_update_fastest = speed;

    updateSummary({
      wonCount: summary.wonCount + 1,
      lastWon,
      currentStreak,
      maxStreak,
      averageSpeed,
      fastestSpeed,
    });
  }

  return notice;
};
