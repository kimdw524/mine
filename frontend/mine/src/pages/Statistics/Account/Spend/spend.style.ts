import { css } from '@emotion/react';

export const containerCss = css`
  position: relative;
  display: flex;
  flex-direction: column; /* 추가된 부분 */
  /* margin: 0 auto; */
  /* border: 1px solid black; */
  /* max-width: 600px; */
`

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
  margin-right: 1px;
  font-weight: 10px;
`

export const typeCss = css`
  width: 130px;
  height: 35px;
  margin-left: auto;
`

export const allbtnCss = css`
  margin-left: auto;
`

export const backdropCss = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* 투명도를 가진 흰색 배경 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10; /* 버튼보다 아래에 있도록 z-index 설정 */
  backdrop-filter: blur(3px);
`

export const navchartCss = css`
  position: fixed;
  bottom: 1.5625rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* 다른 요소들보다 위에 표시되도록 설정 */
  width: 70%;
  padding: 1rem 0;
  font-size: 1.125rem;
  border-radius: 1.25rem;
`

export const contentCss = css`
  display: flex;
  background-color: #eee;
  padding: 20px;
  border-radius: 10px;
  z-index: 20; /* BackDrop 위에 표시되도록 z-index 설정 */
  margin-bottom: 15rem;

  .preview-text {
    font-size: 20px;
  }
`
