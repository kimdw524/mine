/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Button } from '../../atoms/Button';
import { MenuTabProps } from './MenuTab.types';
import { tabsCss, btnCss, activeCss } from './MenuTab.styles';

export const MenuTab = ({
  children,
  size = 'md',
  // variant = 'rounded',
  color = 'primary',
  ...props
}: MenuTabProps) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const tabCount = React.Children.count(children);

  return <div css={[tabsCss]} {...props}>
    <div css={activeCss(activeIndex, theme.colors[color], tabCount)}></div>
    {React.Children.map(children, (child, index) => (
        <Button
          css={btnCss(tabCount)}
          onClick={() => handleTabClick(index)}
          size={size}
          color={color}
        >
          {child}
        </Button>
      ))}
  </div>;
};
