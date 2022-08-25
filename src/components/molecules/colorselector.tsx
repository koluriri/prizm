/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const ColorSelector: FC<{
  color: string;
  selected: string;
  onClick: () => void;
}> = ({ color, onClick, selected }) => {
  const colorButton = css(`
    border: 0;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    vertical-align: middle;
    margin: 0 5px;
    cursor:pointer;
  `);
  const colorButtonBg = css(`
    background: ${color};
  `);
  let selectedStyle = css(``);
  if (selected === color) selectedStyle = css(`outline: 6px solid ${color}6b;`);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      onClick={() => onClick()}
      css={[colorButton, colorButtonBg, selectedStyle]}
    />
  );
};

export default ColorSelector;
