/** @jsxImportSource @emotion/react */
import React from 'react';
import { CloudIcon } from '@heroicons/react/24/outline';
import { containerCss, navchartCss } from './style';
import { Button } from 'oyc-ds';
import { useNavigate } from 'react-router-dom';

interface PreviewTypes {
  content:string,
  button:string
}

const Preview: React.FC<PreviewTypes> =  ({content, button}) => {
  const nav = useNavigate();
  return (
    <section css={containerCss}>
      <CloudIcon style={{width:'100px', height:"100px"}}/>
      아직 등록된 {content} 없어요.
      <Button
        css={navchartCss}
        color="primary"
        size="sm"
        variant="contained"
        onClick={() => nav('/account')}
      >
        {button} 등록하러 가기
      </Button>
    </section>
  );
};
export default Preview;
