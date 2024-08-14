/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon } from 'oyc-ds';
import { containerCss, menuBoxCss } from './style';
import IconTypography from '../../molecules/IconTypography/IconTypography';
import { engToIcon } from '../../../utils/EngToIcon';

interface MenuBarProps {
  menu: number;
  onMenuClick: (index: number) => void;
}

const MenuBar = ({ menu, onMenuClick }: MenuBarProps) => {
  return (
    <div css={containerCss}>
      {['chatting', 'home', 'mypage'].map((v: string, i: number) => {
        return (
          <div key={v} css={menuBoxCss}>
            {menu === i ? (
              <IconTypography label={v} color="primary" />
            ) : (
              <Icon color="secondary" onClick={() => onMenuClick(i)}>
                {engToIcon[v]}
              </Icon>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuBar;
