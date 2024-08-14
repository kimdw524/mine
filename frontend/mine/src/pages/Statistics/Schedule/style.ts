import { css } from '@emotion/react';

export const containerCss = css`
  padding: 1.25rem;
  display: flex;
  flex-direction: column; 
`;

export const manymsgCss = css`
  background-color: #F0F0F0;
  padding: 2rem;
  text-align: center;

  .maxLabel {
    font-size: 14px;
    padding: 0.2rem 1rem;
    border-radius: 20px;
    display: inline-block;
  }
`

export const boxCss = css`
  display: flex;
  align-items: flex-start;
  margin: 1rem 0;
  border: 1px solid #EEE;
  padding: 1rem;

  .tilte {
    flex: 1;
    margin-right: 1.25rem;
  }
`
export const chartCss = css`
  margin: 2rem auto;
  width: 9.75rem;
  height: 9.75rem;
`
export const labelboxCss = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`

export const labelCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 10px;

  .tilte {
    padding: '0.2rem 4rem';
    border-radius: 20px;
    margin-right: 10px;
  }
`

export const percentCss = css`
  padding: 0.2rem 1rem;
  border-radius: 20px;
  margin-right: 10px;
  background-color: red;
  font-size: 10px;
  
`