import React from 'react'
import { createRoot } from 'react-dom/client'
// switchやlinkを使用可能にする
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#app'));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
