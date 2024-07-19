import { useEffect, useState } from "react";
import { Button } from "oyc-ds";
import { useNavigate } from "react-router-dom";

interface LoginResult {
  accessToken: string;
  email: string;
  password: string;
}

const Home = () => {
  const nav = useNavigate();
  const [login, setLogin] = useState<LoginResult>({
    accessToken: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // mocking 한 데이터가 옴
    fetch("http://localhost:3000/user/login")
      .then((res) => res.json())
      .then((res) => setLogin({ ...res }));
  }, []);

  return (
    <>
      <div>{login.accessToken}</div>
      <div>{login.email}</div>
      <div>{login.password}</div>
      <div>Home 화면입니다.</div>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav("/user/login")}
      >
        로그인 하러가기
      </Button>
    </>
  );
};

export default Home;
