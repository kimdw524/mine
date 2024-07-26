import { ReactNode } from 'react';

export interface BackDropProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  opacity?: number;
  blur?: number;
}
