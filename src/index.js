// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './components/authcontext/AuthContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.createRoot(document.getElementById("root")).render(<AuthContextProvider> <App /></AuthContextProvider>);

// root.render(
//   <React.StrictMode>
//     <AuthContextProvider> <App /></AuthContextProvider>
   
//   </React.StrictMode>
  
// );



