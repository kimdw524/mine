import { css } from '@emotion/react';
import { expenses } from './spend';

//style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid black' }}
export const containerCss = css`
  padding: 1.25rem;
  margin: 0 auto;
  /* border: 1px solid black; */
  max-width: 600px;
`;

export const spendCss = css`
  text-align: left;
  line-height: 1.74rem;
  margin-bottom: 0.675rem;
`

export const itemsCss = css`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0.7rem 0.3125rem;
`

export const itembarCss = css`
  width: 0.525rem;
  height: 2.5rem;
  margin: 0 0.725rem 0 0.325rem;
`

export const itemlabelCss = css`
  text-align: left;
`

export const itempriceCss = css`
  margin-left: auto;
  font-weight: 10px;
`