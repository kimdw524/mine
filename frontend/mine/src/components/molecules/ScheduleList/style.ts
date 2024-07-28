import { css } from '@emotion/react';

export const containerCss = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }

    to {
      opacity: 1;
      transform: scale(1);
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
    transform: scale(0.9);
  }
  animation: fadeIn var(--duration) ease 1;
`;

export const iconWrapperCss = css`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: #eaeff1;
`;

export const bodyCss = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.375rem;
`;

export const categoryCss = css`
  margin-right: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
`;
