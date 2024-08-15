/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { CheckBox } from '../../atoms/CheckBox';
import { Typography } from '../../atoms/Typography/Typography';
import { containerCss } from './LabeledCheckBox.styles';
import { LabeledCheckBoxProps } from './LabeledCheckBox.types';

export const LabeledCheckBox = ({
  children,
  size = 'md',
  color = 'primary',
  labelColor = 'dark',
  weight = 'medium',
  checked: propChecked = false,
  onChange = () => {},
  ...props
}: LabeledCheckBoxProps) => {
  const [checked, setChecked] = useState<boolean>(propChecked);

  const updateChecked = (value: boolean) => {
    setChecked(value);
    onChange(value);
  };

  const handleClick = () => {
    updateChecked(!checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateChecked(e.target.checked);
  };

  return (
    <div css={containerCss} onClick={handleClick} {...props}>
      <CheckBox
        size={size}
        color={color}
        onChange={handleChange}
        checked={checked}
      />
      <Typography size={size} color={labelColor} weight={weight}>
        {children}
      </Typography>
    </div>
  );
};
