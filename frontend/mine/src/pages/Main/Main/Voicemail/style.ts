import { css } from '@emotion/react';

export const voicemodalCss = css`
  width: 60%;
  height: 30%;
  left: 20%;
  top: 30%;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  /* background: rgba(71, 58, 58, 0.25); */
`
export const modalwindowCss = css`    
  width: 100%;
  height: 200px;
  position: relative; 
`

export const modaltitleCss = css`
  text-align: center;
  margin-top: 20px;
`
export const modalbtnCss = css`
  /* background-color: red; */
  display: flex;
  gap: 20px;
  align-self: flex-end;
  justify-content: center; // 가로 중앙 정렬
`
export const modalcancelCss = css`
  width: 70px;
  border-radius: 20px;
`

export const modalsendCss = css`
  width: 70px;
  border-radius: 20px;
`

export const modalcontentCss = css`
  text-align: center;
  /* background-color: blue; */
  height: 50%;
`