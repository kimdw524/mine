import { css } from '@emotion/react';

export const containerCss = css`
  position: relative;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  border-radius: 50%;
  transition: all 150ms ease;

  svg {
    position: absolute;
    width: 2rem;
    height: 2rem;
    transition: all 200ms ease;
  }

  .inactive {
    margin-left: 0.125rem;
  }
`;

export const activeCss = css`
  @keyframes morph {
    0% {
      transform: scale(1.025, 0.975) rotate(2deg);
    }

    25% {
      transform: scale(0.975, 1.025) rotate(-2deg);
    }

    50% {
      transform: scale(1.025, 0.975) rotate(-2deg);
    }

    75% {
      transform: scale(0.975, 1.025) rotate(2deg);
    }
  }

  background-color: var(--active-bg);
  color: var(--active-color) !important;
  animation: morph 2s ease alternate-reverse infinite;

  .inactive {
    transform: scale(0);
  }
`;

export const inactiveCss = css`
  background-color: var(--inactive-bg);
  color: var(--inactive-color) !important;
  .active {
    transform: scale(0);
  }
`;
