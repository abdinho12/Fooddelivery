import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider, { StoreContext } from './context/StoreContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <StoreContextProvider>
  <App />
  </StoreContextProvider>
  </BrowserRouter>

)