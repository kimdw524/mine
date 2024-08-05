/** @jsxImportSource @emotion/react */
import { Icon, IconButton, Typography } from 'oyc-ds';
import { containerCss, labelCss, menuCss } from './style';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@emotion/react';
import Progress from './Progress';
import React, { ReactNode } from 'react';

interface Menu {
  icon: ReactNode;
  onClick: () => void;
}

interface AppBarProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  label: string;
  onBackClick?: () => void | undefined;
  menu?: Menu[];
}

/**
 * onBackClick onMenuClick 등 특정 메뉴의 콜백이 정의되면 해당 메뉴가 표시됨
 */
const AppBar = ({
  children,
  label,
  onBackClick,
  menu = [],
  ...props
}: AppBarProps) => {
  const theme = useTheme();

  return (
    <div css={containerCss(theme)} {...props}>
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
      <div css={menuCss}>
        {menu.map((item, index) => (
          <IconButton
            key={index}
            size="lg"
            color="dark"
            onClick={item.onClick}
            circular
          >
            <Icon size="sm" color="dark">
              {item.icon}
            </Icon>
          </IconButton>
        ))}
      </div>
      {children}
    </div>
  );
};

AppBar.Progress = Progress;

export default AppBar;
