import {
  GameObj,
  gameTimerSeconds,
  isUserSummaryObj,
  localUserSummary,
  MessageNoticeObj,
  modesDisplayWithEmoji,
  UserSummaryObj,
  UserSummaryObjOnStore,
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

  summary[key] = typeof value === 'number' ? value : value(summary[key] ?? 0);
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
      lastSpeed: speed,
    });
  }

  return notice;
};

export const getTweet = (gameObj: GameObj, summary: UserSummaryObjOnStore) => {
  let tweet = '#prizmgame で勝利!💮\n';

  if (summary.a_score) tweet += `💯  score +${summary.a_score}\n`;
  tweet += `🗾  ${gameObj.answer}\n`;
  tweet += `⏩  ${modesDisplayWithEmoji[gameObj.mode]}\n`;
  tweet += `👥  参加者${gameObj.users.length}人\n`;
  if (summary.lastSpeed) tweet += `⏱️  ${summary.lastSpeed}秒で回答💨\n`;
  if (summary.currentStreak && summary.currentStreak > 1)
    tweet += `👍  ${summary.currentStreak}連勝中❗️\n\n`;

  if (summary.d_update_max_streak && summary.d_update_max_streak > 1)
    tweet += `🎖️  連勝記録を更新🔺\n`;
  if (summary.b_update_fastest) tweet += `🎖️  最速記録を更新🔺`;

  // tweet += '\nhttps://prizm.pw';

  return tweet;
};
