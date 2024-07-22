/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  ArchiveBoxIcon,
  InformationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Icon } from 'oyc-ds';
import { containerCss } from './style';
import IconTypography from '../../molecules/IconTypography';

const MenuBar = () => {
  const [menu, setMenu] = useState<number>(0);

  return (
    <div css={containerCss}>
      {menu === 0 ? (
        <IconTypography label="업적">
          <Icon color="primary">
            <ArchiveBoxIcon />
          </Icon>
        </IconTypography>
      ) : (
        <Icon color="secondary" onClick={() => setMenu(0)}>
          <ArchiveBoxIcon />
        </Icon>
      )}
      {menu === 1 ? (
        <IconTypography label="회원정보">
          <Icon color="primary">
            <InformationCircleIcon />
          </Icon>
        </IconTypography>
      ) : (
        <Icon color="secondary" onClick={() => setMenu(1)}>
          <InformationCircleIcon />
        </Icon>
      )}
      {menu === 2 ? (
        <IconTypography label="아바타">
          <Icon color="primary">
            <UserIcon />
          </Icon>
        </IconTypography>
      ) : (
        <Icon color="secondary" onClick={() => setMenu(2)}>
          <UserIcon />
        </Icon>
      )}
    </div>
  );
};

export default MenuBar;
