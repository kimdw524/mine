/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Typography } from 'oyc-ds';
import React, { ReactNode } from 'react';

interface ProcessProps {
  children: ReactNode;
  description: string;
}

const iconWrapperCss = css`
  @keyframes ani {
    0% {
      transform: scale(0.98);
    }
    33% {
      transform: scale(1) rotateZ(3.5deg);
    }
    66% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1) rotateZ(-3.5deg);
    }
  }
  animation: ani 3s ease alternate infinite;

  svg {
    padding: 0.125rem;
  }
`;

const descCss = css`
  margin: 0.25rem 0;
`;

const Process = ({ children, description }: ProcessProps) => {
  const theme = useTheme();
  return (
    <div>
      <div
        css={iconWrapperCss}
        style={{
          animationDuration: `${3 + Math.random() * 1}s`,
          color: theme.colors.secondary.main,
        }}
      >
        {children}
      </div>
      <Typography color="dark" css={descCss}>
        {description}
      </Typography>
    </div>
  );
};

export default Process;
