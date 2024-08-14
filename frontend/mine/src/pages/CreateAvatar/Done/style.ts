import { css } from '@emotion/react';

export const instCss = css`
  margin-bottom: 1rem;
  line-height: 150%;
`;

export const achievementCss = css`
  @keyframes fadeIn {
    from {
      transform: scale(0.66);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ede4ff;
  text-align: center;
  animation: fadeIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1;
`;
