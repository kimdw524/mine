import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button,LabeledCheckBox, Typography, TextField } from 'oyc-ds';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { UserContext } from './UserContext';
import { UserLogin } from '../../apis/loginApi';

interface ColorInfo {
  email: Palette;
  password: Palette;
}
const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/; // 영문, 숫자, 8글자 이상

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const nav = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [ischecked, setIsChecked] = useState(false);
  const [emailvalidation, setEmailValidation] = useState<boolean>(false);
  const [passwordvalidation, setPasswordValidation] = useState<boolean>(false);
  const [loginResult, setLoginResult] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const [color, setColor] = useState<ColorInfo>({
    email:'primary',
    password:'primary'
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setUserInfo]);

  // const EmailValidation = (email: string) => {
  //   if (emailCheck.test(email)) {
  //     setEmailValidation(true); // 검증 성공
  //     setColor((prevColor) => ({
  //       ...prevColor,
  //       email: 'success'
  //     }));
  //   } else {
  //     setEmailValidation(false); // 검증 실패
  //     setColor((prevColor) => ({
  //       ...prevColor,
  //       email: 'danger'
  //     }));
  //   }
  // };
  const EmailValidation = useCallback(async () => {
    if (emailCheck.test(email)) {
      setEmailValidation(true);
      setColor((prevColor) => ({
        ...prevColor,
        email: 'success'
      }));
    } else {
      setEmailValidation(false);
      setColor((prevColor) => ({
        ...prevColor,
        email: 'danger'
      }));
    }
  }, [email])

  const PasswordValidation = useCallback(async () => {
    if (passwordCheck.test(password)) {
      setPasswordValidation(true);
      setColor((prevColor) => ({
        ...prevColor,
        password: 'success'
      }));
    } else {
      setPasswordValidation(false);
      setColor((prevColor) => ({
        ...prevColor,
        password: 'danger'
      }));
    }
  }, [password])

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  

  const checkedItemHandler = (ischecked: boolean) => {
    if (!ischecked) {
      setIsChecked(false);
      console.log('체크해제');
    } else {
      setIsChecked(true);
      console.log('체크');
    }
  };

  const autoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ischecked) {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      // axios
      //   .post('/user/login', { email: email, password: password })
      //   .then((res) => {
      //     console.log(res.data);
      //     setCookie('Token', res.data.accessToken, { expires: today });
      //     const userData = {
      //       nickname: res.data.nickname,
      //       email: res.data.email,
      //     };
      //     setUserInfo(userData);
      //     localStorage.setItem('userInfo', JSON.stringify(userData));
      //     nav('/');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      (async () => {
        await UserLogin(email, password)
          .then((res) => {
            console.log(res.data);
            setCookie('Token', res.data.accessToken, { expires: today });
            const userData = {
              nickname: res.data.nickname,
              email: res.data.email,
            };
            setUserInfo(userData);
            localStorage.setItem('userInfo', JSON.stringify(userData));
            nav('/');
          })
          .catch((err) => {
            console.log("에러:", err);
            setLoginResult(
              `이메일 또는 비밀번호가 잘못되었습니다.\n아이디와 비밀번호를 정확히 입력해주세요.`,
            )
        });
      })();
    } else if (!ischecked) {
      (async () => {
        await UserLogin(email, password)
          .then((res) => {
            console.log(res.data);
            setCookie('Token', res.data.accessToken);
            const userData = {
              nickname: res.data.nickname,
              email: res.data.email,
            };
            setUserInfo(userData);
            localStorage.setItem('userInfo', JSON.stringify(userData));
            nav('/');
          })
          .catch((err) => {
            console.log("에러:", err);
            setLoginResult(
              `이메일 또는 비밀번호가 잘못되었습니다.\n아이디와 비밀번호를 정확히 입력해주세요.`,
            )
        });
      })();
    }
  }

  return (
    <div className="Login">
      <Typography color="primary" size="xl" weight="bold" className="header">
        Mine
      </Typography>
      <form>
        <div className="emailtexfield">
          <TextField
            name="email"
            color={color.email}
            defaultValue=""
            label="이메일 주소"
            maxRows={10}
            placeholder="abc@mail.com"
            type="text"
            variant="outlined"
            onChange={emailChange}
            onKeyUp={EmailValidation}
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
            color={color.password}
            defaultValue=""
            label="비밀번호"
            maxRows={10}
            placeholder="영문, 숫자 포함 8글자 이상 작성해주세요."
            type="password"
            variant="outlined"
            onChange={passwordChange}
            onKeyUp={PasswordValidation}
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
        {loginResult ? (
          <Typography
            className="errormsg2"
            color="danger"
            size="xs"
            weight="medium"
          >
            {loginResult}
          </Typography>
        ) : null}
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
          onClick={() => nav('/user/signup')}
        >
          회원가입
        </Button>
      </div>
      <Typography
        color="secondary"
        size="xs"
        weight="medium"
        className="passwordfind"
        onClick={() => nav('/findpassword')}
      >
        비밀번호 찾기
      </Typography>
    </div>
  );
};

export default Login;
