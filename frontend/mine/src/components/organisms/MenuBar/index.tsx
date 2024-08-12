/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon } from 'oyc-ds';
import { containerCss, menuBoxCss } from './style';
import IconTypography from '../../molecules/IconTypography/IconTypography';
import { engToIcon } from '../../../utils/EngToIcon';

interface MenuBarProps {
  menu: number;
  setCurMenu: React.Dispatch<React.SetStateAction<number>>;
}

const MenuBar = ({ menu, setCurMenu }: MenuBarProps) => {
  return (
    <div css={containerCss}>
      {['chatting', 'home', 'mypage'].map((v: string, i: number) => {
        return (
          <div key={v} css={menuBoxCss}>
            {menu === i ? (
              <IconTypography label={v} color="primary" />
            ) : (
              <Icon color="secondary" onClick={() => setCurMenu(i)}>
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
