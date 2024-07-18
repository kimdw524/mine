import { useState } from "react";
import { Button } from "oyc-ds";
import { LabeledCheckBox, Typography, TextField } from "oyc-ds/dist/components";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userInfo, setUserInfo] = useState({
  //   email:'',
  //   password:''
  // });

  const emailChange = (e: any) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const passwordChange = (e: any) => {
    setPassword(e.target.value);
    console.log(password);
  };

  // const handleChange = (e:any) => {
  //   setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  //   console.log(userInfo)
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // axios
    //   .post("/user/login", { email: userInfo.email, password: userInfo.password })
    //   .then((res) => console.log(res.data));
    //   Validation(userInfo)
    axios
      .post("/user/login", { email: email, password: password })
      .then((res) => console.log(res.data));
  };

  return (
    <div className="Login">
      <Typography color="primary" size="xl" weight="bold" className="header">
        Mine
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="emailtexfield">
          <TextField
            name="email"
            color="danger"
            defaultValue=""
            label="이메일 주소"
            maxRows={10}
            placeholder="abc@mail.com"
            type="text"
            variant="outlined"
            onChange={emailChange}
            required
            value={email}
          />
          <Typography
            className="errormsg"
            color="danger"
            size="xs"
            weight="medium"
          >
            아이디 양식 맞춰주세요
          </Typography>
        </div>
        <div className="passwordtextfield">
          <TextField
            name="password"
            color="danger"
            defaultValue=""
            label="비밀번호"
            maxRows={10}
            placeholder="영문, 숫자 포함 8글자 이상 작성해주세요."
            type="password"
            variant="outlined"
            onChange={passwordChange}
            value={password}
          />
          <Typography
            className="errormsg"
            color="danger"
            size="xs"
            weight="medium"
          >
            비밀번호 양식 맞춰주세요
          </Typography>
        </div>
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
        <div className="SignUpBtn">
          <Button color="primary" size="md" variant="outlined">
            회원가입
          </Button>
        </div>
        <Typography
          color="secondary"
          size="xs"
          weight="medium"
          className="passwordfind"
        >
          비밀번호 찾기
        </Typography>
      </form>
    </div>
  );
};

export default Login;
