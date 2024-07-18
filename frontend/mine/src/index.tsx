import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 개발 환경에서만 mocking 이 동작하도록
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return null;

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// mocking 여부 확인
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
