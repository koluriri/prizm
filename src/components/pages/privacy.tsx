/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { logPageView } from 'utils/database';

const Privacy: FC<{ toHome: () => void }> = ({ toHome }) => {
  const privacyComponent = css`
    width: 540px;
    margin: 60px auto 98px;
    animation: 0.4s ease 0s 1 normal clicked;
  `;
  const privacyHeading = css`
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 12px;
  `;
  const privacyBody = css`
    line-height: 1.4;
  `;
  const buttons = css`
    display: flex;
    justify-content: center;
    margin-top: 36px;
  `;

  useEffect(() => {
    logPageView('privacy');
  }, []);

  return (
    <div className="prizm-card" css={privacyComponent}>
      <h2 css={privacyHeading}>プライバシーポリシー</h2>
      <p css={privacyBody}>
        当サイトでは、サービス向上のため、Googleによるアクセス解析ツールGoogle
        Analyticsを使用しています。
        <br />
        Google Analyticsではデータの収集のためにCookie機能を使用しています。
        <br />
        このデータは匿名で収集されており、個人を特定するものではありません。
        <br />
        この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。
        <br />
        この規約に関しての詳細は
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          target="_blank"
          rel="noreferrer"
        >
          Google Analyticsサービス利用規約
        </a>
        のページや
        <a
          href="https://policies.google.com/technologies/ads?hl=ja"
          target="_blank"
          rel="noreferrer"
        >
          Googleポリシーと規約ページ
        </a>
        をご覧ください。
      </p>
      <p css={privacyBody}>
        その他、要望や質問などありましたら、お気軽に
        <a
          href="//twitter.com/koluriri"
          target="_blank"
          rel="noreferrer"
          css={css`
            display: inline-flex;
            align-items: center;
          `}
        >
          運営者のTwitter
          <FaTwitter />
        </a>
        までご連絡ください。
      </p>
      <div css={buttons}>
        <button
          type="button"
          className="bordercomp simple"
          onClick={() => toHome()}
        >
          とじる
        </button>
      </div>
    </div>
  );
};

export default Privacy;
