/** @jsxImportSource @emotion/react */
import React from 'react';

export type DropdownItmeProps = React.ComponentProps<'option'>;

export const DropdownItem = ({
  children,
  ...props
}: React.ComponentProps<'option'>) => {
  return <option {...props}>{children}</option>;
};
