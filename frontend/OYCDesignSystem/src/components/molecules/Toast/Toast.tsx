/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import { ToastProps } from './Toast.types';
import { base, variants } from './Toast.styles';
import { Palette } from '../../../themes/lightTheme';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Icon } from '../../atoms/Icon';

const colorToIcon: Record<Palette, ReactNode> = {
  primary: <InformationCircleIcon />,
  success: <CheckCircleIcon />,
  danger: <ExclamationCircleIcon />,
  secondary: <ExclamationTriangleIcon />,
  dark: <InformationCircleIcon />,
  light: <InformationCircleIcon />,
};

export const Toast = ({
  children,
  variant = 'contained',
  color = 'primary',
  ...props
}: ToastProps) => {
  const theme = useTheme();

  return (
    <div css={[base(theme), variants[variant](theme, color)]} {...props}>
      <Icon color={variant === 'filled' ? 'light' : 'dark'}>
        {colorToIcon[color]}
      </Icon>
      {children}
    </div>
  );
};
