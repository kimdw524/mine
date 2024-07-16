/** @jsxImportSource @emotion/react */
import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { DropdownProps } from './Dropdown.types';
import { base, variants, icon, itemContainer } from './Dropdown.styles';
import { DropdownItem } from './DropdownItem';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

export const DropdownContext = createContext(
  (name: ReactNode, value: string) => {},
);

export const Dropdown = ({
  children,
  size = 'md',
  color = 'primary',
  variant = 'outlined',
  disabled = false,
  name,
  onChange = (value: string) => {},
  ...props
}: DropdownProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSeleceted] = useState<{ name: ReactNode; value: string }>(
    { name: '', value: '' },
  );

  const handleClick = () => {
    if (disabled) return;
    setOpen((open) => !open);
  };

  const handleUpdateValue = useCallback(
    (name: ReactNode, value: string) => {
      setSeleceted({ name, value });
      onChange(value);
    },
    [onChange],
  );

  return (
    <div
      css={[
        base(theme, size),
        variants[variant](theme, theme.colors[color], open, disabled),
      ]}
      onClick={handleClick}
      {...props}
    >
      <input type="hidden" name={name} value={selected.value} />
      <div
        css={css`
          margin-right: 1.25rem;
        `}
      >
        {selected.name}
      </div>
      <span css={icon(open)}>
        <Arrow />
      </span>
      <div css={itemContainer(theme, !disabled && open)}>
        <DropdownContext.Provider value={handleUpdateValue}>
          {children}
        </DropdownContext.Provider>
      </div>
    </div>
  );
};

Dropdown.Item = DropdownItem;
