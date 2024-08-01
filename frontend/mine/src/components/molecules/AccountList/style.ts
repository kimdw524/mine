import { css } from '@emotion/react';

export const containerCss = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(0.5rem);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  display: flex;
  gap: 1rem;
  position: relative;
  padding: 0.875rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  user-select: none;
  transition: all 200ms ease;
  :active {
    background-color: #f1f1f7;
    transform: scale(0.95);
  }
  animation: fadeIn var(--duration) ease 1;
`;

export const iconWrapperCss = css`
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: var(--color);
`;

export const bodyCss = css`
  display: flex;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
`;

export const digitCss = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.25rem;
  text-align: right;
`;

export const detailCss = css`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

export const operatorCss = css`
  margin: 0 0.1875rem;
`;
