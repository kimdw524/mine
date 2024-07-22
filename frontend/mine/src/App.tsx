import React from 'react';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Login/Home";
import Login from "./pages/Login/Login";
import "./App.css";


function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
