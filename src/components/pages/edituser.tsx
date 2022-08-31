/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import { localScoreKey, localUserColorKey, localUserNameKey } from 'data/types';
import { initialUserName } from 'ducks/user';
import { colors } from 'hooks/use-generates';
import { getSummary } from 'utils/summary';
import ColorSelector from 'components/atoms/colorselector';
import UserSummary from 'components/templates/usersummary';
import UserPreview from 'components/molecules/userpreview';

const EditUser: FC<{ toHome: () => void }> = ({ toHome }) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;
  const [inputName, setInputName] = useState(userName);
  const [inputNameMsg, setInputNameMsg] = useState('');

  const userColor = localStorage.getItem(localUserColorKey) || '#000000';
  const [selectedColor, setSelectedColor] = useState(userColor);

  const [summary] = useState(getSummary());

  useEffect(() => {
    setInputNameMsg('');
    if (!inputName) setInputNameMsg('名前を入力してください');
    if (inputName.length > 7) setInputNameMsg('7文字以内にしてください');
  }, [inputName]);

  const submit = () => {
    if (!inputNameMsg) {
      localStorage.setItem(localUserNameKey, inputName);
      localStorage.setItem(localUserColorKey, selectedColor);
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

  const edituserComponent = css`
    margin: 60px auto 28px;
    animation: 0.4s ease 0s 1 normal clicked;
  `;
  const edituserHeading = css`
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 12px;
  `;

  const nameInput = css`
    font-size: 18px;
    width: 100%;
    text-align: left;
  `;
  const inputNameMsgStyle = css`
    padding-left: calc(2.2em + 42px);
    margin: 5px 0 0;
    font-size: 13px;
    color: var(--red);
    text-decoration: underline;
    font-weight: 900;
  `;
  const colorSelectorContainer = css`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fill, 20px);
  `;
  const buttons = css`
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
  `;

  return (
    <>
      <div className="prizm-card" css={edituserComponent}>
        <h2 css={edituserHeading}>prizmプロフィールの編集</h2>
        <UserPreview
          name={inputName}
          score={parseInt(String(localStorage.getItem(localScoreKey)), 10) || 0}
          color={selectedColor}
        />
        <div>
          <label css={formGrid} htmlFor="inputName">
            名前
            <input
              className="bordercomp"
              type="text"
              id="inputName"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              css={nameInput}
            />
          </label>
          <p css={inputNameMsgStyle}>{inputNameMsg}</p>
          <div css={formGrid}>
            色
            <div css={colorSelectorContainer}>
              {colors.map((color) => (
                <ColorSelector
                  key={color}
                  color={color}
                  selected={selectedColor}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        </div>
        <div css={buttons}>
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
      {summary && <UserSummary summary={summary} />}
    </>
  );
};

export default EditUser;
