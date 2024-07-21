import { useState } from "react";
import { Button } from "oyc-ds";
import { LabeledCheckBox, Typography, TextField } from "oyc-ds/dist/components";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [ischecked, setIsChecked] = useState(false);

  const emailChange = (e: any) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const passwordChange = (e: any) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!ischecked) {
      axios
        .post("/user/login", { email: email, password: password })
        .then((res) => {
          console.log(res.data);
          setCookie("Token", res.data.accessToken); // 쿠키에 토큰 저장
        }); 
      nav("/");
      console.log(cookies);
    }
  };

  const checkedItemHandler = (ischecked: Boolean) => {
    if (!ischecked) {
      setIsChecked(false);
      console.log("체크해제");
    } else {
      setIsChecked(true);
      console.log("체크");
    }
  };

  const autoLogin = (e: any) => {
    if (ischecked) {
      const today = new Date(); 
      today.setDate(today.getDate() + 1); 
      axios
        .post("/user/login", { email: email, password: password })
        .then((res) => {
          console.log(res.data);
          setCookie("Token", res.data.accessToken, { expires: today });
        });
      nav("/");
    }
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
          onChange={checkedItemHandler}
        >
          자동 로그인
        </LabeledCheckBox>
        <div className="LoginBtn">
          <Button
            color="primary"
            size="md"
            variant="contained"
            type="submit"
            onClick={autoLogin}
          >
            로그인
          </Button>
        </div>
      </form>
      <div className="SignUpBtn">
        <Button
          color="primary"
          size="md"
          variant="outlined"
          onClick={() => nav("/user/signup")}
        >
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
    </div>
  );
};

export default Login;
