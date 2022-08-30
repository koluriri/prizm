/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import { localScoreKey, localUserColorKey, localUserNameKey } from 'data/types';
import { initialUserName } from 'ducks/user';
import { colors } from 'utils/generateuser';
import ColorSelector from 'components/molecules/colorselector';
import UserSummary from 'components/templates/usersummary';

const EditUser: FC<{ toHome: () => void }> = ({ toHome }) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;
  const [inputName, setInputName] = useState(userName);
  const [inputNameMsg, setInputNameMsg] = useState('');

  const userColor = localStorage.getItem(localUserColorKey) || '#000000';
  const [selected, setSelected] = useState(userColor);

  useEffect(() => {
    setInputNameMsg('');
    if (!inputName) setInputNameMsg('名前を入力してください');
    if (inputName.length > 7) setInputNameMsg('7文字以内にしてください');
  }, [inputName]);

  const submit = () => {
    if (!inputNameMsg) {
      localStorage.setItem(localUserNameKey, inputName);
      localStorage.setItem(localUserColorKey, selected);
      toHome();
    }
  };

  const formGrid = css`
    display: grid;
    grid-template-columns: 2.2em 1fr;
    gap: 12px;
    align-items: center;
    margin-top: 27px;
    text-align: center;
    font-weight: 900;
  `;

  return (
    <>
      <div
        className="prizm-card"
        css={css`
          margin: 60px auto 28px;
          animation: 0.4s ease 0s 1 normal clicked;
        `}
      >
        <h2
          css={css`
            font-size: 20px;
            font-weight: 900;
            text-align: center;
            margin-bottom: 12px;
          `}
        >
          prizmプロフィールの編集
        </h2>
        <div
          css={css`
            margin: 0 auto 40px;
            padding: 5px 11px;
            border-radius: 20px;
            width: fit-content;
            background-color: ${selected}33;
            font-weight: 700;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <span
            css={css`
              width: 7px;
              height: 7px;
              background: ${selected};
              border-radius: 5px;
              margin-right: 5px;
            `}
          />
          <span
            css={css`
              max-width: 120px;
            `}
          >
            {inputName.slice(0, 7)}
          </span>
          <span
            css={css`
              font-size: 13px;
              font-weight: 500;
              margin-left: 8px;
            `}
          >
            スコア
            {parseInt(String(localStorage.getItem(localScoreKey)), 10) || 0}
          </span>
        </div>
        <div>
          <label css={formGrid} htmlFor="inputName">
            名前
            <input
              className="bordercomp"
              type="text"
              id="inputName"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              css={css`
                font-size: 18px;
                width: 100%;
                text-align: left;
              `}
            />
          </label>
          <p
            css={css`
              padding-left: calc(2.2em + 42px);
              margin: 5px 0 0;
              font-size: 13px;
              color: var(--red);
              text-decoration: underline;
              font-weight: 900;
            `}
          >
            {inputNameMsg}
          </p>
          <div css={formGrid}>
            色
            <div
              css={css`
                display: grid;
                gap: 8px;
                grid-template-columns: repeat(auto-fill, 20px);
              `}
            >
              {colors.map((color) => (
                <ColorSelector
                  color={color}
                  selected={selected}
                  onClick={() => setSelected(color)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-top: 36px;
          `}
        >
          <button
            type="button"
            className="bordercomp simple"
            onClick={() => toHome()}
          >
            やめる
          </button>
          <button
            type="button"
            className="bordercomp"
            onClick={() => submit()}
            disabled={!!inputNameMsg}
          >
            変更する
          </button>
        </div>
      </div>
      <UserSummary />
    </>
  );
};

export default EditUser;
