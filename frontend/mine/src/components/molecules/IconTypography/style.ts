import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.25rem;
  pointer-events: none;
  user-select: none;
  animation: grow 300ms ease-in-out;

  @keyframes grow {
    from {
      transform: scale(0.9);
      opacity: 0.5;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
