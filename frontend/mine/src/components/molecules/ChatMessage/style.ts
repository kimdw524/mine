import { css } from '@emotion/react';
import colorPalette from 'oyc-ds/dist/themes/colorPalette';

export const myBalloonCss = css`
  flex-direction: row-reverse;
  justify-content: flex-start;
`;

export const containerCss = css`
  padding: 0.5rem;
`;

export const nameCss = css``;

export const messageCss = css`
  display: inline-block;
  margin: 0.25rem 0;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  word-break: break-all;
`;

export const opponentChatCss = css`
  background-color: #e9e9e9;
  color: #000;
`;

export const myChatCss = css`
  background-color: ${colorPalette.purple[400]};
  color: #fff;
`;

export const animationCss = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(0.25rem);
    }

    to {
      transform: translateY(0);
    }
  }

  animation: fadeIn 0.3s ease 1;
`;

export const balloonCss = css`
  display: flex;
  align-items: flex-end;
`;

export const dateTimeCss = css`
  margin: 0.5rem;

  > div {
    word-break: keep-all;
    white-space: nowrap;
  }
`;
