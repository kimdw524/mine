/** @jsxImportSource @emotion/react */
import { Icon, IconButton, Typography } from 'oyc-ds';
import { containerCss, labelCss, menuCss } from './style';
import { ChevronLeftIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useTheme } from '@emotion/react';
import Progress from './Progress';
import React, { ReactNode } from 'react';

interface AppBarProps {
  children?: ReactNode;
  label: string;
  onBackClick?: () => void | undefined;
  onMenuClick?: () => void | undefined;
}

/**
 * onBackClick onMenuClick 등 특정 메뉴의 콜백이 정의되면 해당 메뉴가 표시됨
 */
const AppBar = ({ children, label, onBackClick, onMenuClick }: AppBarProps) => {
  const theme = useTheme();

  return (
    <div css={containerCss(theme)}>
      {onBackClick && (
        <IconButton size="lg" color="dark" circular onClick={onBackClick}>
          <Icon size="sm" color="dark">
            <ChevronLeftIcon />
          </Icon>
        </IconButton>
      )}
      <div css={labelCss}>
        <Typography color="dark" size="lg" style={{ paddingTop: '3px' }}>
          {label}
        </Typography>
      </div>
      {onMenuClick && (
        <IconButton
          css={menuCss}
          size="lg"
          color="dark"
          circular
          onClick={onMenuClick}
        >
          <Icon size="sm" color="dark">
            <Bars3Icon />
          </Icon>
        </IconButton>
      )}
      {children}
    </div>
  );
};

AppBar.Progress = Progress;

export default AppBar;
