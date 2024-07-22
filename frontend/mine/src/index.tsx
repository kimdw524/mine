import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

// 개발 환경에서만 mocking 이 동작하도록
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return;

  const { worker } = await import("./mocks/browser");
  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement

);

// mocking 여부 확인
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
});
