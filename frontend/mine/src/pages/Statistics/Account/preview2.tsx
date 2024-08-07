/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, navchartCss } from './spend.style';
import { CloudIcon } from '@heroicons/react/24/outline';
import { Button } from 'oyc-ds';
import { useNavigate } from 'react-router-dom';

const Preview = () => {
  const nav = useNavigate();
  return (
    <section css={containerCss} style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"130px"}}>
      <CloudIcon style={{width:'100px', height:"100px"}}/>
      아직 등록된 가계부가 없어요.
      <Button
        css={navchartCss}
        color="primary"
        size="sm"
        variant="contained"
        onClick={() => nav('/account')}
      >
        가계부 등록하러 가기
      </Button>
    </section>
  );
};
export default Preview;
