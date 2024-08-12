import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const chatLogCss = css`
  flex: 1;
  overflow-y: scroll;
  border-top: 0.0625rem solid #eee;
  border-bottom: 0.0625rem solid #ddd;
`;

export const chatCss = css`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem;
`;

export const pendingCss = css`
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
  position: absolute;
  inset: 0 0 0 0;
  background-color: rgba(0, 0, 0, 0.66);
  animation: fadeIn 0.2s ease forwards 1;
`;
