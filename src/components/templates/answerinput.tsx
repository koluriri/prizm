/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import UserRemain from 'components/molecules/userremain';

const AnswerInput: FC = () => {
  const answerinput = css({ gridColumn: '1 / 3' });
  const formControl = css({
    width: '100%',
    border: '1px solid #ddd',
    padding: '8px 18px',
    fontSize: 'var(--font-size)',
    borderRadius: '8px',
    margin: '10px 0',
  });

  return (
    <div css={answerinput}>
      <UserRemain userId={1} />
      <input type="text" css={formControl} />
    </div>
  );
};

export default AnswerInput;
