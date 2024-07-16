/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { DropdownContext } from './Dropdown';
import { css, Theme, useTheme } from '@emotion/react';

export interface DropdownItmeProps extends React.ComponentProps<'div'> {
  value: string;
}

const containerCss = (theme: Theme) => css`
  overflow: hidden;
  padding: 0.875rem 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  transition: all 100ms ease;

  :hover {
    color: ${theme.colors.text.primary};
  }
`;

export const DropdownItem = ({
  children,
  value,
  ...props
}: DropdownItmeProps) => {
  const theme = useTheme();
  const dropdownContext = useContext(DropdownContext);
  const handleClick = () => {
    dropdownContext(children, value);
  };

  return (
    <div onClick={handleClick} css={containerCss(theme)} {...props}>
      {children}
    </div>
  );
};
