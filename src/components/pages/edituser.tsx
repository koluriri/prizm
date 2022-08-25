import { FC, useEffect, useState } from 'react';

import { localScoreKey, localUserNameKey } from 'data/types';
import { initialUserName } from 'ducks/user';

const EditUser: FC<{ toHome: () => void }> = ({ toHome }) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;
  const [inputName, setInputName] = useState(userName);
  const [inputNameMsg, setInputNameMsg] = useState('');

  useEffect(() => {
    setInputNameMsg('');
    if (!inputName) setInputNameMsg('名前を入力してください');
    if (inputName.length > 7) setInputNameMsg('7文字以内にしてください');
  }, [inputName]);

  const submit = () => {
    if (!inputNameMsg) {
      localStorage.setItem(localUserNameKey, inputName);
      toHome();
    }
  };

  return (
    <>
      <h2>prizmプロフィールの編集</h2>
      <div>
        {inputName} スコア
        {parseInt(String(localStorage.getItem(localScoreKey)), 10) || 0}
      </div>

      <label htmlFor="inputName">
        名前
        <input
          type="text"
          id="inputName"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </label>
      <p>{inputNameMsg}</p>

      <button type="button" onClick={() => toHome()}>
        もどる
      </button>

      <button type="button" onClick={() => submit()} disabled={!!inputNameMsg}>
        確定
      </button>
    </>
  );
};

export default EditUser;
