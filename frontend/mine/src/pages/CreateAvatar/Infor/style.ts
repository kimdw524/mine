import { css } from '@emotion/react';

export const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const loadingCss = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0 0 0 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease forwards 1;
`;
