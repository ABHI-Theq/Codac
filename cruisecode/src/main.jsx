import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketContextProvider } from './context/SocketContext.jsx';
import './index.css';
import App from './App.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-gray-900 min-h-screen">
      <BrowserRouter>
        <SocketContextProvider>
          <UserContextProvider>
          <App />
          </UserContextProvider>
        </SocketContextProvider>
      </BrowserRouter>
    </div>
  </StrictMode>
);
