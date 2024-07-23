import React,{ useState } from "react";
import { Button } from "oyc-ds";
import { LabeledCheckBox, Typography, TextField } from "oyc-ds/dist/components";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const nav = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [ischecked, setIsChecked] = useState(false);
  const [emailvalidation, setEmailValidation] = useState<boolean>(false);
  const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const [passwordvalidation, setPasswordValidation] = useState<boolean>(false);
  const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/; // 영문, 숫자, 8글자 이상

  const EmailValidation = (email: string) => {
    if (emailCheck.test(email)) {
      setEmailValidation(true); // 검증 성공
    } else {
      setEmailValidation(false); // 검증 실패
    }
  };

  const PasswordValidation = (password: string) => {
    if (passwordCheck.test(password)) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
    EmailValidation(email);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
    PasswordValidation(password);
  };

  const checkedItemHandler = (ischecked: boolean) => {
    if (!ischecked) {
      setIsChecked(false);
      console.log("체크해제");
    } else {
      setIsChecked(true);
      console.log("체크");
    }
  };

  const autoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    } else if (!ischecked){
      axios
      .post("/user/login", { email: email, password: password })
      .then((res) => {
        console.log(res.data);
        setCookie("Token", res.data.accessToken); // 쿠키에 토큰 저장
      });
    nav("/");
    }
    console.log(cookies)
  };

  return (
    <div className="Login">
      <Typography color="primary" size="xl" weight="bold" className="header">
        Mine
      </Typography>
      <form >
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
          {!emailvalidation && email ? (
            <Typography
              className="errormsg"
              color="danger"
              size="xs"
              weight="medium"
            >
              올바른 이메일을 입력해주세요.
            </Typography>
          ) : null}
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
          {!passwordvalidation && password ? (
            <Typography
            className="errormsg"
            color="danger"
            size="xs"
            weight="medium"
          >
            영문, 숫자 포함 8자 이상 입력해주세요.
          </Typography>
          ) : null}
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
            disabled={passwordvalidation && emailvalidation ? false : true}
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
