/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { containerCss } from './style';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Icon } from 'oyc-ds';

interface ChipListProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  ellipsis?: boolean;
  onClick?: () => void;
}

const Ellipsis = () => {
  return (
    <Icon size="sm" color="dark">
      <EllipsisHorizontalIcon />
    </Icon>
  );
};

const ChipList = ({ children, ellipsis = true, ...props }: ChipListProps) => {
  return (
    <div css={containerCss} {...props}>
      {children}
      {ellipsis && <Ellipsis />}
    </div>
  );
};

export default ChipList;
