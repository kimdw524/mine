/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { ToggleProps } from './Toggle.types';
import { base, thumb } from './Toggle.styles';

export const Toggle = ({
  color = 'primary',
  size = 'sm',
  onClick = () => {},
  ...props
}: ToggleProps) => {
  const theme = useTheme();
  const [isOn, setIsOn] = useState<boolean>(false);

  return (
    <div
      css={base(theme, theme.colors[color], isOn, size)}
      {...props}
      onClick={() => {
        isOn ? setIsOn(false) : setIsOn(true);
        onClick(!isOn);
      }}
    >
      <div css={thumb(isOn, size)}></div>
    </div>
  );
};
