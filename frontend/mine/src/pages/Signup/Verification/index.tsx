/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import { formCss, instCss } from './style';

interface VerificationProps {
  onSubmit: () => void;
}

const Verification = ({ onSubmit }: VerificationProps) => {
  return (
    <>
      <Typography size={'xl'} weight={'medium'} color={'dark'} css={instCss}>
        abc@naver.com 으로
        <br />
        인증 번호를 보냈어요.
      </Typography>
      <div css={formCss}>
        <TextField label="이메일" defaultValue="" variant="outlined" />

        <Button size="lg" onClick={onSubmit}>
          다음
        </Button>
      </div>
    </>
  );
};

export default Verification;
