/** @jsxImportSource @emotion/react */
import { Spinner } from 'oyc-ds';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { Size } from 'oyc-ds/dist/themes/themeBase';
import React from 'react';
import { containerCss } from './style';

interface LoadingProps {
  size?: Size;
  color?: Palette;
  height?: string;
}

const Loading = ({
  size = 'md',
  color = 'primary',
  height = '100%',
}: LoadingProps) => {
  return (
    <div css={containerCss} style={{ height }}>
      <Spinner size={size} color={color} />
    </div>
  );
};

export default Loading;
