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
    margin: 0;
    cursor:pointer;
    display: block;
    padding: 0;
    appearance: none;
  `);
  const colorButtonBg = css(`
    background: ${color};
  `);
  let selectedStyle = css(``);
  if (selected === color)
    selectedStyle = css(`box-shadow: 0 0 0 6px ${color}6b;`);

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
