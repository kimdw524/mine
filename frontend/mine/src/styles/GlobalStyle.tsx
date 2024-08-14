import React from 'react';
import { Global, css } from '@emotion/react';
import GmarketSansTTFLight from '../aseets/fonts/GmarketSansLight.woff2';
import GmarketSansTTFMedium from '../aseets/fonts/GmarketSansMedium.woff2';
import GmarketSansTTFBold from '../aseets/fonts/GmarketSansBold.woff2';

const GlobalStyle = () => {
  return (
    <Global
      styles={[
        css`
          @font-face {
            font-family: 'GmarketSans';
            font-weight: 300;
            src: url(${GmarketSansTTFLight});
          }

          @font-face {
            font-family: 'GmarketSans';
            font-weight: 500;
            src: url(${GmarketSansTTFMedium});
          }

          @font-face {
            font-family: 'GmarketSans';
            font-weight: 700;
            src: url(${GmarketSansTTFBold});
          }

          * {
            font-family: 'GmarketSans';
            font-size: 16px;
            -webkit-tap-highlight-color: transparent !important;

            ::-webkit-scrollbar {
              width: 0;
              height: 0;
            }
          }

          body,
          #root {
            width: 100vw;
            height: 100vh;
            overflow-x: hidden;
            overflow-y: scroll;
            -ms-overflow-style: none;
            overscroll-behavior: none;

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        `,
      ]}
    />
  );
};

export default GlobalStyle;
