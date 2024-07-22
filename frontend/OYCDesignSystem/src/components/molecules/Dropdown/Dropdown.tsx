/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { DropdownProps } from './Dropdown.types';
import { base, variants, iconCss, containerCss } from './Dropdown.styles';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (
    {
      children,
      size = 'md',
      color = 'primary',
      variant = 'outlined',
      name,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <div css={containerCss}>
        <select
          css={[
            base(theme, size),
            variants[variant](theme, theme.colors[color]),
          ]}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <span css={iconCss(false)}>
          <Arrow />
        </span>
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
