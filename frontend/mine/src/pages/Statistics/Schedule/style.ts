import { css } from '@emotion/react';

export const manymsgCss = css`
  background-color: #EEE;
  margin: 1rem;
  padding: 2rem;
  text-align: center;

  .maxLabel {
    background-color: #CDB7FF;
    padding: 0.2rem 1rem;
    border-radius: 20px; /* maxLabel도 둥글게 만들기 위해 radius 설정 */
    display: inline-block; /* 요소가 inline-block으로 설정되어 padding이 적용될 수 있도록 */
  }
`


export const chartCss = css`
  margin: 0 auto;
  width: 9.75rem;
  height: 9.75rem;
`