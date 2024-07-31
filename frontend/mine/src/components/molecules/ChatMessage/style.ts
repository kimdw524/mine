import { css } from '@emotion/react';
import colorPalette from 'oyc-ds/dist/themes/colorPalette';

export const myChatContainerCss = css`
  text-align: right;
`;

export const containerCss = css`
  padding: 0.5rem;
`;

export const nameCss = css``;

export const messageCss = css`
  display: inline-block;
  margin: 0.25rem 1rem 0.25rem 0;
  padding: 0.75rem;
  border-radius: 1rem;
  background-color: #e9e9e9;
  color: #000;
  font-size: 0.875rem;
  font-weight: 500;
  word-break: break-all;
`;

export const myChatCss = css`
  margin: 0.25rem 0 0.25rem 1rem;
  background-color: ${colorPalette.purple[400]};
  color: #fff;
`;

export const animationCss = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(0.5rem);
    }

    to {
      transform: translateY(0);
    }
  }

  animation: fadeIn 0.5s ease 1;
`;
