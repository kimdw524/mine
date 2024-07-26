/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { css, keyframes, useTheme } from '@emotion/react';
import { SpinnerProps } from './Spinner.types';
import { base } from './Spinner.styles';

export const Spinner = ({
  size = 'md',
  color = 'primary',
  ...props
}: SpinnerProps) => {
  const theme = useTheme();
  const [rotDeg, setRotDeg] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotDeg((rotDeg) => (rotDeg + 60) % 360);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      css={[base(theme, size, theme.colors[color], rotDeg)]}
      {...props}
    ></div>
  );
};
