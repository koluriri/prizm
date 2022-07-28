/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import OnlineUsers from 'components/organisms/onlineusers';

const Home: FC<{ setGame: () => void }> = ({ setGame }) => {
  const info = css({
    background: '#efefef',
  });

  return (
    <>
      <h1>Prizm</h1>
      <p css={info}>参加者を待機中</p>
      <OnlineUsers />
      <select>
        <option>初級</option>
        <option>中級</option>
        <option>上級</option>
      </select>
      <br />
      <button type="button" onClick={setGame}>
        この参加者でゲームを開始
      </button>
      <br />
      <a href="/">名前を変更</a>
    </>
  );
};

export default Home;
