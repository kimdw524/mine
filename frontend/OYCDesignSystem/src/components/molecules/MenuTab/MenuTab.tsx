/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Button } from '../../atoms/Button';
import { MenuTabProps } from './MenuTab.types';
import { tabsCss, btnCss, activeCss, borderCss } from './MenuTab.styles';

export const MenuTab = ({
  children,
  size = 'md',
  variant = 'contained',
  border = 'rounded',
  color = 'primary',
  onChangeMenu,
  ...props
}: MenuTabProps) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChangeMenu(index);
  };

  const tabCount = React.Children.count(children);

  return (
    <div css={[tabsCss(variant, border), borderCss[border]]} {...props}>
      <div css={activeCss(activeIndex, theme.colors[color], tabCount, variant, border)}></div>
      {React.Children.map(children, (child, index) => (
        <Button
          css={btnCss(
            theme,
            theme.colors[color],
            tabCount,
            size,
            variant,
            index === activeIndex,
            border
          )}
          onClick={() => handleTabClick(index)}
          size={size}
          color={color}
        >
          {child}
        </Button>
      ))}
    </div>
  );
};

