/** @jsxImportSource @emotion/react */
import { Button, Typography } from 'oyc-ds';
import { useContext } from 'react';
import { SignupContext } from '..';
import { buttonContainerCss, instCss } from './style';

const Done = () => {
  const signupContext = useContext(SignupContext);

  return (
    <>
      <Typography size={'xl'} weight={'medium'} color={'dark'} css={instCss}>
        회원가입이 완료되었습니다.
      </Typography>
      <Typography size={'sm'} weight={'medium'} color={'dark'} css={instCss}>
        {signupContext.info.name}님의 회원가입을 축하합니다!
      </Typography>
      <div css={buttonContainerCss}>
        <Button size="lg" variant="outlined">
          홈으로
        </Button>
        <Button size="lg">로그인</Button>
      </div>
    </>
  );
};

export default Done;
