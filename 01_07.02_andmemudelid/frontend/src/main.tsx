import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

//navigeerimiseks (URL-ide vahetamiseks):
// 1. npm i react-router-dom
// 2. importida BrowserRouter ja ümbritseda see </app> tagi ümber
// 3. teha seoseid failide ja URL-ide vahel App.tsx failis
// localhost:5173/cart --> Cart.tsx
// localhost:5173/login --> Login.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)