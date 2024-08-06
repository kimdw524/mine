import { css } from '@emotion/react';

export const infoBoxCss = (content: string) => css`
  min-width: calc(50% - 2.5rem);
  padding: 1rem 1rem;
  border-radius: 0.625rem;
  background-color: white;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.04);

  ${content.length > 10 &&
  css`
    width: calc(100% - 2rem);
  `};
`;

export const infoBoxTitleCss = css`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
