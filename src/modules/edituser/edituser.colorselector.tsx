/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const ColorSelector: FC<{
  color: string;
  selected: string;
  onClick: () => void;
}> = ({ color, selected, onClick }) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button
    type="button"
    className="colorselector"
    css={css`
      background: ${color};

      ${selected === color &&
      css`
        box-shadow: 0 0 0 6px ${color}6b;
      `}
    `}
    onClick={() => onClick()}
  />
);

export default ColorSelector;
