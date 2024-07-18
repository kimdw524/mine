import { useEffect, useState } from "react";
import { LightTheme } from "oyc-ds";
import { ThemeProvider } from "@emotion/react";
// import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import './App.css'

interface Result {
  id: string;
  firstName: string;
  lastName: string;
}

interface LoginResult {
  email: string;
  password: string;
}

function App() {
  const [result, setResult] = useState<Result>({
    id: "",
    firstName: "",
    lastName: "",
  });

  const [login, setLogin] = useState<LoginResult>({
    email: "",
    password: "",
  });

  useEffect(() => {
    // mocking 한 데이터가 옴
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((res) => setResult({ ...res }));

    fetch("http://localhost:3000/user/login")
      .then((res) => res.json())
      .then((res) => setLogin({ ...res }));
  }, []);

  return (
    <ThemeProvider theme={LightTheme}>
      {/* <div>{result.id}</div> */}
      {/* <div>{result.firstName}</div> */}
      {/* <div>{result.lastName}</div> */}
      {/* <div>{login.email}</div> */}
      {/* <div>{login.password}</div> */}
      <Login/>
    </ThemeProvider>
  );
}

export default App;
