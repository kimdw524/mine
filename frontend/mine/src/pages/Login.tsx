import { useState } from "react";
import { Button } from "oyc-ds";
import { LabeledCheckBox, Typography, TextField } from "oyc-ds/dist/components";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("/user/login", { email: email, password: password })
      // .then((res) => console.log(res.data));
      .then(() => console.log("데이터 들어옴"));
  };

  return (
    <div>
      <Typography color="primary" size="xl" weight="bold">
        Mine
      </Typography>
      <div onSubmit={handleSubmit}>
        <TextField
          color="danger"
          defaultValue=""
          label="이메일 주소"
          maxRows={10}
          placeholder="abc@mail.com"
          type="text"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          value={email}
        />
        <Typography color="danger" size="md" weight="medium">
          올바른 이메일을 입력해주세요.
        </Typography>

        <TextField
          color="danger"
          defaultValue=""
          label="비밀번호"
          maxRows={10}
          placeholder="영문, 숫자 포함 8글자 이상 작성해주세요."
          type="password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
        />
        <Typography color="danger" size="md" weight="medium">
          영문, 숫자 포함 8글자 이상 작성해주세요.
        </Typography>
        <LabeledCheckBox
          color="primary"
          labelColor="dark"
          size="sm"
          weight="medium"
        >
          자동 로그인
        </LabeledCheckBox>
        <div className="LoginBtn">
          <Button color="primary" size="md" variant="contained" type="submit">
            로그인
          </Button>
        </div>
      </div>
      <div className="SignUpBtn">
        <Button color="primary" size="md" variant="outlined">
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default Login;
