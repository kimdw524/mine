/** @jsxImportSource @emotion/react */
import { Icon, IconButton, Typography } from 'oyc-ds';
import { containerCss, labelCss } from './style';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

interface AppBarProps {
  label: string;
  onBackClick?: () => void | undefined;
  onMenuClick?: () => void | undefined;
}

/**
 * onBackClick onMenuClick 등 특정 메뉴의 콜백이 정의되면 해당 메뉴가 표시됨
 */
const AppBar = ({ label, onBackClick, onMenuClick }: AppBarProps) => {
  return (
    <div css={containerCss}>
      <IconButton size="lg" color="dark" circular>
        <Icon size="sm" color="dark">
          <ChevronLeftIcon />
        </Icon>
      </IconButton>
      <div css={labelCss}>
        <Typography color="dark" size="lg" style={{ paddingTop: '3px' }}>
          {label}
        </Typography>
      </div>
    </div>
  );
};

export default AppBar;
