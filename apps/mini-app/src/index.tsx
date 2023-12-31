import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import utc from 'dayjs/plugin/utc';
import { extend } from 'dayjs';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Dayjs extend UTC
extend(utc);

try {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
  window.Telegram.WebApp.enableClosingConfirmation();
} catch (err: unknown) {
  console.error(err);
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
