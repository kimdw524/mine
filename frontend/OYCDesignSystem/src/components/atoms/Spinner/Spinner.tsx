/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { SpinnerProps } from './Spinner.types';
import { base } from './Spinner.styles';

export const Spinner = ({
  size = 'md',
  color = 'primary',
  ...props
}: SpinnerProps) => {
  const theme = useTheme();
  const [rotDeg, setRotDeg] = useState<number>(0);

  const handleAnimationEnd = () => {
    setRotDeg((rotDeg) => (rotDeg + 60) % 360);
  };

  return (
    <div
      css={[base(theme, size, theme.colors[color], rotDeg)]}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    ></div>
  );
};
