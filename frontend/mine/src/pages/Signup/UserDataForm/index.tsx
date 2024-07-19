/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import { formCss, genderContainerCss, instCss } from './style';
import { useState } from 'react';

interface UserDataFormProps {
  onSubmit: () => void;
}

const UserDataForm = ({ onSubmit }: UserDataFormProps) => {
  const [gender, setGender] = useState<'M' | 'F'>('M');

  return (
    <>
      <Typography size={'xl'} weight={'medium'} color={'dark'} css={instCss}>
        서비스 이용에 필요한
        <br />
        정보를 입력해 주세요.
      </Typography>
      <div css={formCss}>
        <TextField label="이메일" defaultValue="" variant="outlined" />
        <TextField
          type="password"
          label="비밀번호"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          type="password"
          label="비밀번호 확인"
          defaultValue=""
          variant="outlined"
        />
        <TextField label="이름" defaultValue="" variant="outlined" />
        <div css={genderContainerCss}>
          <Button
            size="md"
            color="secondary"
            onClick={() => setGender('M')}
            variant={gender === 'M' ? 'contained' : 'outlined'}
          >
            남자
          </Button>
          <Button
            size="md"
            color="secondary"
            onClick={() => setGender('F')}
            variant={gender === 'F' ? 'contained' : 'outlined'}
          >
            여자
          </Button>
        </div>

        <Button size="lg" onClick={onSubmit}>
          다음
        </Button>
      </div>
    </>
  );
};

export default UserDataForm;
