import React from 'react';
import { Global, css } from '@emotion/react';
import GmarketSansTTFLight from '../aseets/fonts/GmarketSansTTFLight.ttf';
import GmarketSansTTFMedium from '../aseets/fonts/GmarketSansTTFMedium.ttf';
import GmarketSansTTFBold from '../aseets/fonts/GmarketSansTTFBold.ttf';

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
          }

          body,
          #root {
            width: 100vw;
            height: 100vh;
            overflow-x: hidden;
            overflow-y: scroll;
            -ms-overflow-style: none;
            ::-webkit-scrollbar {
              width: 0;
            }
          }
        `,
      ]}
    />
  );
};

export default GlobalStyle;
